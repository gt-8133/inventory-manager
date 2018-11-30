import 'reflect-metadata'
import { createConnection, Connection, ConnectionOptionsReader } from 'typeorm'
import { User, Item, Transaction, StatusType } from '../server/entity/Entities'

let connection: Connection

export async function init() {
  connection = await createConnection({
    type: 'sqlite',
    database: 'test',
    entities: [User, Item, Transaction],
    synchronize: true,
  })
  return connection
}

export function db() {
  return connection
}
