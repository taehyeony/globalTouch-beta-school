FROM node:16

COPY package.json /backend/
COPY yarn.lock /backend/
WORKDIR /backend

COPY .  /backend/   

CMD yarn start:dev