import express from "express";
import { admin,crear } from "../controlers/propiedadesControler.js";
const router = express.Router()


//definicion de rutas de  propiedades.
router.get("/mis-propiedades",admin);
router.get("/propiedades/crear",crear);

export default router;