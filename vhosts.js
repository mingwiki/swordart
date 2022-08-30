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
  const proxy = httpProxy.createProxyServer()
  app.use((req, res, next) => {
    proxy.web(req, res, {
      target,
      [enable_ssl ? 'ssl' : null]: {
        key: fs.readFileSync(key, 'utf8'),
        cert: fs.readFileSync(cert, 'utf8'),
      },
      [enable_ssl ? 'secure' : null]: true,
      ciphers: [
        'ECDHE-RSA-AES128-SHA256',
        'DHE-RSA-AES128-SHA256',
        'AES128-GCM-SHA256',
        'RC4',
        'HIGH',
        'MD5',
        'aNULL',
      ].join(':'),
    })
  })
  return [enable_ssl, vhost(domain, app)]
})

export default vhosts
