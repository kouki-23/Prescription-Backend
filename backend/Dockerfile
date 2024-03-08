FROM node:18.19-alpine3.19

RUN mkdir -p /app/dist

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install --omit=dev

COPY dist/ ./dist

EXPOSE 3000

CMD [ "npm", "start"]