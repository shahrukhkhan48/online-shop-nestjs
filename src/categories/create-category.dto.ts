import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryDto {
  @Field()
  readonly name: string;
}
