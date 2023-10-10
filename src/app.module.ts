import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { Category } from './categories/category.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {User} from "./users/user.entity";
import {UsersModule} from "./users/user.module";


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: [Product, Category, User],
      synchronize: true,
    }),
    CategoriesModule,
    ProductsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
