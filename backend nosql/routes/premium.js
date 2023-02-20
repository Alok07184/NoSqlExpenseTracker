const express = require('express');
const isauthenticated = require('../middleware/checker');
const premiumController = require('../controllers/premium');

const router = express.Router();

router.get('/premium/showleaderboard', isauthenticated.authenticate, premiumController.getUserLeaderboard);


module.exports = router;