import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { Buyer } from './interfaces/buyer.interface';
import {AuthGuard}  from '@nestjs/passport'


@Controller('buyer')
export class BuyersController {
  constructor(private readonly buyerService: BuyersService) {}
  
  @UseGuards(AuthGuard('jwtBuyer')) 
  @Get('me')
  me(@Body() createBuyerDto: CreateBuyerDto,@Request() req) {
    
    return this.buyerService.me(createBuyerDto);
  }
}
