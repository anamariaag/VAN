import express from "express";
import mongoose from "mongoose";
let mongoConnectionUsers= "mongodb+srv://admin:van12210@proyectofinal.hx0n1h1.mongodb.net/ProyectoFinal";
let db=mongoose.connection;
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
db.on('connecting',()=>{
    console.log(chalk.blue('Conectando...'));
    console.log(mongoose.connection.readyState);
});

db.on('connected',()=>{
    console.log(chalk.green('Conectado correctamente!!   :D'));
    console.log(mongoose.connection.readyState);
});

mongoose.connect(mongoConnectionUsers,{useNewUrlParser: true});

//definiendo esquema de USUARIO
let userSchema=mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        enum: ['H','M'],
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    }

});

// D A T A B A S E 
let User= mongoose.model('users', userSchema);



app.use(express.json());

const autenticar = (req, res, next) => {
    console.log("autenticado");
    next();
};

app.use("/api/users", autenticar);
app.use("/api/tarea", autenticar);


app.post("/api/users", (req, res) => {

    res.send('Haciendo un POST de un nuevo usuario');

    let id=req.body.id;
    let usuario=req.body.usuario;
    let nombre=req.body.nombre;
    let apellido=req.body.apellido;
    let correo=req.body.correo;
    let password=req.body.password;
    let fecha=req.body.fecha;
    let sexo=req.body.sexo;
    let imagen=req.body.imagen;

    let newUser={id,usuario,nombre, apellido,correo, password, sexo,fecha,imagen};

    let user=User(newUser);
    console.table(newUser);

    //guardar
    user.save().then((doc)=>console.log(chalk.green("Usuario creado!!: ")+ doc));
});


//obtener lista de usuarios
app.get("/api/users", (req, res) => {
    res.status(201);
    res.send(["Naim", "Ana", "Vale", "user4"]);
});



//filtros para obtener tareas
app.get("/api/tarea", (req, res) => {
    res.status(200);
    res.send([{
        "id": "1",
        "name": "Proyecto WEB",
        "date": "24/11/2022",
        "users": [
            "Naim",
            "Ana",
            "Vale"],
        "tags": ["SCHOOL", "WORK", "URGENT"]
    },
    {"id": "2",
    "name": "Proyecto GBD",
    "date": "24/11/2022",
    "users": [
        "Naim",
        "Jaz",
        "Vale"],
    "tags": ["SCHOOL", "URGENT", "PENDING"]}]
    );
});


//eliminar tarea - ana
app.delete("/api/tarea", (req, res) => {
    res.status(200);
    res.send();
});


//agregar tarea - ana
app.post("/api/tarea", (req, res) => {
    res.status(200);
    res.send();
});


//editar tarea - ana
app.put("/api/tarea", (req, res) => {
    res.status(200);
    res.send();
});


//marcar tarea como completada - ana
app.put("/api/tarea/:done", (req, res) => {
    res.status(200);
    res.send();
});


//validar usuario y contraseña
app.post("/api/login", (req, res) => {
    res.status(201);
    res.set("x-user-token", "token chido");
    res.set("Access-Control-Expose-Headers", "x-user-token");
    res.send();
});





app.get("/api/notif", (req, res) => {
    res.status(201);
    res.send(["notif1", "notif2", "notif3", "naim"]);
});

app.delete("/api/notif", (req, res) => {
    res.status(200);
    res.send();
});

//editar profile
app.put("/api/profile",(req,res)=>{
    
})

//visualizar profile
app.get("/api/profile",(req,res)=>{
    res.send(
        {
            "nombre": "valeria yeya",
            "correo": "valeria.ramirez@iteso.mx",
            "usuario": "valrmzl",
            "contraseña": "*****",
            "fecha": "23/11/2022",
            "imagen": "https://randomuser.me/api/portraits/women/3.jpg"

        }
    );
    
})


app.listen(port, () => {
    console.log("Servicio levantado en el puerto " + port);
});