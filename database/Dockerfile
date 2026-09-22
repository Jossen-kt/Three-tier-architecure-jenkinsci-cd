FROM postgres:16

ENV POSTGRES_DB=mydb
ENV POSTGRES_USER=appuser
ENV POSTGRES_PASSWORD=apppassword

COPY init.sql /docker-entrypoint-initdb.d/

