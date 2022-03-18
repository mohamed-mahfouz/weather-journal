/* Global Variables */
const apiKey = '&appid=e78b8fbe514526ee35a4c19ca27410e8&units=imperial';
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const generateBtn = document.getElementById('generate');
const zipCode = document.getElementById('zip');
const fellings = document.getElementById('feelings');

// Create a new date instance dynamically with JS
let d = new Date();
let currentDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

//Click Event listener for generate button
generateBtn.addEventListener('click', onClick);

//Event handler function.
function onClick() {
    const userZipCode = zipCode.value;
    const userFellings = fellings.value;

    getWeatherFromApi(baseUrl, userZipCode, apiKey)
        .then(function (data) {
                postData('/add', { date: currentDate, temp: data.main.temp, content: userFellings });
        }).then(function(){
            updateUI()});
}


//Get weather from API
const getWeatherFromApi = async (url, zip, key) => {
    const request = await fetch(url + zip + key);

    try {
        const weatherData = await request.json();
        console.log(weatherData);
        return weatherData;

    } catch (error) {
        console.log('error', error);
    }
}

//Post data to my local server.
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    });

    try {
        const newData = await response.statusText;
        console.log(newData);
        return newData;
    }
    catch (error) {
        console.log('error', error);
    }
}

//Update UI to display weather temp and user fellings
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const data = await request.json();
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temp: ${data.temp}`;
        document.getElementById('content').innerHTML = `Fellings: ${data.content}`;
    } catch (error) {
        console.log('error', error);
    }
}
