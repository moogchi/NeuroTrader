#!/bin/bash
set -e

# This script runs automatically when the PostgreSQL container starts for the first time
# It ensures the database and user exist with proper permissions

echo "====================================="
echo "Initializing NeuroTrader database..."
echo "====================================="
echo "POSTGRES_USER: $POSTGRES_USER"
echo "POSTGRES_DB: $POSTGRES_DB"
echo "====================================="

# The postgres image automatically creates POSTGRES_USER and POSTGRES_DB
# But we'll ensure they exist and have proper permissions

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Ensure the user exists (this is usually already created by postgres image)
    DO \$\$
    BEGIN
        IF NOT EXISTS (SELECT FROM pg_catalog.pg_user WHERE usename = '${POSTGRES_USER}') THEN
            CREATE USER ${POSTGRES_USER} WITH PASSWORD '${POSTGRES_PASSWORD}';
            RAISE NOTICE 'User ${POSTGRES_USER} created';
        ELSE
            RAISE NOTICE 'User ${POSTGRES_USER} already exists';
        END IF;
    END
    \$\$;

    -- Ensure the database exists
    SELECT 'CREATE DATABASE ${POSTGRES_DB}'
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '${POSTGRES_DB}')\gexec
    
    -- Grant all privileges to the user
    GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DB} TO ${POSTGRES_USER};
    
    -- Ensure the user can create databases (needed for Django tests)
    ALTER USER ${POSTGRES_USER} CREATEDB;
    
    -- Grant schema privileges
    GRANT ALL ON SCHEMA public TO ${POSTGRES_USER};
EOSQL

echo "====================================="
echo "Database initialization complete!"
echo "====================================="

