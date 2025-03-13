# Use a lightweight Go image for building the app
FROM golang:1.20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the Go modules and download the dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code of the app into the container
COPY . .

# Build the Go binary for the server
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ./gateway .

# Stage 2: Create a lightweight runtime image
FROM debian:bullseye-slim

# Install ca-certificates for HTTPS requests and other useful tools
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    iputils-ping \
    dnsutils \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the Go binary from the builder image
COPY --from=builder /app/gateway .

# Create directories for static files
RUN mkdir -p /static/authentication /static/client

# Copy the static files - this assumes you've copied them to these directories in your build context
COPY ./static_files/authentication/ /static/authentication/
COPY ./static_files/client/ /static/client/

# Verify files were copied correctly during build
RUN echo "Verifying authentication files..." && \
    ls -la /static/authentication/ && \
    echo "Authentication file count: $(find /static/authentication -type f | wc -l)" && \
    echo "Verifying client files..." && \
    ls -la /static/client/ && \
    echo "Client file count: $(find /static/client -type f | wc -l)"

# Expose the port the app will run on (default to 8080, will be overridden by environment)
EXPOSE 8080

# Make the binary executable
RUN chmod +x ./gateway

# Command to run the binary
# Note: Environment variables will be passed from docker-compose
CMD ["./gateway"]