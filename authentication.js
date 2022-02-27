const bcrypt = require('bcrypt');
const mysql = require('mysql');
const connection = require('./database');

exports.verifyInput = (req, res, next)=>{
    //to validate user input
    console.log('Checking for Empty input value');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const errors = [];

    if (username === '') {
        errors.push('Username is empty');
    }
      
    if (email === '') {
        errors.push('Email is empty');
    }
      
    if (password === '') {
        errors.push('Password is empty');
    }
      
    if (errors.length > 0) {
        res.render('signup.ejs', { errors: errors });
    } else {
        //proceed to verify if email exist
        next();
    }
      
}



exports.verifyEmailExist= (req, res, next)=>{

    //to check for duplicate email
    console.log('Duplicate emails check');
    const email = req.body.email;
    const errors = [];
    db.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, results) => {
            if (results.length > 0) {
                errors.push('Failed to register user, ' + email + ' aleady exist');
                res.render('signup.ejs', { errors: errors });
            } else {
                //proceed to hash password
                next();
            }
        }
    );
}

exports.hashPassword = (req, res, next) => {
    console.log('Sign up');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 10, (error, hash) => {
      connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hash],
        (error, results) => {
            if(error){
                console.log("have Issue saving to Database");
            }
            req.session.userId = results.insertId;
            req.session.username = username;
            res.redirect('/list');
        }
      );
    });
    next();
}

exports.verifyLogin = (req, res, next)=>{
    //for login
    const email = req.body.email;
    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, results) => {
            if (results.length > 0) {
            // Define the plain constant
            const plain = req.body.password;
            
            // Define the hash constant
            const hash = results[0].password;
            
            // Add a compare method to compare the passwords
            bcrypt.compare(plain, hash, (error, isEqual)=>{
                if (isEqual){
                req.session.userId = results[0].id;
                req.session.username = results[0].username;
                next();
                }else{
                res.redirect('/login')
                }
            });
            } else {
                const errorMessages =["User does not exist"];
                res.render('login.ejs', {errorMessages: errorMessages});
            }
        }
    );
}



