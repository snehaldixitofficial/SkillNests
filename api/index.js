import { createMiddleware } from '@hattip/adapter-node';
import server from '../dist/server/server.js';

export default createMiddleware((context) => {
  return server.fetch(context.request);
});
