FROM node:20

WORKDIR /app

EXPOSE 3000 35729
COPY . /app
RUN npm ci

CMD ["yarn", "start", "--host", "0.0.0.0"]
