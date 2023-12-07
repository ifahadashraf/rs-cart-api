// src/cart/cart.model.ts

import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';

@Table({
  timestamps: true,
  underscored: true,
})
export class CartModel extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  created_at: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  updated_at: Date;

  @Column({
    type: DataType.ENUM('OPEN', 'ORDERED'),
    allowNull: false,
    defaultValue: 'OPEN',
  })
  status: string;
}

@Table({
  tableName: 'cart_items',
  timestamps: false,
})
export class CartItemModel extends Model {
  @ForeignKey(() => CartModel)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'cart_id',
  })
  cart_id: string;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  product_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  count: number;
}