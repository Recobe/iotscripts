#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include <PubSubClient.h>
 
int Step = 0;
int Dir = 2;
 
const char* mqtt_server = "marco.local";
WiFiClient espClient;
PubSubClient client(espClient);
 

void callback(char* topic, byte* payload, unsigned int length) {
    Serial.print("Received message [");
    Serial.print(topic);
    Serial.print("] ");
    char msg[length+1];
    for (int i = 0; i < length; i++) {
        Serial.print((char)payload[i]);
        msg[i] = (char)payload[i];
    }
    Serial.println();
 
    msg[length] = '\0';
    Serial.println(msg[0]);
   
    //for(int i=0; i<50; i++){
    if(msg[0] == 'r'){
      digitalWrite(Dir, HIGH);
      digitalWrite(Step, HIGH);
      delay(10);
      digitalWrite(Step, LOW);
      delay(10);
      Serial.print("Step");
    }
    if(msg[0] == 'l'){
      digitalWrite(Dir, LOW);
      digitalWrite(Step, HIGH);
      delay(10);
      digitalWrite(Step, LOW);
      delay(10);
      Serial.print("Step");
    }

    //}
}

void reconnect() {
    while (!client.connected()) {
      Serial.println("Reconnecting MQTT...");
      if (!client.connect("ESP8266Client")) {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" retrying in 5 seconds");
            delay(5000);
        }
    }
    client.subscribe("stepmotor");
    Serial.println("MQTT Connected...");
}

void setup() {
  pinMode(Step, OUTPUT);
  pinMode(Dir, OUTPUT);
  digitalWrite(Step, LOW);
  digitalWrite(Dir, LOW);
 
  Serial.begin(115200); //serial transfer speed -> neccessary for serial byte communication, both ends need to have the same transfer speed -> 115200 is a common speed config
  Serial.println();
  WiFiManager wifiManager;
  wifiManager.autoConnect("espjr");
 
  Serial.print("Connected to WiFi");
  client.setServer(mqtt_server, 1883);

  client.setCallback(callback);
  client.subscribe("stepmotor");
}
 
void loop() {
      if (!client.connected()) {
        reconnect();
    }
  //delay(500);
  client.loop();
}

  /**/
