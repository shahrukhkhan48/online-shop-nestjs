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
import { UpdateProductDto } from './update-product.dto';
import { Product } from "./product.entity";
import { Roles } from '../users/roles.decorator';
import { RolesGuard } from '../users/roles.guard';

@UseGuards(RolesGuard)
@Controller('products')
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

  @Get()
  async findAllByCategoryId(
    @Query('categoryId', ParseIntPipe) categoryId: number,
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
