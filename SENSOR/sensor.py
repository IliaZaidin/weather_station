#!/usr/bin/env python
import datetime, time, requests, threading
from bmp280 import BMP280
from flask import Flask

try:
    from smbus2 import SMBus
except ImportError:
    from smbus import SMBus

# Initialise the BMP280
bus = SMBus(1)
bmp280 = BMP280(i2c_dev=bus)

def getReading():
    try:
        temperature = bmp280.get_temperature()
        pressure = bmp280.get_pressure()
        timeStamp = datetime.datetime.now() #UTC struct_time object
        format_temp = "{:.2f}".format(temperature)
        format_press = "{:.2f}".format(pressure)
        reading = {"temperature": format_temp, "pressure": format_press, "timestamp": timeStamp.strftime("%Y-%m-%d %H:%M:%S")}
        return reading
    except Exception:
        print("Failed polling the sensor.")
        
def postReading():
    try:
        url = 'https://api.weatherstation.zaidin.online/readings'
        # url = 'http://localhost:3000/readings'
        reading = getReading()
        response = requests.post(url, json = reading)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        print("Failed to post reading. ", e)
    
def loopPolling():
    while True:
        now = datetime.datetime.now()
        minutes = now.minute
        if minutes == 0:
            postReading()
        time.sleep(60)
    
app = Flask(__name__)

@app.route('/poll', methods=['GET'])  # accessible at port 5000
def index():
    return getReading()

if __name__ == '__main__':
    task_thread = threading.Thread(target=loopPolling)
    task_thread.start()
    app.run(debug=True)