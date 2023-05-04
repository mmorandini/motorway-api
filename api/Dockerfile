# Installs Node.js image
FROM node:16.13.1-alpine3.14
WORKDIR /app/api
# Copies package.json, package-lock.json, tsconfig.json to the root of WORKDIR
COPY ["./api/package.json", "./api/package-lock.json", "./api/tsconfig.json", "./"]
# Installs all packages
RUN npm install
# Build and start app
CMD npm run build && npm run start
