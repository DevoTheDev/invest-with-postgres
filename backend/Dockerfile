# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Build TypeScript code
RUN npm run build

# Expose the port your backend listens on
EXPOSE 4004

# Run migrations, seed secrets, and start the server
CMD sh -c "npm run migrate && node dist/scripts/seedSecrets.js && node dist/server.js"