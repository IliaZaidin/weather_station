#!/usr/bin/env python
import time
import pymongo
from bmp280 import BMP280

try:
    from smbus2 import SMBus
except ImportError:
    from smbus import SMBus

print("Weather sensor is running Press Ctrl+C to exit!\n")

# Initialise the BMP280
bus = SMBus(1)
bmp280 = BMP280(i2c_dev=bus)
degree_sign = u"\N{DEGREE SIGN}"

client = pymongo.MongoClient('mongodb://localhost:27017/')
db = client['weatherdb']
collection = db["readings"]

while True:
	temperature = bmp280.get_temperature()
	pressure = bmp280.get_pressure()
	timeStamp = time.localtime()

	currentTime = time.strftime("%H:%M:%S", timeStamp)
	currentDate = time.strftime("%d/%m/%y", timeStamp)
	format_temp = "{:.2f}".format(temperature)
	format_press = "{:.2f}".format(pressure)

	dictionary = { "temperature": format_temp, "pressure": format_press, "date": currentDate, "time": currentTime }
	lastReading = collection.insert_one(dictionary)\
    
	print(collection.find_one(lastReading.inserted_id))

	time.sleep(4)
