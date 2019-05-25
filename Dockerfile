FROM node:carbon-slim

# Create app directory
WORKDIR /git/eagle_un_api

# Install app dependencies
COPY package.json /git/eagle_un_api/
RUN npm install

# Bundle app source
COPY . /git/eagle_un_api/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
EXPOSE 7000