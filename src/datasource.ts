import { Sequelize, Op } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import { User } from "./models/user";

const models = {
  User
};

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  host: process.env.MYSQL_HOST,
  logging: false,
  models: Object.values(models),
  port: 3306,
  pool: {
    max: 20,
    min: 1,
    acquire: 30000,
    idle: 10000,
    evict: 10000,
  },
});

export { sequelize, models, Op };
