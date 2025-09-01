import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Декоратор для получения данных пользователя из объекта запроса
export const RequestUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>();
        return request.user; // 'user' - это свойство, которое добавляет AuthGuard
    },
);// src/types/express.d.ts




