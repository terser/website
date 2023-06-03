FROM node:20

WORKDIR /app/website

EXPOSE 3000 35729
COPY ./website /app/website
RUN npm ci

CMD ["yarn", "start", "--host", "0.0.0.0"]
