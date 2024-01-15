import { check, validationResult } from "express-validator";
//Importando modelos
import Usuario from "../models/Usuario.js";
//Definidiendo las rutas
const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar sesión",
  });
};
//Ruta de registro
const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear cuenta",
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
    .withMessage("La contraseña debe tener minimo 6 cracteres")
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
  if(usuarioRepetido){
    return res.render("auth/registro", {
        pagina: "Crear cuenta",
        errores: [{msg:"El usuario ya esta registrado"}],
        //setiando el input
        usuario: {
          nombre: req.body.nombre,
          email: req.body.email,
        },
      });
  }
  
  //Insertando los datos a la BD
  const usuario = await Usuario.create(req.body);
//   console.log(req.body);
//   res.json(usuario);
  if(usuario){
    return res.render("auth/registro", {
        pagina: "Crear cuenta",
        errores: [{msg:"Usuario creado con exito"}],
        //setiando el input
        usuario: {
          nombre: req.body.nombre,
          email: req.body.email,
        },
      });
  }
};
//Recuperar passwor
const formularioRecuperarPassword = (req, res) => {
  res.render("auth/recuperar-password", {
    pagina: "Recuperar Tu password",
  });
};
//exportando funciones
export {
  formularioLogin,
  formularioRegistro,
  formularioRecuperarPassword,
  registrar,
};
