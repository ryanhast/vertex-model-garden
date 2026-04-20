import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

const port = parseInt(process.argv.find((a, i) => process.argv[i - 1] === '--port') || '5185');
const dir = resolve(new URL('.', import.meta.url).pathname);

createServer(async (req, res) => {
  try {
    const filePath = resolve(dir, 'vertex-model-garden.html');
    const content = await readFile(filePath, 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(content);
  } catch (e) {
    res.writeHead(500);
    res.end('Error: ' + e.message);
  }
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
