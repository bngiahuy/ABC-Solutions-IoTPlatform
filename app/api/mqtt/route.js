const mqtt = require('mqtt')
// import mqtt from 'mqtt'
var mqttClient
var mqttHost = 'broker.emqx.io'
var mqttPort = 1883
const protocol = 'mqtt'

// Change this to point to your MQTT broker or DNS name
const username = 'test'
const password = 'public'

function connectToBroker() {
  const clientId = 'mqttx_99e9d616'

  // Change this to point to your MQTT broker
  const hostURL = `${protocol}://${mqttHost}:${mqttPort}`

  const options = {
    keepalive: 60,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000
  }

  mqttClient = mqtt.connect(
    hostURL,
    {
      username: username,
      password: password
    },
    options
  )

  mqttClient.on('error', err => {
    console.log('Error: ', err)
    mqttClient.end()
  })

  mqttClient.on('reconnect', () => {
    console.log('Reconnecting...')
  })

  mqttClient.on('connect', () => {
    console.log('Client connected:' + clientId)
  })

  // Received Message
  mqttClient.on('message', (topic, message, packet) => {
    console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
  })
}

function publishMessage(topic, message) {
  console.log(`Sending Topic: ${topic}, Message: ${message}`)
  mqttClient.publish(topic, message, {
    qos: 0,
    retain: false
  })
}

connectToBroker()

const deviceTopic = ['feeds/DeviceGarden1', 'feeds/DeviceGarden2']
const pubDeviceStatus = (garden_id, device_id, status) => {
  let numeric = garden_id.match(/\d+/)[0]
  let numericValue = parseInt(numeric, 10)

  topic = deviceTopic[numericValue - 1]
  message = JSON.stringify({
    station_id: garden_id,
    'Device id': device_id,
    Device_value: status ? 1 : 0
  })

  publishMessage(topic, message)
  console.log(topic, message)
}
pubDeviceStatus('Garden1', 'Device1', true)
module.exports = {
  pubDeviceStatus
}
