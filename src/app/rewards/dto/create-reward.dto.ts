import { IsNumber, IsString } from 'class-validator';

export class CreateRewardDto {
  @IsNumber()
  tenant_id: number;

  @IsString()
  description: string;

  @IsString()
  title: string;

  @IsNumber()
  points_cost: number;
}
