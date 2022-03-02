
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const backgroundWeather = $('.background-weather')

// Input search
const goSearch = $('.go-search')
const locationInput = $('input[name="location"]')

// Location
const locationName = $('.location-name')
const locationCountry = $('.location-country')
const locationDayTime = $('.location-day-time')

//Temperature
const temperatureC = $('.temperature-figure') 
const cloud = $('.cloud')

//wind
const windSpeed = $('.wind-speed') 

//vision
const visionFigure = $('.vision-figure')

//Temperature details
const temperatureDetails = $('.temperature-detail > span')

function loadDefault() {
    var weatherApiDefault = `http://api.weatherapi.com/v1/current.json?key=6581e1a6f2984db996752212220301&q=Ha noi&aqi=yes`
    fetch(weatherApiDefault)
        .then(function(responsive) {
            return responsive.json()
        })
        .then(renderDataWeather)

}
loadDefault()


locationInput.onkeydown = function getDataWeather(e){
    if (e.key === "Enter") {
        var locationSearch = locationInput.value.trim()
        var weatherApi = `http://api.weatherapi.com/v1/current.json?key=6581e1a6f2984db996752212220301&q=${locationSearch}&aqi=yes`
       fetch(weatherApi)
        .then(function(responsive) {
            return responsive.json()
        })
        .then(renderDataWeather)
    }
}

goSearch.onclick = function getDataWeather() {
    var locationSearch = locationInput.value.trim()
    var weatherApi = `http://api.weatherapi.com/v1/current.json?key=6581e1a6f2984db996752212220301&q=${locationSearch}&aqi=yes`
   fetch(weatherApi)
    .then(function(responsive) {
        return responsive.json()
    })
    .then(renderDataWeather)
}

function renderDataWeather(data) {
    if (data.error) {
        alert(data.error.message)
    } else {
        console.log(data)
        // Location
        locationName.innerText = data.location.name + ', '
        locationCountry.innerText = data.location.country
        locationDayTime.innerText = data.location.localtime
        var a = data.location.localtime.indexOf(':')
        var timeCurrent = data.location.localtime.slice(a- 2, a)
        if (timeCurrent >= 17 || timeCurrent <= 5){
            backgroundWeather.classList.add('night')
            backgroundWeather.classList.remove('day')
        } else {
            backgroundWeather.classList.add('day')
            backgroundWeather.classList.remove('night')
        }

        // Temperature
        temperatureC.innerHTML = data.current.feelslike_c + "&deg;C"
        cloud.setAttribute("src","http://" + data.current.condition.icon)

        //Wind
        windSpeed.innerText = data.current.wind_kph + "km/h"
        //Cloud

        //Vision
        visionFigure.innerText = data.current.vis_km + 'km'

        //Temperature details
        temperatureDetails.innerHTML = data.current.feelslike_f + "&deg;F" + "/" + (data.current.feelslike_c + 273) + "&deg;K"
        locationInput.value = ''
    }

}


// function loadDataSearch() {
//     var searchApi = 'http://api.openweathermap.org/data/2.5/onecall?lat=30.489772&lon=-99.771335&lang=zh_cn'
//     fetch(searchApi)
//         .then(function(responsive) {
//             return responsive.json()
//         })
//         .then(function(data){
//             console.log(data)
//             console.log(searchApi)
//         })
// }
// loadDataSearch()



