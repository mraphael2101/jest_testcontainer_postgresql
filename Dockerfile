# A local Dockerfile with commands to build the Test Container
# This is executed the moment your Database Container starts running
# Specify Postgres image tag and set COPY command to initialize db

FROM postgres:11.5
EXPOSE 5432
COPY migration /docker-entrypoint-initdb.d
