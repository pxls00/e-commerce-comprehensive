FROM node:18.13.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 8081
CMD ["node", "./.output/server/index.mjs"]
