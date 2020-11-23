var express = require('express');
var router = express.Router();

const authController = require('../controllers/auth_controller');

router.get('/', authController.viewLogin);

module.exports = router;
