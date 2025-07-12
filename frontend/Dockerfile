# ---- Build Stage ----
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Copy your env file so Next.js has access during build
COPY .env.production .env

# Build the Next.js app
RUN npm run build

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
