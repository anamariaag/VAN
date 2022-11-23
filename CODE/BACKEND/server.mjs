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

app.get("/api/users", (req, res) => {
    res.status(200);
    res.send();
});

app.get("/api/tarea", (req, res) => {
    res.status(200);
    res.send();
});

app.get("/api/login", (req, res) => {
    res.status(200);
    res.send();
});

app.listen(port, () => {
    console.log("Servicio levantado en el puerto " + port);
});
