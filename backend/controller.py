from flask import Flask,jsonify
import sqlite3
import os
import requests
from util import cloud,thunderstorms,raining,clearSky,snow
from flask_cors import CORS
from app import Location



app = Flask(__name__)
CORS(app)


@app.route('/api/<condition>/', methods=['GET'])
def thuderstorm_data(condition):
        output = Location.get_location_data()
        if condition =="Thunderstorm"or  condition =="thunderstorm" or condition =="thunderstorms":
            datas = []
            for city in output:
                api_city = city[1]
                data = thunderstorms(api_city)
                if data:
                     datas.append(data)
            return jsonify({"location": datas})
        elif condition =="Clouds" or condition =="clouds" or condition == "cloudy" or condition =="Cloudy":
            datas = []
            for city in output:
                api_city = city[1]
                data = cloud(api_city)
                if data:
                    datas.append(data)
            return jsonify({"location":datas})

        elif condition == "Rain" or condition =="rain":
            datas = []
            for city in output:
                api_city = city[1]
                data = raining(api_city)
                if data:
                    datas.append(data)
            return jsonify({"location":datas})

        elif condition =="Clear" or condition =="clear":
            datas= []
            for city in output:
                api_city = city[1]
                data = clearSky(api_city)
                if data:
                    datas.append(data)
            return jsonify({"location":datas})

        elif condition =="Snow" or condition =="snow":
            datas= []
            for city in output:
                api_city = city[1]
                data = snow(api_city)
                if data:
                    datas.append(data)
            return jsonify({"location":datas})

        else:
            return jsonify({"error": "wrong input data"})
    



if __name__ == "__main__":
    app.run(debug=True , port = 5000)