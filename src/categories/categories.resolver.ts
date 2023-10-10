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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query((returns) => [Category])
  async categories() {
    return this.categoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
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
