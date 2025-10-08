import {Controller, Post, Body, HttpCode, HttpStatus, Res} from '@nestjs/common';
import { LiqpayService } from './liqpay.service';
import {ConfigService} from "@nestjs/config";
import { Response } from 'express';
import {Public} from "../modules/auth/constants";


class CreatePaymentDto {
    amount: number;
    orderId: string;
    description: string;
}

@Controller('payments')
export class PaymentController {
    constructor(private liqpayService: LiqpayService,
                private configService: ConfigService)
    {}

    @Post('create')
    @HttpCode(HttpStatus.OK)
    @Public()
    async createPayment(@Body() body: CreatePaymentDto) {

        const liqpayData = this.liqpayService.generatePaymentData(
            body.amount,
            body.orderId,
            body.description,
        );


        return {
            success: true,
            message: 'Data generated for LiqPay redirect',
            ...liqpayData,

            liqpayUrl: 'https://www.liqpay.ua/api/3/checkout',
        };
    }
    @Post('callback')
    @HttpCode(HttpStatus.OK)
    async liqpayCallback(@Body() body: { data: string, signature: string }) {
        if (!body.data || !body.signature) {
            console.error('LiqPay Callback: Missing data or signature.');
            return { status: 'error', message: 'Missing parameters' };
        }

        if (!this.liqpayService.isSignatureValid(body.data, body.signature)) {
            console.error('LiqPay Callback: Invalid signature!');
            return { status: 'error', message: 'Invalid signature' };
        }

        const paymentData = this.liqpayService.decodeData(body.data);
        console.log('LiqPay Callback Data Received:', paymentData);

        const orderId = paymentData.order_id;
        const status = paymentData.status;

        try {
            await this.updateOrderStatus(orderId, status);

            return { status: 'ok', order_id: orderId, new_status: status };

        } catch (error) {
            console.error(`Failed to process order ${orderId}:`, error.message);
            return { status: 'error', message: 'Internal processing error' };
        }
    }

    /**
     * Умовний метод для оновлення статусу замовлення в базі даних.
     */
    private async updateOrderStatus(orderId: string, status: string): Promise<void> {
        console.log(`[DB UPDATE] Order ${orderId} status changed to: ${status}`);

        if (status === 'success' || status === 'sandbox') {
        }
    }
    @Post('return')
    async liqpayReturn(
        @Body() body: { data: string, signature: string },
        @Res() res: Response
    ) {

        const paymentData = this.liqpayService.decodeData(body.data);
        const status = paymentData.status;
        const orderId = paymentData.order_id;

        const frontendBaseUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:4200';

        let redirectUrl;

        if (status === 'success' || status === 'sandbox') {

            redirectUrl = `${frontendBaseUrl}/payment/success?order=${orderId}`;
        } else {
            redirectUrl = `${frontendBaseUrl}/payment/failure?order=${orderId}&status=${status}`;
        }

        return res.redirect(302, redirectUrl);
    }
}