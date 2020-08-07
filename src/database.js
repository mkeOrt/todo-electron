import path from 'path';
import { Sequelize } from 'sequelize';

const isBuild = process.env.NODE_ENV === 'production';

const pathToDbFile = path.join(
  isBuild ? __dirname : __static,
  '../src/database.sqlite',
);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: pathToDbFile,
});

export default sequelize;
