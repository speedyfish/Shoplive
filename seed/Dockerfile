FROM node:16.11.1 AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

COPY . .

RUN npm install

CMD ["npm","start"]