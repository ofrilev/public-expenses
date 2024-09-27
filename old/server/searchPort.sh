#!/bin/bash

find_available_port() {
    local start_port=$1
    local end_port=$2

    for ((port=start_port; port<=end_port; port++)); do
        # Try to bind to the port, and if successful, it means the port is available
        (echo >/dev/tcp/127.0.0.1/$port) &>/dev/null
        if [[ $? -ne 0 ]]; then
            echo $port
            return
        fi
    done

    echo "No available port found within the specified range."
}

# Define the range of ports to check (5001 to 65535)
start_port=5001
end_port=65535

# Find an available port within the range
available_port=$(find_available_port $start_port $end_port)

if [[ ! -z $available_port ]]; then
    echo "Found available port: $available_port"
fi
