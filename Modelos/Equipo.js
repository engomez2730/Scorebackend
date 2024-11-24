const mongoose = require('mongoose');

const EquipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ciudad: { type: String, required: true },
  jugadores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jugador' }], // Lista de jugadores del equipo
});

module.exports = mongoose.model('Equipo', EquipoSchema);
