import { readdirSync, readFileSync } from 'node:fs';
const models = readdirSync('src/components').filter(f => f.endsWith('.tsx')).flatMap(file => {
  const source = readFileSync(`src/components/${file}`, 'utf8');
  const match = source.match(/\bsrc: "(https:[^"]+)"/);
  return match ? [{ file, url: match[1] }] : [];
});
let failures = 0;
let cursor = 0;
await Promise.all(Array.from({length: 4}, async () => {
  while (cursor < models.length) {
    const model = models[cursor++];
    try {
      const response = await fetch(model.url, { method: 'HEAD', signal: AbortSignal.timeout(25000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const cors = response.headers.get('access-control-allow-origin');
      if (cors !== '*') throw new Error(`Unexpected CORS header: ${cors}`);
    } catch (error) { failures++; console.error(`${model.file}: ${error.message}`); }
  }
}));
console.log(`${models.length - failures}/${models.length} remote model URLs reachable with CORS.`);
process.exitCode = failures ? 1 : 0;
