.PHONY: help install dev build test lint clean docker-build docker-run

# Default target
help:
	@echo "Available commands:"
	@echo "  install     - Install dependencies"
	@echo "  dev         - Start development server"
	@echo "  build       - Build the application"
	@echo "  test        - Run tests"
	@echo "  lint        - Run linting"
	@echo "  lint-fix    - Fix linting issues"
	@echo "  clean       - Clean build artifacts"
	@echo "  docker-build - Build Docker image"
	@echo "  docker-run  - Run Docker container"
	@echo "  db-setup    - Setup database with Prisma"
	@echo "  db-migrate  - Run database migrations"
	@echo "  db-studio   - Open Prisma Studio"

# Install dependencies
install:
	npm install

# Start development server
dev:
	npm run dev

# Build the application
build:
	npm run build

# Run tests
test:
	npm test

# Run linting
lint:
	npm run lint

# Fix linting issues
lint-fix:
	npm run lint:fix

# Clean build artifacts
clean:
	rm -rf dist/
	rm -rf coverage/
	rm -rf node_modules/

# Build Docker image
docker-build:
	docker build -t planetx-backend .

# Run Docker container
docker-run:
	docker run -p 8000:8000 planetx-backend

# Setup database
db-setup:
	npx prisma generate
	npx prisma migrate deploy

# Run database migrations
db-migrate:
	npx prisma migrate dev

# Open Prisma Studio
db-studio:
	npx prisma studio

# CI/CD commands
ci-install:
	npm install

ci-build:
	npm run build

ci-test:
	npm test

ci-lint:
	npm run lint

# Full CI pipeline
ci: ci-install ci-lint ci-build ci-test 