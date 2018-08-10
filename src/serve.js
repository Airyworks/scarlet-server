const koa = require('koa')
const route = require('koa-path-match')()
const path = require('path')
const send = require('koa-send')
const render = require('koa-art-template')

const { isDirectory, isExists, getDirs, getImages } = require('./util')

let app = null
let server = null

process.on('message', msg => {
  switch (msg.message) {
    case 'server-listen':
      let roots = msg.data.roots
      if (!Array.isArray(roots)) {
        roots = [roots]
      }
      const port = msg.data.port

      app = new koa()

      render(app, {
        root: path.join(__dirname, 'view'),
        extname: '.art',
        debug: process.env.NODE_ENV !== 'production'
      })

      app.use(route('/').get(async (ctx, next) => {
        ctx.render('index', {
          roots
        })
        return
      }))

      app.use(route('/:index(\\d+)/:path*').get(async (ctx, next) => {
        const index = parseInt(ctx.params.index)
        if (!(index in roots)) {
          ctx.statusCode = 404
          return
        }
        if (!ctx.params.path) {
          ctx.params.path = []
        }
        const root = roots[index]
        const relativePath = '/' + ctx.params.path.join('/')
        const absolutePath = path.join(root, relativePath)
        if (isExists(absolutePath) && isDirectory(absolutePath)) {
          ctx.render('gallery', {
            backUrl: path.posix.join(ctx.path, '../'),
            dirs: getDirs(absolutePath, ctx.path),
            images: getImages(absolutePath, ctx.path)
          })
        }

        await send(ctx, relativePath, { root })
        return
      }))

      app.onerror = (err, ctx) => {
        process.send({
          message: 'on-error',
          data: [err.toString(), ctx]
        })
      }

      server = app.listen(port)
      break
    case 'is-server-listening':
      process.send({
        message: 'is-server-listening',
        data: server ? server.listening : false
      })
      break
    case 'server-close':
      server.close()
      server = null
      process.exit()
    }
})
