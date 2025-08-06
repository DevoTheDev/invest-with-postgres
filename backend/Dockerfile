# backend/Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Optional: run a build step (if using TypeScript or similar)
RUN npm run build
CMD sh -c "npm run migrate && node dist/scripts/seedSecrets.js && node dist/server.js"

EXPOSE 4004

