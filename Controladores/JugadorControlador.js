const Jugador = require('../Modelos/Jugador');

exports.VerJugadores = async (req, res) => {
  try {
    const Jugadores = await Jugador.find().populate('Equipo', 'nombre');
    res.json(Jugadores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.crearJugador = async (req, res) => {
    const { nombre, numero, Equipo } = req.body;
  
    try {
      const jugador = new Jugador({ nombre, numero, Equipo });
      await jugador.save();
      res.status(201).json(jugador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  