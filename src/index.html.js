module.exports = roots => {
  let html = ''

  for (const i in roots) {
    html += `<div class="picture"><a href="${i}/">${roots[i]}</a></div>`
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