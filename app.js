require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const menu = require('./models/menu');
const meseros = require('./models/meseros');
const clientes = require('./models/clientes');



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


module.exports = app;



//xE77iOt97AannBMK