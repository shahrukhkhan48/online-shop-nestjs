import { InputType, Field, Int } from '@nestjs/graphql';
@InputType()
export class CreateProductDto {
  @Field((type) => Int)
  readonly categoryId: number;
  @Field()
  readonly name: string;
  @Field((type) => Int)
  readonly price: number;
}
