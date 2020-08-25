# Build stage
FROM node:14-alpine as builder
WORKDIR /app

RUN apk update && apk add python g++ make && rm -rf /var/cache/apk/*
ADD . ./
RUN npm ci
RUN npm run build

# Install only productions deps
FROM node:14-alpine as deps
ENV NODE_ENV=production
WORKDIR /app

ADD package.json package-lock.json ./
RUN npm ci

# Final stage
FROM node:14-alpine
WORKDIR /app

COPY --from=deps ./app/node_modules ./node_modules
COPY --from=builder ./app/dist ./dist

CMD [ "node", "dist/main.js" ]
