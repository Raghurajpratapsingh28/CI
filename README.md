# PlanetX Backend

A Node.js/TypeScript backend application with Express, Prisma, and PostgreSQL.

## Features

- TypeScript with strict type checking
- Express.js web framework
- Prisma ORM with PostgreSQL
- Docker containerization
- Comprehensive CI/CD pipeline
- ESLint for code linting
- Jest for testing
- Rate limiting and error handling

## Prerequisites

- Node.js 18+
- PostgreSQL 16+
- Docker (optional)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BACKEND_NEW
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
npx prisma generate
npx prisma migrate deploy
```

## Development

### Running the application

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build
npm start
```

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run only the database
docker-compose up postgres
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Code Quality

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline using GitHub Actions:

### CI Workflow (`.github/workflows/ci.yml`)

Runs on every push and pull request to `main` and `develop` branches:

1. **Setup**: Checkout code and setup Node.js environment
2. **Database**: Start PostgreSQL service container
3. **Dependencies**: Install npm packages
4. **Prisma**: Generate Prisma client and run migrations
5. **Linting**: Run ESLint for code quality
6. **Type Checking**: Verify TypeScript compilation
7. **Build**: Compile TypeScript to JavaScript
8. **Testing**: Run Jest tests
9. **Security**: Run npm audit and check for outdated packages

### Deploy Workflow (`.github/workflows/deploy.yml`)

Runs on pushes to `main` branch:

1. **Build**: Compile and build the application
2. **Docker**: Build Docker image
3. **Registry**: Push to Docker Hub (if configured)
4. **Deploy**: Deploy to hosting platform (configurable)

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"

# Server
PORT=8000
NODE_ENV=development

# Add other environment variables as needed
```

## Project Structure

```
BACKEND_NEW/
├── .github/workflows/     # CI/CD workflows
├── prisma/               # Database schema and migrations
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route controllers
│   ├── db/             # Database configuration
│   ├── middlewares/    # Express middlewares
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── types/          # TypeScript type definitions
│   └── __tests__/      # Test files
├── .eslintrc.js        # ESLint configuration
├── jest.config.js      # Jest configuration
├── docker-compose.yml  # Docker services
├── Dockerfile          # Docker image definition
└── package.json        # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the TypeScript application
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run type-check` - Run TypeScript type checking
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio
- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

ISC # CI
# CI
