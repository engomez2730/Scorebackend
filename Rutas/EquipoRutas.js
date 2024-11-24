const express = require('express');
const router = express.Router();
const teamController = require('../Controladores/EquiposControladores');

// Obtener todos los equipos
router.get('/', teamController.VerEquipos);


 router.get('/:id', teamController.verEquipo); 

// Crear un nuevo equipo
router.post('/', teamController.CrearEquipo);


 router.put('/:id', teamController.actualizarEquipo);


router.delete('/:id', teamController.eliminarEquipo);


router.post('/:id/add-player', teamController.añadirJugadorEquipo);


router.post('/:id/remove-player', teamController.eliminarJugadorEquipo); 

module.exports = router;
