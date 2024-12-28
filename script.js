const apiKey="7038c275b759dfb5e3159826d0c38a3f";
const url = 'https://api.openweathermap.org/data/2.5/weather?&q=';
const options = {
	method: 'GET',
	headers: {
		'Accept': 'application/json'  // Optional, but you can include this to specify the response format
	}
};
const searchInput=document.getElementById("searchinput");
searchInput.addEventListener("keypress",function(event){
    if(event.key==='Enter'){
        fetchWeatherData(searchInput.value);
}  
}
);
const cityname=searchInput.value;
// Define an async function to fetch weather data
async function fetchWeatherData(cityname) {
	try {
		const response = await fetch(url + cityname + `&appid=${apiKey}`);
		const result = await response.json();  // Parse response as JSON
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

// Call the function
fetchWeatherData();




// //copied code
// const apiKey="7038c275b759dfb5e3159826d0c38a3f";
// const apiUrl="https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
// async function checkWeather(city){
//     const response =await fetch(apiUrl + city +  `&appid=${apiKey}`);

//     if(response.status==404){
//         document.querySelector(".error").style.display="block";
//         document.querySelector(".weather").style.display="none";
//     }
//     else{
//         var data= await response.json();
//     console.log(data);
//     }
// }
// checkWeather("Indore");