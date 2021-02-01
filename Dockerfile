FROM node:15.7.0-alpine3.10
ENV APP_ROOT=/APP_ROOT
ENV APP_PORT=3000
WORKDIR ${APP_ROOT}

ADD src src
ADD package.json .
ADD package-lock.json .
ADD public public
RUN npm install

CMD ["npm", "start"]