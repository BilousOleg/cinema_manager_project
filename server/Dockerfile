FROM node:24.22.3-alpine3.23

ARG NODE_ENV="development"

RUN mkdir -p ./server

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD sequelize db:migrate && sequelize db:seed:all && npm run dev 