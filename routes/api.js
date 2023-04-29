const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiController');

router.route('/personnages')
    .get(apiController.index);

router.route('/personnage')
    .post(apiController.store)
    .put(apiController.update);

router.route('/personnage/:id')
    .get(apiController.show)
    .delete(apiController.delete);

module.exports = router;