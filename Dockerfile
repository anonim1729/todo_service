# Use Node.js 18 official image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (only production)
RUN npm install --production

# Copy source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
