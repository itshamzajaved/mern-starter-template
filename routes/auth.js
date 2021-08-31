const express = require('express');
// controllers
const auth = require('../controllers/auth.js');

const router = express.Router();

router
  .post('/signup', auth.onRegisterUser)
  .post('/login', auth.onLoginUser)

module.exports = router;