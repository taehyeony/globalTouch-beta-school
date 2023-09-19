FROM node:16

COPY package.json /backend/
COPY yarn.lock /backend/
WORKDIR /backend

COPY .  /backend/   

RUN npm rebuild bcrypt --build-from-source

CMD yarn start:dev