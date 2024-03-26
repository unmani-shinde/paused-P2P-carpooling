FROM node:21-alpine3.18

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 3000

# Run your application (replace with the actual command to start your app)
CMD ["npm", "start"]
