import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('dist');
const htmlPath = join(root, 'index.html');
assert.ok(existsSync(htmlPath), 'dist/index.html must exist after production build');
const html = readFileSync(htmlPath, 'utf8');

for (const [label, pattern] of [
  ['document language', /<html[^>]+lang=["'][a-z-]+["']/i],
  ['responsive viewport', /<meta[^>]+name=["']viewport["']/i],
  ['page title', /<title>[^<]{3,}<\/title>/i],
  ['meta description', /<meta[^>]+name=["']description["']/i],
  ['application root', /id=["']root["']/i],
]) {
  assert.match(html, pattern, 'Built page is missing required ' + label);
}

const assets = [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css))["']/gi)]
  .map(match => match[1])
  .filter(path => !/^(?:https?:)?\/\//i.test(path));

assert.ok(assets.some(path => path.endsWith('.js')), 'Built page must reference a JavaScript bundle');
assert.ok(assets.some(path => path.endsWith('.css')), 'Built page must reference a CSS bundle');

for (const asset of assets) {
  const relative = asset.replace(/^\.\//, '').replace(/^\//, '');
  assert.ok(existsSync(join(root, relative)), 'Missing built asset: ' + asset);
}

console.log('Static site checks passed: document metadata, language, root, and emitted JS/CSS assets.');
