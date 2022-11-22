import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsString,
  IsUrl,
  MaxLength,
  Matches,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class BlogInputModel {
  //@IsString()
  //@IsNotEmpty()
  //@Transform(({ value }: TransformFnParams) => value?.trim())
  //@MinLength(1)
  @IsNotEmpty()
  @MaxLength(15)
  readonly name: string;

  @IsNotEmpty()
  @MaxLength(500)
  readonly description: string;

  //@IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(
    '^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$',
  )
  readonly websiteUrl: string;
}
