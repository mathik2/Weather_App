from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv  # Add this import

load_dotenv()  # Load variables from .env

app = Flask(__name__)

API_KEY = os.getenv("OPEN_WEATHER_API_KEY")  # Set this in your .env file

def get_extra_info(data):
    # Reference values (approximate, can be tuned)
    avg_wind = 3.0  # m/s
    avg_pressure = 1013  # hPa
    avg_humidity = 60  # %
    avg_temp = 22  # °C

    wind = data['wind']['speed']
    pressure = data['main']['pressure']
    humidity = data['main']['humidity']
    temp = data['main']['temp'] - 273.15

    wind_msg = "Wind is above average today." if wind > avg_wind + 2 else \
               "Wind is calmer than usual." if wind < avg_wind - 2 else "Wind speed is typical."
    pressure_msg = "Pressure is a bit high." if pressure > avg_pressure + 5 else \
                   "Pressure is lower than average." if pressure < avg_pressure - 5 else "Pressure is normal."
    humidity_msg = "Humidity is higher than usual." if humidity > avg_humidity + 10 else \
                   "Humidity is lower than usual." if humidity < avg_humidity - 10 else "Humidity is typical."
    temp_msg = "It's warmer than average." if temp > avg_temp + 5 else \
               "It's cooler than average." if temp < avg_temp - 5 else "Temperature is close to average."

    return {
        "wind": wind_msg,
        "pressure": pressure_msg,
        "humidity": humidity_msg,
        "temp": temp_msg
    }

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/weather", methods=["POST"])
def weather():
    city = request.json.get("city")
    if not city:
        return jsonify({"error": "Please enter a city name."}), 400

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}"
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"error": "City not found. Please try again."}), 404

    data = response.json()
    data["extra_info"] = get_extra_info(data)
    return jsonify(data)

@app.route("/city_suggest", methods=["GET"])
def city_suggest():
    query = request.args.get("q", "")
    if not query or len(query) < 2:
        return jsonify([])

    url = f"https://api.openweathermap.org/data/2.5/find?q={query}&type=like&sort=population&cnt=7&appid={API_KEY}"
    resp = requests.get(url)
    if resp.status_code != 200:
        return jsonify([])

    cities = [
        f"{item['name']}, {item['sys']['country']}"
        for item in resp.json().get("list", [])
    ]
    return jsonify(cities)

if __name__ == "__main__":
    # For local development only; Render uses gunicorn by default
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=True)

