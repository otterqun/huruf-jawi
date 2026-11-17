# Hikayat Jawi 3D: Pengembaraan Pustaka Ajaib 📖✨

Permainan pendidikan 3D interaktif berasaskan pelayar web untuk kanak-kanak (usia 5–9 tahun) mengenal, menyebut, menyurih, dan menguasai kesemua **37 huruf Jawi** — termasuk **6 huruf Jawi Melayu** (**چ ,ڠ ,ڤ ,ݢ ,ۏ ,ڽ**).

Dibina menggunakan **100% fail statik** (HTML, CSS, Vanilla JavaScript ES6+ Modules & Three.js melalui CDN) tanpa sebarang *build step* atau pelayan belakang, sedia untuk diterbitkan terus ke **GitHub Pages**.

---

## 🌟 Ciri-Ciri Utama

- **5 Dunia 3D Unik:**
  1. **Bab 1 — Kampung Cahaya** *(7 huruf)*: Kampung Melayu waktu senja dengan rumah bumbung panjang, pokok kelapa, dan kelip-kelip.
  2. **Bab 2 — Sungai Mutiara** *(8 huruf)*: Sungai jernih, jambatan kayu melengkung, kincir air berputar, dan teratai merah jambu.
  3. **Bab 3 — Pasar Rempah** *(7 huruf)*: Bazar rempah Nusantara dengan khemah berwarna-warni, lampu gantung, dan tempayan tanah liat.
  4. **Bab 4 — Taman Burung** *(9 huruf)*: Taman bunga sakura/lavender, kolam ikan koi berenang, jambatan merah, dan rumah burung 3D.
  5. **Bab 5 — Istana Bahasa Melayu** *(6 huruf Jawi Melayu)*: Halaman istana malam berbintang dengan kubah bawang emas dan obor istiadat.
- **Surihan Huruf Jawi Tepat (2 Fasa):**
  - **Fasa 1 (Bentuk Badan Huruf):** Menggunakan analisis kanvas luar skrin (*connected-component & centerline checkpoints*) supaya kanak-kanak menyurih keseluruhan huruf dari titik mula (`●`) hingga hujung (`★`).
  - **Fasa 2 (Ketik Titik):** Ketik setiap titik huruf satu per satu dengan tepat.
- **Kitab Jawi Saya:** Kamus interaktif 37 huruf lengkap dengan bentuk *Tunggal, Awal, Tengah, Akhir* serta perkataan contoh Jawi & Rumi yang diwarnakan huruf sasarannya.
- **Kamera Bebas 360° & Fizik Permukaan 3D:** Boleh pusing kamera 360°, mendaki tangga istana dan jambatan melengkung, serta perlanggaran objek pepejal.
- **Audio & Penyimpanan Automatik:** Suara sebutan huruf melalui Web Speech API (mengutamakan suara Bahasa Melayu *Natural/Neural* yang tersedia pada pelayar) dan kemajuan disimpan secara automatik dalam `localStorage`.

---

## 🎮 Kawalan Permainan

### Komputer (PC)
- **Gerak:** `W A S D` atau Kekunci Anak Panah
- **Pusing Kamera 360°:** Seret Tetikus atau `Q` / `E`
- **Zum Kamera:** Roda Tetikus (*Scroll*)
- **Lompat:** `Space`
- **Interaksi / Buka Huruf:** `Enter` (atau klik butang **✨**)

### Telefon Pintar / Tablet
- **Gerak:** Kayu ria maya (*Virtual Joystick*) di sebelah kiri bawah
- **Pusing Kamera:** Seret mana-mana bahagian skrin 3D
- **Lompat & Interaksi:** Butang di sebelah kanan bawah

---

## 🛠️ Teknologi

- **HTML5 & CSS3** (Google Fonts: `Noto Naskh Arabic`, `Amiri`, `Fredoka`)
- **Vanilla JavaScript (ES6+ Modules)**
- **Three.js `0.169.0`** (diimport terus melalui `https://esm.sh/three@0.169.0`)
- **Web Audio API & Web Speech API**

---

## 💻 Cara Uji di Komputer (Local)

Disebabkan projek ini menggunakan ES6 Modules (`type="module"`), buka melalui pelayan HTTP tempatan (bukan `file://`):

```bash
# Menggunakan Python
python -m http.server 8080
```

Kemudian buka pelayar web ke: `http://localhost:8080`

---

## 🚀 Cara Publish ke GitHub Pages (Menggunakan GitHub Desktop)

1. Buka **GitHub Desktop**.
2. Pilih **File → Add local repository...** dan pilih folder projek ini (`random-idea`).
3. Jika belum ada repositori Git, klik **create a repository** (atau **Publish repository** terus ke akaun GitHub anda).
4. Pastikan nama fail utama ialah `index.html`, `style.css`, `script.js`, dan `README.md`.
5. Taip mesej *Commit* (contoh: `Initial release: Hikayat Jawi 3D`), klik **Commit to main**, kemudian klik **Push origin**.
6. Buka repositori anda di laman web **GitHub.com** → klik **Settings** → **Pages**.
7. Di bawah **Build and deployment → Source**, pilih **Deploy from a branch**, pilih branch `main` dan folder `/ (root)`, kemudian klik **Save**.
8. Tunggu ~1–2 minit dan pautan permainan anda (`https://<username>.github.io/<repo-name>/`) sedia dimainkan!
