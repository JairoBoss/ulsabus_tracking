import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist/decorators';
import { ApiResponse } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { LoginUserDto } from './dto/login.dto';

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Inicio de sesion exitoso',
    type: User,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  loginUser(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Post('validate')
  @Auth()
  validateToken(@GetUser() user: User) {
    return user;
  }
}
