const express = require('express');
const os = require('os');
const hbs = require('hbs');
const version = require('./package.json');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//helper function for hbs files
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
	return text.toUpperCase();
});
hbs.registerHelper('showUserInfo', () => {
	return os.userInfo().username;
});

hbs.registerHelper('showVersion', () => {
	return version.version;
});

app.use((req, res, next) => {
	const now = new Date().toString(),
		log = `${now}: ${req.method} ${req.url} ${req.hostname}`;
	console.log(log);
	next();
});
//middelwear
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});
app.get('/projects', (req, res) => {
	res.render('projects.hbs', { pageTitle: 'About Page' });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request',
	});
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
