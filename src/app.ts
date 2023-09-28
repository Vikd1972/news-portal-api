import express from 'express';
import helmet from 'helmet';

import config from './config';
import endpoints from './endpoints';
import middlewares from './middlewares';

import types from './type'; // eslint-disable-line @typescript-eslint/no-unused-vars

const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: true, limit: config.server.bodySizeLimit }));
app.use(express.json({ limit: config.server.bodySizeLimit }));
app.use(express.static(`${__dirname}/${config.server.publicFolderName}`));
app.use(middlewares.cors);
app.use(middlewares.addContext);
app.use(middlewares.statsCollector);

app.use(endpoints);

app.use(middlewares.errorHandler);

export default app;
