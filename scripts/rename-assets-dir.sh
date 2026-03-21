#!/usr/bin/env bash

SCRIPTS_DIR="$(dirname "$(realpath "$0")")"
PROJECT_DIR="$(realpath "$SCRIPTS_DIR/..")"

mv "$PROJECT_DIR/build/assets" "$PROJECT_DIR/build/_docusaurus"
mv "$PROJECT_DIR/build/es/assets" "$PROJECT_DIR/build/es/_docusaurus"
mv "$PROJECT_DIR/build/img" "$PROJECT_DIR/build/_docusaurus/img"
mv "$PROJECT_DIR/build/es/img" "$PROJECT_DIR/build/es/_docusaurus/img"

HTML_FILES=$(find "$PROJECT_DIR/build" -name '*.html')
JS_FILES=$(find "$PROJECT_DIR/build" -name '*.js')
CSS_FILES=$(find "$PROJECT_DIR/build" -name '*.css')

FILES="$HTML_FILES $CSS_FILES"

for file in $FILES
do
    sed -i.bak 's/\/assets/\/_docusaurus/g' "$file"
    sed -i.bak 's/\/img/\/_docusaurus\/img/g' "$file"
    rm "$file.bak"
done

for file in $JS_FILES
do
    sed -i.bak 's/assets\//_docusaurus\//g' "$file"
    sed -i.bak 's/img\//_docusaurus\/img\//g' "$file"
    rm "$file.bak"
done