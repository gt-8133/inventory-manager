import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Timestamp,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  AfterInsert,
  EventSubscriber,
  EntitySubscriberInterface,
  BeforeInsert,
  InsertEvent
} from 'typeorm'
import { db, getSocket } from '../Server'

export enum StatusType {
  RETURNED = 'returned',
  CHECKED_OUT = 'checked_out',
  LOST = 'lost',
  NOT_APPLICABLE = 'not_applicable'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn() id!: number

  @Column() firstName!: string

  @Column() lastName!: string

  @Column() age!: number
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn() id!: number

  @UpdateDateColumn() updatedAt?: Date

  @CreateDateColumn() createdAt?: Date

  @Column() name!: string

  @Column() description!: string

  @Column() imageUrl!: string

  @Column() low!: number

  @Column() high!: number

  @Column() quantity!: number

  @Column() quantityUnits!: string

  @Column() reusable!: boolean

  @Column() location!: string
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn() id!: number

  @ManyToOne(type => Item)
  @JoinColumn()
  item!: Item

  @Column() quantity!: number

  @CreateDateColumn() createdAt?: Date

  @Column({ type: 'varchar' })
  status!: StatusType

  @ManyToOne(type => User)
  user!: User

  @AfterInsert()
  async changeItem() {
    await db()
      .createQueryBuilder()
      .update(Item)
      .set({ quantity: () => `quantity - ${this.quantity}` })
      .where('id = :id', { id: this.item.id })
      .execute()

    // const item = await db()
    //   .getRepository(Item)
    //   .findOne({ id: this.item.id })
    // const oldQuantity = this.item.quantity
    // item.quantity = item.quantity - this.quantity
    // console.log(item.name, oldQuantity + '->' + item.quantity)
    // await db()
    //   .getRepository(Item)
    //   .update(item,
  }
}

@Entity()
export class Notification {
  @PrimaryGeneratedColumn() id!: number

  @Column() unread: boolean = true

  @ManyToOne(type => Transaction)
  @JoinColumn()
  transaction!: Transaction

  @ManyToOne(type => User)
  @JoinColumn()
  user!: User

}

@EventSubscriber()
export class TransactionSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Transaction
  }

  @AfterInsert()
  async afterInsert(event: InsertEvent<Transaction>) {
    console.log('new transaction')
    const transaction = event.entity
    if (transaction.item.quantity < transaction.item.low) {
      console.log('new notif')
      const notification = db().getRepository(Notification).create({
        transaction,
        user: transaction.user
      })

      await db().getRepository(Notification).save(notification)



      getSocket().emit('notification')
    }
  }
}
