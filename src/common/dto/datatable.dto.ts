import {
    IsEnum,
    IsInt,
    IsString,
    ValidateNested,
    IsObject,
    IsNumber
} from 'class-validator';

import { Transform, Type } from 'class-transformer';
import { OrderType } from '../interfaces/datatable.interface';


class FiltersDto {
    @IsString()
    name: string;
    
    @IsString()
    value: string;

    @IsString()
    operator: string;
}

export class DatatableDto {

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    page: number = 10;

    @Transform(({ value }) => parseInt(value))
    @IsInt()
    limit: number = 1;

    @IsString()
    orderBy: string = 'id'

    @IsString()
    orderType: OrderType = OrderType.DESC

    @ValidateNested({ each: true })
    @Type(() => FiltersDto)
    filters: FiltersDto[];
    
}

