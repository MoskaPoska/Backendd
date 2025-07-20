import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Auth} from './entities/auth.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Auth)
        private authRepository: Repository<Auth>,
    ) {}

    async create(userData: Partial<Auth>){
        const newUser = this.authRepository.create(userData);
        return this.authRepository.save(newUser);
    }

    findOneById(id: number): Promise<Auth | null> {
        return this.authRepository.findOneBy({ id });
    }


    findOneByEmail(email: string): Promise<Auth | null> {
        return this.authRepository.findOne({ where: { email }, select: ['id', 'email', 'password', 'firstName', 'lastName', 'isActive'] });
    }
    findAll(): Promise<Auth[]> {
        return this.authRepository.find();
    }

}
