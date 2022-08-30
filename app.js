import connect from 'connect'
import http from 'http'
import https from 'https'
import vhosts from './vhosts.js'

const http_app = connect()
const https_app = connect()
vhosts.map(([enable_ssl, vhost]) => {
  if (enable_ssl) {
    https_app.use(vhost)
  } else {
    http_app.use(vhost)
  }
})
http.createServer(http_app).listen(process.env.HTTP_PORT || 80)
https.createServer(https_app).listen(process.env.HTTPS_PORT || 443)
