'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Style = require('../models/style');

const router = express.Router();

// Get all
router.get('/', (req, res, next) => {

	Style.find()
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			next(err);
		});

});

module.exports = router;