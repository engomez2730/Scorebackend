const app = require('./App')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './config.env') })


app.listen(process.env.SERVER_PORT,()=>{
    console.log('El server ha comenzado')
})


// Importar mongoose
const mongoose = require('mongoose');

// Cadena de conexión (reemplaza con tu propia cadena)

// Conectar a MongoDB usando Mongoose*-
mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log('Conexión a MongoDB Atlas exitosa');
})
.catch((err) => {
    console.error('Error al conectar con MongoDB Atlas', err);
});
