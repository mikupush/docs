#!/usr/bin/env bash

SCRIPTS_DIR="$(dirname "$(realpath "$0")")"
PROJECT_DIR="$(realpath "$SCRIPTS_DIR/..")"

function write_redirect_page() {
    local lang="$1"

    if [[ "$lang" != "" ]]; then
        local lang_path="/$lang"
    fi

    local html=$(cat <<-EOF
<html lang="es">
    <head>
        <title>Miku Push!</title>
        <script>
            window.location.href='${lang_path}/docs/category/server'
        </script>
    </head>
    <body>Redirecting...</body>
</html>
EOF
)

    echo "$html" > "$PROJECT_DIR/build${lang_path}/docs/index.html"
}

write_redirect_page "" # en
write_redirect_page "es"
