import express from "express";
import mongoose from "mongoose";
let mongoConnectionUsers =
    "mongodb+srv://admin:van12210@proyectofinal.hx0n1h1.mongodb.net/ProyectoDB";
let db = mongoose.connection;
import chalk from "chalk";
import * as fs from "node:fs";
import cors from "cors";
import randomize from "randomatic";
import bcrypt from "bcrypt";

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

const autenticar = async (req, res, next) => {
    let token = req.get("x-user-token");
    if (token == undefined) {
        res.status(401);
        res.send("No se envió el token");
    } else {
        let userFound = await User.findOne({ token: token });
        if (userFound) {
            console.log("autenticado");
            next();
            return;
        }
        res.status(401);
        res.send("Usuario no encontrado");
    }
};

app.use("/api/users", autenticar);
app.use("/api/tarea", autenticar);
// D A T A B A S E

///POST DE UN NUEVO USUARIO A LA BASE DE DATOS
app.post("/api/newUser", async (req, res) => {
    let id = Math.floor(Date.now() * Math.random());
    let faltantes = "";

    console.table(req.body);
    let usuario = req.body.usuario;
    if (usuario == undefined) faltantes += "usuario, ";
    let nombre = req.body.nombre;
    if (nombre == undefined) faltantes += "nombre, ";
    let apellido = req.body.apellido;
    if (apellido == undefined) faltantes += "apellido, ";
    let correo = req.body.correo;
    if (correo == undefined) faltantes += "correo, ";
    let password = req.body.password;
    if (password == "") faltantes += "password, ";
    let fecha = req.body.fecha;
    let sexo = req.body.sexo;
    let imagen = req.body.imagen;
    let token = "";

    if (faltantes != "") {
        res.status(400);
        res.send(faltantes.substring(0, faltantes.length - 2) + " incorrectos");
        return;
    }
    password = bcrypt.hashSync(password, 5);
    try {
        let userFound = await User.findOne({
            usuario: usuario,
        });
        if (userFound) {
            console.log("ya existe alguien con ese usuario");
            res.status(400);
            res.send("Ya existe un alguien con ese usuario");

            return;
        }
        userFound = await User.findOne({ correo: correo });
        if (userFound) {
            console.log("ya existe alguien con ese correo");
            res.status(400);
            res.send("Ya existe un usuario con ese correo");

            return;
        }

        if (imagen == undefined) {
            let s = sexo == "M" ? "women" : "men";
            let random_number = Math.floor(100 * Math.random());
            imagen =
                "https://randomuser.me/api/portraits/" +
                s +
                "/" +
                random_number +
                ".jpg";
        }

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
        await user.save();
        console.log(chalk.green("Usuario creado!!: "));
        res.status(200);
        res.send("usuario creado");
    } catch (e) {
        res.status(400).json({
            status: "error",
            message: e.message,
        });
    }
});

let Tarea = mongoose.model("tarea", tareaSchema); //la tarea hace referencia a qen que parte de la base se va a guardar

//POST DE NUEVA TAREA A LA BASE DE DATOS
app.post("/api/tarea", (req, res) => {
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
    tarea.save().then((doc) => {
        console.log(chalk.green("Tarea creada! "));
        res.status(200);
        res.send("Tarea creada.");
    });
});

//obtener lista de usuarios
app.get("/api/users", async (req, res) => {
    let users = await User.find({});

    let arrUsers = [];

    for (let i = 0; i < users.length; i++) {
        arrUsers.push(users[i].usuario);
    }
    //console.log(arrUsers);
    res.status(201);
    res.send(arrUsers);
});

//FILTRO PARA OBTENER TAREAS
app.get("/api/tarea", async (req, res) => {
    let etiquetas = req.query.etiquetas;
    let desc = req.query.descriptcion;
    let date = req.query.date;

    let tareas;
    console.log(date);
    let next_day;
    if (date) {
        date = new Date(Date.parse(date));

        // date.setHours(-6);
        console.log(date.getHours());
        if (date.getHours() == 0) {
            date.setHours(-6);
        }
        console.log(date);
        next_day = new Date(date.getTime() + 24 * 60 * 60 * 1000);

        // next_day.setHours(-6);
        // date -= 1;
        // date = new Date(date);
        console.log(date);
        console.log(next_day);
    }
    if (!desc && !date) tareas = await Tarea.find({});
    else if (desc && !date)
        tareas = await Tarea.find({
            description: { $regex: desc, $options: "i" },
        });
    else if (date && !desc)
        tareas = await Tarea.find({
            date: { $gte: date, $lt: next_day },
        });
    else {
        tareas = await Tarea.find({
            date: { $gte: date, $lt: next_day },
            description: { $regex: desc, $options: "i" },
        });
    }

    let arrTareas = [];

    for (let i = 0; i < tareas.length; i++) {
        if (etiquetas != undefined) {
            for (let j = 0; j < tareas[i].tags.length; j++)
                if (
                    tareas[i].tags[j]
                        .toUpperCase()
                        .includes(etiquetas.toUpperCase())
                ) {
                    arrTareas.push(tareas[i]);
                    break;
                }
        } else {
            arrTareas.push(tareas[i]);
        }
    }
    res.status(201);
    res.send(arrTareas);
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
app.put("/api/tarea/done/:id", (req, res) => {
    //console.table(req.params.id);
    let idTarea = req.params.id;

    Tarea.find({ id: idTarea }, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            //console.log(result[0].completed);
            if (!result[0].completed) {
                Tarea.updateOne({ id: idTarea }, { $set: { completed: true } })
                    .then((data) => res.json(data))
                    .catch((error) => res.json({ message: error }));
                //console.log("true");
            } else {
                Tarea.updateOne({ id: idTarea }, { $set: { completed: false } })
                    .then((data) => res.json(data))
                    .catch((error) => res.json({ message: error }));
                console.log("false");
            }
        }
    });
});

//validar usuario y contraseña
app.post("/api/login", async (req, res) => {
    // try {
    let user = req.body.user;
    let password = req.body.pass;
    console.log("Intento de login");
    console.log(user);
    if (user == "") {
        res.status(401);
        res.send("Usuario faltante");
        return;
    } else if (password == "") {
        res.status(401);
        res.send("Contraseña faltante");
        return;
    }

    const userFound = await User.findOne({
        usuario: req.body.user,
    });

    if (userFound != undefined) {
        console.log(userFound.password);
        if (
            userFound.password == password ||
            bcrypt.compareSync(password, userFound.password)
        ) {
            if (userFound.token != "") {
                res.status(201);
                res.set("x-user-token", [
                    userFound.token,
                    userFound.id,
                    userFound.usuario,
                ]);
                res.set("Access-Control-Expose-Headers", "x-user-token");
                res.send();
                return;
            } else {
                let token = randomize("Aa0", "10") + "-" + (userFound.id % 10);
                userFound.token = token;
                await userFound.save();
                console.log(userFound);
                res.status(201);
                res.set("x-user-token", [
                    userFound.token,
                    userFound.id,
                    userFound.usuario,
                ]);
                res.set("Access-Control-Expose-Headers", "x-user-token");
                res.send();
                return;
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
    // }
    // catch (e) {
    //     console.log("hola");
    //     res.status(400).json({
    //         status: "error",
    //         message: e.message,
    //     });
    // }
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
    console.log(ID);
    User.find({ id: ID }, function (error, val) {
        console.log(val);
        if (val.length == 0) {
            res.status(404);
            res.send("no existe el usuario con ese id");
        } else {
            res.status(200);
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
            res.status(404);
            res.send("no existe el usuario con ese id");
        } else {
            console.log(chalk.red("Se elimino al usuario"));
            res.status(200);
            res.send(val);
        }
    });
});

//EDITAR USUARIO A PARTIR DE SU ID
app.put("/api/users/:id", (req, res) => {
    console.log(chalk.blueBright("Buscando usuario por ID"));
    console.log(chalk.yellowBright("Actualizando información..."));
    let update = {};

    //VERIFICAR QUE NO EXISTA OTRA PERSONA
    //CON EL MISMO USUARIO
    let password_enc = bcrypt.hashSync(req.body.password, 5);
    console.log(password_enc);
    let ID = req.params.id;
    (update.nombre = req.body.nombre),
        (update.apellido = req.body.apellido),
        (update.usuario = req.body.usuario),
        (update.password = req.body.password),
        (update.imagen = req.body.imagen);
    let { nombre, apellido, usuario, password, imagen } = req.body;
    let test = { nombre, apellido, usuario, password, imagen };
    if (test.password == "") delete test.password;
    console.log(test.password);

    if (test.password) {
        password = bcrypt.hashSync(req.body.password, 5);
        console.table(update);
    }
    console.log("test");
    console.log(test);
    User.updateOne({ id: ID }, { $set: test })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

app.listen(port, () => {
    console.log("Servicio levantado en el puerto " + port);
});
