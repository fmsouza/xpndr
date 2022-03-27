FROM node:16-bullseye

EXPOSE 4000

ENV DISABLE_OPENCOLLECTIVE=true
ENV OPEN_SOURCE_CONTRIBUTOR=true

WORKDIR /app

RUN apt install libssl-dev -y

COPY --chown=node:node package.json .
COPY --chown=node:node . .

RUN npm install