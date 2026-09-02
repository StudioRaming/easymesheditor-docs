// Restores same-page link fragments (](#id)) in a translated locale from the
// Korean source, positionally. repair-translations.mjs covers heading ids and
// cross-page targets; bare fragments were slipping through.
//   node scripts/repair-page-anchors.mjs ja --write
import fs from 'node:fs'; import path from 'node:path';
const locale = process.argv[2]; const write = process.argv.includes('--write');
const src = 'docs'; const dst = `i18n/${locale}/docusaurus-plugin-content-docs/current`;
const re = /\]\(#([^)]+)\)/g;
function walk(d, out=[]) { for (const e of fs.readdirSync(d, {withFileTypes:true})) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p, out); else if (p.endsWith('.md') && !e.name.startsWith('_')) out.push(p); } return out; }
let fixed = 0, skipped = 0;
for (const ko of walk(src)) {
  const rel = path.relative(src, ko); const tr = path.join(dst, rel); if (!fs.existsSync(tr)) continue;
  const koIds = [...fs.readFileSync(ko,'utf8').matchAll(re)].map(m=>m[1]);
  let text = fs.readFileSync(tr,'utf8'); const trIds = [...text.matchAll(re)].map(m=>m[1]);
  if (koIds.length !== trIds.length) { if (koIds.length || trIds.length) { console.log(`skip (count ${trIds.length} vs ${koIds.length})  ${rel}`); skipped++; } continue; }
  if (koIds.every((v,i)=>v===trIds[i])) continue;
  let i = 0; const out = text.replace(re, () => `](#${koIds[i++]})`);
  if (write) fs.writeFileSync(tr, out); console.log(`${write?'fixed':'would fix'}  ${rel}`); fixed++;
}
console.log(`${locale}: ${fixed} file(s) ${write?'repaired':'to repair'}, ${skipped} skipped`);
