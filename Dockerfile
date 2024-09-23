# Stage 1: Building the app
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run the app
FROM node:20-alpine AS runner

WORKDIR /app

# Set environment to production
ENV NODE_ENV production

# Add a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Set the command to run the app
CMD ["node", "server.js"]