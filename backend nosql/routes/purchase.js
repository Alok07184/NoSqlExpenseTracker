const express = require('express');
const purchaseController = require('../controllers/purchase');
const isauthenticated = require('../middleware/checker');

const router = express.Router();

router.get('/premiummembership',isauthenticated.authenticate,purchaseController.purchasepremium);

//update premium membership
router.post('/updatepremiumstatus',isauthenticated.authenticate,purchaseController.updateTransaction);


module.exports = router;