# 🇮🇩 Kalender Indonesia

Aplikasi kalender berbasis web yang menampilkan **Libur Nasional Indonesia** secara real-time, dilengkapi fitur manajemen acara pribadi, pengingat, dan dukungan multi-tema warna. Dirancang dengan tampilan modern *dark glassmorphism* yang responsif dan ramah pengguna.

---

## ✨ Fitur Utama

### 📅 Kalender
- Tampilan bulan lengkap dengan navigasi antar bulan
- Menampilkan **hari pasaran Jawa** (Legi, Pahing, Pon, Wage, Kliwon) di setiap tanggal
- Highlight otomatis untuk: hari ini, hari Minggu, hari libur nasional, dan tanggal yang dipilih
- Animasi transisi slide antar bulan yang smooth
- Swipe kiri/kanan di mobile untuk ganti bulan
- Navigasi cepat ke tahun tertentu via input tahun

### 🎉 Libur Nasional
- Data libur nasional Indonesia diambil secara real-time dari **Google Calendar API**
- Ditampilkan dengan badge dan dot indikator pada tanggal terkait
- Informasi nama libur muncul di info panel saat tanggal diklik
- Dapat di-toggle tampil/sembunyikan via filter pill

### 📌 Acara Pribadi
- Tambah, edit, dan hapus acara pada tanggal tertentu
- Isian: judul, tanggal, waktu (opsional), catatan (opsional)
- Daftar semua acara tersimpan di modal **Acara Saya**
- Dot indikator biru pada tanggal yang memiliki acara
- Dapat di-toggle tampil/sembunyikan via filter pill

### 🔔 Pengingat
- Aktifkan pengingat untuk acara yang memiliki waktu
- Menggunakan **Web Notifications API** — akan meminta izin notifikasi browser
- Pengecekan otomatis setiap menit di background

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

---

## 🗂️ Struktur File

```
kalender-indonesia/
├── index.html     # Struktur HTML & semua elemen UI
├── style.css      # Seluruh styling: layout, komponen, animasi, tema
├── main.js        # Logika aplikasi: state, API, render, event handler
└── README.md      # Dokumentasi ini
```

### Penjelasan Singkat Tiap File

**`index.html`**
Berisi kerangka HTML aplikasi, termasuk: header navigasi bulan, grid kalender, info panel, bottom bar, serta semua modal (tambah acara, tema, daftar acara, konfirmasi hapus). Tidak menggunakan framework CSS — semua class ditulis custom.

**`style.css`**
Styling lengkap berbasis CSS variables untuk kemudahan theming. Menggunakan pendekatan desain *dark glassmorphism* dengan font **Plus Jakarta Sans** dan **DM Mono**. Termasuk animasi keyframe untuk transisi kalender, modal bottom sheet, toggle switch, dan toast notifikasi.

**`main.js`**
Logika inti aplikasi dengan arsitektur berbasis state terpusat (`state` object). Mencakup:
- Fetch data libur dari Google Calendar API
- Render kalender dinamis + info panel
- CRUD acara (simpan, edit, hapus)
- Manajemen modal, toast, dan konfirmasi
- Pengecekan notifikasi background

---

## 🚀 Cara Penggunaan

### Menjalankan Lokal
Tidak memerlukan build tool atau instalasi npm. Cukup:

1. **Clone atau download** semua file ke satu folder
2. Buka `index.html` langsung di browser modern (Chrome, Firefox, Edge, Safari)

> ⚠️ Karena menggunakan Fetch API ke Google Calendar, pastikan browser mengizinkan akses jaringan. Buka via `http://` (server lokal) bukan `file://` jika mengalami CORS error.

### Menjalankan via Server Lokal (Opsional)
```bash
# Menggunakan Python
python -m http.server 8080

# Menggunakan Node.js (npx)
npx serve .

# Lalu buka di browser:
# http://localhost:8080
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
5. (Opsional) Batasi API key hanya untuk Google Calendar API dan domain Anda
6. Ganti nilai `API_KEY` di `main.js`

> ℹ️ Jika API key tidak valid atau habis kuota, kalender tetap berfungsi namun tanpa data libur nasional.

---

## 📱 Panduan Penggunaan Aplikasi

| Aksi | Cara |
|------|------|
| Ganti bulan | Ketuk tombol `‹` / `›` atau swipe kiri/kanan |
| Pergi ke tahun tertentu | Ubah angka di input tahun lalu ketuk **GO** |
| Kembali ke hari ini | Ketuk tombol **Hari Ini** di pojok kanan atas |
| Lihat detail tanggal | Ketuk tanggal di kalender |
| Tambah acara | Ketuk tombol **+** di bottom bar |
| Lihat semua acara | Ketuk ikon **Acara** di bottom bar |
| Ganti tema warna | Ketuk ikon **Tema** di bottom bar |
| Toggle libur nasional | Ketuk pill **Libur Nasional** di bawah header |
| Toggle acara pribadi | Ketuk pill **Acara Saya** di bawah header |
| Edit/hapus acara | Ketuk tanggal → ketuk tombol Edit atau Hapus di info panel |
| Aktifkan pengingat | Edit acara → isi waktu → aktifkan toggle Pengingat |

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Keterangan |
|-----------|------------|
| HTML5 | Struktur semantik, ARIA untuk aksesibilitas |
| CSS3 | Custom properties, animasi keyframe, backdrop-filter |
| Vanilla JavaScript (ES2020+) | Async/await, optional chaining, modules |
| Google Calendar API v3 | Sumber data libur nasional Indonesia |
| Web Notifications API | Sistem pengingat acara |
| localStorage | Persistensi data acara dan tema |
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

- **Tidak ada data yang dikirim ke server** selain request ke Google Calendar API (hanya untuk membaca data libur publik)
- Semua acara pribadi tersimpan **hanya di perangkat pengguna** melalui `localStorage`
- Tidak menggunakan cookie atau tracker apapun

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Silakan:

1. Fork repositori ini
2. Buat branch fitur baru (`git checkout -b fitur/nama-fitur`)
3. Commit perubahan (`git commit -m 'Tambah fitur X'`)
4. Push ke branch (`git push origin fitur/nama-fitur`)
5. Buat Pull Request

---

## 📄 Lisensi

Proyek ini dirilis di bawah lisensi **MIT**. Bebas digunakan, dimodifikasi, dan didistribusikan dengan mencantumkan atribusi kepada penulis asli.

---

## 👤 Author

**Ahmad Ragiel Zaini**

---

<p align="center">
  <sub>🇮🇩 Kalender Indonesia &mdash; Libur Nasional & Acara Pribadi</sub>
</p>