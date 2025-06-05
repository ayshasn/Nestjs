// src/store/dto/create-store.dto.ts

import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateStoreDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;
}
