import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';
import { NotFoundException } from '@nestjs/common';

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query((returns) => [Category])
  async categories() {
    return this.categoriesService.findAll();
  }

  @Query((returns) => Category)
  async category(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Category> {
    const category = await this.categoriesService.findById(id);
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  @Mutation((returns) => Category)
  async createCategory(
    @Args('createCategoryData') createCategoryData: CreateCategoryDto,
  ) {
    return this.categoriesService.create(createCategoryData);
  }

}
