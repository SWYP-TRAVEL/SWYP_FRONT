# 1단계: 빌드용 스테이지
FROM node:18-alpine AS builder

WORKDIR /app

# 패키지 설치 (dependencies + devDependencies)
COPY package*.json ./
RUN npm install

# 앱 전체 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: 실행용 스테이지 (경량 이미지)
FROM node:18-alpine AS runner

# 환경 설정
ENV NODE_ENV=production
WORKDIR /app

# 빌드된 결과만 복사 (standalone + public)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
