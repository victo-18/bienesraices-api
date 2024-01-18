//Rutas para la navegacion del usuario en el proyecto
import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioRecuperarPassword,
  registrar,
  confirmarCuenta
} from "../controlers/usuarioControler.js";
//Inicializando express
const router = express.Router();
//Utilizando las rutas
router.get("/login", formularioLogin);
router.get("/registroUsuario", formularioRegistro);
router.post("/registroUsuario", registrar);
router.get("/recuperar-password", formularioRecuperarPassword);
router.get("/confirmarCuenta/:token",confirmarCuenta)
export default router;
