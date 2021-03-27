let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[now.getDay()];
  let currentDate = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currentMonth = months[now.getMonth()];
  let newDate = document.querySelector("h2");
  newDate.innerHTML = `${currentDay}, ${currentDate} ${currentMonth}`; 

  let currentHour = now.getHours();
  let currentMinute = now.getMinutes();
  let newHour = document.querySelector("h3");
  newHour.innerHTML = `${currentHour}:${currentMinute}`;


  let form = document.querySelector("#search-city");
  form.addEventListener("submit", handleSubmit);

  function search(city) {
    let apiKey = "bfe7323691410d91197078ee3f9cb9d8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayWeatherCondition);

  }

  
  
  function displayWeatherCondition(response) {
    console.log(response.data.name);
    document.querySelector("#city").innerHTML = response.data.name;
    
    let temperature = Math.round(response.data.main.temp);
    document.querySelector("#temperature").innerHTML= `${temperature}ºC`;
    
    let weatherStatus = document.querySelector("#weather-status");
    weatherStatus.innerHTML=`${response.data.weather[0].description}`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML=`${response.data.main.humidity}%`;

    let wind = document.querySelector("#wind");
    wind.innerHTML=`${response.data.wind.speed} km/h`;

    let pressure = document.querySelector("#pressure");
    pressure.innerHTML=`${response.data.main.pressure} hPa`;

  } 
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    search(city);  
  }
  search("Lisbon");

  
//BONUS

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "bfe7323691410d91197078ee3f9cb9d8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}


function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML= `${temperature}ºC`;
  let citySearchName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML=`${citySearchName}`;
 
  let weatherStatus = document.querySelector("#weather-status");
  weatherStatus.innerHTML=`${response.data.weather[0].description}`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML=`${response.data.main.humidity}%`;

  let wind = document.querySelector("#wind");
  wind.innerHTML=`${response.data.wind.speed} km/h`;

  let pressure = document.querySelector("#pressure");
  pressure.innerHTML=`${response.data.main.pressure} hPa`;
 
}     

let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click",getLocation);
