const fs = require('fs')
const path = require('path')
const imageExt = ['.png', '.jpg', '.jpeg', '.gif']

function isImage(dir) {
  if (!isExists(dir) || isDirectory(dir)) {
    return false
  } else {
    return !!imageExt.find(v => v === path.extname(dir))
  }
}

function isExists(dir) {
  return fs.existsSync(dir)
}

function isDirectory(dir) {
  const stats = fs.statSync(dir)
  return stats.isDirectory()
}

function getDirs(dir, ctxDir) {
  const items = fs.readdirSync(dir)

  return items.map(item => {
    const realPath = path.join(dir, item)
    if (isDirectory(realPath)) {
      const itemPath = path.posix.join(ctxDir, item)
      return {
        href: itemPath,
        html: item
      }
    }
  }).filter(item => item)
}

function getImages(dir, ctxDir) {
  const items = fs.readdirSync(dir)

  return items.map(item => {
    const realPath = path.join(dir, item)
    if (isImage(realPath)) {
      const itemPath = path.posix.join(ctxDir, item)
      return {
        src: itemPath
      }
    }
  }).filter(item => item)
}

module.exports = {
  isExists,
  isDirectory,
  isImage,
  getDirs,
  getImages
}