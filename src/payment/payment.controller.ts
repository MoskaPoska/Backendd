import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LiqpayService } from './liqpay.service';

class CreatePaymentDto {
    amount: number;
    orderId: string;
    description: string;
}

@Controller('payments')
export class PaymentController {
    constructor(private liqpayService: LiqpayService) {}

    @Post('create')
    @HttpCode(HttpStatus.OK)
    async createPayment(@Body() body: CreatePaymentDto) {
        try {
            const liqpayResponse = await this.liqpayService.createPayment(
                body.amount,
                body.orderId,
                body.description,
            );

            return {
                success: true,
                message: 'Payment request sent to LiqPay',
                details: liqpayResponse
            };

        } catch (error) {
            throw error;
        }
    }
}