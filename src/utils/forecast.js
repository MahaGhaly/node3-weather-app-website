const request = require("postman-request");

// const forecast = (latitude, longitude, callback) => {
// 	const url = `http://api.weatherstack.com/current?access_key=b8fac8d179fd147a766873d17af06c78&query=${latitude},${longitude}&units=m`;

// 	request({ url: url, json: true }, (error, response) => {
// 		if (error) {
// 			callback("unable to connect to internet!");
// 		} else if (response.body.error) {
// 			callback("Unable to find location!!!!");
// 		} else {
// 			callback(
// 				undefined,
// 				`${response.body.current.weather_descriptions}, It is currently ${response.body.current.temperature}, and it feels like ${response.body.current.feelslike}. There is a ${response.body.current.precip} % chance of Rain. `
// 			);
// 		}
// 	});
// };

// module.exports = forecast;

// __________________________________________________________________________________
// ######   Same Function above but using ES6 Using shorthand and Destructuring:
// __________________________________________________________________________________

const forecast = (latitude, longitude, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=b8fac8d179fd147a766873d17af06c78&query=${latitude},${longitude}&units=m`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("unable to connect to internet!");
		} else if (body.error) {
			callback("Unable to find location!!!!");
		} else {
			callback(
				undefined,
				`${body.current.weather_descriptions}, It is currently ${body.current.temperature}, and it feels like ${body.current.feelslike}. There is a ${body.current.precip} % chance of Rain. `
			);
		}
	});
};

module.exports = forecast;
