FROM node:24.22.3-alpine3.23

ARG NODE_ENV="development"

RUN mkdir -p ./client

WORKDIR /client

COPY package*.json ./

COPY . .

EXPOSE 5173

RUN npm install

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]