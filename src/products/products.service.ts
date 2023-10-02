import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './create-product.dto';
import { Category } from '../categories/category.entity';
import { UpdateProductDto } from './update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product | null> {

    const category = await this.categoriesRepository.findOne({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createProductDto.categoryId} not found`,
      );
    }

    const product = new Product();
    product.categoryId = createProductDto.categoryId;
    product.name = createProductDto.name;
    product.price = createProductDto.price;

    return await this.productsRepository.save(product);
  }

  async findAllByCategoryId(categoryId: number): Promise<Product[]> {
    return await this.productsRepository.find({ where: { categoryId } });
  }

  async findById(id: number): Promise<Product | null> {
    return await this.productsRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    const product = await this.findById(id);
    if (!product) return null;

    if (updateProductDto.name !== undefined) {
      product.name = updateProductDto.name;
    }
    if (updateProductDto.price !== undefined) {
      product.price = updateProductDto.price;
    }

    return await this.productsRepository.save(product);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.productsRepository.delete(id);
    return result.affected > 0;
  }
}
