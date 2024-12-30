// const { _setMinAndMaxByKey } = require("chart.js/helpers");









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
		const response = await fetch(url + cityname + `&appid=${apiKey}` + `&units=metric`);
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
	const response = await fetch(apiUrl + `lat=` + lat + `&lon=` + lon + `&appid=${apiKey}` + `&units=metric`);

	if (response.status == 404) {
		document.querySelector(".error").style.display = "block";
		document.querySelector(".weather").style.display = "none";
	}
	else {
		let data = await response.json();
		console.log(data);
		var list = data.list;
		console.log(list);
		// var map= new Map(list);
		// console.log(map.get('main.temp'));
		const temp1 = list.map(obj => obj.main.temp);
		console.log(temp1);
		const dt_txt = list.map(obj => obj.dt_txt);
		console.log(dt_txt);
		// const date= new Date(dt).toLocaleString;
		// console.log(date);
		// let localeDates = dt.map(date => new Date(date).toLocaleString());
		// console.log(localeDates);




		const ctx = document.getElementById('myChart');

		new Chart(ctx, {
			type: 'line',
			data: {
				labels: [dt_txt],
				datasets: [{
					label: '# of Votes',
					data: [temp1],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: false
					}
				}
			}
		});




	}
}




//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=bca34017f9a9fab4408fd5b6e3ed6e05