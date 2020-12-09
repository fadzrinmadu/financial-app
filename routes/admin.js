const express = require('express');
const dashboardController = require('../controllers/dashboard_controller');
const cashController = require('../controllers/cash_controller');
const summaryController = require('../controllers/summary_controller');
const profileController = require('../controllers/profile_controller');

const router = express.Router();

router.get('/', dashboardController.index);
router.get('/dashboard', dashboardController.index);

router.get('/cash-in', cashController.index);
router.get('/cash-in/:id', cashController.deleteCashIn);
router.post('/cash-in', cashController.addCashIn);
router.put('/cash-in', cashController.editCashIn);

router.get('/cash-out', cashController.cashOut);
router.get('/cash-out/:id', cashController.deleteCashOut);
router.post('/cash-out', cashController.addCashOut);
router.put('/cash-out', cashController.editCashOut);

router.get('/summary', summaryController.cashSummary);
router.get('/summary/report', summaryController.cashSummaryReport);

router.get('/profile', profileController.index);

module.exports = router;
