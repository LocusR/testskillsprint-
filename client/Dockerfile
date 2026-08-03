# Контекст збірки — корінь репозиторію (через npm workspaces).
#   docker build -f client/Dockerfile .

# ---------- 1. Залежності ----------
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY client/package.json client/
COPY server/package.json server/
RUN npm ci

# ---------- 2. Збірка статики ----------
FROM deps AS build
WORKDIR /app
COPY client ./client

# УВАГА: Vite вшиває VITE_* у бандл НА ЕТАПІ ЗБІРКИ.
# Тому це build-args, а не runtime-env: змінити ключ без перезбірки не вийде.
ARG VITE_RECAPTCHA_SITE_KEY=""
ARG VITE_GA_MEASUREMENT_ID=""
ARG VITE_API_URL=""
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build --workspace client

# ---------- 3. Роздача через nginx ----------
FROM nginx:1.27-alpine AS runner

COPY client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/client/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
