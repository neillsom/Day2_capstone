'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Style = require('../models/style');

const router = express.Router();

function shuffleResults(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
	}
}

// Get all
router.get('/', (req, res, next) => {
	Style.find()
		.then(results => {
			shuffleResults(results);
			res.json(results);
		})
		.catch(err => {
			next(err);
		});

});

module.exports = router;