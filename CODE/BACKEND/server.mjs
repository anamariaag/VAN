import express from "express";
import mongoose from "mongoose";
let mongoConnection= "mongodb+srv://admin:van12210@myapp.dxmsu6q.mongodb.net/ProyectoFinal";
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

mongoose.connect(mongoConnection,{useNewUrlParser: true});

//definiendo esquema de USUARIO
let userSchema=mongoose.Schema({
    id: {
        type: Number,
        requiered: true
    },
    usuario: {
        type: String,
        requiered: true
    },
    nombre: {
        type: String,
        requiered: true
    },
    apellido: {
        type: String,
        requiered: true
    },
    correo: {
        type: String,
        requiered: true
    },
    password: {
        type: String,
        requiered: true
    },
    sexo: {
        type: String,
        enum: ['H','M'],
        requiered: true
    },
    fecha: {
        type: String,
        requiered: true
    },
    imagen: {
        type: String,
        requiered: true
    },

});

// D A T A B A S E 


app.use(express.json());

const autenticar = (req, res, next) => {
    console.log("autenticado");
    next();
};

app.use("/api/users", autenticar);
app.use("/api/tarea", autenticar);


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




app.post("/api/users", (req, res) => {
    console.table(req.body);
    res.status(201);
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



