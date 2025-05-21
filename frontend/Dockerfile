FROM node:18-alpine

WORKDIR /app

# Set environment variables
ENV NODE_ENV=development \
    NODE_OPTIONS=--openssl-legacy-provider \
    CHOKIDAR_USEPOLLING=true \
    WATCHPACK_POLLING=true

# Install dependencies first (for better caching)
COPY package.json package-lock.json* ./
RUN npm install

# Create a non-root user and switch to it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy the rest of the application code and set permissions
COPY --chown=appuser:appgroup . .

# Switch to non-root user
USER appuser

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
