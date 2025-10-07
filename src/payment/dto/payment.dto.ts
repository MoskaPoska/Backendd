import { IsNotEmpty, IsNumber, IsString, Min, MaxLength, IsOptional, IsBase64 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * InitiatePaymentDto - DTO для запроса от клиента на начало оплаты.
 * Используется в POST /payment/initiate.
 */
export class InitiatePaymentDto {
    @ApiProperty({
        example: 10000,
        minimum: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    amount: number;

    @IsString()
    @IsNotEmpty()
    currency: string = 'UAH'

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    orderId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;

    @IsString()
    @IsNotEmpty()
    userId: string;
}

/**
 * WebhookPaymentDto - DTO для данных, приходящих от LiqPay (Server-Server).
 * Используется в POST /payment/webhook.
 */
export class WebhookPaymentDto {
    @ApiProperty({

    })
    @IsString()
    @IsNotEmpty()
    @IsBase64()
    data: string;

    @ApiProperty({

    })
    @IsString()
    @IsNotEmpty()
    @IsBase64()
    signature: string;
}