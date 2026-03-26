import { createServer } from 'http';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = parseInt(process.argv.find((a, i, arr) => arr[i - 1] === '--port') || '5185');

createServer((req, res) => {
  try {
    const file = req.url === '/green' ? 'vertex-model-garden-v2.html'
               : req.url === '/mockups' ? 'usecase-mockups.html'
               : req.url === '/latest' ? 'vertex-model-latest.html'
               : 'vertex-model-garden-google.html';
    const html = readFileSync(resolve(__dirname, file), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  } catch (e) {
    res.writeHead(500);
    res.end('Error: ' + e.message);
  }
}).listen(port, () => console.log(`Serving on http://localhost:${port}\nGoogle version: http://localhost:${port}/google`));
