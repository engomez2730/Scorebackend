const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
require('dotenv').config({ path: path.resolve(__dirname, './config.env') })

const JuegosRutas = require('./Rutas/JuegosRutas')
const JugadoresRutas = require('./Rutas/JugadoresRutas')
const EquipoRutas = require('./Rutas/EquipoRutas')



app.use('/api/v1/juegos', JuegosRutas);
app.use('/api/v1/jugadores', JugadoresRutas);
app.use('/api/v1/equipos', EquipoRutas);




module.exports = app


