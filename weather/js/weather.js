document.addEventListener('DOMContentLoaded', initialize);


function initialize() {
    console.log("DOM Loaded");
    fetchData();
}

function fetchData() {
    var server = 'http://api.openweathermap.org/data/2.5/forecast?q=bangalore&units=metric&appID=53a094ad661c44960016eaada195a251';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            updateCurrent(JSON.parse(this.responseText));
            updateForecast(JSON.parse(this.responseText)); //Change to Update DOM 
        }
    };
    xhttp.open("GET", server, true);
    xhttp.send();
}

function fetchIconName(weatherDes) { //return Obj so that current can also use 
    switch (weatherDes) {
        case '01n':
        case '01d': return 'day-sunny';

        case '02n': 
        case '02d': return 'day-cloudy';

        case '03d':
        case '03n':
        case '04d':
        case '04n': return 'cloudy';

        case '09d':
        case '09n':
        case '10d':
        case '10n': return 'day-rain';

        case '11d':
        case '11n': return 'day-thunderstorm';

        case '13n' :
        case '13d' : return 'day-snow';

        case '50d' :
        case '50n' : return 'day-fog';

    }

}

function updateForecast(weatherObj) {
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var today = new Date();
    var title = "-title",
        icon = "-icon",
        temperature = "-temperature";
    for (let i = 1, day = 8; i <= document.getElementById("forecast-row").childElementCount; i++, day += 8) {
        document.getElementById(i + title).innerHTML = weekday[(today.getDay() + i) % 6];
        document.getElementById(i + temperature).innerHTML = Math.round(weatherObj.list[day].main.temp) + "&deg;";
        document.getElementById(i + icon).className='wi wi-' + fetchIconName(weatherObj.list[day].weather[0].icon);
        console.log(weatherObj.list[day].weather[0].description);
    }
}

function updateCurrent(weatherObj){
    document.getElementById('current-card-temperature').innerHTML = Math.round(weatherObj.list[0].main.temp) + "&deg;";
    document.getElementById('current-card-humidity').innerHTML = weatherObj.list[0].main.humidity + "%rH";
    document.getElementsByClassName('current-card-title').innerHTML = weatherObj.city.name;
    document.getElementsByClassName('current-card-description').innerHTML = weatherObj.list[0].weather[0].description;
    document.getElementsByClassName('visible')[0].classList.remove('visible');
    document.getElementById(fetchIconName(weatherObj.list[0].weather[0].icon)).classList.add('visible');
}
