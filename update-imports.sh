#!/bin/bash
find ./app -type f -name "*.ts" -exec sed -i '' 's|@/app/api/auth/\[...nextauth\]/route|@/lib/auth-config|g' {} + 