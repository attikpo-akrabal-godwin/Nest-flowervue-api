import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuyersModule } from './buyers/buyers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [BuyersModule,MongooseModule.forRoot('mongodb://localhost:27017/flowerDb'), ProductModule, AdminModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
