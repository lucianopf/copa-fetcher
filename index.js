const WebSocket = require('websocket').client

let cachedData = []

const wsUri = 'wss://rtw.uol.com/sub?id=app-esporte-placar-futebol-live-worldcup'
const websocket = new WebSocket()
websocket.on('connect', (connection) => {
  console.log('Connection to WS again')
  connection.on('message', (message) => {
    console.log('New message')
    if (message.type === 'utf8') {
      let jsonData = JSON.parse(message.utf8Data).subchannels
      cachedData = Object.keys(jsonData).map(k => jsonData[k])
    }
  })
})
websocket.connect(wsUri)

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  websocket.connect(wsUri)
  return cachedData
}
