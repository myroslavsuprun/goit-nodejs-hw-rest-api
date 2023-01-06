// Configure the application before starting
require('./src/preStart');

const app = require('./src/app');
const { connectMongo } = require('./src/db/connection');
const envVariables = require('./src/utils/envVariables');

const port = envVariables.PORT || 3000;

const startServer = async () => {
  try {
    await connectMongo();

    app.listen(port, error => {
      if (error) {
        console.error(
          '\x1B[31m',
          'An error has occurred during the server launch',
          error
        );
      }

      console.log(
        '\x1b[36m%s\x1b[0m',
        `Server has been launched successfully on port: http://localhost:${port}.`
      );
    });
  } catch (err) {
    console.error(
      '\x1B[31m',
      `The following error has occurred during the server launch: ${err.message}`
    );

    process.exit(1);
  }
};

startServer();
