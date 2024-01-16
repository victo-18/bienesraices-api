//Importando archivos requeridos por la api
import express from 'express'
import usuarioRouter from './routes/usuarioRoutes.js';
import DB from './dbconfig/db.js'
//Creando el servidor
const server = express()
//Habilitar lectura de datados desde un formulario
server.use(express.urlencoded({extended:true}))
//Conexion a la bd con sequelize
try {
   await DB.authenticate();
   DB.sync() //crea las tablas si no existen
   console.log("Conexion correcta a la base de datos")
} catch (error) {
    console.log("Error al conectar con la base de datos ",{error})
    
}
// Habilitando  pug
server.set('view engine','pug')
//Donde encontra los archivos de pug
server.set('views', './views')

//Rutas de acseso a la informacion
server.use('/auth',usuarioRouter)

//Archivos estadicos
server.use(express.static('public'))

// Creando el puerto y arrancando el proyecto
const port= process.env.PORT || 3000;
server.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})