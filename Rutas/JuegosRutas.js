const express = require('express');
const userController = require('../Controladores/JuegosControlados');

const router = express.Router();

router.route('/').get(userController.VerJuegos)


router.route('/').post(userController.CrearJuego)

router.route('/:id').delete(userController.EliminarJuego)

router.route('/:id/add-teams').post(userController.AgregarEquipos)


router.route('/:id/iniciarJuego').post(userController.IniciarJuego)





module.exports = router;
