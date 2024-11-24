const express = require('express');
const router = express.Router();
const playerController = require('../Controladores/JugadorControlador');

// Get all players
router.get('/', playerController.VerJugadores);

/* // Get a single player
router.get('/:id', playerController.getPlayer); */

// Create a new player
router.post('/', playerController.crearJugador);

/* // Update a player
router.put('/:id', playerController.updatePlayer);

// Delete a player
router.delete('/:id', playerController.deletePlayer); */

module.exports = router;
