const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');

router.get('/', adminController.index);
router.get('/dashboard', adminController.index);

module.exports = router;
