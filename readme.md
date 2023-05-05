Install requirements:
 - docker (https://docs.docker.com/get-docker/)


This project consists of three Docker containers: database, server and caching service.

To initialize it, run `docker compose up` from the root of this project, this will build and start all of them.

By default, the database runs on port `5432` and is also exposed on `5432`, if you want to change this you can update `docker-compose.yml`.

The api will be running on port `3070`, and the endpoint to test is `/api/vehicle_state/:vehicleId/:timestamp`.

\
\
N.B.\
*I have commented out the .env file from .gitignore just for convenience.*
