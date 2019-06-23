FROM node:carbon-slim

# Create app directory
WORKDIR /walt

# Install app dependencies
COPY package.json /walt
RUN npm install

# Bundle app source
COPY . /walt
RUN npm run prepublish

EXPOSE 5000

CMD [ "npm", "run", "runServer" ]
