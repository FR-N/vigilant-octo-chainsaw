const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

const repoRoot = path.join(__dirname, '..');
const fontsDir = path.join(repoRoot, 'public', 'fonts');
const cssPath = path.join(fontsDir, 'fonts.css');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function download(urlStr, dest) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: { 'User-Agent': 'node' }
    };
    https.get(opts, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode + ' for ' + urlStr));
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  ensureDir(fontsDir);
  if (!fs.existsSync(cssPath)) {
    console.error('fonts.css not found at', cssPath);
    process.exit(1);
  }
  let css = fs.readFileSync(cssPath, 'utf8');
  const urlRegex = /https:\/\/fonts\.gstatic\.com\/[\w\-\/\.]+?\.woff2/g;
  const matches = Array.from(new Set(css.match(urlRegex) || []));
  if (matches.length === 0) {
    console.log('No remote woff2 URLs found in fonts.css.');
    return;
  }
  console.log('Found', matches.length, 'fonts to download.');
  for (const url of matches) {
    try {
      const filename = path.basename(new URL(url).pathname);
      const destPath = path.join(fontsDir, filename);
      if (fs.existsSync(destPath)) {
        console.log('Already exists:', filename);
      } else {
        console.log('Downloading', filename);
        await download(url, destPath);
        console.log('Saved', filename);
      }
      const urlPattern = new RegExp(url.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      css = css.replace(urlPattern, '/fonts/' + filename);
    } catch (err) {
      console.error('Failed to download', url, err.message);
    }
  }
  css = css.replace(/url\((?:'|")?\/fonts\/([\w\-.]+)\.(woff2)(?:'|\")?\)/g, "url('/fonts/$1.$2')");
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Updated', cssPath);
}

run().catch((e) => { console.error(e); process.exit(1); });
