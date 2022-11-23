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
    res.status(201);
    res.send(["Naim", "Ana", "Vale", "user4"]);
});

app.get("/api/tarea", (req, res) => {
    res.status(200);
    res.send();
});

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

app.listen(port, () => {
    console.log("Servicio levantado en el puerto " + port);
});
