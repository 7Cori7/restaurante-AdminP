const mongoose = require('mongoose');

//*definir el schema:
const meserosSchema = new mongoose.Schema({
    id:Number,
    nombre:String 
})

//*configurar la respuesta del usuario en el schema
meserosSchema.set('toJSON',{
    transform:(document,returnObject)=>{
        returnObject.id = returnObject._id.toString();
        delete returnObject._id 
    }
})

//*seleccionar un nombre, registrar el modelo
const Meseros = mongoose.model('Meseros', meserosSchema);

//*se exporta
module.exports = Meseros;