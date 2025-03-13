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
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o ./server .

# Stage 2: Create a lightweight runtime image
FROM debian:bullseye-slim

# Install ca-certificates for HTTPS requests
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the Go binary from the builder image
COPY --from=builder /app/server .

# Expose the port the app will run on (default to 8082, will be overridden by environment)
EXPOSE 8082

# Make the binary executable
RUN chmod +x ./server

# Command to run the binary
CMD ["./server"]