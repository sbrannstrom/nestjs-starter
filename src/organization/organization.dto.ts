import { User } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  orgNumber?: string;
}