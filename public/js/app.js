fetch("http://puzzle.mead.io/puzzle").then((response) => {
	response.json().then((data) => {
		console.log(data);
	});
});

const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = searchInput.value;
	messageOne.textContent = "loading....";
	messageTwo.textContent = "";
	// console.log(location);
	//Start to fetch when form is submitted:
	fetch(`http://localhost:3000/weather?address=${location}`).then(
		(response) => {
			response.json().then((data) => {
				if (data.error) {
					messageOne.textContent = data.error;
				} else {
					messageOne.textContent = data.location;
					messageTwo.textContent = data.forecast;
				}
			});
		}
	);
});
