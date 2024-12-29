const apiKey = "7038c275b759dfb5e3159826d0c38a3f";
const url = 'https://api.openweathermap.org/data/2.5/weather?&q=';
const apiKey1 = "bca34017f9a9fab4408fd5b6e3ed6e05";
const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
const options = {
	method: 'GET',
	headers: {
		'Accept': 'application/json'  // Optional, but you can include this to specify the response format
	}
};
const searchInput = document.getElementById("searchinput");
searchInput.addEventListener("keypress", function (event) {
	if (event.key === 'Enter') {
		fetchWeatherData(searchInput.value);
	}
}
);
const cityname = searchInput.value;
// Define an async function to fetch weather data
async function fetchWeatherData(cityname) {
	try {
		const response = await fetch(url + cityname + `&appid=${apiKey}`);
		const result = await response.json();  // Parse response as JSON
		console.log(result);
		var lon = result.coord.lon;
		var lat = result.coord.lat;
		console.log(lat)
		console.log(lon)
		checkWeather(lat, lon);
	} catch (error) {
		console.error(error);
	}
};

// Call the function
fetchWeatherData();
console.log(lat)
console.log(lon)


// //copied code
// const apiKey1 = "bca34017f9a9fab4408fd5b6e3ed6e05";
// const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";
async function checkWeather(lat, lon) {
	const response = await fetch(apiUrl + `lat=` + lat + `&lon=` + lon + `&appid=${apiKey}`);

	if (response.status == 404) {
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display = "none";
	}
	else {
		let data = await response.json();
		console.log(data);
	}
}




//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=bca34017f9a9fab4408fd5b6e3ed6e05