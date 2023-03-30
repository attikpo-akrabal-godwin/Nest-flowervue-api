import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { product } from './interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(@InjectModel('product') private readonly productModel: Model<product>) { }

  async create(createProductDto: CreateProductDto) {
    let productCreated = await this.productModel.create(createProductDto)
    return productCreated
  }

  async findAll() {
    let products = await this.productModel.find()
    return products
  }

  async findOne(id: string) {
    let product = await this.productModel.findOne({ _id: id })
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    let product = await this.productModel.findByIdAndUpdate(id,updateProductDto,{returnDocument:'after'})
    return product
  }

  async remove(id: string) {
    let product = await this.productModel.findByIdAndRemove(id)
    return {message:'success produit  supprimer ',product}
  }
}
