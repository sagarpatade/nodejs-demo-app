# Use official Node image as base
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app source
COPY . .

# Expose port (adjust if your app uses different port)
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
