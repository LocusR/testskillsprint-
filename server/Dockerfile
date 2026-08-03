# Контекст збірки — корінь репозиторію (через npm workspaces).
#   docker build -f server/Dockerfile .

# ---------- 1. Залежності (dev + prod) ----------
FROM node:22-alpine AS deps
WORKDIR /app
# Спершу тільки маніфести — шар кешується, поки не зміниться package-lock
COPY package.json package-lock.json ./
COPY client/package.json client/
COPY server/package.json server/
RUN npm ci

# ---------- 2. Збірка TypeScript ----------
FROM deps AS build
WORKDIR /app
COPY server ./server
RUN npm run build --workspace server

# ---------- 3. Тільки production-залежності ----------
FROM node:22-alpine AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY client/package.json client/
COPY server/package.json server/
RUN npm ci --omit=dev && npm cache clean --force

# ---------- 4. Рантайм ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

# npm workspaces гоїстить залежності в корінь, але копіюємо і теку воркспейсу —
# якщо колись зʼявиться конфлікт версій, npm покладе пакет у server/node_modules
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/server ./server
COPY --from=build /app/server/dist ./server/dist

# Не працюємо від root
USER node

EXPOSE 4000

# Перевірка живучості через власний health-ендпоїнт
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||4000)+'/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["node", "server/dist/index.js"]
