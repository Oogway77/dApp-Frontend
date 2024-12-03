# Use LTS version of node  to avoid digital envelope routines::unsupported error
FROM node:18 as build-deps
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
ARG REACT_APP_HTTP_API_URL
RUN yarn build
FROM nginx:1.25-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 80
# the daemon off; directive tells Nginx to stay in the foreground
CMD ["nginx", "-g", "daemon off;"]