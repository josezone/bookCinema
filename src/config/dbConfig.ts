import getEnv from './envs';

export const connectionConfig: any = [
  {
    name: 'default',
    type: 'mysql',
    host: getEnv('DB_HOST'),
    port: Number(getEnv('DB_PORT')),
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_NAME'),
    logging: true,
    synchronize: true,
    entities: [process.env.TS_NODE ? 'src/model/*.*' : 'build/model/*.*'],
    subscribers: [
      process.env.TS_NODE ? 'src/services/**/*.*' : 'build/services/**/*.*',
    ],
    migrations: ['migrations/*.*'],
    cli: {
      entitiesDir: process.env.TS_NODE ? 'src/model' : 'build/model',
      subscribersDir: process.env.TS_NODE
        ? 'src/services/**'
        : 'build/services/**',
      migrationsDir: 'migrations',
    },
  },
  {
    name: 'seed',
    type: 'mysql',
    host: getEnv('DB_HOST'),
    port: Number(getEnv('DB_PORT')),
    username: getEnv('DB_USERNAME'),
    password: getEnv('DB_PASSWORD'),
    database: getEnv('DB_NAME'),
    logging: true,
    migrations: ['seeds/*.*'],
    entities: [process.env.TS_NODE ? 'src/model/*.*' : 'build/model/*.*'],
    cli: {
      migrationsDir: 'seeds',
    },
  },
];

export default connectionConfig;
