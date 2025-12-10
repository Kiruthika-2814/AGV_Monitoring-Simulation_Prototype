// mqtt-subscriber-server.js
const mqtt = require("mqtt");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

const MQTT_URL = "mqtt://localhost:1883";
const client = mqtt.connect(MQTT_URL);
// ✅ Subscribe to AGV simulator topics
client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("agv/vehicle/+/status", (err) => {
    if (!err) console.log("Subscribed to agv/vehicle/+/status");
  });
});

client.on("message", (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());
    const parts = topic.split("/");
    const serial = parts[2];

    const msg = { topic, serial, payload };

    // ✅ Relay to all socket clients
    io.emit("agv-status", msg);
    console.log(`Relayed ${serial} -> ${io.engine.clientsCount} clients`);
  } catch (e) {
    console.error("Error parsing MQTT message", e);
  }
});

io.on("connection", (socket) => {
  console.log("🔌 Client connected");
  socket.on("disconnect", () => console.log("❌ Client disconnected"));
});

server.listen(3000, () => {
  console.log("Socket.IO server listening at http://localhost:3000");
});
