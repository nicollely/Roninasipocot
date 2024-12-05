#!/bin/sh

if [ -d "node_modules" ]; then
    echo "node_modules already exists. Skipping npm install."
else 
    echo "Installing dependencies..."
    npm install
fi

echo "Starting development server..."
npx next dev --port 5000 --hostname 0.0.0.0
