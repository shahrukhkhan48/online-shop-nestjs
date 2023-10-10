import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { Roles } from '../users/roles.decorator';
import { RolesGuard } from '../users/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Mutation((returns) => Category)
  async createCategory(
      @Args('createCategoryData') createCategoryData: CreateCategoryDto,
      @Context('user') user: any,
  ) {
    console.log(user);
    return this.categoriesService.create(createCategoryData);
  }
}
