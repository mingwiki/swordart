import config from './config.js'
import connect from 'connect'
import httpProxy from 'http-proxy'
import vhost from 'vhost'
import fs from 'fs'

const vhosts = config.map((item) => {
  const {
    domain,
    target,
    enable_ssl,
    ssl: { key, cert },
  } = item

  const app = connect()
  const proxy = new httpProxy()
  app.use((req, res, next) => {
    proxy.web(req, res, {
      target,
      [enable_ssl ? 'ssl' : null]: {
        key: fs.readFileSync(key, 'utf8').toString(),
        cert: fs.readFileSync(cert, 'utf8').toString(),
      },
    })
  })
  return [enable_ssl, vhost(domain, app)]
})

export default vhosts
