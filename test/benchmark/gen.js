const fs = require('fs').promises

function randomTitle() {
  const len = Math.floor(Math.random() * 15) + 1
  let title = ''
  for (let i = 0; i < len; i++) {
    title +=
      (i ? ' ' : '') +
      Array(5)
        .fill(0)
        .map((_) => String.fromCharCode(Math.floor(Math.random() * 26) + 97))
        .join('')
  }
  return title
}

async function generateSSRTest() {
  const CNT = 1000

  const open = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body style="width:400px">`

  const close = `
  </body>
  </html>
`

  let withBalancer = open
  let withoutBalancer = open

  for (let i = 0; i < CNT; i++) {
    const title = randomTitle()
    const id = `br_${i}`

    withBalancer += `<h2><span data-br="${id}" data-brr="1" style="display:inline-block;vertical-align:top;text-decoration:inherit">${title}</span><script>self.__wrap_balancer=(t,e,n)=>{n=n||document.querySelector(\`[data-br="\${t}"]\`);let o=n.parentElement,r=y=>n.style.maxWidth=y+"px";n.style.maxWidth="";let i=o.clientWidth,s=o.clientHeight,c=i/2,u=i,f;if(i){for(;c+1<u;)f=~~((c+u)/2),r(f),o.clientHeight==s?u=f:c=f;r(u*e+i*(1-e))}};self.__wrap_balancer("${id}",1)</script></h2>`

    withoutBalancer += `<h2>${title}</h2>`
  }

  withBalancer += close
  withoutBalancer += close

  await fs.writeFile('ssr-balancer.html', withBalancer)
  await fs.writeFile('ssr.html', withoutBalancer)
}

generateSSRTest()
