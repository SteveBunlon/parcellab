import * as dotenv from 'dotenv';
dotenv.config();

import { createAgent } from '@forestadmin/agent';
import { createMongooseDataSource } from '@forestadmin/datasource-mongoose';
import * as models from './models';

(async () => {
  await createAgent({
    authSecret: process.env.FOREST_AUTH_SECRET,
    envSecret: process.env.FOREST_ENV_SECRET,
    isProduction: process.env.NODE_ENV === 'production',
    forestServerUrl: process.env.FOREST_SERVER_URL,
  })
    //@ts-ignore
    .addDataSource(createMongooseDataSource(models.connections.default), {})
    .mountOnStandaloneServer(3000)
    .start();
})();
