# Konteks Proyek — Cyber-Ronin Portfolio

Terakhir diperbarui: 19 Oktober 2026. Dokumen ini adalah ringkasan kerja dan keputusan produk berdasarkan percakapan serta kondisi repository lokal, bukan pengganti verifikasi visual atau audit produksi.

## 1. Tujuan produk dan positioning

Portfolio pribadi Muhamad Nur Yanfa untuk peluang **Backend, Go, Security, dan DevOps/DevSecOps**. Branding utamanya: engineer yang membangun backend, menetapkan batas keamanan, dan memperbaiki jalur delivery ke production. Website harus terasa seperti **professional interactive engineering interface**, bukan showcase frontend yang mengorbankan keterbacaan isi.

Arahan visual menggabungkan nuansa *Wuthering Waves* dan *Cyberpunk: Edgerunners* dengan bahasa **tactical anime sci-fi HUD + cybersecurity SOC console**. Interpretasinya adalah ritme, atmosfer, dan sistem antarmuka—bukan menyalin aset atau UI kedua karya tersebut. Ciri yang dipertahankan: warna gelap, cyan/resonance sebagai sinyal, aksen acid/crimson seperlunya, tipografi teknis, reticle, telemetry, radar, dan struktur navigasi yang tidak terasa seperti landing page generik.

Prioritas terbaru: **performance → interaction → polish**. Motion harus membantu hierarki dan pemahaman konten, terasa responsif di mouse maupun perangkat sentuh/keyboard, dan tidak membuat tiap panel memakai semua efek sekaligus.

## 2. Struktur pengalaman

| Route | Identitas | Informasi utama |
| --- | --- | --- |
| `/` | Nexus | Hub interaktif dengan empat node menuju area portfolio. |
| `/archive` | Operations | Matriks tujuh proyek, dossier, tautan repository, dan peta konsep tiga tahap per proyek. Mendukung deep link `?project=CODE`. |
| `/timeline` | Trace | Tiga pengalaman kerja dan tanggung jawab. |
| `/network` | Channel | Kanal email, GitHub, dan LinkedIn melalui radar/selector. |
| `/overview` | Overview | Ringkasan teknis yang lebih linear, dapat dicetak/disimpan sebagai PDF dari browser. |
| `*` | Not Found | Fallback untuk route tak dikenal. |

Navigasi utama berbentuk rail dan topbar. Fasilitas tambahan: shortcut keyboard `1–4` dan `O`, keymap modal (`?` / `Ctrl/Cmd+K`), terminal drawer (backtick), skip link, focus state, serta pengaturan motion `Device / Full / Reduced`. Pemilihan proyek dan kanal memiliki interaksi keyboard berbasis tab/arrow key. Transisi route dibuat singkat dan berpusat agar tidak menghalangi halaman atau menimbulkan blank state.

## 3. Konten yang saat ini terpasang

Sumber konten utama berada di `src/content/`:

- `profile.js`: nama, role, tagline, lokasi, dan positioning.
- `projects.js`: AegisGate, TaskForge, SecureNet Enterprise Lab, Zenith Task Manager, Smart Sprint Training System, Certificate Validation System, dan E-Commerce SQA. Status proyek dibedakan antara release, foundation, lab, prototype, in development, dan archived; jangan menyamakan semuanya dengan production-ready.
- `projectScenes.js`: peta konsep tiga tahap dan catatan trade-off/ADR untuk setiap proyek.
- `experience.js`: Nuansa Teknologi Indonesia (NTI) sebagai DevOps Engineer saat ini; Universitas Kebangsaan / SI MANTAP sebagai Fullstack Developer; Digitak Labs sebagai Backend Engineer Intern. Untuk NTI, tanggung jawab yang diberikan pemilik portfolio adalah delivery web ke production, workflow kode tim/CI-CD, serta setup server dan hosting.

Sebagian detail konten masih akan ditinjau dan dikoreksi oleh pemilik portfolio. Khususnya, klaim teknis yang sangat spesifik di `projectScenes.js` perlu dicocokkan lagi dengan implementasi dan bukti di tiap repository sebelum dipakai sebagai pernyataan faktual final.

Pada halaman Contact, alamat email **tidak ditampilkan sebagai teks**. Tombol email membuka aplikasi email melalui `mailto:` ke `nuryanfa93@gmail.com`. Ini menyembunyikan alamat dari tampilan biasa, **bukan** menyembunyikannya dari source/inspeksi tautan atau bot. Solusi privasi yang lebih kuat kelak memerlukan relay/form server-side dengan proteksi spam.

## 3a. Redesign "Cyber-luxe" (19 Oktober 2026)

Atas permintaan pemilik, seluruh halaman dirombak ke arah **Cyber-luxe**: identitas cyber/HUD dipertahankan, tetapi dinaikkan ke standar situs Awwwards/Dribbble. Ciri utamanya adalah tipografi display besar (Geist + Instrument Serif italic dengan gradient cyan→violet→ember + Geist Mono), hero WebGL, aurora, grain, kartu kaca, dan motion berbasis scroll.

- Library baru yang **disetujui pemilik**: `gsap` (ScrollTrigger, SplitText), `@gsap/react`, `three`, `@react-three/fiber@8` (v9 butuh React 19).
- Design system ada di `src/luxe.css` (dimuat terakhir; semua class `lx-*`). CSS lama tetap dimuat untuk keymap modal, terminal drawer, dan menu Motion.
- `src/luxe/gsap.js` adalah satu-satunya titik registrasi plugin dan menyediakan sinyal `onIntroDone`. Event intro dikirim lewat microtask; jangan memanggil `build` konsumen langsung dari callback timeline, karena GSAP akan memasukkan tween tersebut ke context pemanggil lalu me-revert-nya.
- `src/luxe/lenis.js` menyimpan instance Lenis bersama. Lenis digerakkan oleh `gsap.ticker` dan memanggil `ScrollTrigger.update`.
- Komponen di `src/components/luxe/`: `HeroOrb` (shader R3F, lazy, hanya di browser yang mendukung WebGL, berhenti render saat di luar layar), `SplitReveal`, `ScrollWords`, `Marquee`, `ProjectCard`, `Preloader` (sekali per sesi), `LuxeCursor`.
- `AnimatedPage` menangani atribut `data-reveal`, `data-parallax`, `data-clip`, dan `data-count`. `ContentTransition` menganimasikan `[data-stagger]`.
- `RouteTransition` memakai tirai: tutup → ganti route + reset scroll → buka. Perubahan query saja (deep link proyek) berganti instan. `App.jsx` meneruskan lokasi tampilan ke `<Routes>`.
- Navigasi memakai label jelas (Home/Work/Experience/Contact) dengan kode lama (Nexus/Operations/Trace/Channel) sebagai label sekunder. Home kini berupa landing scroll; hub node lama (`NexusScene`) tidak lagi dipakai.
- Konten pilar keahlian dan daftar stack dipindah ke `src/content/capabilities.js`.
- `scripts/smoke-render.mjs` kini menyetel `ssr.resolve.externalConditions: ["module-sync"]`. Tanpa itu, Node 22 + Vite 5 memuat build CJS `react-router-dom` dan smoke test gagal (masalah ini sudah ada sebelum redesign).

## 3b. Eksplorasi "Cyber-anime" (branch `design/cyber-anime`)

Pemilik menyukai cyber-luxe tetapi menginginkan nuansa **anime + cybersecurity** yang lebih kuat. Referensi yang dipilih adalah Evangelion/NERV, tanpa karakter di hero, dengan kanji yang menonjol dan motif terminal, SOC, glitch, serta mecha HUD. Desain cyber-luxe tetap utuh di branch `design/cyber-luxe`.

- Stylesheet tema ada di `src/anime.css` (menggantikan `luxe.css`; prefix `lx-*` tetap dipakai). Palet: hitam, oranye peringatan `#ff7a00`, merah alert, lime, ungu. Font: Shippori Mincho B1 (kanji dan judul), Barlow Condensed (label HUD), Barlow (body), JetBrains Mono.
- `src/content/episodes.js`: setiap route adalah "episode" (kanji, bacaan, judul Inggris), urutan "next episode" untuk footer, dan `statusTone()` yang memetakan status proyek ke warna.
- Komponen baru: `HeroCore` (oktahedron + perisai heksagonal dengan riak benturan; klik memicu benturan), `TriadPanel` (tiga inti yang "voting"), `ThreatMap` (feed SOC **simulasi**, berlabel jelas, IP dari rentang dokumentasi RFC 5737), dan `EpisodeHeader`.
- Preloader berupa boot terminal → ACCESS GRANTED → title card. Transisi route berupa title card hard-cut lalu terpotong per slice. Kursor berbentuk reticle.
- Hindari nama, logo, atau aset resmi dari franchise; semua istilah seperti "Triad system" dibuat sendiri.
- `src/luxe/gsap.js` kini memanggil `ScrollTrigger.refresh()` setelah web font selesai dimuat. Sebelumnya, reveal bisa macet pada kunjungan langsung karena font Mincho mengubah layout setelah posisi trigger dihitung.

## 3c. Refinement cyber-anime (19 Oktober 2026, sore)

- **Section 3 diganti dari ThreatMap menjadi Loadout** (`components/luxe/Loadout.jsx`, data `loadout` di `content/capabilities.js`). Setiap tool hanya menautkan project/pengalaman yang tag-nya cocok di file konten, jadi tidak ada klaim yang ditulis tangan.
- **Satu library animasi.** Framer Motion, Anime.js, tsParticles, dan Tailwind dihapus. Penggantinya: `luxe/usePresence.js` (mount/unmount ber-animasi), `luxe/useGlider.js` (highlight yang meluncur), dan GSAP untuk semua animasi. `index.css` kini berisi reset minimal, dan tujuh file CSS lama serta 29 komponen mati dihapus.
- **Gating "stage ready" (`onStageReady` di `luxe/gsap.js`).** Reveal halaman menunggu preloader selesai dan tirai route terbuka.
- **Transisi route berupa panel miring berarah tunggal (kanan → kiri) dengan title card bermask.** Konten lama dan baru dianimasikan dengan **opacity, bukan autoAlpha**. `visibility` diwariskan, sehingga tween di halaman baru yang dibuat saat konten disembunyikan akan merekam "hidden" sebagai state awal; inilah penyebab hero Home tak terlihat setelah navigasi.
- **Reset scroll dimiliki RouteTransition.** TabTitleUpdater tidak lagi memanggil `scrollTo`, yang sebelumnya membuat halaman melompat sebelum tirai menutup.
- **Kartu project dan dossier memakai tata letak "codename + scope"** (`Scope` di ProjectCard): bracket hanya membingkai ikon. Dossier Work berupa scan panel bertingkat (bar / codename + scope / readout).
- **Hero berupa grid dua kolom.** Di ≤1023px, `.lx-hero__visual` memakai `display: contents` agar urutannya menjadi inti → teks → TRIAD.
- **Easter egg mode EMERGENCY** (`luxe/emergency.js`): Konami code, `breach` di terminal, atau tombol di command map; Esc atau 9 detik untuk menghentikan. Terminal memiliki perintah bertema (`whoami`, `ls operations|records`, `open <code>`, `cat triad.log`, `episode <n>`, `loadout`, `sound`, `breach`).
- **Gambar OG per episode** ada di `public/og/*.png`, dibuat dari `scripts/og-template.mjs` dengan browser headless; render ulang jika judul episode berubah. `scripts/prerender-routes.mjs` (bagian dari `npm run build`) menulis `dist/<route>.html` dengan meta per route; `vercel.json` memakai `cleanUrls`.
- **Performa.** Font Google dimuat async, ada boot shell statis di `#root`, route dan overlay di-code-split dengan prefetch saat idle, dan HeroCore dimuat saat idle (CSS fallback untuk save-data/perangkat lemah). Lighthouse lokal (build produksi): desktop 85, mobile 49 (FCP 1,7 dtk; LCP 7,4 dtk karena SPA tanpa prerender HTML). Langkah berikutnya bila diperlukan: prerender HTML Home saat build.
- **Alat uji.** Patchright menjalankan `page.evaluate` di isolated world, sehingga state modul aplikasi tidak terlihat dari sana. Untuk men-debug state GSAP, tulis ke atribut DOM.

## 4. Stack dan arsitektur kode

- React 18 + Vite 5, React Router untuk route, CSS dan Tailwind utilities.
- Framer Motion untuk state/route/entrance tertentu; **Anime.js v4** untuk sequence dan micro-interaction. Jangan memakai API Anime.js v3.
- Lenis untuk smooth wheel scrolling (`lerp: 0.09`), nonaktif pada reduced motion dan berhenti saat keymap/terminal aktif.
- tsParticles tersedia sebagai dependency, tetapi tidak setiap efek visual memakainya.
- Lucide React untuk ikon; Vercel Analytics dan Speed Insights terpasang.
- `src/App.jsx` mengatur router, `MotionConfig`, halaman, dan layout. `src/components/Layout.jsx` mengatur shell, navigasi, overlay, shortcut, Lenis, serta pause state background.
- CSS tersebar di `index.css`, `experience.css`, `refinement.css`, `nexus.css`, `motion.css`, `upgrade.css`, dan `tactical.css`. Arah konsolidasi: visual HUD/card di `tactical.css`; keyframe, state motion, dan reduced-motion di `motion.css`. Jangan menghapus selector lama tanpa mencari pemakaiannya.

## 5. Motion system dan keputusan UX terbaru

- `useHoloTilt.js` adalah satu-satunya sumber physics tilt berbasis pointer. Ia memakai listener terdelegasi, CSS custom properties, interpolasi RAF, dan tidak melakukan React render per pointer frame. `TiltPanel.jsx` kini hanya wrapper. Tilt/spotlight diprioritaskan untuk featured surface, bukan semua kartu.
- `LockOn.jsx` memakai sequence Anime.js v4 pada hover/focus; telemetry `ProjectTelemetry.jsx` memberi burst singkat pada kartu proyek, tanpa idle loop kuat.
- `OperationMap.jsx` mempertahankan selector tahap dan menambah SVG dataflow. Path digambar sekali saat masuk viewport; dua packet bergerak lambat dan dijeda saat tab tersembunyi, keluar viewport, atau overlay aktif.
- `SignalLattice.jsx` menjeda canvas clock saat tab tersembunyi atau overlay aktif. `NexusScene.jsx` mengurangi loop packet idle; `Timeline.jsx` menghentikan pulse dekoratif saat overlay/tab tidak aktif. `Network.jsx` tetap beridentitas radar/komunikasi, bukan diagram arsitektur kedua.
- `DecodeText.jsx` memakai glyph yang dapat dikustomisasi lewat `chars`, panjang tampilan tetap, dan reduced motion langsung menampilkan teks final. `DecryptText.jsx` dipertahankan sebagai alias kompatibilitas.
- Preferensi motion disimpan di `localStorage` dengan fallback in-memory melalui `experiencePreferences.js`; `useMotionPreference.js` menggabungkan pilihan pengguna dan preferensi OS. Motion dekoratif tidak boleh menghilangkan konten, focus indicator, atau feedback aksesibilitas.

Hierarki yang diinginkan: hero mendapat entrance sinematik; navigasi tetap subtil; kartu biasa cukup border/telemetry; featured project boleh tilt + spotlight; CTA memakai LockOn; diagram arsitektur memakai path/packet; teks penting saja yang di-decode.

## 6. Status Git dan validasi

- Branch kerja saat dokumen ini dibuat: `development-ui-ux`.
- Commit terakhir yang sudah ada di remote branch tersebut: `c0ef038` (`feat(ui): refine cyber-ronin aesthetic, motion polish, and multi-device responsive layouts`).
- Refinement motion terakhir—termasuk Lenis, telemetry, SVG map, dan optimasi loop—**masih berupa perubahan lokal yang belum di-commit dan belum di-push**. Jangan menyatakan fitur tersebut sudah tersedia di GitHub sampai benar-benar di-commit/push.
- Validasi terakhir setelah refinement: `npm install`, `npm run build`, `npm run test:smoke`, dan `git diff --check` berhasil. Smoke test merender lima route utama dan tujuh deep link proyek.
- `npm audit --omit=dev` menemukan 0 vulnerability pada dependency produksi; audit keseluruhan melaporkan 12 advisory pada dependency development. Belum dilakukan `npm audit fix` otomatis.
- QA visual/browser nyata dan pengukuran FPS di beberapa device **belum terverifikasi** karena browser automation tidak tersedia dalam sesi implementasi terakhir. Build/smoke test tidak membuktikan animasi mencapai 60 FPS atau bebas masalah di setiap browser.

## 7. Guardrail untuk pekerjaan berikutnya

1. Pertahankan routing, struktur `src/content/`, keyboard navigation, terminal drawer, keymap modal, skip link, focus state, serta reduced motion.
2. GSAP, Three.js, dan R3F kini resmi dipakai (lihat 3a). Gunakan `src/luxe/gsap.js` dan `useGSAP` agar semua animasi ter-revert saat unmount. Di branch `design/cyber-anime`, GSAP adalah satu-satunya library animasi (Framer Motion dan Anime.js sudah dihapus); jangan menambahkannya kembali.
3. Uji desktop, tablet, mobile, keyboard-only, dan reduced motion secara visual sebelum menyebut motion final. Periksa overlay, deep link, route back/forward, dan scroll internal drawer.
4. Audit klaim portfolio terhadap repository aktual dan minta detail tanggal/hasil kerja yang belum diberikan; jangan mengarang metrik atau status production.
5. Lanjutkan pengukuran Core Web Vitals, biaya canvas/blur, tautan eksternal, metadata SEO, dan robots/sitemap bila diperlukan. Jangan menyimpulkan seluruhnya sudah tuntas hanya dari build.
6. Commit atau push hanya jika diminta secara eksplisit. Pada permintaan pembuatan dokumen ini, **tidak ada commit atau push**.
