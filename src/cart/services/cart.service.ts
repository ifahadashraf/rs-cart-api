import { Injectable } from '@nestjs/common';

import {Cart} from '../models';
import {InjectModel} from '@nestjs/sequelize';
import {CartItemModel, CartModel} from '../models/cart.model';
import {Sequelize} from 'sequelize-typescript';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartModel)
    private readonly cartModel: typeof CartModel,
    @InjectModel(CartItemModel)
    private readonly cartItemModel: typeof CartItemModel,
    private readonly sequelize: Sequelize,
  ) {}

  async findByUserId(user_id: string): Promise<Cart | null> {
    const cart = await this.cartModel.findOne({ where: { user_id } });
    const items = await this.cartItemModel.findAll({ where: { cart_id: cart.id }})
    return {
      id: cart.id,
      items: items.map(x => ({ product: x, count: x.count })),
    }
  }

  async createByUserId(user_id: string): Promise<Cart> {
    const transaction = await this.sequelize.transaction();
    try {
      const cart = await this.cartModel.create({ user_id }, { transaction });
      await transaction.commit();
      return { id: cart.id, items: [] };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findOrCreateByUserId(user_id: string): Promise<Cart> {
    const [cart, created] = await this.cartModel.findOrCreate({
      where: { user_id },
      defaults: { user_id },
    });
    return { id: cart.id, items: [] };
  }

  async updateByUserId(user_id: string, status: string): Promise<Cart> {
    await this.cartModel.update({ status }, { where: { user_id } });
    return this.findByUserId(user_id);
  }

  async removeByUserId(user_id: string): Promise<number> {
    return this.cartModel.destroy({ where: { user_id } });
  }
}
