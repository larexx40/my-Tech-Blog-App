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
        //proceed to verify if email exist in db
        next();
    }
      
}

exports.verifyEmailExist= (req, res, next)=>{

    //to check for duplicate email before saving to db 
    console.log('Check if user/email exist');
    const email = req.body.email;
    const errors = [];
    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, results) => {
            if (results.length > 0) {
                errors.push('Failed to register user \n ' + email + ' aleady exist');
                res.render('signup.ejs', { errors: errors });
            } else {
                //proceed to hash password
                next();
            }
        }
    );
}



exports.hashPassword = (req, res, next) => {
    console.log('Encrypt password and Sign up');
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
    const password = req.body.password;
    const errors =[]
    if(email === ''){
        errors.push('Username is Empty');
    }
    if(password===''){
        errors.push('Password is empty');
    }
    

    //print out error warning
    if(errors.length>0){
        errors.forEach(error =>{
            console.log(error);
        })
        res.render('login.ejs', {errors: errors})
    }else{
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
                        errors.push("incorrect password");
                        res.render('login.ejs', {errors: errors})
                    }
                });
                } else {
                    errors.push("Incorrect email/user not found")
                    res.render('login.ejs', {errors: errors});
                }
            }
        );
    
    }
}



