const express = require('express');
const router = express.Router();
const apiController = require('../controllers/ApiController');
router.get('/', apiController.index);
module.exports = router;