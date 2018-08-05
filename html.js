const path = require('path')
const fs = require('fs')
const { isDirectory, isExists, isImage } = require('./util')
module.exports = (dir, ctxPath) => {
  const backUrl = path.join(ctxPath, '../')
  let html = `<div class="picture"><a href="${backUrl}">返回上级</a></div>`

  const items = fs.readdirSync(dir)

  // dirs

  for (const item of items) {
    const realPath = path.join(dir, item)
    if (isDirectory(realPath)) {
      const itemPath = path.join(ctxPath, item)
      html += `<div class="picture"><a href="${itemPath}">${item}</a></div>`
    }
  }

  // images

  for (const item of items) {
    const realPath = path.join(dir, item)
    if (isImage(realPath)) {
      const itemPath = path.join(ctxPath, item)
      html += `<div class="picture"><img src="${itemPath}"></img></div>`
    }
  }

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>scarlet internal server</title>
  </head>
  <body>
    <div id="gallery">${html}</div>
  </body>
  <style>
    #gallery {
      width: 90vw;
      margin: auto;
    }

    .picture {
      width: 100%;
      margin: 10px 0 10px 0;
    }

    .picture > img {
      width: 100%;
    }
  </style>
  </html>
`
}