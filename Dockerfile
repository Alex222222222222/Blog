# syntax=docker/dockerfile:1

# Multi-stage Dockerfile for building and running a Next.js blog in production

# You can adjust NODE_VERSION if needed. Next.js 15 supports Node 18+; we use Node 22 here.
ARG NODE_VERSION=25

############################
# Base stage: install deps #
############################
FROM node:${NODE_VERSION}-alpine AS deps

# Install system dependencies required by native modules (e.g., sharp)
RUN apk add --no-cache libc6-compat git

WORKDIR /app

# Copy lockfiles first for better caching; supports both npm and pnpm/yarn scenarios
# If you use pnpm or yarn, add their lockfiles here and adjust install commands accordingly.
COPY package.json package-lock.json* ./

# Install all dependencies (including dev) for building
# If you use a different package manager (pnpm/yarn), replace this with the appropriate command.
RUN npm ci

#############################
# Builder stage: build app  #
#############################
FROM node:${NODE_VERSION}-alpine AS builder

RUN apk add --no-cache libc6-compat git

WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules
# Copy source
COPY . .

# Build the Next.js app
# Your package.json includes "prebuild" hook (tsx lib/scripts/preBuild.ts), so dev deps are required.
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build && npx next export -o out

############################
# Runner stage: production #
############################
FROM nginx:alpine AS runner

# Copy the exported static site to NGINX web root
COPY --from=builder /app/out /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
