#!/bin/bash

# Create temporary directories for static files
mkdir -p ./static_files/authentication ./static_files/client

# Get the absolute path to the project root directory
# This assumes the script is run from /newgo/gateway/
PROJECT_ROOT=$(cd ../../ && pwd)

echo "Project root: $PROJECT_ROOT"

# Copy static files from their locations
echo "Copying authentication files..."
if [ -d "$PROJECT_ROOT/authentication/dist" ]; then
  cp -r "$PROJECT_ROOT/authentication/dist/"* ./static_files/authentication/
  echo "Authentication files copied successfully."
else
  echo "WARNING: $PROJECT_ROOT/authentication/dist directory not found!"
fi

echo "Copying client files..."
if [ -d "$PROJECT_ROOT/client/dist" ]; then
  cp -r "$PROJECT_ROOT/client/dist/"* ./static_files/client/
  echo "Client files copied successfully."
else
  echo "WARNING: $PROJECT_ROOT/client/dist directory not found!"
fi

echo "Files prepared for Docker build."