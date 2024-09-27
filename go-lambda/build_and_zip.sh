#!/bin/bash

# Navigate to the directory where your Go main file is located
# Replace this with the actual path to your Go project's main directory
cd handleNewScrape

# Build the Go application for Linux environment
GOOS=linux GOARCH=amd64 go build -o bootstrap

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed, exiting."
    exit 1
fi

# Zip the built application
zip -r handleNewScrape.zip . -x "README.md" "handleNewScrape.zip"


# Check if zip was successful
if [ $? -ne 0 ]; then
    echo "Zipping failed, exiting."
    exit 1
fi

echo "Build and packaging completed successfully."
