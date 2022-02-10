const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database/database'); //cambiar la base de datos
const helpers = require('./helpers');

//Signup
passport.use(
    'local.signup',
    new LocalStrategy(
        {
            usernameField: 'user_email',
            passwordField: 'user_password',
            passReqToCallback: true,
        },
        async (req, user_email, user_password, done) => {

            //Armar el usuario que se va a insertar en la BD
            const { user_first_name, user_last_name, user_identification_document } = req.body;

            const newUser = {
                user_email,
                user_password,
                user_first_name,
                user_last_name,
                user_identification_document,
            };

            //Verificar que el usuario no exista para insertarlo en la BD
            const userExists = await pool.query('SELECT * FROM USERS WHERE user_email = ?', [newUser.user_email]);
            
            if(userExists.length == 0){

                //Si el usuario no existe, se encripta la contraseña y se guarda en la BD
                newUser.user_password = await helpers.encryptPassword(newUser.user_password);
                await pool.query('INSERT INTO USERS SET ?', [newUser]); 

                return done(null, newUser);

            }else{

                //Si el usuario existe, envía un emnsaje de error
                return done(null, false, req.flash('message', `ERROR: Email ${newUser.user_email} is already taken`));

            }

        }
    )
);

// Login
passport.use('local.login', new LocalStrategy({
    usernameField: 'user_email',
    passwordField: 'user_password',
    passReqToCallback: true,
}, async (req, user_email, user_password, done) => {

    //Comprobar que exista el usuario en la BD
    const userExist_consult = await pool.query('SELECT * FROM USERS WHERE user_email = ?', [user_email]);
    
    if(userExist_consult.length > 0){

        const user = userExist_consult[0]; 
        const passwordIsValid = await helpers.matchPassword(user_password, user.user_password);

        if(passwordIsValid){
            done(null, user); 
        }else{
            done(null, false, req.flash('message','ERROR: Incorrect password')); 
        }

    }else{
        return done(null, false, req.flash('message','ERROR: User doesn´t exists'));
    }
    
})); 


// #############33
// DESERLIALIZE AND SERIELIZE USERS

passport.serializeUser((user, done) => {
    done(null, user.user_email);
});

passport.deserializeUser(async (user_email, done) => {
    const rows = await pool.query('SELECT * FROM USERS WHERE user_email = ?', [user_email]);
    done(null, rows[0]);
}); 