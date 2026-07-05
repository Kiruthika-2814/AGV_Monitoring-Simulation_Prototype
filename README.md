# Real-Time AGV Monitoring & Simulation Prototype

A proof-of-concept Industrial IoT application that simulates Automated Guided Vehicle (AGV) telemetry and visualizes real-time operational data through a web dashboard.

The project demonstrates event-driven communication using MQTT and Socket.IO to simulate telemetry streaming between distributed system components. It was developed to explore Industrial IoT architectures, real-time messaging, and live monitoring concepts used in smart warehouses and manufacturing environments.

## Key Features

- Simulates real-time AGV telemetry
- MQTT publish/subscribe messaging
- Socket.IO-based live dashboard updates
- Battery level and operational status monitoring
- Position tracking simulation
- Event-driven architecture
- Responsive Angular dashboard

## Tech Stack

Frontend
- Angular
- TypeScript
- HTML
- CSS

Backend
- Node.js
- Express.js

Real-Time Communication
- MQTT
- Socket.IO
- WebSockets

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

## Learning Outcomes

- Industrial IoT architecture
- MQTT publish/subscribe messaging
- Event-driven communication
- Socket.IO integration
- Frontend-backend integration
- Real-time dashboard development

## Future Enhancements

- Multiple AGV simulation
- Route optimization
- Historical telemetry storage
- User authentication
- Alert and notification system
- Cloud deployment

### Start AGV Simulator

```bash
node mqtt-simulator.js
```

### Start MQTT Subscriber Server

```bash
node mqtt-subscriber-server.js
```

### Start Angular Frontend

```bash
ng serve
```
## License

This project was developed for educational and learning purposes.
## Note

This project is a proof-of-concept prototype developed for learning purposes to explore Industrial IoT concepts, MQTT messaging, and real-time communication workflows.
