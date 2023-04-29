const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiController');

router.route('/personnages')
    .get(apiController.index)
    .post(apiController.store)
    .put(apiController.update)
    .delete(apiController.delete);

router.route('/personnage')
    .get(apiController.show);

module.exports = router;