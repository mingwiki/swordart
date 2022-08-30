const config = [
  {
    domain: 'api.localhost',
    target: {
      host: 'localhost',
      port: 3001,
    },
    enable_ssl: false,
    ssl: {
      key: './certs/example.key',
      cert: './certs/example.pem',
    },
  },
]

export default config
