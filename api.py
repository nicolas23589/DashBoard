from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas las rutas

@app.route('/api', methods=['GET'])
def get_name():

    response = {
        "id":20,
        "name": "Device 20 api", 
        "latitude": 40.93586, 
        "longitude": -86.018066,
        "voltageMeasurements" : [ 
            {
        "name": "Voltage",
        "series": [
          {
            "name": "13:00",
            "value": 1
            },
          {
            "name": "10:00",
            "value": 10
            }
                    ]   
                }
    ],
      "currentMeasurements" : [
      {
        "name": "Current",
        "series": [
          {
            "name": "13:00",
            "value": 1
          },
          {
            "name": "10:00",
            "value": 10
          }
        ]
      }
    ],
      "icon": "http://maps.google.com/mapfiles/ms/icons/red-dot.png"  
    }


    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
