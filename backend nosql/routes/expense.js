const express = require('express');
const expenseController = require('../controllers/expense');
const isauthenticated = require('../middleware/checker');
const router = express.Router();

router.post('/expense/addexpense',isauthenticated.authenticate,expenseController.addexpense);


router.get('/expense/getexpense', isauthenticated.authenticate, expenseController.getexpense);
module.exports = router;