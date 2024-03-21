FROM node:18-alpine

WORKDIR /frontend

COPY package.json package-lock.json ./
RUN if [ -f package-lock.json ]; then npm ci; \
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && npm install; \
    fi

COPY app ./app
COPY public ./public
COPY next.config.mjs .
COPY tsconfig.json .
