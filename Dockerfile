FROM python:3.7-alpine3.8
FROM node:11-alpine

EXPOSE 8080

ENV PORT 8080
ENV NODE_ENV production

#RUN apt-get update
#RUN apt-get install python

COPY package.json /tmp/package.json
RUN cd /tmp && npm install --production --quiet || { exit 1; }  && mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app

COPY . /opt/app

RUN npm run build

RUN rm -rf ./app/client \
	rm -rf ./app/common \
	rm -rf ./node_modules/webpack

#RUN apt-get autoremove python -y && rm -rf /var/cache/apk/*

CMD ["npm", "start"]
