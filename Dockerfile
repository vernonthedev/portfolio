# Dependency Installation Stage
FROM node:22-alpine AS dependency
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build Stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=dependency /app/node_modules ./node_modules
COPY . .

# Next.js should output a standalone (self-contained) server
ENV NEXT_STANDALONE=true
RUN npm run build

# Production Run
FROM node:22-alpine AS runner
WORKDIR /app
USER node

# Get only the necessary files for running the app in standalone mode
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

EXPOSE 3000

# Run the standalone server
CMD ["node", "server.js"]