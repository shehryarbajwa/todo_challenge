const app = require('./app')
const http = require('http')
const config = require('./utils/config.js')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`Server listening on port ${config.PORT}`)
})