from flask import Flask, jsonify
from flask_cors import CORS
import json


app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas



@app.route('/api', methods=['GET'])
def get_name():
    
    #READ THE DATA from the file
    with open('data.json', 'r') as archivo:
      measurements = json.load(archivo)

    devices=[]

    for currentMeasurement in measurements:
      currentDevEUI = currentMeasurement["devEUI"]


      if not any(device["id"] == currentDevEUI for device in devices):
          
          # add to devices if the current measurement is from a device that isn't in the list
          devices.append( {"id": currentDevEUI, 
                          "name": currentMeasurement["deviceName"],
                          "latitude": currentMeasurement["objectJSON"]["gpsLocation"]["3"]["latitude"],
                          "longitude": currentMeasurement["objectJSON"]["gpsLocation"]["3"]["longitude"],
                          "voltageMeasurements": [ 
                                                    {
                                                      "name": currentMeasurement["publishedAt"],
                                                      "value": currentMeasurement["objectJSON"]["temperatureSensor"]["1"]
                                                      }
                                                  ],

                          "currentMeasurements": [ 
                                                    {
                                                      "name": currentMeasurement["publishedAt"],
                                                      "value": currentMeasurement["objectJSON"]["humiditySensor"]["2"]
                                                      }
                                                  ],
                          "icon": "http://maps.google.com/mapfiles/ms/icons/red-dot.png" } )
      else:
         for device in devices:
            if device["id"]== currentDevEUI:
               device["voltageMeasurements"].append({
                                                      "name": currentMeasurement["publishedAt"],
                                                      "value": currentMeasurement["objectJSON"]["temperatureSensor"]["1"]
                                                      })
               
               device["currentMeasurements"].append({
                                                        "name": currentMeasurement["publishedAt"],
                                                        "value": currentMeasurement["objectJSON"]["humiditySensor"]["2"]
                                                        })
 

    return jsonify(devices)

if __name__ == '__main__':
    app.run(debug=True)
