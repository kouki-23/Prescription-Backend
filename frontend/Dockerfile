FROM node:18.19-alpine3.19

RUN mkdir /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=0 /app/dist /usr/share/nginx/html

COPY --from=0 /app/nginx.conf /etc/nginx/nginx.conf

COPY --from=0 /app/cert /etc/ssl/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]