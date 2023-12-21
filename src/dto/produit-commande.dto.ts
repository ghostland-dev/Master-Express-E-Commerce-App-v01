// src/dto/produit-commande.dto.ts
import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateProduitCommandeDto {
  @IsNumber()
    @Min(1)
    quantite!: number;

  @IsNotEmpty()
    produitId!: number;

  @IsNotEmpty()
    commandeId!: number;
}
