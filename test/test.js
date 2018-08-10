const server = require('../src').server
const path = require('path')

server.onError = (err, ctx) => {
  console.error(err, ctx)
}
const dir = path.join(__dirname, '../src')
server.start([dir], 3000)

setTimeout(() => {
  server.isListening().then(res => {
    console.log(res)
    setTimeout(() => {
      server.stop()
      setTimeout(() => {
        server.isListening().then(res => {
          console.log(res)
        })
      }, 500)
    }, 500)
  })
}, 500)
