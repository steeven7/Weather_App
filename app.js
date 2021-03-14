//Get elements
const weather = document.querySelector("#desc");
const temp = document.querySelector(".temp");
const search = document.querySelector(".search input");
const country = document.querySelector(".country");
const icon = document.querySelector(".weather-icon");
const city = document.querySelector(".city")
const date = document.querySelector(".date"); 
const forecast = {};

//Get city value
search.addEventListener("keypress", searchCity);
function searchCity(e) {
	if (e.key === "Enter") {
		const location = search.value;
		getCity(location);
	}
}

//Insert city value into api
function getCity(location) {
	const key = "41a33c1f6739002732956da85ecbd727";
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;
	if (location === "") alert("enter a city");

	axios
		.get(`${url}`)
		.then(({ data }) => {
			console.log(data);
			getData(data);
		})
		.catch(function (error) {
			console.log(error);
		})
		.then(() => getWeather());

	//Get api Data
	function getData(data) {
		forecast.temperature = Math.floor(data.main.temp);
		forecast.description = data.weather[0].description;
		forecast.city = data.name;
		forecast.country = data.sys.country;
		forecast.image = data.weather[0].icon;
	}

	//Insert data into UI
	function getWeather() {
		city.innerHTML = `${forecast.city},` + `${forecast.country}`;
		weather.innerHTML = `${forecast.description}`;
		temp.innerHTML = `Current Temp:${forecast.temperature}&degC`;
		icon.innerHTML = `<img src="assets/${forecast.image}.png">`;

		search.value = '';
	}
}
