import express from "express";
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



//registrar usuario
app.post("/api/users", (req, res) => {
    console.table(req.body);
    res.status(201);
    res.send();
});

app.listen(port, () => {
    console.log("Servicio levantado en el puerto " + port);
});
