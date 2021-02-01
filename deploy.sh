#!/bin/bash
npm run build
cd dist
git init
git add -A
git commit -m 'deployment'
git push -f git@github.com:Demiurgos45/wshop.git master:gh-pages
