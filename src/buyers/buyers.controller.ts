import { Body, Controller, Get } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { Buyer } from './interfaces/buyer.interface';

@Controller('buyers')
export class BuyersController {
  constructor(private readonly buyerService: BuyersService) {}

  @Get()
  me(@Body() createBuyerDto: CreateBuyerDto) {
    return this.buyerService.me(createBuyerDto);
  }
}
