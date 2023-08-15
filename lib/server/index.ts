import { json } from 'body-parser';
import express from 'express';
import http from 'http';
import { Controllers } from 'lib/types/controllers';
import config from '../configs';
import { makeRouter } from './routes';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

export function makeServer() {
  return Object.freeze({ close });

  async function close() {
    return new Promise<void>((resolve) => {
      server.close(() => resolve());
    });
  }
}

export async function initServer({ controllers }: { controllers: Controllers }) {
  app.use(cors({ origin: '*' }));
  app.use(json());

  const router = makeRouter({ controllers });

  app.use('/api', router);

  server.listen(config.port, () => console.log('Server is up!'));
}
