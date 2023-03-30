import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('buyer/signin')
  BuyerSignin(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.BuyerSignin(createAuthDto);
  }

  @Post('buyer/signup')
  BuyerSignup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.BuyerSignup(createAuthDto);
  }

  @Post('admin/signin')
  AdminSignin(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.AdminSignin(createAuthDto);
  }

  @Post('admin/signup')
  AdminSignup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.AdminSignup(createAuthDto);
  }
}
