# Pull node image from docker hub
FROM node:alpine

# Set working directory
RUN mkdir -p /var/www/nest-chat
WORKDIR /var/www/nest-chat

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /var/www/nest-chat/node_modules/.bin:$PATH
# create user with no password
RUN adduser --disabled-password chat

# Copy existing application directory contents
COPY . /var/www/nest-chat
# install and cache app dependencies
COPY package.json /var/www/nest-chat/package.json
COPY package-lock.json /var/www/nest-chat/package-lock.json

# grant a permission to the application
RUN chown -R chat:chat /var/www/nest-chat
USER chat

# clear application caching
RUN npm cache clean --force
# install all dependencies
RUN npm install --unsafe-perm

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]
