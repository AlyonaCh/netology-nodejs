FROM node:latest

WORKDIR /usr/src/app

COPY /counter/package*.json /usr/src/app

RUN npm install

COPY ./counter/ /usr/src/app

EXPOSE 80

CMD ["npm", "run", "dev"]