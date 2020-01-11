FROM node:12.13-alpine

WORKDIR /usr/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install
ENV EXTEND_ESLINT=true

# Copy prettier config file
COPY .prettierrc ./
COPY .eslintrc.json ./

# Copy app sources
COPY src src/
COPY public public/

EXPOSE 3000

CMD ["npm", "run", "start"]
