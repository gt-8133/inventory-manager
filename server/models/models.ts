import { Item, User, Transaction, StatusType } from '../entity/Entities'
import { db } from '@/browserServer'

export class UserSession {
  public user: User

  constructor(props: UserSession) {
    this.user = props.user
  }

  async checkoutItem(item: Item, quantity: number) {
    const transaction = db()
      .getRepository(Transaction)
      .create({
        status: StatusType.CHECKED_OUT,
        item: item,
        quantity: quantity,
        user: this.user
      })
    const res = await db()
      .getRepository(Transaction)
      .save(transaction)
    console.log(res)
  }
}
