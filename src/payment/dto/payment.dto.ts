import { IsNotEmpty, IsNumber, IsString, Min, MaxLength, IsOptional, IsBase64 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * InitiatePaymentDto - DTO для запроса от клиента на начало оплаты.
 * Используется в POST /payment/initiate.
 */
export class InitiatePaymentDto {
    @ApiProperty({
        description: 'Сума платежу в гривнях. Мінімум 1.',
        example: 100,
        minimum: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    amount: number;

    @ApiProperty({
        description: 'Валюта платежу (зазвичай UAH, USD, EUR).',
        example: 'UAH',
    })
    @IsString()
    @IsNotEmpty()
    currency: string = 'UAH'

    @ApiProperty({
        description: 'Унікальний ідентифікатор замовлення у вашій системі (max 100 символів).',
        maxLength: 100,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    orderId: string;

    @ApiProperty({
        description: 'Опис товару чи послуги, за які здійснюється оплата (max 255 символів).',
        maxLength: 255,
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;

    @ApiProperty({
        description: 'Ідентифікатор користувача, який здійснює платіж.',
    })
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
        description: 'Закодовані (Base64) дані транзакції від LiqPay.',
    })
    @IsString()
    @IsNotEmpty()
    @IsBase64()
    data: string;

    @ApiProperty({
        description: 'Електронний підпис (Base64) для верифікації цілісності даних LiqPay.',
    })
    @IsString()
    @IsNotEmpty()
    @IsBase64()
    signature: string;
}