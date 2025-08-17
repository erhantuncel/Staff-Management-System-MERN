# Stage1 - builder
FROM node:22.17.1-alpine AS builder

# Create a directory  and go to the directory 
WORKDIR /app

# Change your app directory owner
# RUN chown node:node /app/

# Copy the package.json file to my current directory to install the necessary dependence  
COPY package*.json .

# Install the dependence
RUN npm install

# Environment variables
ARG VITE_PUBLIC_API_BASE_URL
ENV VITE_PUBLIC_API_BASE_URL $VITE_PUBLIC_API_BASE_URL

# Copy other files to my current directory
COPY . .

# Build and optimize static file
RUN npm run build

# Stage-2
FROM nginx:stable-alpine-slim

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static file to my Nginx folder to serve static contain
# COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html

# Open the port to react
EXPOSE 5173

# Run nginx in the foreground
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]