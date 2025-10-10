import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class LiqpayService {
    private readonly LIQPAY_PUBLIC_KEY: string;
    private readonly LIQPAY_PRIVATE_KEY: string;
    private readonly LIQPAY_API_URL = 'https://www.liqpay.ua/api/request';

    constructor(private configService: ConfigService) {
        this.LIQPAY_PUBLIC_KEY = this.configService.get<string>('LIQPAY_PUBLIC_KEY')!;
        this.LIQPAY_PRIVATE_KEY = this.configService.get<string>('LIQPAY_PRIVATE_KEY')!;

        if (!this.LIQPAY_PUBLIC_KEY || !this.LIQPAY_PRIVATE_KEY) {
            throw new InternalServerErrorException('Ключі LiqPay не налаштовані в конфігурації.');
        }
    }

    private generateLiqPayDataAndSignature(params: any): { data: string, signature: string } {
        const dataString = JSON.stringify({
            ...params,
            public_key: this.LIQPAY_PUBLIC_KEY,
            version: 3,
        });

        const data = Buffer.from(dataString).toString('base64');

        const signatureString = this.LIQPAY_PRIVATE_KEY + data + this.LIQPAY_PRIVATE_KEY;

        const signature = crypto
            .createHash('sha1')
            .update(signatureString)
            .digest('base64');

        return { data, signature };
    }

    public generatePaymentData(amount: number, order_id: string, description: string): { data: string, signature: string } {
        const clientReturnUrl = this.configService.get<string>('LIQPAY_CLIENT_RETURN_URL') || 'http://localhost:3000/payments/return';

        const serverCallbackUrl = this.configService.get<string>('LIQPAY_SERVER_CALLBACK_URL') || 'http://localhost:3000/payments/callback';

        const paymentParams = {
            action: 'pay',
            amount: amount.toFixed(2),
            currency: 'UAH',
            description: description,
            order_id: order_id,

            result_url: clientReturnUrl,

            server_url: serverCallbackUrl,

            language: 'uk',
        };

        return this.generateLiqPayDataAndSignature(paymentParams);
    }

    // public async createPayment(amount: number, order_id: string, description: string): Promise<any> {
    //     const paymentParams = {
    //         action: 'pay',
    //         amount: amount.toFixed(2),
    //         currency: 'UAH',
    //         description: description,
    //         order_id: order_id,
    //         server_url: this.configService.get<string>('LIQPAY_SERVER_CALLBACK_URL'),
    //
    //         language: 'uk',
    //     };
    //
    //     const { data, signature } = this.generateLiqPayDataAndSignature(paymentParams);
    //
    //     const formData = new URLSearchParams();
    //     formData.append('data', data);
    //     formData.append('signature', signature);
    //
    //     try {
    //         const response: AxiosResponse = await axios.post(this.LIQPAY_API_URL, formData.toString(), {
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //         });
    //
    //         return response.data;
    //     } catch (error) {
    //         console.error('LiqPay API Error:', error.response?.data || error.message);
    //         throw new InternalServerErrorException('Помилка при створенні платежу через LiqPay API.');
    //     }
    // }
    public decodeData(data: string): any {
        try {
            const decodedString = Buffer.from(data, 'base64').toString('utf8');
            return JSON.parse(decodedString);
        } catch (e) {
            console.error('Failed to decode/parse LiqPay data:', e);
            throw new InternalServerErrorException('Отримано недійсний формат даних від LiqPay.');
        }
    }
    public isSignatureValid(data: string, signature: string): boolean {
        const signatureString = this.LIQPAY_PRIVATE_KEY + data + this.LIQPAY_PRIVATE_KEY;

        const calculatedSignature = crypto
            .createHash('sha1')
            .update(signatureString)
            .digest('base64');

        return calculatedSignature === signature;
    }
}