let input = document.querySelector('input')
let form = document.querySelector('form')
const apikey = '1c64063fb7eab87b22e21ba095032e3f'
let prognoz = document.querySelector('div')
let div = document.createElement('div')
let gradus = document.querySelector('.gradus')
const city = document.querySelector('.town')
let humidity1 = document.querySelector('.Humidity')
let wind1 = document.querySelector('.wind')
const space = document.querySelector('form i')

async function mainPrognoz (e) {
    e.preventDefault()
    let town = input.value;
    town = town.toLowerCase(); 
    town = town.charAt(0).toUpperCase() + town.slice(1); 
    const cityInfo = await gpsTown(town.trim())
    const weatherinfo = await getPrognoz(cityInfo[0].lat, cityInfo[0].lon)

    let weather = {
        gradusy: weatherinfo.main.temp,
        humidity: weatherinfo.main.humidity,
        wind: weatherinfo.wind.speed
    }
    gradus.textContent = Math.round(weather.gradusy) +'°С'
    city.innerHTML = town 
    humidity1.textContent = weather.humidity + '%'
    wind1.textContent = weather.wind + ' km/h'
}

space.ontouchstart  = mainPrognoz
form.addEventListener('submit',mainPrognoz)

async function gpsTown (town) {
    let zapros = `http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=5&appid=${apikey}`
    const response = await fetch(zapros)
    const data = await response.json()
    return data
}

async function getPrognoz (lat, lon) {
    let zapros = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apikey}`
    const response = await fetch(zapros)
    const data = await response.json()
    return data
}

