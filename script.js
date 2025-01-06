// const { _setMinAndMaxByKey } = require("chart.js/helpers");

// const { Chart } = require("chart.js");
// const { renderText } = require("chart.js/helpers");

// const { color } = require("chart.js/helpers");









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
		if (response.ok) {
			console.log('Promise resolved');
		} else {
			//failed HTTP codes
			if (response.status === 400) throw new Error('Empty');
			if (response.status === 404) throw new Error('404, Not found');
			if (response.status === 500) throw new Error('500, internal server error');
			// For any other server error
			throw new Error(response.status);
		}
	} catch (error) {
		console.error('Fetch', error);

	}
}

// Call the function
fetchWeatherData();
console.log(lat)
console.log(lon)


// //copied code
// const apiKey1 = "bca34017f9a9fab4408fd5b6e3ed6e05";
// const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";


async function checkWeather(lat, lon) {
		const response = await fetch(apiUrl + `lat=` + lat + `&lon=` + lon + `&appid=${apiKey}` + `&units=metric`);
		let data = await response.json();
		console.log(data);
		var dataList = data.list;
		console.log(dataList);

		const dt_txt_all = dataList.map((obj)=>obj.dt_txt)
		function fiveDayForecast(dt_txt_all) {
			const dailyWeather = data.list.filter((dt_txt_all)=>dt_txt_all.dt_txt.includes('12:00:00'))
			console.log(dailyWeather)
			const temp1 = dailyWeather.map(obj => obj.main.temp);
		console.log(temp1);
		const dt_txt5day = dailyWeather.map(obj => obj.dt_txt);
		console.log(dt_txt5day);
		

		charts(dt_txt5day,temp1);
		}
		fiveDayForecast(dt_txt_all);
		// var map= new Map(list);
		// console.log(map.get('main.temp'));
		// const temp1 = list.map(obj => obj.main.temp);
		// console.log(temp1);
		// const dt_txt = list.map(obj => obj.dt_txt);
		// console.log(dt_txt);
		// const date= new Date(dt).toLocaleString;
		// console.log(date);
		// let localeDates = dt.map(date => new Date(date).toLocaleString());
		// console.log(localeDates);



		// if(cityname===""){
		// 	myChart.destroy();
		// }
	}
function charts(dt_txt5day,temp1){
		
		const ctx = document.getElementById('myChart');

		const myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: dt_txt5day,
				datasets: [{
					label: 'temprature',
					data: temp1,
					borderWidth: 1,
					borderColor: 'white',
					backgroundColor: 'white',
					color: 'black',	
				}]
			},
			options: {
				responsive : true,
				maintainAspectRatio : true,
				scales: {
					y: {
						beginAtZero: false,
						grid : {
							color : "black"
						},
						border : {
							color : "black"
						},
						ticks : {
							color : "white"
						}
					},
					x : {
						grid : {
							color : "black"
						},
						border : {
							color : "black"
						},
						ticks : {
							color : "white"
						}

					}
				}
			}
		});
		// myChart.destroy();

		
}




//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=bca34017f9a9fab4408fd5b6e3ed6e05



// CELSIUS TO FAHRENHEIT CONVERSION :-
// function celsiusToFahrenheit(celsius) {
//     return (celsius * 9/5) + 32;
// }
// const celsiusValue = 25; // Replace with the value you receive
// const fahrenheitValue = celsiusToFahrenheit(celsiusValue);
// console.log(`${celsiusValue}°C is equal to ${fahrenheitValue}°F`);


// CELSIUS TO FAHRENHEIT CONVERSION :-
// function celsiusToFahrenheit(celsius) {
//     return (celsius * 9 / 5) + 32;
// }

// async function convertToCelsiusAndFahrenheit(lat, lon) {
//     try {
//         const response = await fetch(apiUrl + `lat=` + lat + `&lon=` + lon + `&appid=${apiKey}` + `&units=metric`);
//         let data = await response.json();

//         var list = data.list; 
//         console.log("Forecast List:", list);

//         const tempCelsius = list.map(obj => obj.main.temp);
//         console.log("Temperatures in Celsius:", tempCelsius);

//         const tempFahrenheit = tempCelsius.map(celsiusToFahrenheit);
//         console.log("Temperatures in Fahrenheit:", tempFahrenheit);

//         const dt_txt = list.map(obj => obj.dt_txt);
//         dt_txt.forEach((time, index) => {
//             console.log(`At ${time}: ${tempCelsius[index]}°C = ${tempFahrenheit[index]}°F`);
//         });
//     } catch (error) {
//         console.error('Error converting temperatures:', error);
//     }
// }

// convertToCelsiusAndFahrenheit(lat, lon);

bu
