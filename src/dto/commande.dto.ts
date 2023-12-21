// src/dto/commande.dto.ts
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateCommandeDto {
  @IsDate()
    date!: Date;

  @IsNotEmpty()
    utilisateurId!: number;
}
