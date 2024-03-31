FROM node:20.7.0 as development

WORKDIR /usr/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:20.7.0 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

COPY --from=development /usr/app/build ./build

CMD ["node", "build/main.js"]




