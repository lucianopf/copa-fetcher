const WebSocket = require('websocket').client

let cachedData = []

const wsUri = 'wss://rtw.uol.com/sub?id=app-esporte-placar-futebol-live-worldcup'

function initializeWebSocket (wsUri) {
  const websocket = new WebSocket()
  websocket.on('connect', (connection) => {
    connection.on('message', (message) => {
      if (message.type === 'utf8') {
        let jsonData = JSON.parse(message.utf8Data).subchannels
        cachedData = Object.keys(jsonData).map(k => jsonData[k])
      }
    })
    connection.on('error', (error) => {
      console.log('Connection Error: ' + error.toString())
    })
    connection.on('close', () => {
      initializeWebSocket(wsUri)
    })
  })
  websocket.connect(wsUri)
  return websocket
}

initializeWebSocket(wsUri)

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  return cachedData
}
