
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

echo "Deployment script complete. The project is no longer connected to GitHub."
echo "Use the built files in the 'dist' directory for manual deployment."

cd -

