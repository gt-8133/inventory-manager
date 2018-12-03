import { createConnection, Connection, ConnectionOptionsReader } from 'typeorm'
import { User, Item, Transaction, StatusType, Notification, TransactionSubscriber } from '../server/entity/Entities'
import * as cors from 'cors'
import models from './models/models'
import * as bodyParser from 'body-parser'
import { isEmpty } from 'lodash'
import * as http from 'http'
import { Server } from 'socket.io'

let connection: Connection
let io: Server

export async function init() {
  connection = await createConnection({
    type: 'sqlite',
    database: './server/test.db',
    entities: [User, Item, Transaction, Notification],
    subscribers: [TransactionSubscriber],
    synchronize: true,
    dropSchema: true,
  })

  const app = require('express')()
  const server = http.createServer(app)
  io = require('socket.io')(server)
  app.use(cors())
  app.use(bodyParser.json())

  Object.keys(models).forEach(key => {
    app.post('/' + key, async (req, res) => {
      console.log(key, '(', req.body)
      const args = req.body
      const toSend = JSON.stringify(await models[key](...args))
      // console.log(toSend)
      res.send(toSend)
    })
  })

  io.on('connection', function(client) {
    console.log('Client connected...')
    // setInterval(() => client.emit('new_event', 'Hello from server'), 1000)

    client.on('join', function(data) {
      console.log(data)
    })
  })

  await server.listen(3333, () => console.log('listening on 3333'))

  return connection
}

export function db() {
  return connection
}

export function getSocket() {
  return io
}
