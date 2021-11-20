FROM node:14.17-alpine3.12 as development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --silent

COPY . .

RUN yarn build

FROM node:14.17-alpine3.12 as production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]