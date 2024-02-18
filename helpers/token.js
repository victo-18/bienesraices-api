import Jwt  from "jsonwebtoken";
const generarId =()=> (Math.random().toString(32).substring(2)+Date.now().toString(32).substring(2));

// generar un tken
const generarJWT = ({id:id,nombre})=>(
    Jwt.sign({
    id:id,
    nombre,
   },process.env.JWT_SICRET ,{
    expiresIn: "1d"
   }))

   export{
    generarId,
    generarJWT
   }