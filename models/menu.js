const mongoose = require('mongoose');

//*definir el schema:
const menuSchema = new mongoose.Schema({
    id:Number,
    nombre:String,
    precio:Number,
    categoria:Number
    
})

//*configurar la respuesta del usuario en el schema
menuSchema.set('toJSON',{
    transform:(document,returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id 
    }
})

//*seleccionar un nombre, registrar el modelo
const Menu = mongoose.model('Menu', menuSchema);

//*se exporta
module.exports = Menu;