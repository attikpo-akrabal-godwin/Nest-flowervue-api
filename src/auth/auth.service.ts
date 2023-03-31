import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Buyer } from 'src/buyers/interfaces/buyer.interface';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/admin/interfaces/admin.interface';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('buyer') private readonly buyerModel: Model<Buyer>,
    @InjectModel('admin') private readonly adminModel: Model<Admin>,
    private jwt : JwtService
  ) {}
  
  async BuyerSignin(buyer: CreateAuthDto) {

    const buyerFound = await this.buyerModel.findOne({ name: buyer.name });
    let isMactch = false;
    if (!buyerFound) {
      throw new ForbiddenException('Information incorrecte');
    }

    isMactch = await bcrypt.compare(buyer.password, buyerFound.password);

    if (!isMactch) {
      throw new ForbiddenException('Information incorrecte');
    }

    buyerFound.password = undefined;

    return {
      buyer:buyerFound,
      access_token: await this.signToken(buyerFound._id.toString(),buyerFound.name,buyerFound.age)
    };
  }

  async BuyerSignup(buyer: CreateAuthDto) {
    const buyerFound = await this.buyerModel.findOne({ name: buyer.name });
    if (buyerFound) {
      throw new BadRequestException('Utlisateur exist deja ');
    }
    buyer.password = await bcrypt.hash(buyer.password, 10);
    let newBuyer = await this.buyerModel.create(buyer);

    newBuyer.password = undefined;
    return {
      buyer:newBuyer,
      access_token:this.signToken(newBuyer._id.toString(),newBuyer.name,newBuyer.age)
    };
  }

  async AdminSignin(admin: CreateAuthDto) {
    const adminFound = await this.adminModel.findOne({ name: admin.name });
    if (!adminFound) {
      throw new ForbiddenException('Information incorrecte');
    }

    let isMactch = false;
    isMactch = await bcrypt.compare(admin.password, adminFound.password);
    if (!isMactch) {
      throw new ForbiddenException('Information incorrecte');
    }

    adminFound.password = undefined;

    return {
      admin:adminFound,
      access_token:this.signToken(adminFound._id.toString(),adminFound.name)
    };
    
  }

  async AdminSignup(admin: CreateAuthDto) {
    const adminFound = await this.adminModel.findOne({ name: admin.name });
    if (adminFound) {
      throw new BadRequestException('admin exist deja ');
    }
    admin.password = await bcrypt.hash(admin.password, 10);

    let newAdmin = await this.adminModel.create(admin);

    newAdmin.password = undefined;

    return {
      admin:newAdmin,
      access_token:this.signToken(newAdmin._id.toString(),newAdmin.name)
    };
  }

   async signToken(userId:string,username:string,age?:number){
    const payload = {
      sub:userId,
      name:username,
      age
    }
    return await this.jwt.signAsync(payload,{
      secret:'top'
    })
  }
}
