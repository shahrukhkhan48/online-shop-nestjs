
import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';

@Controller('users')
export class UserController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
    ) {}

    @Post('register')
    async register(@Body() user: any) {
        const createdUser = await this.userService.create(user);
        return this.authService.generateToken(createdUser);
    }

    @Post('login')
    async login(@Req() req: any) {
        const user = await this.userService.validateUser(req.body.username, req.body.password);
        if (!user) {
            return 'Invalid credentials';
        }
        return this.authService.generateToken(user);
    }
}
