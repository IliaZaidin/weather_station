#!/usr/bin/env python
import time
import psycopg2
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
    temperature = bmp280.get_temperature()
    pressure = bmp280.get_pressure()

    currentTime = time.strftime("%H:%M:%S", timeStamp)
    currentDate = time.strftime("%d/%m/%y", timeStamp)

    format_temp = "{:.2f}".format(temperature)
    format_press = "{:.2f}".format(pressure)

    cursor = conn.cursor()
    cursor.execute("INSERT INTO weather_station_back-db-1 (temperature, pressure, date, time) VALUES (%s, %s, %s %s)", (format_temp, format_press, currentDate, currentTime))
    conn.commit()
    cursor.close()
    conn.close()

  time.sleep(60)