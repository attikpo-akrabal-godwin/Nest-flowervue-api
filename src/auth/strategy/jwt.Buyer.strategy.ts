import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Admin } from "src/admin/interfaces/admin.interface";
import { Buyer } from "src/buyers/interfaces/buyer.interface";

@Injectable()
export class JwtBuyerStrategy extends PassportStrategy(Strategy, 'jwtBuyer') {
    constructor(
        @InjectModel('buyer') private readonly buyerModel: Model<Buyer>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'top'
        })
    }
    async validate(payload: { sub: string, name: string }) {

        let buyerFound = await this.buyerModel.findOne({ _id: payload.sub })
        if (!buyerFound) {
            throw new ForbiddenException('veillez vous reconnecter ');
        }
        return { buyer:buyerFound };
    }
}