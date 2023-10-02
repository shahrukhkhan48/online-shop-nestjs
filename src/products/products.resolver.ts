import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver((of) => Product)
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

  @Mutation((returns) => Product)
  async createProduct(
    @Args('createProductData') createProductData: CreateProductDto,
  ) {
    return this.productsService.create(createProductData);
  }

}
