// data.js — data awal dan penyimpanan lokal situs "Rumah Tangga".
// Satu-satunya tempat angka-angka anggaran keluarga tinggal: data benih
// (keluarga Santoso, November 2026), pemuatan dan penyimpanan localStorage,
// serta daftar kategori dan bulan yang dipakai semua halaman.

export const KUNCI_SIMPAAN = 'rumahtangga-v1';

// Kategori pengeluaran beserta warna yang dipakai di grafik dan lencana.
export const KATEGORI = [
  { id: 'belanja', nama: 'Belanja Harian', warna: '#2e7d5b' },
  { id: 'makan', nama: 'Makanan & Minuman', warna: '#c2703d' },
  { id: 'transport', nama: 'Transportasi', warna: '#3d6e9e' },
  { id: 'tagihan', nama: 'Tagihan & Utilitas', warna: '#7a5ea3' },
  { id: 'pendidikan', nama: 'Pendidikan', warna: '#b08a2e' },
  { id: 'kesehatan', nama: 'Kesehatan', warna: '#a34a5e' },
  { id: 'hiburan', nama: 'Hiburan', warna: '#4a8a7d' },
  { id: 'lainnya', nama: 'Lainnya', warna: '#8a8578' },
];

export function namaKategori(id) {
  const ketemu = KATEGORI.find((k) => k.id === id);
  return ketemu ? ketemu.nama : 'Lainnya';
}

export function warnaKategori(id) {
  const ketemu = KATEGORI.find((k) => k.id === id);
  return ketemu ? ketemu.warna : '#8a8578';
}

// Data benih: kondisi nyata keluarga Santoso (ayah, ibu, dua anak)
// pada November 2026, sebelum ada perubahan dari pengguna.
function dataBenih() {
  return {
    bulanAktif: '2026-11',
    pemasukan: [
      { id: 'gaji-ayah', sumber: 'Gaji Ayah (Budi)', jumlah: 8500000 },
      { id: 'gaji-ibu', sumber: 'Gaji Ibu (Sari)', jumlah: 6200000 },
      { id: 'usaha', sumber: 'Usaha Kue Ibu Sari', jumlah: 1750000 },
    ],
    anggaran: [
      { kategori: 'belanja', batas: 4000000 },
      { kategori: 'makan', batas: 2200000 },
      { kategori: 'transport', batas: 1500000 },
      { kategori: 'tagihan', batas: 1800000 },
      { kategori: 'pendidikan', batas: 1200000 },
      { kategori: 'kesehatan', batas: 600000 },
      { kategori: 'hiburan', batas: 500000 },
      { kategori: 'lainnya', batas: 1500000 },
    ],
    transaksi: [
      { id: 't01', tanggal: '2026-11-01', keterangan: 'Gaji Ayah — November', kategori: 'pemasukan', jumlah: 8500000 },
      { id: 't02', tanggal: '2026-11-01', keterangan: 'Belanja mingguan Pasar Raya', kategori: 'belanja', jumlah: 486000 },
      { id: 't03', tanggal: '2026-11-02', keterangan: 'Bensin motor (Pertalite)', kategori: 'transport', jumlah: 120000 },
      { id: 't04', tanggal: '2026-11-03', keterangan: 'Gaji Ibu — November', kategori: 'pemasukan', jumlah: 6200000 },
      { id: 't05', tanggal: '2026-11-03', keterangan: 'Makan siang keluarga di warung', kategori: 'makan', jumlah: 145000 },
      { id: 't06', tanggal: '2026-11-04', keterangan: 'Token listrik 200 kWh', kategori: 'tagihan', jumlah: 312000 },
      { id: 't07', tanggal: '2026-11-05', keterangan: 'SPP Dimas (kelas 5 SD)', kategori: 'pendidikan', jumlah: 450000 },
      { id: 't08', tanggal: '2026-11-06', keterangan: 'Belanja sayur & lauk harian', kategori: 'belanja', jumlah: 178000 },
      { id: 't09', tanggal: '2026-11-07', keterangan: 'Nonton bioskop berempat', kategori: 'hiburan', jumlah: 260000 },
      { id: 't10', tanggal: '2026-11-08', keterangan: 'Ayam geprek + es teh (ojek online)', kategori: 'makan', jumlah: 98000 },
      { id: 't11', tanggal: '2026-11-09', keterangan: 'Servis motor + ganti oli', kategori: 'transport', jumlah: 235000 },
      { id: 't12', tanggal: '2026-11-10', keterangan: 'Iuran RT + keamanan', kategori: 'lainnya', jumlah: 75000 },
      { id: 't13', tanggal: '2026-11-11', keterangan: 'Buku & alat tulis Kirana', kategori: 'pendidikan', jumlah: 132000 },
      { id: 't14', tanggal: '2026-11-12', keterangan: 'Belanja mingguan Pasar Raya', kategori: 'belanja', jumlah: 512000 },
      { id: 't15', tanggal: '2026-11-13', keterangan: 'Obat flu & vitamin keluarga', kategori: 'kesehatan', jumlah: 86000 },
      { id: 't16', tanggal: '2026-11-14', keterangan: 'Kopi & camilan akhir pekan', kategori: 'makan', jumlah: 174000 },
      { id: 't17', tanggal: '2026-11-15', keterangan: 'Usaha Kue — pesanan minggu ke-2', kategori: 'pemasukan', jumlah: 875000 },
      { id: 't18', tanggal: '2026-11-16', keterangan: 'Parkir & tol perjalanan luar kota', kategori: 'transport', jumlah: 142000 },
      { id: 't19', tanggal: '2026-11-17', keterangan: 'Tagihan air PDAM', kategori: 'tagihan', jumlah: 186000 },
      { id: 't20', tanggal: '2026-11-18', keterangan: 'Belanja mingguan Pasar Raya', kategori: 'belanja', jumlah: 498000 },
      { id: 't21', tanggal: '2026-11-19', keterangan: 'Les privat matematika Dimas', kategori: 'pendidikan', jumlah: 300000 },
      { id: 't22', tanggal: '2026-11-20', keterangan: 'Beli sepatu sekolah Kirana', kategori: 'lainnya', jumlah: 289000 },
      { id: 't23', tanggal: '2026-11-21', keterangan: 'Makan malam keluarga (ulang tahun Ibu)', kategori: 'makan', jumlah: 385000 },
      { id: 't24', tanggal: '2026-11-22', keterangan: 'Bensin mobil (Pertamax)', kategori: 'transport', jumlah: 210000 },
      { id: 't25', tanggal: '2026-11-23', keterangan: 'Belanja sayur & lauk harian', kategori: 'belanja', jumlah: 164000 },
      { id: 't26', tanggal: '2026-11-24', keterangan: 'Periksa gigi Dimas ke dokter', kategori: 'kesehatan', jumlah: 175000 },
      { id: 't27', tanggal: '2026-11-25', keterangan: 'Tagihan internet rumah', kategori: 'tagihan', jumlah: 349000 },
      { id: 't28', tanggal: '2026-11-26', keterangan: 'Usaha Kue — pesanan minggu ke-4', kategori: 'pemasukan', jumlah: 875000 },
      { id: 't29', tanggal: '2026-11-02', keterangan: 'Belanja bulanan supermarket (beras, minyak, sabun)', kategori: 'belanja', jumlah: 950000 },
      { id: 't30', tanggal: '2026-11-05', keterangan: 'Pulsa & paket data keluarga', kategori: 'lainnya', jumlah: 240000 },
      { id: 't31', tanggal: '2026-11-08', keterangan: 'Beli baju sekolah Dimas', kategori: 'lainnya', jumlah: 320000 },
      { id: 't32', tanggal: '2026-11-10', keterangan: 'Makan di restoran keluarga', kategori: 'makan', jumlah: 420000 },
      { id: 't33', tanggal: '2026-11-13', keterangan: 'Bensin mobil + tol', kategori: 'transport', jumlah: 380000 },
      { id: 't34', tanggal: '2026-11-15', keterangan: 'Belanja mingguan Pasar Raya', kategori: 'belanja', jumlah: 530000 },
      { id: 't35', tanggal: '2026-11-17', keterangan: 'Kursus renang Kirana', kategori: 'pendidikan', jumlah: 350000 },
      { id: 't36', tanggal: '2026-11-19', keterangan: 'Periksa kesehatan Ibu ke puskesmas', kategori: 'kesehatan', jumlah: 150000 },
      { id: 't37', tanggal: '2026-11-21', keterangan: 'Beli mainan edukasi Kirana', kategori: 'hiburan', jumlah: 180000 },
      { id: 't38', tanggal: '2026-11-23', keterangan: 'Isi ulang galon & gas LPG', kategori: 'tagihan', jumlah: 210000 },
      { id: 't39', tanggal: '2026-11-24', keterangan: 'Belanja mingguan Pasar Raya', kategori: 'belanja', jumlah: 520000 },
      { id: 't40', tanggal: '2026-11-25', keterangan: 'Servis AC rumah', kategori: 'lainnya', jumlah: 450000 },
    ],
    tagihan: [
      { id: 'b01', nama: 'Listrik PLN', jumlah: 312000, jatuhTempo: 5, lunas: true },
      { id: 'b02', nama: 'Air PDAM', jumlah: 186000, jatuhTempo: 10, lunas: true },
      { id: 'b03', nama: 'Internet rumah', jumlah: 349000, jatuhTempo: 20, lunas: true },
      { id: 'b04', nama: 'BPJS Kesehatan (4 jiwa)', jumlah: 140000, jatuhTempo: 10, lunas: true },
      { id: 'b05', nama: 'SPP Dimas (kelas 5 SD)', jumlah: 450000, jatuhTempo: 5, lunas: true },
      { id: 'b06', nama: 'SPP Kirana (kelas 2 SD)', jumlah: 350000, jatuhTempo: 5, lunas: false },
      { id: 'b07', nama: 'Iuran RT & keamanan', jumlah: 75000, jatuhTempo: 10, lunas: true },
      { id: 'b08', nama: 'Langganan streaming film', jumlah: 59000, jatuhTempo: 28, lunas: false },
    ],
    tabungan: [
      { id: 's01', nama: 'Dana Darurat', target: 20000000, terkumpul: 12400000, catatan: 'Untuk keadaan tak terduga, misalnya motor rusak atau sakit.' },
      { id: 's02', nama: 'Liburan Keluarga', target: 8000000, terkumpul: 3200000, catatan: 'Rencana liburan ke pantai akhir tahun.' },
      { id: 's03', nama: 'Renovasi Dapur', target: 15000000, terkumpul: 6750000, catatan: 'Ganti meja dapur dan tambah rak penyimpanan.' },
      { id: 's04', nama: 'Pendidikan Anak', target: 30000000, terkumpul: 9100000, catatan: 'Tabungan jangka panjang untuk sekolah Dimas dan Kirana.' },
    ],
    // Ringkasan bulan-bulan sebelumnya (Juni–Oktober 2026) untuk grafik
    // perbandingan; hanya November yang memakai transaksi rinci di atas.
    riwayatBulanan: [
      { bulan: '2026-06', pemasukan: 15800000, pengeluaran: 12450000 },
      { bulan: '2026-07', pemasukan: 16100000, pengeluaran: 13980000 },
      { bulan: '2026-08', pemasukan: 15950000, pengeluaran: 12870000 },
      { bulan: '2026-09', pemasukan: 16450000, pengeluaran: 14230000 },
      { bulan: '2026-10', pemasukan: 16200000, pengeluaran: 13120000 },
    ],
  };
}

// Muat data dari localStorage; kalau belum ada, simpan dan pakai data benih.
export function muatData() {
  try {
    const mentah = localStorage.getItem(KUNCI_SIMPAAN);
    if (mentah) {
      const parsed = JSON.parse(mentah);
      if (parsed && Array.isArray(parsed.transaksi)) return parsed;
    }
  } catch (e) {
    // localStorage tidak tersedia atau rusak: lanjut dengan data benih.
  }
  const benih = dataBenih();
  simpanData(benih);
  return benih;
}

export function simpanData(data) {
  try {
    localStorage.setItem(KUNCI_SIMPAAN, JSON.stringify(data));
  } catch (e) {
    // Penyimpanan penuh atau diblokir: perubahan tetap tampil di halaman ini.
  }
}

// Total pemasukan bulan aktif dari daftar pemasukan + transaksi pemasukan.
export function totalPemasukan(data) {
  return data.transaksi
    .filter((t) => t.kategori === 'pemasukan')
    .reduce((s, t) => s + t.jumlah, 0);
}

// Total pengeluaran bulan aktif (semua transaksi selain pemasukan).
export function totalPengeluaran(data) {
  return data.transaksi
    .filter((t) => t.kategori !== 'pemasukan')
    .reduce((s, t) => s + t.jumlah, 0);
}

// Pengeluaran per kategori untuk bulan aktif.
export function pengeluaranPerKategori(data) {
  const hasil = {};
  for (const k of KATEGORI) hasil[k.id] = 0;
  for (const t of data.transaksi) {
    if (t.kategori !== 'pemasukan' && hasil[t.kategori] !== undefined) {
      hasil[t.kategori] += t.jumlah;
    }
  }
  return hasil;
}

// Format angka menjadi "Rp12.400.000".
export function formatRupiah(nilai) {
  return 'Rp' + Math.round(nilai).toLocaleString('id-ID');
}

// Format tanggal "2026-11-21" menjadi "21 Nov 2026".
export function formatTanggal(iso) {
  const [tahun, bulan, hari] = iso.split('-').map(Number);
  const namaBulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return hari + ' ' + namaBulan[bulan - 1] + ' ' + tahun;
}

// Nama bulan Indonesia dari "2026-11" menjadi "November 2026".
export function namaBulan(periode) {
  const [tahun, bulan] = periode.split('-').map(Number);
  const nama = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return nama[bulan - 1] + ' ' + tahun;
}
