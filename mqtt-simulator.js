// mqtt-simulator.js
// Simulates multiple AGVs and publishes status to MQTT every 1s
const mqtt = require("mqtt");

const BROKER = "mqtt://localhost:1883";
const CLIENT_ID = "agv_simulator_node";
const PUBLISH_INTERVAL_MS = 1000;

const client = mqtt.connect(BROKER, { clientId: CLIENT_ID });

function nowTimestamp() {
  const d = new Date();
  return d.toISOString().split(".")[0]; // "YYYY-MM-DDTHH:mm:ss"
}

function createAgvData(serial, opts = {}) {
  return {
    version: "v2.0.0",
    timestamp: nowTimestamp(),
    manufacturer: "AGV-Tech",
    serial_number: serial,
    connection_state: "ONLINE",
    last_node_id: "node_12",
    last_node_sequence_id: 42,
    position_x: opts.x ?? 5.3,
    position_y: opts.y ?? 2.7,
    position_theta: opts.theta ?? 1.57,
    loads: [{ load_id: "load_1", load_type: "pallet" }],
    battery_charging: false,
    battery_charge: opts.battery ?? 78,
    driving: opts.driving ?? true,
    paused: false,
    status: opts.status ?? "ACTIVE",
    e_stop: "NONE",
    field_violation: false,
    series_description: "Standard AGV Model",
    agv_class: "FORKLIFT",
    max_load_mass: 1000,
    height_min: 0.5,
    height_max: 2.5,
    width: 1.2,
    length: 2.0,
    operatingMode: "AUTOMATIC",
  };
}

// initial AGV set
const agvs = {
  "SN-001": createAgvData("SN-001"),
  "SN-002": createAgvData("SN-002", { x: 10.0, y: 5.0, status: "INACTIVE" }),
  "SN-003": createAgvData("SN-003", { x: 15.0, y: 3.0, battery: 45, driving: false }),
};

client.on("connect", () => {
  console.log("Connected to MQTT broker:", BROKER);
  startPublishing();
});

client.on("error", (err) => {
  console.error("MQTT error:", err.message);
});

function publishOne(serial, data) {
  const topic = `agv/vehicle/${serial}/status`;
  data.timestamp = nowTimestamp();
  client.publish(topic, JSON.stringify(data), { qos: 0 }, (err) => {
    if (err) console.error(`Publish error ${serial}:`, err.message);
    // else console.log(`Published ${serial}`);
  });
}

function startPublishing() {
  setInterval(() => {
    // mutate some values slightly (for demo)
    Object.keys(agvs).forEach((sn) => {
      const agv = agvs[sn];

      // random walk for x/y
      agv.position_x = +(agv.position_x + (Math.random() - 0.5) * 0.5).toFixed(2);
      agv.position_y = +(agv.position_y + (Math.random() - 0.5) * 0.5).toFixed(2);

      // battery drain
      agv.battery_charge = Math.max(0, +(agv.battery_charge - Math.random() * 0.2).toFixed(2));

      // occasionally flip driving flag
      if (Math.random() < 0.03) agv.driving = !agv.driving;

      // update timestamp and publish
      publishOne(sn, agv);
    });
  }, PUBLISH_INTERVAL_MS);
}

// optional: CLI to add AGV at runtime
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.on("line", (line) => {
  const parts = line.trim().split(" ");
  if (parts[0] === "add") {
    // add new AGV e.g. "add SN-004"
    const sn = parts[1] || `SN-${String(Object.keys(agvs).length + 1).padStart(3, "0")}`;
    agvs[sn] = createAgvData(sn);
    console.log("Added", sn);
  } else if (parts[0] === "list") {
    console.log(Object.keys(agvs));
  }
});

