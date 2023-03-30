import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Buyer } from 'src/buyers/interfaces/buyer.interface';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/admin/interfaces/admin.interface';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel('buyer') private readonly buyerModel: Model<Buyer>,
    @InjectModel('admin') private readonly adminModel: Model<Admin>
  ) { }

  async BuyerSignin(buyer: CreateAuthDto) {

    const buyerFound = await this.buyerModel.findOne({ name: buyer.name })
    let isMactch = false
    if (!buyerFound) {
      throw new ForbiddenException('Information incorrecte')
    }

    isMactch = await bcrypt.compare(buyer.password, buyerFound.password)

    if (!isMactch) {
      throw new ForbiddenException('Information incorrecte')
    }

    buyerFound.password = undefined

    return buyerFound
  }

  async BuyerSignup(buyer: CreateAuthDto) {

    const buyerFound = await this.buyerModel.findOne({ name: buyer.name })
    if (buyerFound) {
      throw new BadRequestException('Utlisateur exist deja ')
    }
    buyer.password = await bcrypt.hash(buyer.password, 10)
    let newBuyer = await this.buyerModel.create(buyer)

    newBuyer.password = undefined;
    return newBuyer
  }


  async AdminSignin(admin: CreateAuthDto) {
    const adminFound = await this.adminModel.findOne({ name: admin.name })
    if (!adminFound) {
      throw new ForbiddenException('Information incorrecte')
    }

    let isMactch = false
    isMactch = await bcrypt.compare(admin.password, adminFound.password)
    if (!isMactch) {
      throw new ForbiddenException('Information incorrecte')
    }

    adminFound.password = undefined

    return adminFound
  }

  async AdminSignup(admin: CreateAuthDto) {
    const adminFound = await this.adminModel.findOne({ name: admin.name })
    if (adminFound) {
      throw new BadRequestException('admin exist deja ')
    }
    admin.password = await bcrypt.hash(admin.password, 10)

    let newAdmin = await this.adminModel.create(admin)

    newAdmin.password = undefined

    return newAdmin

  }
}
