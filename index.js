'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const app = express();

app.use(
	morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
		skip: (req, res) => process.env.NODE_ENV === 'test'
	})
);

app.use(
	cors({
		origin: CLIENT_ORIGIN
	})
);

app.get('/api/styles', (req, res) => {
	const styles = [
		{name: 'Long Outward Curls With One Side Tucked Behind Ear'},
		{name: 'Highlighted Messy Updo With Long Side-Swept Bang'},
		{name: 'Long Layered Bob With Fringes And Razored Ends'},
		{name: 'Smooth Semi-High Ponytail With Hair Wrap'},
		{name: 'Messy Low Side Bun With Soft Side-Swept Bang'}
	];
	res.json(styles);
});


function runServer(port = PORT) {
	const server = app
		.listen(port, () => {
			console.info(`App listening on port ${server.address().port}`);
		})
		.on('error', err => {
			console.error('Express failed to start');
			console.error(err);
		});
}

if (require.main === module) {
	dbConnect();
	runServer();
}

module.exports = { app };