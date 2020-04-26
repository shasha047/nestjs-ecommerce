import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from 'src/shared/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, private authService: AuthService) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    tempAuth(){
        return {auth:'works'}
    }

    @Post('login')
    async login(@Body() userDTO: LoginDTO) {
        const user = await this.userService.findByLogin(userDTO)
        const payload = {
            username: user.username,
            seller: user.seller,

        }
        const token = await this.authService.signPayload(payload)
        return {user, token}
    }

    @Post('register')
    async register(@Body() userDTO: RegisterDTO) {
        const user = await this.userService.create(userDTO)
        const payload = {
            username: user.username,
            seller: user.seller,

        }
        const token = await this.authService.signPayload(payload)
        return {user, token}
    }
}
