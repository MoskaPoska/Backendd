# Dockerfile для NestJS Backend
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build # Собираем проект (если у вас есть шаг сборки)

EXPOSE 3000 #

CMD ["npm", "run", "start:dev"]