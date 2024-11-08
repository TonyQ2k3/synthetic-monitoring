# Stage 1: Build
FROM cypress/base AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Production
FROM cypress/base AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app .

# Prevent Cypress installer from printing crap ton of log
ENV CI=1 

# Install Cypress binaries
RUN npx cypress install

# Expose the port your app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "index.js"]