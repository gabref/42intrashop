FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update && apt-get install -y curl netcat-traditional

COPY wait.sh /usr/local/bin/wait.sh
RUN chmod +x /usr/local/bin/wait.sh

CMD ["wait.sh", "back:4000", "--", "node", "seed.js"]
