# 1단계: 빌드 스테이지
FROM node:18-alpine AS builder
WORKDIR /app

# 환경 변수 선언 (Next.js 빌드 시 사용)
ARG NEXT_PUBLIC_KAKAO_CLIENT_ID
ARG NEXT_PUBLIC_KAKAO_REDIRECT_URI
ARG NEXT_PUBLIC_KAKAO_BACKEND_URI

ENV NEXT_PUBLIC_KAKAO_CLIENT_ID=$NEXT_PUBLIC_KAKAO_CLIENT_ID
ENV NEXT_PUBLIC_KAKAO_REDIRECT_URI=$NEXT_PUBLIC_KAKAO_REDIRECT_URI
ENV NEXT_PUBLIC_KAKAO_BACKEND_URI=$NEXT_PUBLIC_KAKAO_BACKEND_URI

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2단계: 런타임 스테이지
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
