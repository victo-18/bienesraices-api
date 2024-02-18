//Rutas para la navegacion del usuario en el proyecto
import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
  confirmarCuenta,
  resetPassword,
  comprobarToken,
  nuevoPassword,
  autenticacionUsuario,
} from "../controlers/usuarioControler.js";
//Inicializando express
const router = express.Router();
//Utilizando las rutas
router.get("/login", formularioLogin);
router.post("/login", autenticacionUsuario);
router.get("/registroUsuario", formularioRegistro);
router.post("/registroUsuario", registrar);
router.get("/confirmarCuenta/:token",confirmarCuenta)
router.get("/olvide-password", formularioOlvidePassword );
router.post("/olvide-password",resetPassword);
//Rutas para almacenar el nuevo password
router.get("/olvide-password/:token",comprobarToken)
router.post("/olvide-password/:token",nuevoPassword)
export default router;
