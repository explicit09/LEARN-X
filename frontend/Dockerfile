FROM node:18-alpine

WORKDIR /app

# Set environment variables
ENV NODE_ENV=development

# Install dependencies first (for better caching)
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]
