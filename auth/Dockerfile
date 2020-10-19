FROM node:alpine
WORKDIR /app
COPY package.json .
RUN npm i --only=prod
COPY . .
ENV FORCE_COLOR=1
CMD ["npm", "start"]