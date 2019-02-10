FROM node:10.15.1 as build

WORKDIR /app

COPY package*.json /app/

ENV NPM_CONFIG_LOGLEVEL info
#RUN npm install

COPY ./ /app/

#RUN npm run build

FROM nginx:1.15

COPY --from=build /app/build/ /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf