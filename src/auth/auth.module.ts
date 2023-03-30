import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerSchema } from 'src/buyers/buyers.schema';
import { AdminSchema } from 'src/admin/admin.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'buyer',schema:BuyerSchema},{name:'admin',schema:AdminSchema}])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
