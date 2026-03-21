FROM node:22 AS builder

WORKDIR /build

COPY . .

RUN npm install && npm run build
RUN bash /build/scripts/rename-assets-dir.sh
RUN bash /build/scripts/docs-redirect.sh

FROM nginx:1.29.2

COPY --from=builder /build/build /usr/share/nginx/html
