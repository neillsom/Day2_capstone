'use strict';

// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const passport = require('passport');

// test getuserdashboard import for jwtauth
// const jwtAuth = passport.authenticate('jwt', { session: false });

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect, dbGet } = require('./db-mongoose');

// const { localStrategy, jwtStrategy } = require('./auth/strategies');

const stylesRouter = require('./routes/styles');
// const usersRouter = require('./routes/users');
// const authRouter = require('./auth/router');

// Utilize the given `strategy`
// passport.use(localStrategy);
// passport.use(jwtStrategy);

// Create an Express application
const app = express();


app.use(
	morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
		skip: (req, res) => process.env.NODE_ENV === 'test'
	})
);

app.use(cors({
	origin: CLIENT_ORIGIN
}));

app.use('/styles', stylesRouter);
// app.use('/users', usersRouter);
// app.use('/auth', authRouter);

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

console.log(`DB URI: ${dbGet().connection.host}:${dbGet().connection.port}`);

module.exports = { app };