const express = require('express'); 
const path = require('path');

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

// -- Routes --
const router = require('./routes/router');
app.use('/', router);  

// -- Starting the server --
app.listen(app.get('port'), ()=> {
    console.log(`Server listening on port ${app.get('port')}`);
});