import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './interfaces/cart.interface';

@Injectable()
export class CartService {

  constructor(@InjectModel('cart') private readonly cartModel : Model<Cart>){}

  create(createCartDto: CreateCartDto) {
    let newCart = this.cartModel.create(createCartDto)
    return newCart;
  }

  findAll() {
    let cartsFound = this.cartModel.find()
    return cartsFound
  }

  findOne(id: string) {
    let cartFound = this.cartModel.findOne({_id:id})
    return cartFound ;
  }

  update(id: string, updateCartDto: UpdateCartDto) {
    let newwCart = this.cartModel.findByIdAndUpdate(id,updateCartDto,{returnDocument:'after'})
    return newwCart ;
  }

  async remove(id: string) {
    let deleteCart =  await this.cartModel.findByIdAndRemove(id)
    return {
      message:'pagnier supprimer ',
      deleteCart
    }
  }
}
