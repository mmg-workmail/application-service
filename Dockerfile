FROM node:19

WORKDIR /app

# uninstall the current bcrypt modules
RUN npm uninstall bcrypt

# install the bcrypt modules for the machine
RUN npm install bcrypt

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]