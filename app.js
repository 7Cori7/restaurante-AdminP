require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');


(async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Te has conectado a MongoDB')
    }catch(error){
        console.log(error)
    }
})();

//Rutas del Front-end:
app.use('/',express.static(path.resolve('views','home')));
app.use('/pedidos',express.static(path.resolve('views','pedidos')));
app.use('/dashboard',express.static(path.resolve('views','meserosPa')));
//'/registro' es un alias, se debe poner otra cosa por seguridad

module.exports = app;



//xE77iOt97AannBMK