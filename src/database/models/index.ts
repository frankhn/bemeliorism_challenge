import 'dotenv/config';
import { Sequelize } from 'sequelize';
import DBConfig from '../config/config.json';

const env = process.env.NODE_ENV || 'development';

const config = DBConfig[env];

const database: Sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

export default database;
