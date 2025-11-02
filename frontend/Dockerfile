# Development server for frontend
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

EXPOSE 3000

# Run vite dev server (will be accessible via nginx proxy)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
