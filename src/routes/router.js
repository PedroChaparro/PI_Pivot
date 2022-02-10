const express = require('express');
const router = express.Router();
const pool = require('../database/database');
const passport = require('passport');

router.get('/', (req, res) => {
    res.render('welcome'); 
}); 

router.get('/logout', (req, res) => {
    req.logOut(); //Cierra la sesión
    res.redirect('/login'); //Lo redirecciona a iniciar sesión
}); 

router.get('/login', async (req, res) => {
    res.render('login');
});

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
})); 

router.get('/signup', async (req, res) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
})); 

module.exports = router;
