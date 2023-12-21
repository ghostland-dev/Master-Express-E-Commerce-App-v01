
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProduitDto {
  @IsString()
    @IsNotEmpty()
    image!: string;

  @IsString()
    @IsNotEmpty()
    nom!: string;

  @IsString()
    @IsNotEmpty()
    description!: string;

  @IsNumber()
    @Min(0)
    prix!: number;
}
