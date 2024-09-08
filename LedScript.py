import requests
from gpiozero import LED
from time import sleep


#led = LED(18)

def send_post_request(led_status):
    url = "http://0.0.0.0:3001/data"
    data = {"ledStatus": led_status}
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("POST request successful")
    else:
        print("POST request failed:", response.text)

while True:

    led.on()  
    send_post_request("ledOn")    
    sleep(duration) 
    led.off()  
    sleep(duration) 
    send_post_request("ledOff")

