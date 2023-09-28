import os from 'os';
import cluster from 'cluster';

import app from './app';
import config from './config';
import { addUnhandledRejectionHandler, handleServerError } from './services/errorHelper';
import logger from './utils/logger';
import { connectToDb } from './db';

addUnhandledRejectionHandler();

if (config.server.isClusterModeEnabled && cluster.isPrimary) {
  const totalCPUsCount = os.cpus().length;
  const forksCount = totalCPUsCount > config.server.clusterForksLimit
    ? config.server.clusterForksLimit
    : totalCPUsCount;

  for (let i = 0; i < forksCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, _code, _signal) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    logger.error(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  (async () => {
    await connectToDb();
    app.listen(config.server.port, () => {
      // eslint-disable-next-line no-console
      console.log(`
         /===============================\\
        |   Server is listening on ${config.server.port}   |
         \\===============================/
      `);
    });
  })();

  app.on('error', handleServerError);
}
