import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  
  _id: string;

  @IsNotEmpty()
  name: string;

  constructor(name: string) {
    this.name = name
  }
}