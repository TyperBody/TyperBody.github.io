#!/bin/bash
set -e

echo "Installing dependencies..."

# Install npm packages
npm install

# Ensure the theme directory exists
if [ ! -d "themes/hypertrance" ]; then
    echo "Error: Theme directory not found!"
    exit 1
fi

echo "Theme directory exists."

# Clean cache
npm run clean || echo "Clean not needed"

# Generate the site
npm run generate

echo "Build completed successfully!"