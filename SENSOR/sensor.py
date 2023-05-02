#!/usr/bin/env python
import datetime
from bmp280 import BMP280
from flask import Flask

try:
    from smbus2 import SMBus
except ImportError:
    from smbus import SMBus

# Initialise the BMP280
bus = SMBus(1)
bmp280 = BMP280(i2c_dev=bus)
degree_sign = u"\N{DEGREE SIGN}"

app = Flask(__name__)
@app.route('/poll', methods=['GET'])  # accessible at port 5000
def getReading():
    try:
        temperature = bmp280.get_temperature()
        pressure = bmp280.get_pressure()
        timeStamp = datetime.datetime.now() #UTC struct_time object

        format_temp = "{:.2f}".format(temperature)
        format_press = "{:.2f}".format(pressure)

        reading = {"temperature": format_temp, "pressure": format_press, "timestamp": timeStamp}
        return reading
      
    except Exception:
        print("Error connecting to the sensor:")
        
if __name__ == '__main__':
    app.run(debug=True)
