import 'dotenv/config';
import { newCases } from './cases';
import { newControllers } from './controllers';
import { initServer } from './server';
import { newServices } from './services';

async function init() {
  const services = newServices();
  const cases = newCases({ services });
  const controllers = newControllers({ cases });

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, async () => {
      try {
        process.exit(0);
      } catch (err) {
        process.exit(1);
      }
    });
  });

  await initServer({ controllers });
}

init().catch((err) => {
  console.error('Fatal error', err);
  process.kill(process.pid, 'SIGTERM');
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exceptions', err);
  process.kill(process.pid, 'SIGTERM');
});