const childProcess = require('child_process')
const path = require('path')
exports.server = new class {
  constructor() {
    this.child = null
    this.onError = (err, _) => {
      throw err
    }
  }
  start(roots, port) {
    if (!this.child) {
      this.child = childProcess.fork(path.join(__dirname, './serve.js'), {
        cwd: process.cwd()
      })
      this.child.send({
        message: 'server-listen',
        data: {
          roots,
          port
        }
      })
      this.child.on('exit', () => {
        this.child = null
      })
      this.child.on('message', msg => {
        if (msg.message === 'on-error') {
          this.cb.apply(this, ...msg.data)
        }
      })
    }
  }
  stop() {
    this.child.send({
      message: 'server-close'
    })
  }
  async isListening() {
    if (!this.child) {
      return false
    }
    return await new Promise(resolve => {
      const onMsg = msg => {
        if (msg.message === 'is-server-listening') {
          this.child.removeListener('message', onMsg)
          resolve(msg.data)
        }
      }
      this.child.on('message', onMsg)
      this.child.send({
        message: 'is-server-listening'
      })
    })
  }
  onError(cb) {
    this.onError = cb
  }
}()
