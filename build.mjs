import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const html=await fs.readFile(path.join(root,'index.html'),'utf8');
new vm.Script(await fs.readFile(path.join(root,'public/main.js'),'utf8'));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
for(const m of html.matchAll(/href="#([^"]+)"/g)){if(!ids.includes(m[1]))throw new Error('Missing target: '+m[1])}
await fs.mkdir(path.join(root,'dist'),{recursive:true});
await fs.copyFile(path.join(root,'index.html'),path.join(root,'dist/index.html'));
for(const name of await fs.readdir(path.join(root,'public')))await fs.copyFile(path.join(root,'public',name),path.join(root,'dist',name));
console.log('Built Royal Warriors website. Navigation and script checks passed.');
