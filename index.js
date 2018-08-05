const koa = require('koa')
const route = require('koa-path-match')()
const path = require('path')
const send = require('koa-send')
const fs = require('fs')

const { isDirectory, isExists, isImage } = require('./util')
const html = require('./html')
const indexHtml = require('./index.html')

const roots = []

const app = new koa()
app.use(route('/').get(async (ctx, next) => {
  ctx.body = indexHtml(roots)
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
    ctx.body = html(absolutePath, ctx.path)
  }

  await send(ctx, relativePath, { root })
  return
}))

app.listen(3000)
