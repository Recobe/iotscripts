import nxppy
import time
import paho.mqtt.client as mqtt

mifare = nxppy.Mifare()

def on_connect(client, userdata, flags, rc):
    print("Connected")

def on_disconnect(client):
    print("Disconnected")

mqttsender = mqtt.Client('marconfc')
mqttsender.on_connect = on_connect
mqttsender.on_disconnect = on_disconnect
mqttsender.connect('localhost', 1883)

# Print card UIDs as they are detected
while True:
    try:
        uid = mifare.select()
        print(mqttsender.publish('/nfc/cardnumber', uid))
    except nxppy.SelectError:
        # SelectError is raised if no card is in the field.
        pass
    mqttsender.loop()
    time.sleep(1)
