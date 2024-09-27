#!/bin/bash

# Format .go files recursively in specific directory and subdirectories
find /Users/ofri.levkowitz/expenses/ -type f -name "*.go" -exec gofmt -w {} \;
