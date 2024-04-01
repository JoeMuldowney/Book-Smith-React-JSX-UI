# Use a Node.js base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /libraryfrontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./libraryfrontend

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . /libraryfrontend

# Expose port 3000
EXPOSE 3000

# Set the command to run the React app
CMD ["npm", "start"]