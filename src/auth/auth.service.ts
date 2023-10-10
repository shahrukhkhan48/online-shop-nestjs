import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) {}

    async validateUser(payload: any): Promise<any> {
        return await this.userService.findByUsername(payload.username);
    }

    generateToken(user: any): string {
        return this.jwtService.sign(user);
    }
}
