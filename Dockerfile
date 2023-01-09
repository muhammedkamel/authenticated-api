FROM node:16.19-alpine

WORKDIR /usr/app
COPY package.json .
RUN yarn install
COPY . .
EXPOSE 3000

RUN npx sequelize-cli db:migrate --migrations-path ./src/migrations/