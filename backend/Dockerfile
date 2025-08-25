# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Build TypeScript code
RUN npm run build
CMD sh -c "npm run migrate && node dist/server.js"

# Expose the port your backend listens on
EXPOSE 4004
