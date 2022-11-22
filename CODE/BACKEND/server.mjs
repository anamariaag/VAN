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

app.listen(port, () => {
    console.log("Servicio levantado en el puerto " + port);
});

const autenticar = (req, res, next) => {
    console.log("autenticado");
    next();
};

// app.use("/api/users", autenticar);
// app.use("/api/tarea", autenticar);

app.get("/api/users", (req, res) => {
    res.status(200);
    res.send();
});
