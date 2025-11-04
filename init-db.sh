#!/bin/bash
set -e

# This script runs automatically when the PostgreSQL container starts for the first time
# It ensures the database user exists with proper permissions

echo "Initializing NeuroTrader database..."

# The POSTGRES_USER and POSTGRES_DB are already created by the postgres image
# We just need to ensure proper permissions
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Grant all privileges to the user
    GRANT ALL PRIVILEGES ON DATABASE ${POSTGRES_DB} TO ${POSTGRES_USER};
    
    -- Ensure the user can create databases (needed for Django tests)
    ALTER USER ${POSTGRES_USER} CREATEDB;
EOSQL

echo "Database initialization complete!"
