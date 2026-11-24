FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* precisam ser ARG no build stage para serem injetadas no bundle
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# O server.js do modo standalone escuta em $HOSTNAME. No Docker/Swarm do Easypanel essa
# variável vem com o id do container, que resolve para UMA das redes dele; quando não é a
# rede do proxy, o site dá 502 depois do deploy. 0.0.0.0 escuta em todas.
ENV HOSTNAME=0.0.0.0

# As variáveis de runtime (Supabase URL/chaves) chegam pelo ambiente do Easypanel quando o
# container sobe; não ficam gravadas na imagem (a service role key não pode ir numa camada).
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
