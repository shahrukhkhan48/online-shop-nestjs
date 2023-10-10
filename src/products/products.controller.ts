import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './create-product.dto';
import { UpdateProductDto } from './product.dto';
import { Product } from "./product.entity";
import { Roles } from '../users/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('products')
@Controller('category')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Roles('admin')
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Roles('admin')
  @Put(':id')
  async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return await this.productsService.findById(id);
  }

  @Get(':categoryId/products')
  async findAllByCategoryId(
      @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<Product[]> {
    return await this.productsService.findAllByCategoryId(categoryId);
  }

  @Roles('admin')
  @Delete(':id')
  async delete(
      @Param('id', ParseIntPipe) id: number,
  ): Promise<{ success: boolean }> {
    const success = await this.productsService.delete(id);
    return { success };
  }
}
