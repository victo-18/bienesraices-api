import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
//import jwt from 'jsonwebtoken';
//Importando modelos
import Usuario from "../models/Usuario.js";
import { generarJWT,generarId } from "../helpers/token.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/email.js";

//Definidiendo las rutas
const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar sesión",
    csrfToken: req.csrfToken(),
  });
};
//Autenticacion de usuario
const autenticacionUsuario = async (req, res) => {
  //Validar los datos
  await check("email")
    .isEmail()
    .withMessage("El email es obligatorio")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("El passwor es obligatorio")
    .run(req);
    let resultado = validationResult(req);
  //Validar que la respuesta este vacia
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/login", {
      pagina: "Inicio sesión",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
    });
  }
  //Identificar el usuario
  const{email,password}=req.body;
 const usuario= await Usuario.findOne({where:{email}})
 if(!usuario.confirmado){
  return res.render("auth/login", {
    pagina: "Inicio sesión",
    errores:[{msg:"Tu cuenta no ha sido confirmada"}],
    csrfToken: req.csrfToken(),
  });
 }
 //revisando el passwor introducido por el usuario
 if(!usuario.verificarPassword(password)){
  return res.render("auth/login", {
    pagina: "Inicio sesión",
    errores:[{msg:"La contraseña es incorrecta"}],
    csrfToken: req.csrfToken(),
  });
 }
 //Autenticando el usuario para el inicio de sesion
  const token= generarJWT({id:usuario.id,nombre:usuario.nombre})
  //Almacenar un cookes
  return res.cooke("_token",token,{
    httpOnly:true,//recibe solo peticiones de http
    //secure:true,// con sertificado ssh
  }).redirect("/mis-propiedades")
 //console.log("token generado:",token)
};
//Ruta de registro
const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear cuenta",
    csrfToken: req.csrfToken(),
  });
};
//Ruta para insertar un usuario
const registrar = async (req, res) => {
  //validando formulario
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await check("email").isEmail().withMessage("El email no es valido").run(req);
  await check("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener minimo 8 cracteres")
    .run(req);
  await check("repite_password")
    .equals(req.body.password)
    .withMessage("La contraseña no son iguales")
    .run(req);
  let resultado = validationResult(req);
  //Validar que la respuesta este vacia
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
      //setiando el input
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //Validando que el usuario no exista en la db

  const usuarioRepetido = await Usuario.findOne({
    where: { email: req.body.email },
  });
  if (usuarioRepetido) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      csrfToken: req.csrfToken(), //genera un token para identificar el origen de la peticion
      errores: [{ msg: "El usuario ya esta registrado" }],
      //setiando el input
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  //Insertando los datos a la BD
  const { nombre, email, password } = req.body;
  const usuario = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });
  //Envio de email de confirmacion de cuenta
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });
  if (usuario) {
    res.render("mensaje/mensaje", {
      pagina: "Cuenta creada correctamente",
      mensaje: `Hemos enviado un Email de confrimación al E-mail ${email}, presiona en el enlace para confirmar tu cuenta`,
    });
  }
};
//Confirmando cuenta
const confirmarCuenta = async (req, res) => {
  const { token } = req.params; //obtiene  los datos de la url
  //Validar El token
  const usuario = await Usuario.findOne({ where: { token } });
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar cuenta",
      mensaje:
        "Hubo un error al confirmar tu cuenta, por favor intenta denuevo",
      error: true,
    });
  }
  //confirmar-cuenta
  usuario.token = null;
  usuario.confirmado = true;
  await usuario.save(); //guardando los cambios en usuario
  res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta Confirmada",
    mensaje: "La cuenta fue confirmada correctamente",
  });
};
//Recuperar passwor
const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera Tu acceso en bienes raices",
    csrfToken: req.csrfToken(),
  });
};
//reseteando password
const resetPassword = async (req, res) => {
  // Validando el email
  await check("email")
    .isEmail()
    .withMessage("Ese no es un E-mail correcto")
    .run(req);
  let resultado = validationResult(req);
  //Validar que la respuesta este vacia
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }
  const usuarioEncontrado = await Usuario.findOne({
    where: { email: req.body.email },
  });
  if (!usuarioEncontrado) {
    return res.render("auth/olvide-password", {
      pagina: "Recupera tu acceso",
      csrfToken: req.csrfToken(),
      errores: [{ msg: "El usuario no esta registrado" }],
    });
  }

  //Generar token
  usuarioEncontrado.token = generarId();
  await usuarioEncontrado.save();
  //enviar email
  emailOlvidePassword({
    nombre: usuarioEncontrado.nombre,
    email: usuarioEncontrado.email,
    token: usuarioEncontrado.token,
  });
  console.log("El usuario encntrado es:", usuarioEncontrado);
  res.render("mensaje/mensaje", {
    pagina: "Restabecer password",
    mensaje: `Hemos enviado un Email para restablecer tu password al E-mail ${usuarioEncontrado.email}, presiona en el enlace para confirmar tu cuenta`,
  });
};
//Validar token para cambio de password
const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    res.render("auth/confirmarCuenta", {
      //csrfToken: req.csrfToken(),
      pagina: "Restablece tu password",
      mensaje: "Hubo un errror al validad tu informacion, intenta de nuevo",
      error: true,
    });
  }
  //Si el usuario existe
  res.render("auth/resetpassword", {
    pagina: "Restablece tu password",
    csrfToken: req.csrfToken(),
  });
};
//Almacenar el nuevo passwor
const nuevoPassword = async (req, res) => {
  //Validar el nuevo password
  await check("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("La contraseña debe tener minimo 8 cracteres")
    .run(req);

  let resultado = validationResult(req);
  if (!resultado.isEmpty()) {
    res.render("auth/resetpassword", {
      pagina: "Restablece tu password",
      csrfToken: req.csrfToken(),
      errores: resultado.array(),
    });
  }
  //Identificar quien hace el cambio
  const { token } = req.params;
  const { password } = req.body;

  const usuario = Usuario.findOne({ where: { token } });

  //haschear el nuevo passwor
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);
  usuario.token = null;
  await usuario.save();
  res.render("auth/confirmarCuenta", {
    pagina: "Password restablecido",
    mensaje: "El password se guardo correctamente",
  });
};

//exportando funciones
export {
  formularioLogin,
  autenticacionUsuario,
  formularioRegistro,
  registrar,
  confirmarCuenta,
  formularioOlvidePassword,
  resetPassword,
  comprobarToken,
  nuevoPassword,
};
