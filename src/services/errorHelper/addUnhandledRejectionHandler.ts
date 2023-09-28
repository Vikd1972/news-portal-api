import { logger } from '../../utils';

const addUnhandledRejectionHandler = () => {
  process.on('unhandledRejection', (err, p) => {
    logger.error('🚧  UnhandledPromiseRejectionWarning: Unhandled promise rejection 🚧', err, p);
  });
};

export default addUnhandledRejectionHandler;
