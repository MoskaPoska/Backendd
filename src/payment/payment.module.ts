import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentController } from './payment.controller';
import { LiqpayService} from "./liqpay.service";


@Module({
    imports: [ConfigModule],
    controllers: [PaymentController],
    providers: [LiqpayService],
    exports: [LiqpayService],
})
export class PaymentModule {}
