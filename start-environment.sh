#!/bin/bash

# Enhanced script to start the environment in either production or development mode
# with options to start specific services
#
# Usage: 
#   ./start-environment.sh [prod|dev] [service1 service2 ...]
#
# Examples:
#   ./start-environment.sh dev                  # Start all services in dev mode
#   ./start-environment.sh prod                 # Start all services in prod mode
#   ./start-environment.sh dev gateway server   # Start only gateway and server in dev mode
#   ./start-environment.sh prod auth            # Start only auth service in prod mode

# Default to production mode if not specified
MODE=${1:-prod}
shift 2>/dev/null || true  # Shift the first argument and ignore error if no args

# Get services to run (all remaining arguments)
SERVICES=$@

# Check if we're running specific services
if [ -n "$SERVICES" ]; then
    SERVICES_STR=$(echo $SERVICES | tr ' ' ', ')
    echo "Starting specific services: $SERVICES_STR in $MODE mode"
    DOCKER_COMPOSE_SERVICES="-d $SERVICES"
else
    echo "Starting all services in $MODE mode"
    DOCKER_COMPOSE_SERVICES="-d"
fi

# Stop specified services or all services if none specified
if [ -n "$SERVICES" ]; then
    echo "Stopping specific services: $SERVICES_STR..."
    docker-compose stop $SERVICES
else
    echo "Stopping all running containers..."
    docker-compose down
fi

# Create a temporary .env file based on the mode
cp .env .env.backup

if [ "$MODE" == "dev" ]; then
    echo "Configuring for DEVELOPMENT mode..."
    echo "Make sure your frontend dev servers are running on:"
    echo "  - http://localhost:5173 (Client app)"
    echo "  - http://localhost:5174 (Authentication app)"
    
    # Update the .env file for development mode
    sed -i.bak 's/DEV_MODE=false/DEV_MODE=true/' .env
    sed -i.bak 's/NODE_ENV=production/NODE_ENV=development/' .env
    sed -i.bak 's/LOG_LEVEL=info/LOG_LEVEL=debug/' .env
    
    echo "Environment configured for development. Starting services..."
    docker-compose up $DOCKER_COMPOSE_SERVICES
    
    echo "Development environment started!"
    echo "Gateway is available at http://localhost:8080"
    echo "  - Client app is proxied to http://localhost:5173"
    echo "  - Auth app is proxied to http://localhost:5174"
    echo "  - API service is available at http://api.expensify:8082"
    echo "  - Auth service is available at http://auth.expensify:8081"
else
    echo "Configuring for PRODUCTION mode..."
    
    # Make sure we have DEV_MODE set to false
    sed -i.bak 's/DEV_MODE=true/DEV_MODE=false/' .env
    sed -i.bak 's/NODE_ENV=development/NODE_ENV=production/' .env
    sed -i.bak 's/LOG_LEVEL=debug/LOG_LEVEL=info/' .env
    
    # Make sure static files are prepared if we're starting the gateway
    if [ -z "$SERVICES" ] || [[ "$SERVICES" == *"gateway"* ]]; then
        if [ -f "./prepare-build.sh" ]; then
            echo "Preparing static files..."
            chmod +x ./prepare-build.sh
            ./prepare-build.sh
        else
            echo "WARNING: prepare-build.sh not found. Make sure static files are available."
        fi
    fi
    
    echo "Environment configured for production. Starting services..."
    docker-compose up $DOCKER_COMPOSE_SERVICES
    
    echo "Production environment started!"
    echo "Gateway is available at http://localhost:8080"
    echo "  - Client app is served from static files"
    echo "  - Auth app is served from static files"
    echo "  - API service is available at http://api.expensify:8082"
    echo "  - Auth service is available at http://auth.expensify:8081"
fi

# Show running containers
echo "Running containers:"
docker-compose ps

echo ""
echo "To restore the original .env file, run: cp .env.backup .env"