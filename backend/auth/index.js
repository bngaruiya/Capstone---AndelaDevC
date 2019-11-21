const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../db/userQueries');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: '👍'
  });
});

function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPassword =
    typeof user.password == 'string' &&
    user.password.trim() != '' &&
    user.password.trim().length >= 6;

  return validEmail && validPassword;
}

router.post('/create-user', (req, res, next) => {
  if (validUser(req.body)) {
    User.getOneByEmail(req.body.email).then(user => {
      console.log('user', user);
      // if user is not found, i.e email is unique
      if (!user) {
        // hash the password
        bcrypt.hash(req.body.password, 10).then(hash => {
          // insert user into the database
          const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            gender: req.body.gender,
            jobRole: req.body.jobRole,
            department: req.body.department,
            address: req.body.address
          };
          User.create(user).then(id => {
            res.json({
              id,
              message: '✔'
            });
          });
        });
      } else {
        // email already in use
        next(
          new Error(
            'There exists a user with that email. Choose another email address!!'
          )
        );
      }
    });
  } else {
    next(new Error('Invalid User'));
  }
});

router.post('/signin', (req, res, next) => {
  if (validUser(req.body)) {
    // Check to see if user is in the Database
    User.getOneByEmail(req.body.email).then(user => {
      console.log('user', user);
      if (user) {
        // Compare password with hashed password
        bcrypt.compare(req.body.password, user.password).then(result => {
          // if the passwords matched...
          if (result) {
            res.json({
              result,
              message: 'Logged in!! 🔓'
            });
          } else {
            next(new Error('Invalid login details!!'));
          }
        });
      } else {
        next(new Error('User does not exist. Contact Admin!'));
      }
    });
  } else {
    next(
      new Error(
        'Invalid login. Enter a valid Email and Password. Password must be six characters or more.'
      )
    );
  }
});

module.exports = router;
