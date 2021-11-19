FROM node:lts
WORKDIR /EcoGators
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000
CMD ["yarn", "run", "dev"]