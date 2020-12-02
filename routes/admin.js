const express = require('express');
const dashboardController = require('../controllers/dashboard_controller');
const cashController = require('../controllers/cash_controller');
const reportController = require('../controllers/report_controller');

const router = express.Router();

router.get('/', dashboardController.index);
router.get('/dashboard', dashboardController.index);

router.get('/cash-in', cashController.index);
router.get('/cash-in/:id', cashController.deleteCashIn);
router.post('/cash-in', cashController.addCashIn);

router.get('/cash-out', cashController.cashOut);

router.get('/report/cash-summary', reportController.cashSummary);

module.exports = router;
