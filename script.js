const apiKey = "d5927e89c7fba5a16c38cbaa442365c4";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found! Try again.");
            return;
        }

        document.getElementById("cityName").innerText = `📍 ${data.name}, ${data.sys.country}`;
        document.getElementById("temperature").innerText = `🌡️ Temperature: ${data.main.temp}°C`;
        document.getElementById("weather").innerText = `🌥️ Condition: ${data.weather[0].description}`;
        document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
        document.getElementById("wind").innerText = `💨 Wind Speed: ${data.wind.speed} m/s`;

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Error fetching data. Try again later.");
    }
}
