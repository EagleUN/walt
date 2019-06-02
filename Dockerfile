FROM node:carbon-slim

# Create app directory
WORKDIR /walt

# Install app dependencies
COPY package.json /walt
RUN npm install

# Bundle app source
COPY . /walt
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
