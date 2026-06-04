# Real-Time AGV Monitoring & Simulation Prototype

A prototype Industrial IoT dashboard application that simulates Automated Guided Vehicles (AGVs) and visualizes real-time telemetry data using MQTT, Socket.IO, Node.js, and Angular.

This project was created to explore real-time communication workflows, event-driven systems, and live dashboard monitoring concepts commonly used in smart warehouse and industrial automation environments.

## Features

* Real-time AGV telemetry simulation
* MQTT-based publish/subscribe communication
* Live dashboard updates using Socket.IO
* Dynamic AGV status monitoring
* Battery level visualization
* Position tracking simulation
* Responsive Angular dashboard UI
* Event-driven architecture implementation

## Tech Stack

### Frontend

* Angular
* TypeScript
* HTML
* CSS

### Backend

* Node.js
* Express.js
* Socket.IO

### Messaging & Real-Time Communication

* MQTT
* WebSockets

## Project Architecture

AGV Simulator (Publisher)
→ Publishes AGV telemetry data using MQTT

MQTT Subscriber Server
→ Receives MQTT messages and broadcasts updates using Socket.IO

Angular Dashboard
→ Displays live AGV status, battery levels, and operational data in real time

The simulator publishes:

* AGV status
* Position coordinates
* Battery percentage
* Driving state
* Load information
* Timestamp updates

 Learning Objectives

This prototype was built to gain practical understanding of:

* MQTT messaging protocol
* Real-time event-driven systems
* Socket.IO communication
* Industrial IoT monitoring concepts
* Frontend-backend integration
* Live dashboard visualization

## Run the Project

### Start AGV Simulator
node mqtt-simulator.js

### Start MQTT Subscriber Server
node mqtt-subscriber-server.js

### Start Angular Frontend
ng serve

This project is a proof-of-concept prototype created for learning and experimentation purposes to understand real-time communication and Industrial IoT workflows.
