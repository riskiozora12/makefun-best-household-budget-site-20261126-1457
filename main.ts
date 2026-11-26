// main.ts — program penyerahan entri "Rumah Tangga" (Node 22, pustaka
// standar saja). Situsnya adalah berkas statis di app/ (HTML, CSS, dan
// modul JavaScript, tanpa langkah build), dan program ini menyerahkannya
// apa adanya: menyalin app/ dan screenshots/ dari samping berkas ini ke
// /output (atau $MAKEFUN_OUTPUT_DIR di luar grader) lalu menulis
// /output/dossier.json dengan buildDossier dari vendor/makefun-frontend.ts,
// pustaka make.fun yang disalin apa adanya dari kit. Tidak ada stempel
// waktu dan tidak ada nilai acak, jadi dua kali jalan menulis byte yang
// sama persis. Jalankan dengan:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const diSini = fileURLToPath(new URL('.', import.meta.url));
const keluaran = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(keluaran, { recursive: true });
cpSync(join(diSini, 'app'), join(keluaran, 'app'), { recursive: true });
mkdirSync(join(keluaran, 'screenshots'), { recursive: true });
if (existsSync(join(diSini, 'screenshots'))) {
  cpSync(join(diSini, 'screenshots'), join(keluaran, 'screenshots'), { recursive: true });
}

// Batas yang sama dengan yang dipakai penilai (lihat RULES.txt): teks
// dossier paling banyak 160 KiB; paling banyak 4 tangkapan layar dan
// masing-masing paling banyak 256 KiB; app/ paling banyak 993 berkas dan
// direktori serta 16 MiB — semuanya berbagi batas 1.000 entri dan 64 MiB
// milik /output bersama dossier.json.
writeFileSync(
  join(keluaran, 'dossier.json'),
  buildDossier(keluaran, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
