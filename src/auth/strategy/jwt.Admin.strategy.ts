import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Model } from "mongoose";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Admin } from "src/admin/interfaces/admin.interface";
import { Buyer } from "src/buyers/interfaces/buyer.interface";

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'jwtAdmin') {
    constructor(
        @InjectModel('admin') private readonly adminModel: Model<Admin>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'top'
        })
    }
    async validate(payload: { sub: string, name: string }) {

        let adminFound = await this.adminModel.findOne({ _id: payload.sub })
        if (!adminFound) {
            throw new ForbiddenException('veillez vous reconnecter ');
        }
        return { admin:adminFound };
    }
}