// Dependency-free local preview; serves only studio_v4 and its assets.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {buildDelivery} from './build-delivery.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = 8771;
const mime = {'.svg':'image/svg+xml','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.mp4':'video/mp4','.woff2':'font/woff2','.ttf':'font/ttf','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.json':'application/json','.txt':'text/plain'};
const server = http.createServer((req, res) => {
  let route;
  try { route = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  if (route === '/favicon.ico') { res.writeHead(204).end(); return; }
  const file = path.resolve(root, `.${route.endsWith('/') ? route + 'index.html' : route}`);
  if(file===path.join(root,'index.html'))buildDelivery();
  const allowed = [root+path.sep];
  if (!allowed.some(prefix=>file.startsWith(prefix))) { res.writeHead(403).end(); return; }
  if (!['GET','HEAD'].includes(req.method)) { res.writeHead(405, {Allow:'GET, HEAD'}).end(); return; }
  fs.stat(file, (error, stat) => {
    if (error || !stat.isFile()) { res.writeHead(404).end(); return; }
    const headers = {'Content-Type':mime[path.extname(file)] || 'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'};
    let start = 0, end = stat.size - 1, status = 200;
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if (!match || (!match[1] && !match[2])) { res.writeHead(416, {'Content-Range':`bytes */${stat.size}`}).end(); return; }
      start = match[1] ? Number(match[1]) : Math.max(0, stat.size-Number(match[2]));
      end = match[1] && match[2] ? Math.min(Number(match[2]),end) : end;
      if (start > end || start >= stat.size) { res.writeHead(416, {'Content-Range':`bytes */${stat.size}`}).end(); return; }
      status = 206; headers['Content-Range'] = `bytes ${start}-${end}/${stat.size}`;
    }
    headers['Content-Length'] = end-start+1;
    res.writeHead(status, headers);
    if (req.method === 'HEAD') { res.end(); return; }
    const stream = fs.createReadStream(file, {start,end});
    stream.on('error',()=>res.destroy());
    res.on('close',()=>stream.destroy());
    stream.pipe(res);
  });
});
server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? `Port ${port} is already in use. If the preview is running, open http://127.0.0.1:${port}/` : error.message); process.exitCode=1; });
server.listen(port, '127.0.0.1', () => console.log(`SlimService local preview: http://127.0.0.1:${port}/\nPress Ctrl+C to stop. No files are uploaded.`));


