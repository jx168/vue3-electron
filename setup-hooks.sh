#!/bin/bash

# Copy pre-commit file to .git/hooks directory
cp pre-commit .git/hooks/
# Ensure the pre-commit file has execute permissions
chmod +x .git/hooks/pre-commit

echo "Git hooks setup completed."
