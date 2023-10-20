FROM node:20

WORKDIR /app

EXPOSE 3000 35729

COPY package.json /app
COPY package-lock.json /app

RUN npm ci
COPY . /app

CMD ["yarn", "start", "--host", "0.0.0.0"]
