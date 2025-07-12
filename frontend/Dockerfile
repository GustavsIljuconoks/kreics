# ---- Build Stage ----
FROM node:18-alpine AS builder

ENV NODE_ENV=production
ARG NEXT_PUBLIC_RESEND_API_KEY
ENV NEXT_PUBLIC_RESEND_API_KEY=${NEXT_PUBLIC_RESEND_API_KEY}

# Set working directory
WORKDIR /app
COPY . .
COPY .env.production .env

# Install dependencies
COPY package*.json ./
RUN npm install

RUN echo "Resend key: $NEXT_PUBLIC_RESEND_API_KEY"

# Build the Next.js app
RUN npm run build

# ----------------------
# Production image
# ----------------------
FROM node:18-alpine

WORKDIR /app

# Copy only the build output and necessary files
COPY --from=builder /app ./

# Expose the port Next.js uses
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]
