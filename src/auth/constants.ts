// src/auth/constants.ts
import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
    secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export const IS_PUBLIC_KEY = 'isPublic'; // Ключ для метаданных
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true); // Декоратор