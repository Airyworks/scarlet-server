const server = require('../src').server


server.onError = (err, ctx) => {
  console.log(err, ctx)
}
server.start(["E:\\TDdownloads\\complete"], 3000)

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
