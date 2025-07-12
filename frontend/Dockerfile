# ---- Build Stage ----
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Accept build-time variable
ARG RESEND_API_KEY
ENV RESEND_API_KEY=$RESEND_API_KEY

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Copy your env file so Next.js has access during build
COPY .env.production .env

RUN echo "Resend key: $RESEND_API_KEY" && npm run build

# Build the Next.js app
RUN npm run build

ENV NODE_ENV=production

# ----------------------
# Production image
# ----------------------
FROM node:18-alpine

WORKDIR /app

# Copy only the build output and necessary files
COPY --from=builder /app ./

# Install only production dependencies (optional if not needed)
RUN npm install --omit=dev

# Expose the port Next.js uses
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]
