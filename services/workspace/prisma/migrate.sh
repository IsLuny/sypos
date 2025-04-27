#!/usr/bin/env bash

# Verifica se o caminho do .env foi passado
if [ -z "$1" ]; then
  echo "❌ Use: $ 0 path/for/file.env"
  exit 1
fi

# Caminho do .env passado no argumento
ENV_FILE_NAME="$1"

# Caminho relativo ao diretório do script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR"

# Caminho do arquivo .env
ENV_FILE="$PROJECT_ROOT/../$ENV_FILE_NAME"

# Verifica se o arquivo existe
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Error: File $ENV_FILE not found at the root of the project!"
  exit 1
fi

# Carrega as variáveis do .env
set -o allexport
source "$ENV_FILE"
set +o allexport

# Verifica se as variáveis necessárias existem
if [ -z "$POSTGRES_USER" ] || [ -z "$POSTGRES_PASSWORD" ] || [ -z "$POSTGRES_HOST" ] || [ -z "$POSTGRES_PORT" ] || [ -z "$POSTGRES_DB" ]; then
  echo "❌ Error: One or more postgon connection variables are missing at $ENV_FILE_NAME"
  exit 1
fi

# Monta a URL de conexão
export POSTGRES_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}"
prisma migrate dev --schema=$PROJECT_ROOT/schema.prisma
