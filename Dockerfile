# Use an official Node.js runtime
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the project
COPY . .

# Expose the app port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
