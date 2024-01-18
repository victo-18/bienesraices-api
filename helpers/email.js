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
export { emailRegistro };
