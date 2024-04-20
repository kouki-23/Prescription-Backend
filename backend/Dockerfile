FROM node:18.19-alpine3.19

RUN mkdir /app

WORKDIR /app

RUN npm install pm2 -g

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3006

CMD ["pm2-runtime", "ecosystem.config.js"]