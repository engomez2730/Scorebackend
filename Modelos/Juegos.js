const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
  nombre:{ type: String, required:[true,'Debes poner un nombre'] },
  fecha: { type: Date, default: Date.now },
  equipos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' }],
  relog: { type: Number, default: 0 }, // Game clock
  cuartoActual: { type: Number, default: 1 }, // Current quarter
  EstaCorriendo: { type: Boolean, default: false }, // Is the clock running
  UltimaActualizacion: { type: Date, default: null }, // Last updated timestamp
  scores: [
    {
      teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipo' },
      points: { type: Number, default: 0 },
    },
  ],
  estadisticaJugadores: [
    {
      jugadorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jugador' },
      stats: {
        points: { type: Number, default: 0 },
        rebounds: { type: Number, default: 0 },
        assists: { type: Number, default: 0 },
        steals: { type: Number, default: 0 },
        blocks: { type: Number, default: 0 },
        turnovers: { type: Number, default: 0 },
        fieldGoalsMade: { type: Number, default: 0 },
        fieldGoalsAttempted: { type: Number, default: 0 },
        threePointMade: { type: Number, default: 0 },
        threePointAttempted: { type: Number, default: 0 },
        minutesPlayed: { type: Number, default: 0 },
        plusMinus: { type: Number, default: 0 },
      },
    },
  ],
});

module.exports = mongoose.model('Juego', JuegoSchema);
