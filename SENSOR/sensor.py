#!/usr/bin/env python
import time
import pymongo
import psycopg2

from psycopg2 import OperationalError
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

conn = psycopg2.connect(
    database="weather_station_back-db-1",
    user="postgres",
    password="postgres",
    host="localhost",
    port="5432"
)

while True:
  timeStamp = time.localtime()

  if timeStamp.tm_min == 0:
    try:
      temperature = bmp280.get_temperature()
      pressure = bmp280.get_pressure()

      currentTime = time.strftime("%H:%M:%S", timeStamp)
      currentDate = time.strftime("%d/%m/%y", timeStamp)

      format_temp = "{:.2f}".format(temperature)
      format_press = "{:.2f}".format(pressure)
    except OperationalError as e:
      print("Error connecting to the sensor:", e)
    
    try:
      dictionary = { "temperature": format_temp, "pressure": format_press, "date": currentDate, "time": currentTime }
      lastReading = collection.insert_one(dictionary)
    except OperationalError as e:
      print("Error connecting to the Mongo database:", e)
    
    try:
      cursor = conn.cursor()
      cursor.execute("INSERT INTO weather_station_back-db-1 (temperature, pressure, date, time) VALUES (%s, %s, %s %s)", (format_temp, format_press, currentDate, currentTime))
      conn.commit()
      cursor.close()
    except OperationalError as e:
      print("Error connecting to the PostgreSQL database:", e)
    finally:
      if conn:
        conn.close()

  time.sleep(60)