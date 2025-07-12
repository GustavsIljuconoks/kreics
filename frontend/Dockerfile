# ---- Build Stage ----
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app
COPY . .
COPY .env.production .env

# Accept build-time variable
ARG RESEND_API_KEY
ENV RESEND_API_KEY=$NEXT_PUBLIC_RESEND_API_KEY

# Install dependencies
COPY package*.json ./
RUN npm install

RUN echo "Resend key: $RESEND_API_KEY"

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
