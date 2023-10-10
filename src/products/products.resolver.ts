import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { NotFoundException, UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../users/roles.guard';
import { Roles } from '../users/roles.decorator';

@Resolver((of) => Product)
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query((returns) => [Product])
  async products() {
    return this.productsService.findAll();
  }

  @Query((returns) => Product)
  async product(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Roles('admin')
  @Mutation((returns) => Product)
  async createProduct(
      @Args('createProductData') createProductData: CreateProductDto,
      @Context('user') user: any,
  ) {
    if (!user || user.role !== 'admin') {
      throw new ForbiddenException('Only admins can create products');
    }
    return this.productsService.create(createProductData);
  }
}
