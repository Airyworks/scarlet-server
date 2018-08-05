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

module.exports = {
  isExists,
  isDirectory,
  isImage
}