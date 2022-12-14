import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UserInputModel {
  @MaxLength(10)
  @MinLength(3)
  //@IsString()
  @Matches('^[a-zA-Z0-9_-]*$')
  login: string;

  @Matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
  //@IsString()
  email: string;

  @MaxLength(20)
  @MinLength(6)
  //@IsString()
  password: string;
}
