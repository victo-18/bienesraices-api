import nodemailer from "nodemailer";
//Autenticacion de usuario
const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //Estrallendo los datos del usuario
  const { nombre, email, token } = datos;
  //Enviando E-mail
  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Confirmar tu cuenta en BienesRaices.com",
    text: "Emos envia un E-mail con un elace para que confimes tu cuenta en BienesRaices.com",
    html: ` <p> Hola ${nombre} confirma tu cuenta en nuestra plataforma BienesRaices.com</p>
          
               <p> Tu cuenta ya esta lista solo tienes que confirmarla en el siguiente en lace <a href ="${
                 process.env.BACKEND_URL_HOST}:${process.env.PORT ?? 3000}/auth/confirmarCuenta/${token}">Confirmar cuenta</a></p>

               <p> Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `,
  });
};
//Email para restablecer password
const emailOlvidePassword = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //Estrallendo los datos del usuario
  const { nombre, email, token } = datos;
  //Enviando E-mail
  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Restasblecer password en BienesRaices.com",
    text: "Solicitaste el restablecimiento de tu password en BienesRaices.com",
    html: ` <p> Hola ${nombre} hemos enviado un e-mail con el enlace para cambiar tu password en BienesRaices.com</p>
          
               <p> Sigue el enlace para cambiar tu passwor y poder seguir dsifrutando de BienesRaices.com<a href ="${
                 process.env.BACKEND_URL_HOST}:${process.env.PORT ?? 3000}/auth/olvide-password/${token}">Restablecer password</a></p>

               <p> Si tu no solcitastes el cambio, puedes ignorar el mensaje</p>
        `,
  });
};
export { emailRegistro,emailOlvidePassword};
