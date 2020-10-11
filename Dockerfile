FROM node:lts-alpine3.9 as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
ENV HOST 0.0.0.0
ENV PORT 8080
COPY nginx /etc/nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html
RUN sh -c "envsubst '\$PORT'  < /etc/nginx/sites-enabled/base.conf > /etc/nginx/sites-enabled/default.conf"
RUN rm /etc/nginx/sites-enabled/base.conf
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]  