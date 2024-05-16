import Jwt  from "jsonwebtoken";
//Generate a token to verify the user's account
const generarId =()=> (Math.random().toString(32).substring(2)+Date.now().toString(32).substring(2));

// Generate a token where  user's information is stored for a login session
const generarJWT = ({id:id,nombre})=>(
    Jwt.sign({
    id:id,
    nombre,
   },process.env.JWT_SICRET ,{
    expiresIn: "1d"//Tiempo en que expira nuestra sesion.
   }))

   export{
    generarId,
    generarJWT
   }