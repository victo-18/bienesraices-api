
const admin = (req,res)=>{
    res.render("propiedades/admin",{
        pagina:"Mis propiedades",
        barra:true
    });

}

//Ruta para crear las propiedades
const crear = (req,res)=>{
res.render("propiedades/crear",{
    pagina:"Crear propiedad",
    barra:true
})
}
export{
    admin,crear
}