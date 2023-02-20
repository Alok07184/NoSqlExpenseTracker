const express = require('express');

const authController = require('../controllers/auth');


const router = express.Router();


//sign up
router.post('/api/user/signup',authController.signup);
//sign in 
router.post('/api/user/login', authController.signin);


module.exports = router;