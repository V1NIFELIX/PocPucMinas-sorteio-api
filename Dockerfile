FROM node:14

WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN export NODE_OPTIONS=--max_old_space_size=8192
EXPOSE 8080
CMD [ "npm","run","start:prod"]
