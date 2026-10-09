/**
 * Kora Match - Local Development Server
 * Serves static files on http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.join(__dirname, '..');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Parse URL (strip query parameters)
    const cleanUrl = req.url.split('?')[0];
    let filePath = path.join(ROOT_DIR, cleanUrl === '/' ? 'index.html' : cleanUrl);

    // Normalize path to prevent directory traversal
    const normalized = path.normalize(filePath);
    if (!normalized.startsWith(ROOT_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    fs.stat(normalized, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(normalized).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, {
            'Content-Type': contentType,
            'Cache-Control': 'no-cache'
        });

        const stream = fs.createReadStream(normalized);
        stream.pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`\n⚽ كورة ماتش - الخادم المحلي قيد التشغيل:`);
    console.log(`> http://localhost:${PORT}`);
    console.log(`اضغط Ctrl+C لإيقاف الخادم.\n`);
});
