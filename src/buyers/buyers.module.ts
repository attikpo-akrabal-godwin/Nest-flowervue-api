import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyersController } from './buyers.controller';
import { BuyerSchema } from './buyers.schema';
import { BuyersService } from './buyers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'buyer', schema: BuyerSchema }]),
  ],
  controllers: [BuyersController],
  providers: [BuyersService],
})
export class BuyersModule {}
