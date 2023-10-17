ARG NODE_VERSION=18.18.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
