import { Connection } from 'typeorm'
import { Item, User, Transaction, StatusType } from './entity/Entities'
import * as faker from 'faker'

export async function seed(connection: Connection) {

  const items: Item[] = [
    {
      id: 0,
      name: 'Pen',
      description: 'its a pen',
      imageUrl:
        'https://images-ext-1.discordapp.net/external/Q088AF2Scmt-fsqNBfBq5vAQkQMxGARJ_ViYfSQoJso/https/www.cultpens.com/imgs/products/cp/950_constW/TM08116~Tombow-Zoom-101-Carbon-Rollerball-Pen_P1.jpg?width=300&height=300',
      quantityUnits: 'count',
      quantity: 5,
      reusable: true,
      createdAt: new Date(),
      location: 'room1',
      updatedAt: new Date(),
      high: 10,
      low: 3,
    }
  ]

  // Array(10)
  //   .fill('')
  //   .map((x, i) => {
  //     const item: Item = {
  //       id: faker.random.number({ min: 0, max: 10000 }),
  //       name: faker.commerce
  //         .productName()
  //         .split(' ')
  //         .slice(1)
  //         .join(' '),
  //       description: faker.lorem.paragraph(),
  //       imageUrl: _getEmojiUrl(faker.random.number({ min: 41, max: 80 })),
  //       quantityUnits: 'count',
  //       reusable: false,
  //       quantity: faker.random.number(20),
  //       location: 'room_1'
  //     }
  //     console.log('adding item', i)
  //     return item
  //   })
  const users: User[] = Array(10)
    .fill('')
    .map(
      (x, i): User => {
        console.log('adding event ', i)
        return {
          id: i * 100,
          age: 14,
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName()
        }
      }
    )
  const transactions: Transaction[] = []
  // Array(10)
  //   .fill('')
  //   .map(
  //     (x, i): Transaction => {
  //       console.log('adding event ', i)
  //       return {
  //         id: i * 100,
  //         item: items[i],
  //         quantity: faker.random.number({ min: 1, max: 4 }),
  //         status: StatusType.CHECKED_OUT,
  //         createdAt: faker.date.past(2),
  //         user: faker.random.arrayElement(users)
  //       }
  //     }
  //   )

  await connection.getRepository(Item).save(items)
  await connection.getRepository(User).save(users)
  await connection.getRepository(Transaction).save(transactions)
}

function _getEmojiUrl(offset: number) {
  return `https://assets-cdn.github.com/images/icons/emoji/unicode/1f3${offset}.png?`
}
