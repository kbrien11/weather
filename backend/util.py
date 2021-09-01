import requests



def get_open_weather(city,condition):
  try:
    weather_data = []
    quote_endpoint ="http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&appid=27b3ec19c7d34c1bcca082098b7a60a7"
    response = requests.get(quote_endpoint.format(city))
    res = response.json()
    city_name = res['name']
    wind = res['wind']['speed']
    temp = round(res['main']['temp'])
    weather_type = res['weather'][0]['main']
    about = res['weather'][0]['description']
    if condition == weather_type:
      weather_data.append(city_name)
      weather_data.append(str(wind) + " " + "MPH")
      weather_data.append(str(temp) + " " + "F")
      weather_data.append(about)
      return weather_data 
  except KeyError:
    print(KeyError)


