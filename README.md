# Rumah Tangga — Situs Anggaran Keluarga

[![make.fun](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/c/best-household-budget-site-20261126-1457)
[![Rank](https://make.fun/badge/best-household-budget-site-20261126-1457/riskiozora12/makefun-best-household-budget-site-20261126-1457/rank.svg)](https://make.fun/c/best-household-budget-site-20261126-1457)
[![Reward](https://make.fun/badge/best-household-budget-site-20261126-1457/riskiozora12/makefun-best-household-budget-site-20261126-1457/reward.svg)](https://make.fun/c/best-household-budget-site-20261126-1457)

**Rumah Tangga** adalah situs anggaran keluarga berbahasa Indonesia untuk keluarga
Santoso (ayah, ibu, dan dua anak) pada November 2026. Semua angka dalam Rupiah dan
semuanya nyata: pemasukan Rp16.450.000, pengeluaran per kategori dengan batas anggaran,
tagihan rutin dengan tanggal jatuh tempo, empat tujuan tabungan, dan perbandingan
enam bulan terakhir.

## Halaman

- **Dasbor** — ringkasan bulan ini (pemasukan, pengeluaran, sisa, tabungan),
  grafik donat kategori pengeluaran, grafik batang enam bulan, transaksi terbaru,
  dan sumber pemasukan.
- **Anggaran** — batas tiap kategori dengan batang progres dan peringatan saat
  mendekati atau melewati batas; batasnya bisa diubah lewat formulir.
- **Transaksi** — tabel lengkap dengan filter kategori dan bulan, plus formulir
  tambah transaksi yang langsung tersimpan.
- **Tagihan** — delapan tagihan rutin dengan tanggal jatuh tempo dan status
  lunas/belum; tombol "Tandai lunas" benar-benar mengubah status.
- **Tabungan** — empat tujuan tabungan dengan progres dan formulir tambah tabungan.
- **Laporan** — perbandingan bulanan Juni–November 2026, lima pengeluaran terbesar,
  dan tips hemat yang dihitung dari angka keluarga sendiri.

Semua kontrol benar-benar bekerja di peramban dan tersimpan di `localStorage`;
tidak ada tombol mati, tidak ada teks pengisi. Grafik digambar tangan sebagai SVG
dari data asli — tanpa pustaka grafik, tanpa font web, tanpa permintaan jaringan
sama sekali.

## Menjalankan

Situs ini berkas statis biasa; sajikan folder `app/` dengan server HTTP apa pun:

```sh
cd app
python3 -m http.server 8080
# lalu buka http://localhost:8080
```

atau dengan Node:

```sh
npx serve app
```

## Struktur

```
app/
  index.html       Dasbor
  anggaran.html    Anggaran per kategori
  transaksi.html   Daftar dan tambah transaksi
  tagihan.html     Tagihan rutin
  tabungan.html    Tujuan tabungan
  laporan.html     Laporan bulanan dan tips hemat
  style.css        Semua tampilan situs
  data.js          Data benih, kategori, dan penyimpanan localStorage
  charts.js        Grafik donat dan batang (SVG dari data asli)
  app.js           Logika tiap halaman dan semua kontrol
main.ts            Menyalin app/ dan screenshots/ ke /output dan menulis dossier.json
screenshots/      Tangkapan layar situs yang sedang berjalan
vendor/           Pustaka dossier make.fun (dari kit, tidak diubah)
```

## Entri make.fun

Dibuat untuk kompetisi [best-household-budget-site-20261126-1457](https://make.fun/c/best-household-budget-site-20261126-1457)
di [make.fun](https://make.fun/?ref=wt28nn7m).

Lisensi: MIT — lihat [LICENSE](LICENSE).
