import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async validateUser(payload: any): Promise<any> {
        return await this.userService.findByUsername(payload.username);
    }

    generateToken(user: any): string {
        return this.jwtService.sign(user);
    }
}
