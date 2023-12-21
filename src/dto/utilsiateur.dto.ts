// src/dto/utilisateur.dto.ts
import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateUtilisateurDto {
  @IsString()
    @IsNotEmpty()
    nom!: string;

  @IsString()
    @IsNotEmpty()
    prenom!: string;

  @IsEmail()
    @IsNotEmpty()
    email!: string;

  @IsString()
    @IsNotEmpty()
    motDePasse!: string;

  @IsOptional()
  @IsString()
  role?: string;
}
