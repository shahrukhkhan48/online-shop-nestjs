import {Controller, Post, Body, Req, ForbiddenException, UseGuards} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from './users.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('users')
export class UserController {
    constructor(
        private userService: UsersService,
        private authService: AuthService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post('register')
    async register(@Req() req: any, @Body() user: any) {
        if (user.role === 'admin' && (!req.user || req.user.role !== 'admin')) {
            throw new ForbiddenException('Only admins can create new admin users');
        }

        const createdUser = await this.userService.create(req.user?.role, user);
        const token = await this.authService.generateToken(createdUser);
        return { Authorization: "Bearer "+token };
    }

    @Post('login')
    async login(@Req() req: any) {
        const user = await this.userService.validateUser(req.body.username, req.body.password);
        if (!user) {
            return 'Invalid credentials';
        }
        const token = await this.authService.generateToken(user);
        return { Authorization: "Bearer "+token };
    }
}
