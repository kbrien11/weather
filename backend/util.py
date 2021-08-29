import requests


def thunderstorms(city):
  try:
    solution = []
    data = "Thunderstorm"
    quote_endpoint ="http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&appid=27b3ec19c7d34c1bcca082098b7a60a7"
    response = requests.get(quote_endpoint.format(city))
    res = response.json()
    city_name = res['name']
    wind = res['wind']['speed']
    temp = round(res['main']['temp'])
    description = res['weather'][0]['main']
    about = res['weather'][0]['description']
    if data == description:
      solution.append(city_name)
      solution.append(str(wind) + " " + "mph")
      solution.append(str(temp) + " " + "f")
      solution.append(about)
      return solution
  except KeyError:
    print(KeyError)



def cloud(city):
  try:
    solution = []
    data = "Clouds"
    quote_endpoint ="http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&appid=27b3ec19c7d34c1bcca082098b7a60a7"
    response = requests.get(quote_endpoint.format(city))
    res = response.json()
    city_name = res['name']
    wind = res['wind']['speed']
    temp = round(res['main']['temp'])
    description = res['weather'][0]['main']
    about = res['weather'][0]['description']
    if data == description:
      solution.append(city_name)
      solution.append(str(wind) + " " + "mph")
      solution.append(str(temp) + " " + "f")
      solution.append(about)
      return solution
  except KeyError:
    print(KeyError)


def raining(city):
  try:
    solution = []
    data = "Rain"
    quote_endpoint ="http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&appid=27b3ec19c7d34c1bcca082098b7a60a7"
    response = requests.get(quote_endpoint.format(city))
    res = response.json()
    city_name = res['name']
    wind = res['wind']['speed']
    temp = round(res['main']['temp'])
    description = res['weather'][0]['main']
    about = res['weather'][0]['description']
    if data == description:
      solution.append(city_name)
      solution.append(str(wind) + " " + "mph")
      solution.append(str(temp) + " " + "f")
      solution.append(about)
      return solution
  except KeyError:
    print(KeyError)


def clearSky(city):
  try:
    solution = []
    data = "Clear"
    quote_endpoint ="http://api.openweathermap.org/data/2.5/weather?q={}&units=imperial&appid=27b3ec19c7d34c1bcca082098b7a60a7"
    response = requests.get(quote_endpoint.format(city))
    res = response.json()
    city_name = res['name']
    wind = res['wind']['speed']
    temp = round(res['main']['temp'])
    description = res['weather'][0]['main']
    about = res['weather'][0]['description']
    if data == description:
      solution.append(city_name)
      solution.append(str(wind) + " " + "mph")
      solution.append(str(temp) + " " + "f")
      solution.append(about)
      return solution
  except KeyError:
    print(KeyError)



