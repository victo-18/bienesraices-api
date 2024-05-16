import path from "path"; //importando ruta absoluta

// configuracion de webpack
export default {
  mode: "development", // modo de uso
  //entrada
  entry: {
    mapa: "./src/js/mapa.js", //ubicacion del archivo
  },
  //salida
  output: {
    filename: "[name].js", //nombre del archivo
    path: path.resolve("public/js"), //donde se guarda el archivo
  },
};
