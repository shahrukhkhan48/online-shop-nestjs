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
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { NotFoundException, UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver((of) => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query((returns) => [Product])
  async productsByCategory(@Args('categoryId', { type: () => Int }) categoryId: number) {
    return this.productsService.findAllByCategoryId(categoryId);
  }

  @Query((returns) => Product)
  async product(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    const product = await this.productsService.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => Product)
  async updateProduct(
      @Args('id', { type: () => Int }) id: number,
      @Args('updateProductData') updateProductData: UpdateProductDto,
      @Context('user') user: any,
  ) {
    if (!user || user.role !== 'admin') {
      throw new ForbiddenException('Only admins can update products');
    }
    return this.productsService.update(id, updateProductData);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => Boolean)
  async deleteProduct(
      @Args('id', { type: () => Int }) id: number,
      @Context('user') user: any,
  ) {
    if (!user || user.role !== 'admin') {
      throw new ForbiddenException('Only admins can delete products');
    }
    return this.productsService.delete(id);
  }
}
