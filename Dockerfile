FROM node:14

WORKDIR /client
COPY client/package.json .
COPY client/package-lock.json .
RUN npm install
COPY client .
RUN npm build

WORKDIR /server
COPY server/package.json .
COPY server/package-lock.json .
RUN npm install
COPY server .

EXPOSE 3000
CMD ["npm","start"]
