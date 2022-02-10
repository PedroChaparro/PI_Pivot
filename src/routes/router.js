const express = require('express');
const router = express.Router();
const pool = require('../database/database');
const passport = require('passport');

router.get('/login', async (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/signup',
    failureRedirect: '/login',
})); 

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
})); 

module.exports = router;
