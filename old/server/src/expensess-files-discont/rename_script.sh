#!/bin/bash

for file in $(ls [0-9][0-9]05202[0-9].xlsx); do
    new_file=$(echo "$file" | grep -oE '[0-9][0-9]02202{2,3}.xlsx')
    mv "$file" "$new_file"
    echo "Renamed $file to $new_file"
done
