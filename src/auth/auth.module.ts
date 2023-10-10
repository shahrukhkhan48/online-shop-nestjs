import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';  // Added PassportModule
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import {UsersModule} from "../users/user.module";

@Module({
    imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'YOUR_SECRET_KEY',  // Used an environment variable
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtModule],  // Export JwtModule as well
})
export class AuthModule {}
