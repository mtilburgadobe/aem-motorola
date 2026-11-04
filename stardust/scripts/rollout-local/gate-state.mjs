#!/usr/bin/env node
// Builds stardust/rollout/gate-state.json for gate-all.mjs --state: every state page whose
// coverage row is deployed/verified/failed, as {slug, url, status: deployed, liveUrl, template}.
import { readFileSync, writeFileSync } from 'node:fs';

if (process.argv.includes('--help')) {
  console.log('usage: node stardust/scripts/rollout-local/gate-state.mjs [--host <origin>]');
  process.exit(0);
}
const hi = process.argv.indexOf('--host');
const host = hi > 0 ? process.argv[hi + 1] : 'https://main--0d32c52e--aemcoder.aem.live';
const state = JSON.parse(readFileSync('stardust/state.json', 'utf8'));
const cov = JSON.parse(readFileSync('stardust/rollout/coverage/pages.json', 'utf8'));
const bySlug = Object.fromEntries(cov.pages.map((p) => [p.slug, p]));
const pages = state.pages
  .filter((p) => ['deployed', 'verified', 'failed'].includes(bySlug[p.slug]?.delivery?.status))
  .map((p) => {
    const c = bySlug[p.slug];
    return {
      slug: p.slug,
      url: p.url,
      status: 'deployed',
      liveUrl: `${host}${c.path === '/index' ? '/' : c.path}`,
      template: c.templateId,
      prototypePath: p.prototypePath,
    };
  });
writeFileSync('stardust/rollout/gate-state.json', `${JSON.stringify({ pages }, null, 2)}\n`);
console.log(`gate-state: ${pages.length} deployed page(s) → stardust/rollout/gate-state.json`);
