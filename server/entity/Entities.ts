import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Timestamp,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne
} from 'typeorm'

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
}
