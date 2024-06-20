from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

measurementsSTR=''

def proccesFile():
   
  with open('data.txt', 'r') as file:
    measurementsSTR = file.read() #before initialize the xaamp server, the data.txt file must have only a space " " at the beggining
    measurementsSTR = '[' + measurementsSTR[1:-2] + ' ' + ']'  
    file.close()
  
  with open ('data.txt', 'w') as file:
     file.write (measurementsSTR)
     file.close()

@app.route('/api', methods=['GET'])
def get_name():
    proccesFile()

    with open('data.txt', 'r') as file:
      measurements = json.load(file)
    devices=[]

    for currentMeasurement in measurements:
      currentDevEUI = currentMeasurement["devEUI"]


      if not any(device["id"] == currentDevEUI for device in devices):
          json_obj = json.loads(currentMeasurement["objectJSON"])
          # add to devices if the current measurement is from a device that isn't in the list
          devices.append( {"id": currentDevEUI, 
                          "name": currentMeasurement["deviceName"],
                          "latitude": json_obj["gpsLocation"]["3"]["latitude"],
                          "longitude": json_obj["gpsLocation"]["3"]["longitude"],
                          "voltageMeasurements": [ 
                                                    {
                                                      "name": currentMeasurement["publishedAt"],
                                                      "value": json_obj["temperatureSensor"]["1"]
                                                      }
                                                  ],

                          "currentMeasurements": [ 
                                                    {
                                                      "name": currentMeasurement["publishedAt"],
                                                      "value": json_obj["humiditySensor"]["2"]
                                                      }
                                                  ],
                          "icon": "http://maps.google.com/mapfiles/ms/icons/red-dot.png" } )
      else:
         for device in devices:
            if device["id"]== currentDevEUI:
               device["voltageMeasurements"].append({
                                                      "name": currentMeasurement["publishedAt"],
                                                      "value": json_obj["temperatureSensor"]["1"]
                                                      })
               
               device["currentMeasurements"].append({
                                                        "name": currentMeasurement["publishedAt"],
                                                        "value": json_obj["humiditySensor"]["2"]
                                                        })
 

    return jsonify(devices)

if __name__ == '__main__':
    app.run(debug=True)
