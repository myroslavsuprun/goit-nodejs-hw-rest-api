FROM node

WORKDIR /app

COPY . /app/

RUN yarn install

EXPOSE 8082

CMD ["yarn", "start"]