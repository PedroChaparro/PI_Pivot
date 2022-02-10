const express = require('express'); 
const path = require('path');
const flash = require('connect-flash'); 
const session = require('express-session'); 


const passport = require('passport');
require('./libs/passport'); 

const app = express(); 

// -- Settings --
app.set('port', process.env.PORT || 3000); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// -- Static files route --
app.use(express.static(path.join(__dirname, 'public')));

// -- Middlewares --
app.use(
    express.urlencoded({
        extended: false,
    })
);
app.use(express.json());

app.use(session({
    secret: 'process.env.SE_SECRET',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// -- Global variables --
app.use((req, res, next) => {
    app.locals.success = req.flash('success'); 
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// -- Routes --
const router = require('./routes/router');
app.use('/', router);  

// -- Starting the server --
app.listen(app.get('port'), ()=> {
    console.log(`Server listening on port ${app.get('port')}`);
});