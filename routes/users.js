'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

const jwtAuth = passport.authenticate('jwt', {session: false});

const jsonParser = bodyParser.json();


// Get all
router.get('/', (req, res, next) => {

	User.find()
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			next(err)
		});

});

//////


// Post to register a new user
router.post('/', jsonParser, (req, res) => {

	let { username, password, fullname = '' } = req.body;
	// Username and password come in pre-trimmed, otherwise we throw an error
	// before this
	fullname = fullname.trim();

	return User.find({ username })
		.count()
		.then(count => {
			if (count > 0) {
				// There is an existing user with the same username
				return Promise.reject({
					code: 422,
					reason: 'ValidationError',
					message: 'Username already taken',
					location: 'username'
				});
			}
			// If there is no existing user, hash the password
			return User.hashPassword(password);
		})
		.then(hash => {
			return User.create({
				username,
				password: hash,
				fullname
			});
		})
		.then(user => {
			return res.status(201).json(user.serialize());
		})

		.catch(err => {
			console.log(err)
			// Forward validation errors on to the client, otherwise give a 500
			// error because something unexpected has happened
			if (err.reason === 'ValidationError') {
				return res.status(err.code).json(err);
			}
			res.status(500).json({ code: 500, message: 'Internal server error' });
		});
});

// PUT new style to user favorites
router.put('/style/:styleId', jwtAuth, (req, res, next) => {
  const styleId = req.params.styleId;
  User.findOneAndUpdate({'username': req.user.username}, {
    $push: { favorites: styleId }
  }, {new: true})
    .then(result => {

      if (result) {
        res.json(result);
      } else {
        next();
      }
    }).catch(err => {
      console.error(err);
      next(err);
    });

});



module.exports = router;