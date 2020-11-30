const express = require('express');
const router = express.Router();

const dashboardController = require('../controllers/dashboard_controller');
const cashController = require('../controllers/cash_controller');

router.get('/', dashboardController.index);
router.get('/dashboard', dashboardController.index);

router.get('/cash-in', cashController.index);
router.get('/cash-out', cashController.cashOut);

module.exports = router;
