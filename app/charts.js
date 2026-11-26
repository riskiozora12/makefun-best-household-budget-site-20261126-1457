// charts.js — grafik SVG yang digambar tangan dari data asli.
// Tidak ada pustaka grafik: setiap irisan donat dan batang dihitung di sini
// dari angka yang diberikan, lalu ditulis sebagai elemen SVG murni.

import { formatRupiah } from './data.js';

// Gambar grafik donat kategori pengeluaran ke dalam elemen wadah.
// `bagian` adalah array { label, nilai, warna }. Mengembalikan total.
export function gambarDonat(wadah, bagian) {
  const total = bagian.reduce((s, b) => s + b.nilai, 0);
  const cx = 110;
  const cy = 110;
  const rLuar = 92;
  const rDalam = 58;
  let sudutAwal = -90;
  let potongan = '';

  for (const b of bagian) {
    if (b.nilai <= 0) continue;
    const porsi = b.nilai / total;
    const sudutAkhir = sudutAwal + porsi * 360;
    const besar = porsi > 0.5 ? 1 : 0;
    const a0 = (sudutAwal * Math.PI) / 180;
    const a1 = (sudutAkhir * Math.PI) / 180;
    const x0 = cx + rLuar * Math.cos(a0);
    const y0 = cy + rLuar * Math.sin(a0);
    const x1 = cx + rLuar * Math.cos(a1);
    const y1 = cy + rLuar * Math.sin(a1);
    const x2 = cx + rDalam * Math.cos(a1);
    const y2 = cy + rDalam * Math.sin(a1);
    const x3 = cx + rDalam * Math.cos(a0);
    const y3 = cy + rDalam * Math.sin(a0);
    potongan +=
      '<path d="M ' + x0.toFixed(2) + ' ' + y0.toFixed(2) +
      ' A ' + rLuar + ' ' + rLuar + ' 0 ' + besar + ' 1 ' + x1.toFixed(2) + ' ' + y1.toFixed(2) +
      ' L ' + x2.toFixed(2) + ' ' + y2.toFixed(2) +
      ' A ' + rDalam + ' ' + rDalam + ' 0 ' + besar + ' 0 ' + x3.toFixed(2) + ' ' + y3.toFixed(2) +
      ' Z" fill="' + b.warna + '"><title>' + b.label + ': ' + formatRupiah(b.nilai) + '</title></path>';
    sudutAwal = sudutAkhir;
  }

  const persen = total > 0 ? Math.round((bagian[0].nilai / total) * 100) : 0;
  wadah.innerHTML =
    '<svg viewBox="0 0 220 220" role="img" aria-label="Grafik donat pengeluaran per kategori" class="grafik-donat">' +
    potongan +
    '<text x="110" y="104" text-anchor="middle" class="donat-angka">' + formatRupiah(total) + '</text>' +
    '<text x="110" y="126" text-anchor="middle" class="donat-label">total belanja</text>' +
    '<text x="110" y="146" text-anchor="middle" class="donat-label">Nov 2026</text>' +
    '</svg>' +
    '<p class="donat-catatan">Kategori terbesar: ' + bagian[0].label + ' (' + persen + '% dari total).</p>';
  return total;
}

// Gambar grafik batang perbandingan pemasukan vs pengeluaran per bulan.
// `bulan` adalah array { label, pemasukan, pengeluaran }.
export function gambarBatang(wadah, bulan) {
  const lebar = 560;
  const tinggi = 240;
  const alas = 210;
  const atas = 18;
  const kiri = 46; // ruang di kiri untuk label sumbu (mis. "15 jt")
  const maks = Math.max(...bulan.flatMap((b) => [b.pemasukan, b.pengeluaran]));
  const skala = (alas - atas) / maks;
  const lebarSlot = (lebar - kiri) / bulan.length;
  const lebarBatang = Math.min(30, lebarSlot * 0.28);

  let batang = '';
  let labelBulan = '';
  bulan.forEach((b, i) => {
    const xTengah = kiri + lebarSlot * i + lebarSlot / 2;
    const tMasuk = b.pemasukan * skala;
    const tKeluar = b.pengeluaran * skala;
    batang +=
      '<rect x="' + (xTengah - lebarBatang - 4).toFixed(1) + '" y="' + (alas - tMasuk).toFixed(1) +
      '" width="' + lebarBatang + '" height="' + tMasuk.toFixed(1) + '" rx="3" fill="#2e7d5b">' +
      '<title>' + b.label + ' pemasukan: ' + formatRupiah(b.pemasukan) + '</title></rect>';
    batang +=
      '<rect x="' + (xTengah + 4).toFixed(1) + '" y="' + (alas - tKeluar).toFixed(1) +
      '" width="' + lebarBatang + '" height="' + tKeluar.toFixed(1) + '" rx="3" fill="#c2703d">' +
      '<title>' + b.label + ' pengeluaran: ' + formatRupiah(b.pengeluaran) + '</title></rect>';
    labelBulan += '<text x="' + xTengah.toFixed(1) + '" y="230" text-anchor="middle" class="batang-label">' + b.label + '</text>';
  });

  // Garis grid tipis tiap Rp5 juta.
  let grid = '';
  for (let v = 5000000; v <= maks; v += 5000000) {
    const y = alas - v * skala;
    grid += '<line x1="' + kiri + '" y1="' + y.toFixed(1) + '" x2="' + lebar + '" y2="' + y.toFixed(1) + '" class="batang-grid"/>' +
      '<text x="2" y="' + (y + 3).toFixed(1) + '" class="batang-grid-label">' + (v / 1000000) + ' jt</text>';
  }

  wadah.innerHTML =
    '<svg viewBox="0 0 ' + lebar + ' ' + tinggi + '" role="img" aria-label="Grafik batang pemasukan dan pengeluaran enam bulan terakhir" class="grafik-batang">' +
    grid + batang +
    '<line x1="' + kiri + '" y1="' + alas + '" x2="' + lebar + '" y2="' + alas + '" class="batang-sumbu"/>' +
    labelBulan +
    '</svg>' +
    '<p class="legenda"><span class="titik titik-masuk"></span> Pemasukan &nbsp; <span class="titik titik-keluar"></span> Pengeluaran</p>';
}
