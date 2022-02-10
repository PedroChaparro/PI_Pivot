const express = require('express');
const router = express.Router();
const pool = require('../database/database');

router.get('/login', async (req, res) => {
    res.render('login');
});

router.get('/signup', async (req, res) => {
    res.render('signup');
});

module.exports = router;
