import {Injectable, BadRequestException, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../enums/role.enum';


export type TestUser = {
    userId: number;
    username: string;
    password: string;
    roles?: Role[];
};

@Injectable()
export class UserService {

    private readonly testUsers: TestUser[] = [
        {
            userId: 1,
            username: 'john',
            password: 'changeme',
            roles: [Role.Admin],
        },
        {
            userId: 2,
            username: 'maria',
            password: 'guess',
            roles: [Role.User],
        },
    ];

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}


    async findOneByEmail(email: string): Promise<User | undefined> {

        const userFromDb = await this.usersRepository.findOne({ where: { email } });
        if (userFromDb) {
            return userFromDb;
        }


        const testUser = this.testUsers.find(u => u.username === email);

        if (testUser) {
            const userEntity = new User();
            userEntity.id = testUser.userId;
            userEntity.email = testUser.username;
            // Внимание: пароль здесь не хеширован, что небезопасно для production
            userEntity.password_hash = testUser.password;
            userEntity.name = testUser.username;
            userEntity.role = testUser.roles ? testUser.roles[0] : Role.User;
            return userEntity;
        }

        return undefined;
    }


    async create(email: string, name: string, password_hash: string): Promise<User> {
        const existingUser = await this.findOneByEmail(email);
        if (existingUser) {
            throw new BadRequestException('Користувач із таким email вже існує.');
        }

        const newUser = this.usersRepository.create({ email, name, password_hash });
        return this.usersRepository.save(newUser);
    }
    async updatePassword(id: number, newHashedPassword: string): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Користувач не знайдено');
        }

        user.password_hash = newHashedPassword;
        return this.usersRepository.save(user);
    }
}