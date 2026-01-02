#!/bin/bash

# Clear Sanity Studio cache to force schema reload

echo "Clearing Sanity Studio cache..."

# Remove Vite cache
if [ -d "node_modules/.sanity" ]; then
  echo "Removing node_modules/.sanity..."
  rm -rf node_modules/.sanity
fi

# Remove runtime cache
if [ -d ".sanity" ]; then
  echo "Removing .sanity..."
  rm -rf .sanity
fi

# Remove dist folder if it exists
if [ -d "dist" ]; then
  echo "Removing dist..."
  rm -rf dist
fi

echo "Cache cleared successfully!"
echo ""
echo "Next steps:"
echo "1. Run: npm run sanity:dev"
echo "2. Open Sanity Studio at http://localhost:3333"
echo "3. Navigate to the Warehouse page"
echo "4. Edit the Editorial Text block"
echo "5. You should now see the 'Background Type' toggle with 'Image' option"
