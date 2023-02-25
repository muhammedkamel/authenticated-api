FROM node:16.19-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY . .
RUN yarn install

CMD ["npm", "run", "dev"]