# Use Node.js 22.16.0 with Alpine
FROM node:22.16.0-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install global tools 
RUN npm install -g ts-node typescript

# Copy the full source code
COPY . .

# Generate Prisma Client
# RUN npx prisma generate
# RUN npx prisma migrate deploy

# Expose the port your app runs on 
EXPOSE 8000

# TODO: Add a check for production or development environment
# Start the app with nodemon
# CMD ["npm", "run", "dev"]
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && npm run dev"]