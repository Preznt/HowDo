export default {
  development: {
    username: "root",
    password: "!Biz8080",
    database: "howdo",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3307",
    logging: true,
    timezone: "+09:00",
  },
  test: {
    username: "root",
    password: "password",
    database: "sample",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "password",
    database: "sample",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
