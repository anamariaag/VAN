import express from "express";
import mongoose from "mongoose";
let mongoConnectionUsers =
    "mongodb+srv://admin:van12210@proyectofinal.hx0n1h1.mongodb.net/ProyectoDB";
let db = mongoose.connection;
import chalk from "chalk";
import * as fs from "node:fs";
import cors from "cors";
import randomize from "randomatic";

const app = express();
const port = 3000;

app.use(
    cors({
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    })
);

// D A T A B A S E //
db.on("connecting", () => {
    console.log(chalk.blue("Conectando..."));
    console.log(mongoose.connection.readyState);
});

db.on("connected", () => {
    console.log(chalk.green("Conectado correctamente!!   :D"));
    console.log(mongoose.connection.readyState);
});

mongoose.connect(mongoConnectionUsers, { useNewUrlParser: true });

//definiendo esquema de USUARIO
let userSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    sexo: {
        type: String,
        enum: ["H", "M"],
        required: true,
    },
    fecha: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
});

//definiendo esquema de TAREA
let tareaSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        required: true,
    },
    users: {
        type: [String],
        required: true,
    },
    tags: {
        type: [String],
    },
    completed: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
// D A T A B A S E
let User = mongoose.model("users", userSchema);

app.use(express.json());

const autenticar = (req, res, next) => {
    console.log("autenticado");
    next();
};

app.use("/api/users", autenticar);
app.use("/api/tarea", autenticar);
// D A T A B A S E

///POST DE UN NUEVO USUARIO A LA BASE DE DATOS
app.post("/api/users", (req, res) => {
    res.send("Haciendo un POST de un nuevo usuario");
    let id = req.body.id;
    let usuario = req.body.usuario;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let correo = req.body.correo;
    let password = req.body.password;
    let fecha = req.body.fecha;
    let sexo = req.body.sexo;
    let imagen = req.body.imagen;
    let token = "";

    let newUser = {
        id,
        usuario,
        nombre,
        apellido,
        correo,
        password,
        sexo,
        fecha,
        imagen,
        token,
    };

    let user = User(newUser);
    console.table(newUser);

    //guardar
    user.save().then((doc) =>
        console.log(chalk.green("Usuario creado!!: ") + doc)
    );
});

let Tarea = mongoose.model("tarea", tareaSchema); //la tarea hace referencia a qen que parte de la base se va a guardar

//POST DE NUEVA TAREA A LA BASE DE DATOS
app.post("/api/tarea", (req, res) => {
    res.send("Tarea creada.");
    let id = Math.floor(Date.now() * Math.random());
    let date = req.body.date;
    let tags = req.body.tags.split(", ");
    let completed = req.body.completed;
    let users = req.body.users.split(", ");
    let description = req.body.description;

    let newTarea = {
        id,
        date,
        tags,
        completed,
        users,
        description,
    };

    let tarea = Tarea(newTarea);
    console.table(newTarea);

    //guardar
    tarea.save().then((doc) => console.log(chalk.green("Tarea creada! ")));
});

//obtener lista de usuarios
app.get("/api/users", (req, res) => {
   
    User.find({}, function(err, result){
        if(err){
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//FILTRO PARA OBTENER TAREAS
app.get("/api/tarea", (req, res) => {
    Tarea.find({}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//ELIMINAR TAREA
app.delete("/api/tarea/:id", (req, res) => {
    let idTarea = req.params.id;
    //console.log("hola");
    //console.log(req.params.id)
    Tarea.deleteOne({ id: idTarea }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            console.log(chalk.red("Tarea eliminada."));
            res.send(result);
        }
    });
});

//EDITAR TAREA
app.put("/api/tarea", (req, res) => {
    console.table(req.body);
    let idTarea = req.body.id;

    const { id, date, description, users, completed, tags } = req.body;

    Tarea.updateOne(
        { id: idTarea },
        { $set: { id, date, description, users, completed, tags } }
    )
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//marcar tarea como completada - ana
app.put("/api/tarea/:done", (req, res) => {
    res.status(200);
    res.send();
});

//validar usuario y contraseña
app.post("/api/login", (req, res) => {
    let user = req.body.user;
    let password = req.body.pass;

    if (user == "") {
        res.status(401);
        res.send("Usuario faltante");
        return;
    } else if (password == "") {
        res.status(401);
        res.send("Contraseña faltante");
        return;
    }

    User.find(
        {
            usuario: req.body.user,
        },
        (err, docs) => {
            if (err) {
                console.log(err);
            } else {
                console.log(docs.length);
                if (docs.length != 0) {
                    docs = docs[0];
                    if (docs.password == password) {
                        if (docs.token != "") {
                            res.status(201);
                            res.set("x-user-token", [docs.token, docs.id]);
                            res.set(
                                "Access-Control-Expose-Headers",
                                "x-user-token"
                            );
                            res.send();
                            return;
                        } else {
                            let token = randomize("Aa0", "10") + "-" + docs.id;
                            docs.token = token;
                            console.log(docs);

                            User.updateOne(
                                { id: docs.id },
                                { $set: { token } }
                            ).then((data) => {
                                res.status(201);
                                res.set("x-user-token", [token, docs.id]);
                                res.set(
                                    "Access-Control-Expose-Headers",
                                    "x-user-token"
                                );
                                res.send();
                            });
                        }
                    } else {
                        res.status(401);
                        res.send("contraseña incorrecta");
                        return;
                    }
                } else {
                    res.status(401);
                    res.send("no se encontró el usuario");
                    return;
                }
            }
        }
    );

    // res.status(201);
    // res.set("x-user-token", "token chido");
    // res.set("Access-Control-Expose-Headers", "x-user-token");
    // res.send();
});

app.get("/api/notif", (req, res) => {
    res.status(201);
    res.send(["notif1", "notif2", "notif3", "naim"]);
});

app.delete("/api/notif", (req, res) => {
    res.status(200);
    res.send();
});

//REGRESA UN USUARIO DE LA BD
//A PARTIR DE SU ID  FUNCIONA
app.get("/api/users/:id", (req, res) => {
    console.log(chalk.blueBright("Buscando usuario por ID"));
    let ID = req.params.id;
    User.find({ id: ID }, function (error, val) {
        if (val.length == 0) {
            res.send("no existe el usuario con ese id");
        } else {
            res.send(val);
        }
    });
});

//ELIMINAR USUARIO A PARTIR DE SU ID
app.delete("/api/users/:id", (req, res) => {
    console.log(chalk.blueBright("Buscando usuario por ID"));
    let ID = req.params.id;
    User.deleteOne({ id: ID }, function (error, val) {
        if (val.length == 0) {
            res.send("no existe el usuario con ese id");
        } else {
            console.log(chalk.red("Se elimino al usuario"));
            res.send(val);
        }
    });
});

//EDITAR USUARIO A PARTIR DE SU ID
app.put("/api/users/:id", (req, res) => {
    console.log(chalk.blueBright("Buscando usuario por ID"));
    console.log(chalk.yellowBright("Actualizando información..."))
    let update={};
    let ID=req.params.id;
    update.nombre=req.body.nombre,
    update.apellido=req.body.apellido,
    update.usuario=req.body.usuario,
    update.password=req.body.password,
    update.imagen=req.body.imagen;
    const {nombre,apellido,usuario,password,imagen}= req.body;

    console.table(update);
    User.updateOne({id:ID},{$set: {nombre,apellido,usuario,password,imagen}})
    .then((data)=> res.json(data))
    .catch((error)=>res.json({message: error}))
})






app.listen(port, () => {
    console.log("Servicio levantado en el puerto " + port);
});
