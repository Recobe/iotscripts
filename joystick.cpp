#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include <PubSubClient.h>

int analogPin = A0;
int val = 0;

//const char* ssid = "........";
//const char* password = "........";
const char* mqtt_server = "marco.local";
WiFiClient espClient;
PubSubClient client(espClient);

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str(), "/analogStick/will", 2, false, "unexpected exit")) { // including last will
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("Health", "I am connected!");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void setup() {

  Serial.begin(115200); //serial transfer speed -> neccessary for serial byte communication, both ends need to have the same transfer speed -> 115200 is a common speed config
  Serial.println();
  WiFiManager wifiManager;
  wifiManager.autoConnect("AccessPointMG");

  Serial.println("Connected to WiFi");
  client.setServer(mqtt_server, 1883);
}

void loop() {
  delay(100);

  if (!client.connected()) {
    reconnect();
  }
  //read analog value between 0 and 1023
  val = analogRead(analogPin);
  client.loop();
  char buffer [33];
  client.publish("/joystick/positionX", itoa(val, buffer, 10));
  Serial.println("Published topic 'analogStick'");
}