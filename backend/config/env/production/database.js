module.exports = ({ env }) => ({
  connection: {
    client: "mysql2",
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "kreics_db"),
      user: env("DATABASE_USER", "root"),
      password: env("DATABASE_PASSWORD", "pass"),
      ssl: env.bool("DATABASE_SSL", false),
    },
  },
});
