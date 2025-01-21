# Stage 1: Builder for the React application (Vite)
FROM node:18-alpine AS builder

# Declare working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json /app/

# Install dependencies with caching to optimize rebuild times
RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && npm ci

# Copy the rest of the project files
COPY . /app/

# Build the Vite project
RUN npm run build

# Stage 2: Runner to serve the build with Nginx
FROM nginx:1.27.0-alpine AS runner

# Copy custom Nginx configuration template if required
COPY nginx.template /etc/nginx/conf.d/nginx.template

# Copy the built React app from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for serving the app
EXPOSE 80

# Start Nginx with dynamic configuration using envsubst (if nginx.template is used)
CMD envsubst '' < /etc/nginx/conf.d/nginx.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
