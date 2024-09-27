#!/bin/bash

# Kill any process running on port 5000
sudo kill $(sudo lsof -t -i :5000)
