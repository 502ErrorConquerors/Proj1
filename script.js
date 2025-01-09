// const { _setMinAndMaxByKey } = require("chart.js/helpers");

// const { Chart } = require("chart.js");
// const { renderText } = require("chart.js/helpers");

// const { color } = require("chart.js/helpers");






const timeUrl = "https://timeapi.io/api/time/current/coordinate?";

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

		

		var existingChart = Chart.getChart('myChart');
		if (existingChart) {
			existingChart.destroy();
		}
	}

}
);
const cityname = searchInput.value;





// Define an async function to fetch weather data
async function fetchWeatherData(cityname) {

	


	try {

		const liveCityName = document.getElementsByClassName("livecitydata");
		liveCityName[0].innerHTML = `<h4>${cityname.toUpperCase()}</h4>`;



		const response = await fetch(url + cityname + `&appid=${apiKey}` + `&units=metric`);
		const result = await response.json();  // Parse response as JSON
		console.log(result);
		var lon = result.coord.lon;
		var lat = result.coord.lat;
		
		time(lat,lon);


		//Left side temperature data
		const livetemp = document.getElementsByClassName("livetempdata")
		livetemp[0].innerHTML= `<p>${parseInt(result.main.temp)}°</p>`


		const livecloud = document.getElementsByClassName("livecloudcondition")
		livecloud[0].innerHTML = `<p>${result.weather[0].description.toUpperCase()}</p>`


		const temp_max = document.getElementsByClassName("livetemp_max")
		temp_max[0].innerHTML = `<p>Max:${result.main.temp_max}</p>`

		const temp_min = document.getElementsByClassName("livetemp_min")
		temp_min[0].innerHTML = `<p>Min:${result.main.temp_min}</p>`

		


		//right side temperature data
		const livehumidity= document.getElementsByClassName("stat-humidity")
		livehumidity[0].innerHTML = `<div>${result.main.humidity}</div>`

		const livewind = document.getElementsByClassName("stat-wind")
		livewind[0].innerHTML = `<div>${result.wind.speed}</div>`

		const liveFeelsLike = document.getElementsByClassName("stat-feelslike")
		liveFeelsLike[0].innerHTML = `<div>${result.main.feels_like}</div>`

		const liverainfall = document.getElementsByClassName("stat-rainfall")
		liverainfall[0].innerHTML = `<div>${result.weather[0].icon}</div>`
		


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
async function time(lat, lon) {
	const response = await fetch(timeUrl + `latitude=` + lat + `&longitude=` + lon );
	let timedata = await response.json();
	console.log(timedata);

	const livedate = document.getElementsByClassName("livedaydate")
		const datelocale = timedata.date
		 livedate[0].innerHTML = `<span>${datelocale}</span>`

	const liveday = document.getElementsByClassName("liveday")
	const daylocale = timedata.dayOfWeek
	liveday[0].innerHTML=`<span>${daylocale},</span>`

	const livetime = document.getElementsByClassName("livetime")
	const timelocale = timedata.time
	livetime[0].innerHTML= `<span>${timelocale}</span>`

}
// Call the function
fetchWeatherData();
// console.log(lat)
// console.log(lon)


// //copied code
// const apiKey1 = "bca34017f9a9fab4408fd5b6e3ed6e05";
// const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?";


async function checkWeather(lat, lon) {
	const response = await fetch(apiUrl + `lat=` + lat + `&lon=` + lon + `&appid=${apiKey}` + `&units=metric`);
	let data = await response.json();
	console.log(data);
	var dataList = data.list;
	console.log(dataList);

	const dt_txt_all = dataList.map((obj) => obj.dt_txt)
	function fiveDayForecast(dt_txt_all) {
		const dailyWeather = data.list.filter((dt_txt_all) => dt_txt_all.dt_txt.includes('00:00:00'))
		console.log(dailyWeather)
		const temp1 = dailyWeather.map(obj => obj.main.temp);
		console.log(temp1);
		const dt_txt5day = dailyWeather.map(obj => obj.dt_txt);
		console.log(dt_txt5day);
		let newdt_txt5day = [];
		for(let i =0 ;i<5;i++){
			let slicetxt = dt_txt5day[i];
			let finaltxt = slicetxt.slice(0,10);
			newdt_txt5day.push(finaltxt);
		}
		console.log(newdt_txt5day);


		charts(newdt_txt5day, temp1);

		// removeChart(myChart);
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



function charts(newdt_txt5day, temp1) {

	const ctx = document.getElementById('myChart');

	const myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: newdt_txt5day,
			datasets: [{
				label: 'temperature',
				data: temp1,
				borderWidth: 1,
				borderColor: 'white',
				backgroundColor: 'white',
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			scales: {
				y: {
					beginAtZero: false,
					grid: {
						color: "black"
					},
					border: {
						color: "black"
					},
					ticks: {
						color: "white"
					}
				},
				x: {
					grid: {
						color: "black"
					},
					border: {
						color: "black"
					},
					ticks: {
						color: "white"
					}

				}


			}
		}

	});


}
const toggleBtn = document.getElementById("theme-switch");
toggleBtn.addEventListener("click", () => {
	var check = Chart.getChart('myChart');
	changechartColor(check);
});
 function changechartColor(Chart){
	if(Chart.data.datasets[0].borderColor === "white"){
		
	    Chart.options.scales.y.ticks.color = "black";
        Chart.options.scales.x.ticks.color = "black";
		Chart.data.datasets[0].borderColor = "black";
		Chart.data.datasets[0].backgroundColor = "black";
	    Chart.update();
	}else{
	    Chart.options.scales.y.ticks.color = "white";
        Chart.options.scales.x.ticks.color = "white";
		Chart.data.datasets[0].borderColor = "white";
		Chart.data.datasets[0].backgroundColor = "white";
	    Chart.update();
	}
	    
 }

//https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=bca34017f9a9fab4408fd5b6e3ed6e05



// CELSIUS TO FAHRENHEIT CONVERSION :-
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function fahrenheitToCelsius(fahrenheit){
	return ((fahrenheit-32)*5/9);
}


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






// https://api.api-ninjas.com/v1/worldtime?city=london
//kq9W4Udu/3Yvc4/6pxb9uQ==JSlcX34R8ftbYf7z