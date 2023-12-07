import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { CartModel, CartItemModel } from '../cart/models/cart.model';
import {Module} from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'epam-db.c8ogaalya4y6.eu-north-1.rds.amazonaws.com',
      port: parseInt(process.env.RDS_PORT, 10) || 5432,
      username: process.env.RDS_USERNAME || 'postgres',
      password: process.env.RDS_PASSWORD || 'postgres',
      database: process.env.RDS_DB_NAME || 'postgres',
      synchronize: false, // Set to false in production
      logging: false, // Set to false in production
      models: [CartModel, CartItemModel],
    }),
  ],
})
export class DatabaseModule {}
