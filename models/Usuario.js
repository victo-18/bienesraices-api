//Definiendo modelos
import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import db from "../dbconfig/db.js";

const Usuario = db.define("usuario", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false
  },
  token:DataTypes.STRING,
  confirmado:DataTypes.BOOLEAN,
  
},{
  //hashe password
  hooks:{
    beforeCreate: async function(usuario){
      const salt = await bcrypt.genSalt(10)
      usuario.password= await bcrypt.hash(usuario.password, salt);
    }
  }
});
export default Usuario;