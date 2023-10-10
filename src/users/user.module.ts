import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: 'YOUR_SECRET_KEY',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [UsersService, AuthService],
    controllers: [UserController],
    exports: [UsersService]
})
export class UsersModule {}