import express, { json } from "express";
import { PORT } from "./config.js";
import cors from "cors";
import indexRoutes from "./rutas/tareas.rutas.js";
import taskRoutes from "./rutas/tareas.rutas.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(taskRoutes);
app.use(indexRoutes);

app.listen(PORT);

console.log(`Server en el puerto ${PORT}`);


