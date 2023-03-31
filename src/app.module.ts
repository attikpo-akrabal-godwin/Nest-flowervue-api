import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuyersModule } from './buyers/buyers.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath:['.env.development.local','.env.development','.env.production'] }),
    BuyersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory:async (config:ConfigService)=>({
        uri: config.get('DATABASE')
      })
    }),
    ProductModule,
    AdminModule,
    AuthModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
