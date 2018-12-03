import { db } from '../Server'
import {
  Item,
  User,
  Transaction,
  StatusType,
  Notification
} from '../entity/Entities'
// import { fake } from './modelsFake'

// await userSession.checkoutItem(this.dialogItem, this.dialogQuantity)

const fns = {
  async getItem(id: Item['id']) {
    return db()
      .getRepository(Item)
      .findOne({ id })
  },

  async getItems() {
    return db()
      .getRepository(Item)
      .find()
  },

  async deleteItem(id: Item['id']) {
    return db()
      .getRepository(Item)
      .delete(id)
  },

  async saveItem(item: Item) {
    return db()
      .getRepository(Item)
      .save(item)
  },

  async createItem(item: Item) {
    const newItem = db()
      .getRepository(Item)
      .create({ ...item })
    return db()
      .getRepository(Item)
      .save(newItem)
  },
  async getUser() {
    const user = await db()
      .getRepository(User)
      .findOne()
    return user
  },
  async checkoutItem(item: Item, quantity: number, user: User) {
    const transaction = db()
      .getRepository(Transaction)
      .create({
        status: StatusType.CHECKED_OUT,
        item: item,
        quantity: quantity,
        user
      })
    const res = await db()
      .getRepository(Transaction)
      .save(transaction)
    return res
  },

  async getEvents() {
    return db()
      .getRepository(Transaction)
      .find({ relations: ['user', 'item'], order: { createdAt: 1 } })
  },
  async getNotifications() {
    return db()
      .getRepository(Notification)
      .find({
        order: {
          unread: 'DESC'
        },
        relations: ['transaction']
      })
  },
  async read(id: Notification['id']) {
    return db()
      .getRepository(Notification)
      .update({ id }, { unread: false })
  }
}

if (!process.env.SERVER) {
  // @ts-ignore
  // const _exports = module.__proto__.exports
  // console.log('keys, ', _exports)
  // const newExports = {}
  Object.keys(fns).forEach(key => {
    fns[key] = async (...args) => {
      console.log('args', args)
      console.log('key:', key, 'args:', JSON.stringify(args))
      console.log('new fooo')

      const res = await fetch(`http://localhost:3333/${key}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(args)
      })
      const resText = await res.text()
      return resText && JSON.parse(resText)
    }
  })
  // console.log(_exports, newExports)
  // // @ts-ignore
  // module.__proto__.exports = newExports
  // fake()
}

export default fns

// import { Item, User, Transaction, StatusType } from '../entity/Entities'

// export class UserSession {
//   public user: User

//   constructor(props: UserSession) {
//     this.user = props.user
//   }

//   async checkoutItem(item: Item, quantity: number) {
//     const transaction = db()
//       .getRepository(Transaction)
//       .create({
//         status: StatusType.CHECKED_OUT,
//         item: item,
//         quantity: quantity,
//         user: this.user
//       })
//     const res = await db()
//       .getRepository(Transaction)
//       .save(transaction)
//     console.log(res)
//   }
// }
