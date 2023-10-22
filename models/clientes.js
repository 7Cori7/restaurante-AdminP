const mongoose = require('mongoose');

//*definir el schema:
const clientesSchema = new mongoose.Schema({
    id:Number,
    mesero:String,
    mesa:Number,
    hora:Date,
    pedido:{
        id:Number,
        nombre:String,
        precio:Number,
        categoria:Number,
        cantidad:Number
    } 
})

//*configurar la respuesta del usuario en el schema
clientesSchema.set('toJSON',{
    transform:(document,returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id 
    }
})

//*seleccionar un nombre, registrar el modelo
const Clientes = mongoose.model('Clientes', clientesSchema);

//*se exporta
module.exports = Clientes;