FROM cypress/base

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies
RUN npm install

# Install Cypress binaries
RUN npx cypress install

# Copy the rest of the application
COPY . . 

# Expose the port your app runs on
EXPOSE 8080

# Command to run the application
CMD ["node", "index.js"]