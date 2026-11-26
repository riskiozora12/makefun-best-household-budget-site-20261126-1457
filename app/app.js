// app.js — logika semua halaman "Rumah Tangga".
// Membaca data dari data.js, menggambar isi tiap halaman sesuai
// data-page pada <body>, dan menangani semua kontrol: filter, formulir
// tambah transaksi, tandai tagihan lunas, tambah tabungan, ubah anggaran.
// Setiap perubahan disimpan ke localStorage lewat simpanData.

import {
  KATEGORI, muatData, simpanData, totalPemasukan, totalPengeluaran,
  pengeluaranPerKategori, formatRupiah, formatTanggal, namaKategori,
  warnaKategori, namaBulan,
} from './data.js';
import { gambarDonat, gambarBatang } from './charts.js';

const data = muatData();
const halaman = document.body.dataset.page || 'dasbor';

// Tandai tautan navigasi halaman yang sedang dibuka.
for (const tautan of document.querySelectorAll('.nav a')) {
  if (tautan.dataset.halaman === halaman) tautan.classList.add('aktif');
}

function el(id) { return document.getElementById(id); }

function barisTransaksi(t) {
  const masuk = t.kategori === 'pemasukan';
  const label = masuk ? 'Pemasukan' : namaKategori(t.kategori);
  return '<tr class="' + (masuk ? 'masuk' : 'keluar') + '">' +
    '<td>' + formatTanggal(t.tanggal) + '</td>' +
    '<td>' + t.keterangan + '</td>' +
    '<td><span class="lencana">' + label + '</span></td>' +
    '<td class="angka">' + (masuk ? '+ ' : '− ') + formatRupiah(t.jumlah) + '</td></tr>';
}

// ---------- Dasbor ----------
if (halaman === 'dasbor') {
  const masuk = totalPemasukan(data);
  const keluar = totalPengeluaran(data);
  const sisa = masuk - keluar;
  el('ringkas-masuk').textContent = formatRupiah(masuk);
  el('ringkas-keluar').textContent = formatRupiah(keluar);
  el('ringkas-sisa').textContent = formatRupiah(sisa);
  el('ringkas-tabungan').textContent = formatRupiah(
    data.tabungan.reduce((s, g) => s + g.terkumpul, 0));
  el('ringkas-catatan').textContent =
    'Sisa ' + Math.round((sisa / masuk) * 100) + '% dari pemasukan bulan ini belum terpakai.';
  el('catatan-jumlah-transaksi').textContent =
    data.transaksi.filter((t) => t.kategori !== 'pemasukan').length + ' transaksi pengeluaran tercatat';
  el('judul-bulan').textContent = 'Ringkasan ' + namaBulan(data.bulanAktif);

  const perKategori = pengeluaranPerKategori(data);
  const bagian = KATEGORI
    .map((k) => ({ label: k.nama, nilai: perKategori[k.id], warna: k.warna }))
    .filter((b) => b.nilai > 0)
    .sort((a, b) => b.nilai - a.nilai);
  gambarDonat(el('donat'), bagian);
  el('legenda-kategori').innerHTML = bagian.map((b) =>
    '<li><span><span class="titik" style="background:' + b.warna + '"></span> ' + b.label +
    '</span><span class="nilai">' + formatRupiah(b.nilai) + '</span></li>').join('');

  const enamBulan = data.riwayatBulanan.map((r) => ({
    label: namaBulan(r.bulan).slice(0, 3),
    pemasukan: r.pemasukan, pengeluaran: r.pengeluaran,
  }));
  enamBulan.push({ label: 'Nov', pemasukan: masuk, pengeluaran: keluar });
  gambarBatang(el('batang'), enamBulan);

  const terbaru = [...data.transaksi]
    .sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1))
    .slice(0, 5);
  el('transaksi-terbaru').innerHTML = terbaru.map(barisTransaksi).join('');

  el('daftar-pemasukan').innerHTML = data.pemasukan.map((p) =>
    '<li><span>' + p.sumber + '</span><span class="nilai">' + formatRupiah(p.jumlah) + '</span></li>').join('') +
    '<li><span><strong>Total pemasukan</strong></span><span class="nilai">' + formatRupiah(masuk) + '</span></li>';
}

// ---------- Anggaran ----------
if (halaman === 'anggaran') {
  const perKategori = pengeluaranPerKategori(data);

  function gambarAnggaran() {
    const totalBatas = data.anggaran.reduce((s, a) => s + a.batas, 0);
    const totalPakai = Object.values(perKategori).reduce((s, v) => s + v, 0);
    el('total-anggaran').textContent = formatRupiah(totalBatas);
    el('total-pakai').textContent = formatRupiah(totalPakai);
    el('total-sisa-anggaran').textContent = formatRupiah(Math.max(0, totalBatas - totalPakai));

    el('daftar-anggaran').innerHTML = data.anggaran.map((a) => {
      const pakai = perKategori[a.kategori] || 0;
      const persen = a.batas > 0 ? Math.round((pakai / a.batas) * 100) : 0;
      const kelas = persen > 100 ? 'lewat' : persen >= 85 ? 'waspada' : '';
      const sisaTeks = pakai > a.batas
        ? 'Lewat ' + formatRupiah(pakai - a.batas)
        : 'Sisa ' + formatRupiah(a.batas - pakai);
      return '<div class="baris-anggaran"><div class="atas"><span class="nama">' +
        namaKategori(a.kategori) + '</span><span class="jumlah">' + formatRupiah(pakai) +
        ' dari ' + formatRupiah(a.batas) + ' (' + persen + '%)</span></div>' +
        '<div class="bilah-luar"><div class="bilah-dalam ' + kelas + '" style="width:' +
        Math.min(100, persen) + '%"></div></div>' +
        '<div class="sisa ' + (pakai > a.batas ? 'lewat' : '') + '">' + sisaTeks + '</div></div>';
    }).join('');
  }

  gambarAnggaran();

  // Formulir ubah batas anggaran satu kategori.
  const pilih = el('ubah-kategori');
  pilih.innerHTML = KATEGORI.map((k) =>
    '<option value="' + k.id + '">' + k.nama + '</option>').join('');
  el('form-anggaran').addEventListener('submit', (e) => {
    e.preventDefault();
    const batas = Number(el('ubah-batas').value);
    const pesan = el('pesan-anggaran');
    if (!batas || batas < 1000) {
      pesan.textContent = 'Masukkan batas anggaran minimal Rp1.000.';
      pesan.className = 'pesan gagal';
      return;
    }
    const baris = data.anggaran.find((a) => a.kategori === pilih.value);
    if (baris) baris.batas = Math.round(batas);
    simpanData(data);
    gambarAnggaran();
    pesan.textContent = 'Anggaran ' + namaKategori(pilih.value) +
      ' diubah menjadi ' + formatRupiah(batas) + '.';
    pesan.className = 'pesan ok';
    el('form-anggaran').reset();
  });
}

// ---------- Transaksi ----------
if (halaman === 'transaksi') {
  const pilihKategori = el('filter-kategori');
  pilihKategori.innerHTML = '<option value="semua">Semua kategori</option>' +
    '<option value="pemasukan">Pemasukan</option>' +
    KATEGORI.map((k) => '<option value="' + k.id + '">' + k.nama + '</option>').join('');

  const pilihBulan = el('filter-bulan');
  pilihBulan.innerHTML = '<option value="semua">Semua bulan</option>' +
    '<option value="2026-11">November 2026</option>';

  function gambarTabel() {
    const kat = pilihKategori.value;
    const bln = pilihBulan.value;
    const hasil = data.transaksi.filter((t) =>
      (kat === 'semua' || t.kategori === kat) &&
      (bln === 'semua' || t.tanggal.startsWith(bln)));
    hasil.sort((a, b) => (a.tanggal < b.tanggal ? 1 : -1));
    el('tabel-transaksi').innerHTML = hasil.length
      ? hasil.map(barisTransaksi).join('')
      : '<tr><td colspan="4">Tidak ada transaksi yang cocok dengan filter ini.</td></tr>';
    const masuk = hasil.filter((t) => t.kategori === 'pemasukan').reduce((s, t) => s + t.jumlah, 0);
    const keluar = hasil.filter((t) => t.kategori !== 'pemasukan').reduce((s, t) => s + t.jumlah, 0);
    el('jumlah-filter').textContent = hasil.length + ' transaksi — pemasukan ' +
      formatRupiah(masuk) + ', pengeluaran ' + formatRupiah(keluar) + '.';
  }

  pilihKategori.addEventListener('change', gambarTabel);
  pilihBulan.addEventListener('change', gambarTabel);
  el('tombol-reset-filter').addEventListener('click', () => {
    pilihKategori.value = 'semua';
    pilihBulan.value = 'semua';
    gambarTabel();
  });
  gambarTabel();

  const pilihTambah = el('tambah-kategori');
  pilihTambah.innerHTML = '<option value="pemasukan">Pemasukan</option>' +
    KATEGORI.map((k) => '<option value="' + k.id + '">' + k.nama + '</option>').join('');

  el('form-transaksi').addEventListener('submit', (e) => {
    e.preventDefault();
    const keterangan = el('tambah-keterangan').value.trim();
    const jumlah = Number(el('tambah-jumlah').value);
    const tanggal = el('tambah-tanggal').value;
    const pesan = el('pesan-transaksi');
    if (!keterangan || !jumlah || jumlah < 1000 || !tanggal) {
      pesan.textContent = 'Lengkapi keterangan, tanggal, dan jumlah minimal Rp1.000.';
      pesan.className = 'pesan gagal';
      return;
    }
    data.transaksi.push({
      id: 't' + Date.now(),
      tanggal,
      keterangan,
      kategori: pilihTambah.value,
      jumlah: Math.round(jumlah),
    });
    simpanData(data);
    gambarTabel();
    pesan.textContent = 'Transaksi "' + keterangan + '" (' + formatRupiah(jumlah) +
      ') sudah ditambahkan dan tersimpan.';
    pesan.className = 'pesan ok';
    el('form-transaksi').reset();
    el('tambah-tanggal').value = '2026-11-26';
  });
}

// ---------- Tagihan ----------
if (halaman === 'tagihan') {
  function gambarTagihan() {
    const lunas = data.tagihan.filter((b) => b.lunas);
    const belum = data.tagihan.filter((b) => !b.lunas);
    const totalBelum = belum.reduce((s, b) => s + b.jumlah, 0);
    el('ringkas-tagihan').textContent = lunas.length + ' dari ' + data.tagihan.length +
      ' tagihan sudah lunas. Total yang masih harus dibayar: ' + formatRupiah(totalBelum) + '.';

    el('daftar-tagihan').innerHTML = [...data.tagihan]
      .sort((a, b) => a.jatuhTempo - b.jatuhTempo)
      .map((b) => '<div class="baris-tagihan"><div><div class="nama">' + b.nama + '</div>' +
        '<div class="meta">Jatuh tempo setiap tanggal ' + b.jatuhTempo +
        ' · ' + formatRupiah(b.jumlah) + '</div></div>' +
        '<div><span class="lencana ' + (b.lunas ? 'lunas' : 'belum') + '">' +
        (b.lunas ? 'Lunas' : 'Belum dibayar') + '</span> ' +
        (b.lunas
          ? '<button type="button" class="tombol kecil sekunder" data-tagihan="' + b.id + '" data-aksi="batal">Batalkan</button>'
          : '<button type="button" class="tombol kecil" data-tagihan="' + b.id + '" data-aksi="lunas">Tandai lunas</button>') +
        '</div></div>').join('');

    for (const tombol of document.querySelectorAll('[data-tagihan]')) {
      tombol.addEventListener('click', () => {
        const tagihan = data.tagihan.find((b) => b.id === tombol.dataset.tagihan);
        if (!tagihan) return;
        tagihan.lunas = tombol.dataset.aksi === 'lunas';
        simpanData(data);
        gambarTagihan();
      });
    }
  }
  gambarTagihan();
}

// ---------- Tabungan ----------
if (halaman === 'tabungan') {
  function gambarTabungan() {
    const totalTarget = data.tabungan.reduce((s, g) => s + g.target, 0);
    const totalTerkumpul = data.tabungan.reduce((s, g) => s + g.terkumpul, 0);
    el('ringkas-tabungan-total').textContent =
      'Total terkumpul ' + formatRupiah(totalTerkumpul) + ' dari target ' +
      formatRupiah(totalTarget) + ' (' + Math.round((totalTerkumpul / totalTarget) * 100) + '%).';

    el('daftar-tabungan').innerHTML = data.tabungan.map((g) => {
      const persen = Math.round((g.terkumpul / g.target) * 100);
      return '<div class="tujuan"><div class="atas"><span class="nama">' + g.nama +
        '</span><span class="jumlah">' + formatRupiah(g.terkumpul) + ' / ' +
        formatRupiah(g.target) + ' (' + persen + '%)</span></div>' +
        '<div class="bilah-luar"><div class="bilah-dalam" style="width:' +
        Math.min(100, persen) + '%"></div></div>' +
        '<p class="catatan">' + g.catatan + ' Kurang ' + formatRupiah(g.target - g.terkumpul) +
        ' lagi untuk mencapai target.</p></div>';
    }).join('');
  }

  gambarTabungan();

  const pilihTujuan = el('nabung-tujuan');
  pilihTujuan.innerHTML = data.tabungan.map((g) =>
    '<option value="' + g.id + '">' + g.nama + '</option>').join('');

  el('form-tabungan').addEventListener('submit', (e) => {
    e.preventDefault();
    const jumlah = Number(el('nabung-jumlah').value);
    const pesan = el('pesan-tabungan');
    if (!jumlah || jumlah < 1000) {
      pesan.textContent = 'Masukkan jumlah tabungan minimal Rp1.000.';
      pesan.className = 'pesan gagal';
      return;
    }
    const tujuan = data.tabungan.find((g) => g.id === pilihTujuan.value);
    if (!tujuan) return;
    tujuan.terkumpul += Math.round(jumlah);
    simpanData(data);
    gambarTabungan();
    pesan.textContent = formatRupiah(jumlah) + ' ditambahkan ke ' + tujuan.nama +
      '. Sekarang terkumpul ' + formatRupiah(tujuan.terkumpul) + '.';
    pesan.className = 'pesan ok';
    el('form-tabungan').reset();
  });
}

// ---------- Laporan ----------
if (halaman === 'laporan') {
  const masuk = totalPemasukan(data);
  const keluar = totalPengeluaran(data);
  const semuaBulan = [
    ...data.riwayatBulanan,
    { bulan: '2026-11', pemasukan: masuk, pengeluaran: keluar },
  ];
  el('tabel-bulanan').innerHTML = semuaBulan.map((r) => {
    const sisa = r.pemasukan - r.pengeluaran;
    const hemat = Math.round((sisa / r.pemasukan) * 100);
    return '<tr><td>' + namaBulan(r.bulan) + '</td>' +
      '<td class="angka">' + formatRupiah(r.pemasukan) + '</td>' +
      '<td class="angka">' + formatRupiah(r.pengeluaran) + '</td>' +
      '<td class="angka">' + formatRupiah(sisa) + '</td>' +
      '<td class="angka">' + hemat + '%</td></tr>';
  }).join('');

  const rataKeluar = Math.round(
    semuaBulan.reduce((s, r) => s + r.pengeluaran, 0) / semuaBulan.length);
  el('rata-pengeluaran').textContent =
    'Rata-rata pengeluaran Juni–November 2026 adalah ' + formatRupiah(rataKeluar) +
    ' per bulan. November ini ' + formatRupiah(keluar) + ' — ' +
    (keluar > rataKeluar ? 'di atas rata-rata' : 'di bawah rata-rata') + '.';

  const perKategori = pengeluaranPerKategori(data);
  const terbesar = KATEGORI
    .map((k) => ({ nama: k.nama, nilai: perKategori[k.id] }))
    .sort((a, b) => b.nilai - a.nilai)
    .slice(0, 5);
  el('pengeluaran-terbesar').innerHTML = terbesar.map((b) =>
    '<li><span>' + b.nama + '</span><span class="nilai">' + formatRupiah(b.nilai) + '</span></li>').join('');

  const belanja = perKategori.belanja || 0;
  const batasBelanja = (data.anggaran.find((a) => a.kategori === 'belanja') || {}).batas || 0;
  const makan = perKategori.makan || 0;
  const tips = [
    'Belanja harian sudah ' + formatRupiah(belanja) + ' dari anggaran ' + formatRupiah(batasBelanja) +
    '. Belanja dua kali seminggu dengan daftar belanja tertulis biasanya memangkas 10–15% dari pos ini.',
    'Makan di luar mencapai ' + formatRupiah(makan) + ' bulan ini. Masak bekal tiga kali seminggu bisa menghemat sekitar Rp300.000 per bulan.',
    'Sisa bulan ini ' + formatRupiah(masuk - keluar) + '. Pindahkan ' +
    formatRupiah(Math.round((masuk - keluar) * 0.5)) +
    ' ke Dana Darurat begitu gajian masuk, sebelum uangnya terpakai hal lain.',
    'SPP Kirana (Rp350.000) dan langganan streaming (Rp59.000) masih belum dibayar — lunasi sebelum tanggal jatuh tempo agar tidak menumpuk dengan tagihan bulan depan.',
    'Bulan Juli lalu pengeluaran melonjak ke Rp13.980.000. Catat penyebab lonjakan tiap bulan di halaman Transaksi supaya pola seperti itu tidak terulang diam-diam.',
  ];
  el('daftar-tips').innerHTML = tips.map((t) => '<li>' + t + '</li>').join('');
}
