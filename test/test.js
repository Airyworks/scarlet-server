const server = require('../src').server
const path = require('path')

server.onError = (err, ctx) => {
  console.log(err, ctx)
}
server.start([path.join(__dirname, '../src')], 3000)

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
