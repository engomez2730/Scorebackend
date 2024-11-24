const Equipo = require('../Modelos/Equipo');

exports.VerEquipos = async (req, res) => {
  try {
    const equipos = await Equipo.find().populate('jugadores', 'nombre numero'); // Incluye detalles básicos de los jugadores
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.CrearEquipo = async (req, res) => {
    const { nombre, ciudad, jugadores } = req.body;
  
    try {
      const equipo = new Equipo({ nombre, ciudad, jugadores: jugadores || [] });
      await equipo.save();
      res.status(201).json(equipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 
  
  exports.verEquipo = async (req, res) => {
    const { id } = req.params;
  
    try {
      const equipo = await Equipo.findById(id).populate('players', 'name jerseyNumber');
      if (!equipo) return res.status(404).json({ error: 'equipo not found' });
      res.json(equipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
   

  exports.actualizarEquipo = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      const equipo = await Equipo.findByIdAndUpdate(id, updates, { new: true });
      if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
      res.json(equipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.eliminarEquipo = async (req, res) => {
    const { id } = req.params;
  
    try {
      const equipo = await Equipo.findByIdAndDelete(id);
      if (!equipo) return res.status(404).json({ error: 'equipo not found' });
      res.json({ message: 'equipo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.añadirJugadorEquipo = async (req, res) => {
    const { id } = req.params; 
    const { playerId } = req.body; 



  
    try {
      const equipo = await Equipo.findById(id);
      if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado' });
      if ( playerId === undefined) return res.status(404).json({ error: 'jugador no encontrado' });
  
      if (!equipo.jugadores.includes(playerId)) {
        equipo.jugadores.push(playerId);
        await equipo.save();
      }
  
      res.json(equipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  exports.eliminarJugadorEquipo = async (req, res) => {
    const { id } = req.params; // ID del equipo
    const { playerId } = req.body; // ID del jugador
  
    try {
      const equipo = await Equipo.findById(id);
      if (!equipo) return res.status(404).json({ error: 'equipo not found' });
  
      equipo.jugadores = equipo.jugadores.filter(p => p.toString() !== playerId);
      await equipo.save();
  
      res.json(equipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  