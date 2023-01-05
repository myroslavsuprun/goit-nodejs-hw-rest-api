const envVariables = {
  PORT: process.env.PORT ?? '',
  MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
};

module.exports = envVariables;
