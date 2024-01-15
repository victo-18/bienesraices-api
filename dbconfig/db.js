//Importando sequelize
import sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
const db = new sequelize(
  process.env.BD_NOMBRE,
  process.env.USER_BD,
  process.env.PASSWORD_BD,
  {
    host: process.env.HOST_BD,
    port: 5432,
    dialect: "postgres",
    define: {
      timestamps: true, // Agrega colunnas extras a la bd
    },
    pool: {
      max: 5, //maximo de conexiones por usuario
      min: 0,
      acquire: 30000, //tiempo de espera
      idle: 10000,
    },
    operatorAliaces: false,
  }
);

export default db;
