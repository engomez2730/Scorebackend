const mongoose = require('mongoose');

const JugadorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  numero: { type: Number, required: true },
  Equipo: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: true },
});

module.exports = mongoose.model('Jugador', JugadorSchema);
