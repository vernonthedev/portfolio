# Dependency Installation Stage
FROM node:22-alpine AS dependency
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build Stage
FROM node:22-alpine AS builder
WORKDIR /app
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL:-postgresql://postgres:postgres@db:5432/portfolio?schema=public}
COPY --from=dependency /app/node_modules ./node_modules
COPY package.json package-lock.json ./
COPY prisma ./prisma
COPY next.config.js ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.mjs ./
COPY eslint.config.mjs ./
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY types ./types
COPY public ./public
COPY middleware.ts ./
COPY .env* ./
RUN npx prisma generate
RUN npm run build

# Production Run
FROM node:22-alpine AS runner
WORKDIR /app
USER node
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
EXPOSE 3000
CMD ["node", "server.js"]