const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { createSecretKey } = require("crypto");

console.log(__dirname);
console.log(path.join(__dirname, "../public"));

const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
const app = express();
const port = 3000;

//setup handlebars Engine and views location
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//Setup Static directory to seve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
	res.render("index", {
		title: "Weatherr App",
		name: "MOha Ghaly",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		title: "About Me",
		name: "Mahamiho",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		helpText: "Help Text will be Here",
		title: "Help",
		name: "Meme",
	});
});

//app.com/weather
app.get("/Weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: "You must provide a valid address",
		});
	}
	geocode(
		req.query.address,
		(error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({ error: error });
			}

			forecast(latitude, longitude, (error, forecastData) => {
				if (error) {
					return console.log(error);
				}
				res.send({
					forecast: forecastData,
					location: location,
					address: req.query.address,
				});
				// console.log(location);
				// console.log(forecastData);
			});
		}
	);
});

// app.get("", (req, res) => {});

app.get("/products", (req, res) => {
	// console.log(req.query);
	if (!req.query.search) {
		return res.send({
			error: "you must provide a search term",
		});
	}
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404page", {
		title: "Error Article Name",
		errorText: "Help Article Not found!",
		name: "DODO",
	});
});
app.get("*", (req, res) => {
	res.render("404page", {
		title: "ERROR PAGE",
		errorText: "My 404 Page!",
		name: "DEDA",
	});
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
