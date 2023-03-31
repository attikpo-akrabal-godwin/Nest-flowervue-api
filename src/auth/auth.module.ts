import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerSchema } from 'src/buyers/buyers.schema';
import { AdminSchema } from 'src/admin/admin.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtBuyerStrategy } from './strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'buyer', schema: BuyerSchema },
      { name: 'admin', schema: AdminSchema },
    ]),
    JwtModule.register({
      secret:"top",
      signOptions: {expiresIn:'1h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtBuyerStrategy],
})
export class AuthModule {}
