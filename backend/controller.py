from flask import Flask,jsonify
from util import get_open_weather
from flask_cors import CORS
from app import Location
from re import search



app = Flask(__name__)
CORS(app)



def weather_list_check(search_param):
  weather_condition_list = ["Thunderstorm","Clouds","Rain","Clear","Snow","Drizzle","Atmosphere"]
  for weather_condition in weather_condition_list:
      if search(search_param.lower(), weather_condition.lower()):
            return weather_condition
  return ""





@app.route('/api/<condition>/<num>/', methods = ['GET'])
def get_weather_data(condition, num =2):
    weather_data = []
    cities = Location.get_location_data( int(num) + 10)
    weather_condition = weather_list_check(condition)
    for city in cities:
            city_name = city[1]
            api_data = get_open_weather(city_name,weather_condition)
            if api_data:
                print(api_data)
                weather_data.append(api_data)
    return jsonify({"data":weather_data})




if __name__ == "__main__":
    app.run(debug=True , port = 5000)
