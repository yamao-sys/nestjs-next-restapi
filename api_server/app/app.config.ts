if (!process.env.NODE_ENV) {
  console.error('NODE_ENV environment variables is missing');
  process.exit();
}

if (!process.env.DB_CONNECTION) {
  console.error('DB_CONNECTION environment variables is missing');
  process.exit();
}

if (!process.env.DB_HOST) {
  console.error('DB_HOST environment variables is missing');
  process.exit();
}

if (!process.env.DB_PORT) {
  console.error('DB_PORT environment variables is missing');
  process.exit();
}

if (!process.env.DB_DATABASE) {
  console.error('DB_DATABASE environment variables is missing');
  process.exit();
}

if (!process.env.DB_USERNAME) {
  console.error('DB_USERNAME environment variables is missing');
  process.exit();
}

if (!process.env.DB_PASSWORD) {
  console.error('DB_PASSWORD environment variables is missing');
  process.exit();
}

if (!process.env.SYNCHRONIZE) {
  console.error('SYNCHRONIZE environment variables is missing');
  process.exit();
}

if (!process.env.MIGRATIONS_RUN) {
  console.error('MIGRATIONS_RUN environment variables is missing');
  process.exit();
}

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET environment variables is missing');
  process.exit();
}

export const appConfig = {
  app: {
    nodeEnv: process.env.NODE_ENV,
    dbConnection: process.env.DB_CONNECTION,
    dbHost: process.env.DB_HOST,
    dbPort: parseInt(process.env.DB_PORT),
    dbDatabaseName: process.env.DB_DATABASE,
    dbUserName: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    synchronize: Boolean(process.env.SYNCHRONIZE),
    dropSchema: Boolean(process.env?.DROP_SCHEMA),
    migrationsRun: Boolean(process.env.MIGRATIONS_RUN),
    jwtSecret: process.env.JWT_SECRET,
  },
};
