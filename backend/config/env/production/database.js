module.exports = ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "127.0.0.1"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "kreics"),
      user: env("DATABASE_USERNAME", "admin"),
      password: env("DATABASE_PASSWORD"),
      schema: env("DATABASE_SCHEMA", "public"),
      ssl: {
        rejectUnauthorized: env.bool("DATABASE_SSL_SELF", false),
      },
    },
    debug: false,
  },
});