import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { Product } from './products/product.entity';
import { Category } from './categories/category.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { User } from "./users/user.entity";
import { UsersModule } from "./users/user.module";
import { UsersService } from './users/users.service';
import { AuthModule } from "./auth/auth.module";
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [AuthModule],
      driver: ApolloDriver,
      useFactory: (authService: AuthService) => ({
        autoSchemaFile: 'schema.gql',
        context: async ({ req }) => {
          const token = req.headers.authorization || '';
          const user = await authService.validateUser(token);
          return { user };
        },
      }),
      inject: [AuthService],
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
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService], // Add AuthService here
})
export class AppModule implements OnModuleInit {
  constructor(
      private usersService: UsersService,
      private authService: AuthService, // Inject AuthService
  ) {}

  async onModuleInit() {
    await this.usersService.createAdminUserIfNotExists();
  }
}
