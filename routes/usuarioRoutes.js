//Rutas para la navegacion del usuario en el proyecto
import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioRecuperarPassword,
  registrar,
} from "../controlers/usuarioControler.js";
const router = express.Router();
//Utilizando las rutas
router.get("/login", formularioLogin);

router.get("/registroUsuario", formularioRegistro);
router.post("/registroUsuario", registrar);
router.get("/recuperar-password", formularioRecuperarPassword);
export default router;
