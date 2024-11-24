const Juego = require('../Modelos/Juegos');
const Equipo = require('../Modelos/Equipo');

const mongoose = require('mongoose');



exports.VerJuegos = async (req, res) => {

  try {

    const juegos = await Juego.find()
      .populate('equipos', 'nombre ciudad') 
      .populate('estadisticaJugadores.jugadorId', 'nombre numero'); 







    res.json(juegos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.VerJuego = async (req, res) => {
  const { id } = req.params;

  try {
    const juego = await Juego.findById(id)
      .populate('equipos', 'nombre ciudad')
      .populate('estadisticaJugadores.jugadorId', 'nombre numero');
    if (!juego) return res.status(404).json({ error: 'Game not found' });
    res.json(juego);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.CrearJuego = async (req, res) => {


  try {
    // Initialize a new game
    const nuevoJuego = new Juego({
      nombre: req.body.nombre,
  
   
    });

    await nuevoJuego.save();
    res.status(201).json(nuevoJuego);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.EliminarJuego = async (req, res) => {
  const { id } = req.params;

  try {
    const juego = await Juego.findByIdAndDelete(id);
    if (!juego) {
      return res.status(404).json({ error: 'Game not found.' });
    }

    res.json({ message: 'Game deleted successfully.', juego });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.AgregarEquipos = async (req, res) => {
  const { id } = req.params; // Game ID
  const { equipos } = req.body; // Array of team IDs


  // Ensure there are exactly two teams
  if (equipos.length !== 2) {
    return res.status(400).json({ error: 'Debes agregar solo 2 equipos.' });
  }

  // Validate that the teams are not the same
  if (equipos[0] === equipos[1]) {
    return res.status(400).json({ error: 'Deben ser dos equipos diferentes' });
  }

  try {
    const juego = await Juego.findById(id);
    if (!juego) return res.status(404).json({ error: 'Juego no encontrado' });

    const equiposData = await Equipo.find({ _id: { $in: equipos } }).populate('jugadores');

    if (equiposData.length !== 2) {
      return res.status(404).json({ error: 'Uno de los equipos agregados, no fueron encontrados' });
    }

    // Add teams to the game
    juego.equipos = equipos;

    // Initialize scores and player stats
    juego.scores = equipos.map(teamId => ({ teamId, points: 0 }));

    juego.estadisticaJugadores = equiposData.flatMap(team =>
      team.jugadores.map(jugador => ({
        jugadorId: jugador._id,
        stats: {
          points: 0,
          rebounds: 0,
          assists: 0,
          steals: 0,
          blocks: 0,
          turnovers: 0,
          minutesPlayed: 0,
        },
      }))
    );

    await juego.save();
    res.json(juego);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.IniciarJuego = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the game
    const juego = await Juego.findById(id);
    if (!juego) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }

    // Check if the game is already running
    if (juego.EstaCorriendo) {
      return res.status(400).json({ error: 'El juego ya está en progreso.' });
    }

    // Set initial game conditions
    juego.EstaCorriendo = true; // Game is now running
    juego.relog = 12 * 60; // Set clock to 12 minutes (720 seconds)
    juego.UltimaActualizacion = new Date(); // Record the start time

    await juego.save();

    res.json({ message: 'El juego ha comenzado.', juego });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


