FROM ubuntu:trusty
FROM node:11

EXPOSE 8080

ENV PORT 8080
ENV NODE_ENV production

RUN apt-get update
RUN apt-get install python

COPY package.json /tmp/package.json
RUN cd /tmp && npm install && mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app

COPY . /opt/app

RUN npm run preproduction

RUN rm -rf ./app/client \
	rm -rf ./app/common \

RUN apt-get autoremove python -y && rm -rf /var/cache/apk/*

CMD ["npm", "run", "production"]