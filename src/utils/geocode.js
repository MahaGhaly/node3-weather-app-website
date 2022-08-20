const request = require("postman-request");

// const geocode = (address, callback) => {
// 	// encodeURIComponent(address) //if some one searchs for a location has special character
// 	const url = `http://api.positionstack.com/v1/forward?access_key=710f3613290f415093fa0dd5b3323b11&query=${encodeURIComponent(
// 		address
// 	)}&limit=1`;

// 	request({ url: url, json: true }, (error, response) => {
// 		if (error) {
// 			callback("position api unable to connect to internet!");
// 		} else if (response.body.error) {
// 			callback("position api Unable to find location!!!!");
// 		} else {
// 			callback(undefined, {
// 				latitude: response.body.data[0].latitude,
// 				longitude: response.body.data[0].longitude,
// 				location: response.body.data[0].label,
// 			});
// 		}
// 	});
// };

// module.exports = geocode;

// __________________________________________________________________________________
// ######   Same Function above but using ES6 Using shorthand and Destructuring:
// __________________________________________________________________________________

const geocode = (address, callback) => {
	// encodeURIComponent(address) //if some one searchs for a location has special character
	const url = `http://api.positionstack.com/v1/forward?access_key=710f3613290f415093fa0dd5b3323b11&query=${encodeURIComponent(
		address
	)}&limit=1`;

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback("position api unable to connect to internet!");
		} else if (body.error) {
			callback("position api Unable to find location!!!!");
		} else {
			callback(undefined, {
				latitude: body.data[0].latitude,
				longitude: body.data[0].longitude,
				location: body.data[0].label,
			});
		}
	});
};

module.exports = geocode;
