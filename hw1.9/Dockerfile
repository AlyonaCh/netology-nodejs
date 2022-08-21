FROM node:16.16

WORKDIR /app

ARG NODE_ENV=prodaction 

COPY ./package*.json ./

RUN npm install 

COPY ./counter/src ./

EXPOSE 3000

CMD ["npm", "start"]
