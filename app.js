const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bcrypt = require('bcrypt');
const auth = require('./authentication');
const connection = require('./database')
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));



app.use(
  session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  if (req.session.userId === undefined) {
    res.locals.username = 'Guest';
    res.locals.isLoggedIn = false;
  } else {
    res.locals.username = req.session.username;
    res.locals.isLoggedIn = true;
  }
  next();
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/list', (req, res) => {
  connection.query(
    'SELECT * FROM articles',
    (error, results) => {
      res.render('list.ejs', { articles: results });
    }
  );
});

app.get('/article/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM articles WHERE id = ?',
    [id],
    (error, results) => {
      res.render('article.ejs', { article: results[0] });
    }
  );
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs', { errors: [] });
});

app.post('/signup', 
  (req, res, next) => {
    console.log('Empty input value check');
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
      next();
    }
  },
  (req, res, next) => {
    //verify email
    console.log('Duplicate emails check');
    const email = req.body.email;
    const errors = [];
    connection.query(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (error, results) => {
          if (results.length > 0) {
            errors.push('Failed to register user');
            res.render('signup.ejs', { errors: errors });
          } else {
            next();
          }
        }
      );    
  },
  (req, res) => {
    //hash pasword and save
    console.log('Sign up');
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 10, (error, hash) => {
      db.connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hash],
        (error, results) => {
          req.session.userId = results.insertId;
          req.session.username = username;
          res.redirect('/list');
        }
      );
    });
  }
);

app.get('/login', (req, res) => {
  res.render('login.ejs', {errors: []});
});

app.post('/login', auth.verifyLogin, (req, res) => {
  res.redirect('/list');
});

app.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    res.redirect('/list');
  });
});

app.listen(3000);
