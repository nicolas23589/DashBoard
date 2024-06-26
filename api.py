from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

measurementsSTR=''

def proccesFile():
   
  with open("C:/xampp/htdocs/lorawan/data - copia.txt", 'r') as file:
    measurementsSTR = file.read() 
    measurementsSTR = '[' + measurementsSTR[0:-2] + ']'  
    file.close()
  
  with open ('dataParsed.txt', 'w') as file:
     file.write (measurementsSTR)
     file.close()

@app.route('/api', methods=['GET'])
def get_name():
    proccesFile()
    devices=[]

    with open('dataParsed.txt', 'r') as file:
      measurements = json.load(file)
    
    for currentMeasurement in measurements:
      currentDevEUI = currentMeasurement["devEUI"]
      json_obj = json.loads(currentMeasurement["objectJSON"])

      if not any(device["id"] == currentDevEUI for device in devices):
          # this add the device of the current measurement only if the current measurement is from a device that isn't in the list
          
          measurementsAuxiliar=[] #this auxiliar list of diccionaries will help us to  add all measurements
          i=1
          for key, value in json_obj.items():
             if key != "gpsLocation":
                measurementsAuxiliar.append({"measurementsName": key, 
                                             "measurementsValues":[{  "name": currentMeasurement["publishedAt"],
                                                                      "value": value[str(i)]  }]
                                              })
                i+=1

          devices.append( {"id": currentDevEUI, 
                          "name": currentMeasurement["deviceName"],
                          "latitude": json_obj["gpsLocation"]["3"]["latitude"],
                          "longitude": json_obj["gpsLocation"]["3"]["longitude"],
                          "icon": "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                          "allMeasurements": measurementsAuxiliar  
                            }
                          )
          
      else: #if the device is already in the list, we add only the measurement's data (not the device's data)
         for device in devices:
            if device["id"]== currentDevEUI:
               nameMeasurementExist= False
               for key, value in json_obj.items():
                  i=1
                  j=0
                  while j< len(device["allMeasurements"]):
                     if key==device["allMeasurements"][j]["measurementsName"]:
                      nameMeasurementExist= True
                      device["allMeasurements"][j]["measurementsValues"].append({
                                                        "name": currentMeasurement["publishedAt"],
                                                        "value": value[str(j+1)]
                                                        })
                     j+=1
                  if nameMeasurementExist==False:
                     device["allMeasurements"].append({"measurementsName": key, 
                                             "measurementsValues":[{  "name": currentMeasurement["publishedAt"],
                                                                      "value": value[str(i)]  }]
                                              })
                  i+=1

    return jsonify(devices)

if __name__ == '__main__':
    app.run(debug=True)
