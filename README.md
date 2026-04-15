# 🇮🇩 Kalender Indonesia

Aplikasi kalender berbasis web yang menampilkan **Libur Nasional Indonesia** secara real-time, dilengkapi sistem **Weton Jawa** lengkap, manajemen acara pribadi, pengingat, dan dukungan multi-tema warna. Dirancang dengan tampilan modern *dark glassmorphism* yang responsif dan ramah pengguna di mobile maupun desktop.

---

## ✨ Fitur Utama

Aplikasi ini terbagi dalam **2 tab utama**: Kalender dan Weton.

---

### 📅 Tab Kalender

#### Kalender Interaktif
- Tampilan bulan lengkap dengan navigasi antar bulan (tombol `‹` / `›`)
- Menampilkan **nama pasaran Jawa** (Legi, Pahing, Pon, Wage, Kliwon) di setiap sel tanggal
- Highlight otomatis untuk: hari ini, hari Minggu, hari libur nasional, dan tanggal yang dipilih
- Animasi transisi slide yang smooth saat ganti bulan
- Swipe kiri/kanan di mobile untuk berpindah bulan
- Navigasi cepat ke tahun tertentu via input tahun + tombol **GO**
- **3 filter pill** di bawah header: Libur Nasional, Acara Saya, Weton — masing-masing bisa di-toggle

#### 🎉 Libur Nasional
- Data diambil real-time dari **Google Calendar API**
- Dot merah sebagai indikator pada tanggal yang memiliki libur nasional
- Nama libur tampil di info panel saat tanggal diklik

#### 🔮 Weton di Kalender
- Weton hari + pasaran tampil langsung di setiap sel kalender
- Saat tanggal diklik, info panel menampilkan detail weton lengkap:
  - Nama weton (hari + pasaran)
  - Neptu hari, neptu pasaran, dan total neptu
  - Watak ringkas berdasarkan pasaran
  - Badge **✨ Hari Baik** jika neptu termasuk kategori baik
- Tombol **"Lihat Detail Weton"** membuka modal berisi watak lengkap, anjuran, dan pantangan

#### 📌 Acara Pribadi
- Tambah, edit, dan hapus acara pada tanggal tertentu
- Form acara: judul, tanggal, waktu (opsional), catatan (opsional)
- Daftar semua acara tersimpan di modal **Acara Saya**
- Dot biru sebagai indikator pada tanggal yang memiliki acara

#### 🔔 Pengingat
- Aktifkan pengingat notifikasi untuk acara yang memiliki waktu
- Menggunakan **Web Notifications API**
- Pengecekan otomatis setiap menit di background

---

### 🔮 Tab Weton

Tab khusus yang berisi 5 fitur perhitungan Primbon Jawa:

#### 1. Kalkulator Weton
Input tanggal lahir → keluar hasil lengkap:
- Nama weton (hari + pasaran)
- Neptu hari & pasaran
- Total neptu
- Status hari baik
- Watak & karakter berdasarkan pasaran
- Anjuran hari baik
- Pantangan yang perlu dihindari

#### 2. Weton Hari Ini
Menampilkan weton, tanggal lengkap, dan total neptu untuk hari ini secara otomatis.

#### 3. Hari Baik Bulan Ini
Daftar tanggal-tanggal dengan neptu tinggi di bulan yang sedang ditampilkan. Setiap item bisa diklik untuk langsung loncat ke tanggal tersebut di kalender.

#### 4. Cek Kecocokan Weton
Input 2 tanggal lahir → keluar:
- Weton dan neptu masing-masing
- Total neptu gabungan
- Skor kecocokan (0–100)
- Nama kecocokan Primbon: *Wasesa Segara, Tunggak Semi, Satriya Wibawa, Sumur Sinaba, Pandita Sakti, Bumi Kapetak, Lebu Katiup Angin, Satria Wirang, Tulus*
- Makna dan deskripsi kecocokan

#### 5. Referensi Watak Pasaran
Kartu ringkas untuk setiap pasaran (Legi, Pahing, Pon, Wage, Kliwon) berisi nilai neptu dan gambaran watak/karakter.

#### 6. Tabel Nilai Neptu
Tabel referensi cepat nilai neptu untuk semua hari (Ahad–Sabtu) dan semua pasaran.

---

### 🎨 Multi Tema

Tersedia **6 pilihan tema warna**:

| Tema | Warna Aksen |
|------|-------------|
| 🔵 Biru   | `#4f8ef7` |
| 🟢 Hijau  | `#22c55e` |
| 🟣 Ungu   | `#a855f7` |
| 🔴 Merah  | `#f43f5e` |
| 🟡 Kuning | `#f59e0b` |
| 🩵 Teal   | `#14b8a6` |

Pilihan tema tersimpan otomatis di `localStorage`.

### 💾 Penyimpanan Lokal
- Semua acara pribadi dan preferensi tema disimpan di **localStorage** browser
- Data tetap ada meskipun browser ditutup atau di-refresh
- Tidak ada data yang dikirim ke server

---

## 🗂️ Struktur File

```
kalender-indonesia/
├── index.html     # Struktur HTML: 2 tab (Kalender & Weton), semua modal
├── style.css      # Styling lengkap: layout, komponen weton, animasi, tema
├── main.js        # Logika aplikasi: kalender, weton engine, API, CRUD acara
└── README.md      # Dokumentasi ini
```

### Penjelasan Tiap File

**`index.html`**
Berisi kerangka HTML dua tab (Kalender dan Weton), termasuk: tab bar navigasi, header dengan navigasi bulan, grid kalender, info panel, filter pills, bottom bar, serta semua modal (tambah/edit acara, tema, daftar acara, detail weton, konfirmasi hapus). Tidak menggunakan framework CSS eksternal — semua class ditulis custom.

**`style.css`**
Styling lengkap berbasis CSS variables untuk kemudahan theming. Menggunakan desain *dark glassmorphism* dengan font **Plus Jakarta Sans** dan **DM Mono**. Mencakup: animasi keyframe kalender, modal bottom sheet, toggle switch, toast, tab system, dan seluruh komponen halaman Weton (kalkulator, kecocokan, watak grid, neptu table, hari baik list).

**`main.js`**
Logika inti aplikasi dengan arsitektur berbasis state terpusat. Mencakup:
- **Weton Engine** — kalkulasi pasaran berdasarkan referensi tanggal, neptu, watak, kecocokan Primbon
- Fetch data libur dari Google Calendar API
- Render kalender dinamis + info panel dengan weton terintegrasi
- Tab system (Kalender ↔ Weton)
- CRUD acara pribadi (simpan, edit, hapus)
- Kalkulator weton, kecocokan, hari baik
- Manajemen modal, toast, dan konfirmasi
- Pengecekan notifikasi background tiap menit

---

## 📊 Data Weton yang Digunakan

### Nilai Neptu Hari
| Hari | Neptu |
|------|-------|
| Ahad (Minggu) | 5 |
| Senin | 4 |
| Selasa | 3 |
| Rabu | 7 |
| Kamis | 8 |
| Jumat | 6 |
| Sabtu | 9 |

### Nilai Neptu Pasaran
| Pasaran | Neptu |
|---------|-------|
| Legi | 5 |
| Pahing | 9 |
| Pon | 7 |
| Wage | 4 |
| Kliwon | 8 |

### Klasifikasi Kecocokan (Primbon)
| Sisa Neptu | Nama | Kategori |
|-----------|------|----------|
| 1 | Wasesa Segara | Bagus |
| 2 | Tunggak Semi | Bagus |
| 3 | Satriya Wibawa | Bagus |
| 4 | Sumur Sinaba | Bagus |
| 5 | Pandita Sakti | Sedang |
| 6 | Bumi Kapetak | Sedang |
| 7 | Lebu Katiup Angin | Kurang |
| 8 | Satria Wirang | Sedang |
| 9 | Tulus | Bagus |

---

## 🚀 Cara Menjalankan

Tidak memerlukan build tool atau instalasi npm. Cukup:

1. **Clone atau download** semua file ke satu folder
2. Buka `index.html` di browser modern

```bash
git clone https://github.com/username/kalender-indonesia.git
cd kalender-indonesia
```

> ⚠️ Buka via `http://` (server lokal) bukan `file://` jika mengalami CORS error dari Google Calendar API.

### Via Server Lokal
```bash
# Python
python -m http.server 8080

# Node.js
npx serve .

# Lalu buka: http://localhost:8080
```

---

## ⚙️ Konfigurasi API

Data libur nasional diambil dari Google Calendar API. Konfigurasi ada di bagian atas `main.js`:

```js
const API_KEY     = "YOUR_GOOGLE_CALENDAR_API_KEY";
const CALENDAR_ID = "id.indonesian#holiday@group.v.calendar.google.com";
```

### Cara Mendapatkan API Key
1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang ada
3. Aktifkan **Google Calendar API**
4. Buat **API Key** di menu *Credentials*
5. (Opsional) Batasi key hanya untuk Google Calendar API dan domain Anda
6. Ganti nilai `API_KEY` di `main.js`

> ℹ️ Jika API key tidak valid atau habis kuota, kalender tetap berfungsi namun tanpa data libur nasional. Fitur Weton tetap berjalan penuh karena bersifat offline.

---

## 📱 Panduan Penggunaan

### Tab Kalender
| Aksi | Cara |
|------|------|
| Ganti bulan | Tombol `‹` / `›` atau swipe kiri/kanan |
| Ke tahun tertentu | Input angka tahun → **GO** |
| Kembali ke hari ini | Tombol **Hari Ini** pojok kanan atas |
| Lihat detail tanggal | Ketuk tanggal di kalender |
| Lihat detail weton | Ketuk tanggal → ketuk **Lihat Detail Weton** |
| Toggle libur nasional | Pill **Libur Nasional** di bawah header |
| Toggle acara saya | Pill **Acara Saya** di bawah header |
| Toggle tampil weton | Pill **Weton** di bawah header |
| Tambah acara | Tombol **+** di bottom bar |
| Lihat semua acara | Ikon **Acara** di bottom bar |
| Ganti tema warna | Ikon **Tema** di bottom bar |
| Edit / hapus acara | Ketuk tanggal → tombol Edit atau Hapus di info panel |
| Aktifkan pengingat | Edit acara → isi waktu → toggle Pengingat |

### Tab Weton
| Aksi | Cara |
|------|------|
| Hitung weton dari tanggal lahir | Isi input tanggal → **Hitung** |
| Cek kecocokan dua weton | Isi 2 tanggal lahir → **Cek Kecocokan** |
| Lihat hari baik bulan ini | Lihat daftar di bagian Hari Baik |
| Loncat ke tanggal di kalender | Ketuk item di daftar Hari Baik |

---

## 🛠️ Teknologi

| Teknologi | Keterangan |
|-----------|------------|
| HTML5 | Struktur semantik, ARIA aksesibilitas |
| CSS3 | Custom properties, animasi keyframe, backdrop-filter |
| Vanilla JavaScript ES2020+ | Async/await, optional chaining, state management |
| Google Calendar API v3 | Sumber data libur nasional Indonesia |
| Web Notifications API | Sistem pengingat acara |
| localStorage | Persistensi acara dan tema |
| Google Fonts | Plus Jakarta Sans + DM Mono |

---

## 🖥️ Kompatibilitas Browser

| Browser | Dukungan |
|---------|----------|
| Chrome 90+ | ✅ Penuh |
| Firefox 88+ | ✅ Penuh |
| Edge 90+ | ✅ Penuh |
| Safari 15+ | ✅ Penuh |
| Chrome Android | ✅ Penuh |
| Safari iOS | ✅ Penuh (notifikasi terbatas) |

---

## 📁 Data & Privasi

- Fitur **Weton berjalan sepenuhnya offline** — tidak ada data yang dikirim ke server
- Data libur nasional diambil dari Google Calendar API (read-only, publik)
- Semua acara pribadi tersimpan **hanya di perangkat pengguna** via `localStorage`
- Tidak menggunakan cookie atau tracker apapun

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Silakan:

1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b feat/nama-fitur`)
3. Commit perubahan (`git commit -m 'feat: tambah fitur X'`)
4. Push ke branch (`git push origin feat/nama-fitur`)
5. Buat Pull Request

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi **MIT**. Bebas digunakan, dimodifikasi, dan didistribusikan dengan mencantumkan atribusi kepada penulis asli.

---

## 👤 Author

**Ahmad Ragiel Zaini**

> *"Dibuat dengan ❤️ untuk memudahkan pengguna Indonesia dalam memantau hari libur nasional, mengelola agenda harian, dan menjaga kearifan lokal Jawa melalui perhitungan Weton."*

---

<p align="center">
  <sub>🇮🇩 Kalender Indonesia &mdash; Libur Nasional, Acara Pribadi & Weton Jawa</sub>
</p>