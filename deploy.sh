
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# create a .nojekyll file to prevent GitHub Pages from ignoring files that begin with an underscore
touch .nojekyll

echo "Deployment build completed successfully."
echo "To deploy to GitHub Pages:"
echo "1. Commit the dist folder to your gh-pages branch"
echo "2. Or upload these files to your web hosting service"

cd -
