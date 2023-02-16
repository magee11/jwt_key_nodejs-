const express = require('express');
const mongoose = require('mongoose');
const {registeruser , loginuser,welcome} = require('../controller/Userauth')
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/register',registeruser)
router.post('/login',loginuser)
router.get('/welcome',auth,welcome)


module.exports = router;