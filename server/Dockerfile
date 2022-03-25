FROM node:16-bullseye

EXPOSE 4000

ENV PATH=$PATH:/app/node_modules/.bin
ENV DISABLE_OPENCOLLECTIVE=true
ENV OPEN_SOURCE_CONTRIBUTOR=true

RUN apt update && apt install libssl-dev

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm i && npx prisma generate

COPY . .