import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { Buyer } from './interfaces/buyer.interface';

@Injectable()
export class BuyersService {
  constructor(
    @InjectModel('buyer') private readonly buyerModel: Model<Buyer>,
  ) {}
 
  async me(buyer: Buyer) {
    return buyer;
  }
}
