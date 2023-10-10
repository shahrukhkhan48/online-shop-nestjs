import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductDto {
  @Field(() => Int)
  categoryId: number;

  @Field()
  name: string;

  @Field(() => Int)
  price: number;
}

@InputType()
export class UpdateProductDto {
  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  price?: number;
}
