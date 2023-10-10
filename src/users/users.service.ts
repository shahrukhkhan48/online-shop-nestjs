import {ForbiddenException, Injectable} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async create(creatorRole: string, user: User): Promise<User> {
        // If the new user is an admin, ensure the creator is also an admin
        if (user.role === 'admin' && creatorRole !== 'admin' && creatorRole !== null) {
            throw new ForbiddenException('Only admins can create new admin users');
        }
        user.password = await bcrypt.hash(user.password, 10);
        return await this.userRepository.save(user);
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userRepository.findOne({ where: { username: username } });
        if (user && await bcrypt.compare(pass, user.password)) { // Comparing the hashed password
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({ where: { username: username } });
    }

    async createAdminUserIfNotExists() {
        const adminUser = await this.findByUsername('admin');
        if (!adminUser) {
            const newAdmin = new User();
            newAdmin.username = 'admin';
            newAdmin.password = 'admin';
            newAdmin.role = 'admin';
            // Passing null as creatorRole to bypass the role check
            await this.create(null, newAdmin);
        }
    }

}
