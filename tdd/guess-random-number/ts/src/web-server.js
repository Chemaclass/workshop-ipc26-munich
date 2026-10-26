import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const webDirectory = join(dirname(fileURLToPath(import.meta.url)), '..', 'web');
const files = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/game.js', ['game.js', 'text/javascript; charset=utf-8']],
]);
const host = process.env.HOST ?? '127.0.0.1';
const port = Number(process.env.PORT ?? 4173);

const server = createServer(async (request, response) => {
  const file = files.get(request.url ?? '');

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end('Method not allowed');
    return;
  }

  if (!file) {
    response
      .writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      .end('Not found');
    return;
  }

  try {
    const content = await readFile(join(webDirectory, file[0]));
    response.writeHead(200, {
      'Content-Type': file[1],
      'Cache-Control': 'no-store',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    console.error('Unable to serve the web game:', error);
    response
      .writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      .end('Unable to load the game');
  }
});

server.listen(port, host, () => {
  console.log(`Guess the Number is ready at http://${host}:${port}`);
});
