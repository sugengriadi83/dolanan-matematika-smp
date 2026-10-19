// ============================================================================
// DATA HERO ORISINAL (8 KSATRIA MATEMATIKA KERAJAAN JAWA KUNO)
// ============================================================================
const HEROES_DATA = [
  {
    id: "paiman",
    name: "PAIMAN",
    title: "Ksatria Pedang Angka",
    desc: "Senopati muda berpedang pusaka angka dengan keseimbangan serangan dan pertahanan tinggi.",
    color: "#2563eb",
    accent: "#facc15",
    weapon: "sword",
    hp: 130,
    atk: 26,
    def: 16,
    price: 0,
    unlockedDefault: true
  },
  {
    id: "paitun",
    name: "PAITUN",
    title: "Jagabaya Perisai Pecahan",
    desc: "Penjaga gerbang keraton bertameng pecahan dengan HP tebal dan ketahanan luar biasa.",
    color: "#059669",
    accent: "#6ee7b7",
    weapon: "shield",
    hp: 155,
    atk: 23,
    def: 22,
    price: 0,
    unlockedDefault: true
  },
  {
    id: "jainem",
    name: "JAINEM",
    title: "Empu Sihir Aljabar",
    desc: "Putri keraton pengendali variabel x dan y dengan ledakan mantra aljabar berdaya rusak tinggi.",
    color: "#9333ea",
    accent: "#f472b6",
    weapon: "staff",
    hp: 115,
    atk: 32,
    def: 12,
    price: 150,
    unlockedDefault: false
  },
  {
    id: "cikrak",
    name: "CIKRAK",
    title: "Pemanah Gendewa Geometri",
    desc: "Pemanah sudut presisi kerajaan yang selalu mengenai titik lemah bangun ruang lawan.",
    color: "#0d9488",
    accent: "#fde047",
    weapon: "bow",
    hp: 120,
    atk: 30,
    def: 14,
    price: 200,
    unlockedDefault: false
  },
  {
    id: "bejo",
    name: "BEJO",
    title: "Pendekar Petir Aritmetika",
    desc: "Pewaris ilmu kilat hitung cepat dengan sambaran petir beruntun.",
    color: "#ca8a04",
    accent: "#38bdf8",
    weapon: "lightning",
    hp: 125,
    atk: 31,
    def: 15,
    price: 250,
    unlockedDefault: false
  },
  {
    id: "semprul",
    name: "SEMPRUL",
    title: "Bhayangkara Gada Bilangan",
    desc: "Benteng bilangan bulat positif dan negatif yang kebal terhadap serangan mendadak.",
    color: "#ea580c",
    accent: "#fef08a",
    weapon: "hammer",
    hp: 165,
    atk: 25,
    def: 24,
    price: 300,
    unlockedDefault: false
  },
  {
    id: "parman",
    name: "PARMAN",
    title: "Pujangga Lontar Logika",
    desc: "Mahaguru penalaran HOTS dan peluang dengan jurus kitab lontar kritikal mematikan.",
    color: "#be185d",
    accent: "#a855f7",
    weapon: "tome",
    hp: 130,
    atk: 35,
    def: 16,
    price: 400,
    unlockedDefault: false
  },
  {
    id: "partono",
    name: "PARTONO",
    title: "Mahapatih Cakra Waktu",
    desc: "Penguasa Cakra Surya Majapahit dan fungsi kuadrat dengan kekuatan legendaris.",
    color: "#0f766e",
    accent: "#f59e0b",
    weapon: "chrono",
    hp: 145,
    atk: 36,
    def: 20,
    price: 500,
    unlockedDefault: false
  }
];

// ============================================================================
// DATA MONSTER LAWAN (RAKSASA / BHUTA KALA JAWA KUNO)
// ============================================================================
const ENEMIES_DATA = [
  { name: "Buto Minus", title: "Raksasa Bilangan", hp: 100, atk: 18, color: "#b91c1c" },
  { name: "Kala Golem Pecahan", title: "Penjaga Desimal", hp: 130, atk: 22, color: "#c2410c" },
  { name: "Bayangan Aljabar", title: "Siluman Variabel", hp: 150, atk: 25, color: "#7e22ce" },
  { name: "Buto Cakil Sudut", title: "Raksasa Geometri", hp: 175, atk: 28, color: "#0f766e" },
  { name: "Naga Bhuta Kuadrat", title: "RAJA IBLIS LEGENDARIS", hp: 260, atk: 34, color: "#991b1b", isBoss: true }
];

// ============================================================================
// BANK SOAL MATEMATIKA SMP (KELAS 7, 8, 9 - KURIKULUM MERDEKA)
// Terdiri atas 60 soal inti kontekstual + 60 soal variasi terstruktur = 120+ Soal
// ============================================================================
const CORE_QUESTIONS = [
  // ================= KELAS 7 =================
  {
    id: "K7-01", kelas: "7", materi: "Bilangan Bulat", kesulitan: "mudah", poin: 10,
    soal: "Suhu di dalam kulkas semula adalah -6°C. Saat listrik padam, suhu naik 4°C setiap 10 menit. Berapa suhu kulkas setelah padam selama 30 menit?",
    pilihan: ["6°C", "4°C", "-2°C", "12°C"],
    jawaban: "6°C",
    pembahasan: "30 menit = 3 kali kenaikan (3 × 4°C = 12°C). Suhu akhir = -6°C + 12°C = 6°C.",
    konsep: "Operasi hitung bilangan bulat positif dan negatif"
  },
  {
    id: "K7-02", kelas: "7", materi: "Bilangan Bulat", kesulitan: "sedang", poin: 15,
    soal: "Dalam kompetisi matematika, jawaban benar diberi nilai 4, salah -2, dan tidak dijawab -1. Dari 25 soal, Budi menjawab benar 18 soal dan salah 5 soal. Nilai Budi adalah...",
    pilihan: ["60", "62", "64", "58"],
    jawaban: "60",
    pembahasan: "Tidak dijawab = 25 - (18 + 5) = 2 soal. Nilai = (18×4) + (5×(-2)) + (2×(-1)) = 72 - 10 - 2 = 60.",
    konsep: "Aritmetika bilangan bulat pada sistem skor"
  },
  {
    id: "K7-03", kelas: "7", materi: "Pecahan dan Desimal", kesulitan: "mudah", poin: 10,
    soal: "Ibu memiliki 2,5 kg tepung terigu. Sebanyak 3/4 kg digunakan untuk membuat kue. Sisa tepung terigu Ibu adalah...",
    pilihan: ["1,75 kg", "1,25 kg", "1,50 kg", "2,25 kg"],
    jawaban: "1,75 kg",
    pembahasan: "3/4 kg = 0,75 kg. Sisa tepung = 2,5 - 0,75 = 1,75 kg.",
    konsep: "Pengurangan pecahan desimal dan pecahan biasa"
  },
  {
    id: "K7-04", kelas: "7", materi: "Pecahan dan Desimal", kesulitan: "sedang", poin: 15,
    soal: "Sebuah taman berbentuk persegi panjang memiliki panjang 12 1/2 meter dan lebar 8 2/5 meter. Luas taman tersebut adalah...",
    pilihan: ["105 m²", "100 m²", "96,5 m²", "110 m²"],
    jawaban: "105 m²",
    pembahasan: "Luas = 12,5 × 8,4 = (25/2) × (42/5) = 5 × 21 = 105 m².",
    konsep: "Perkalian pecahan campuran"
  },
  {
    id: "K7-05", kelas: "7", materi: "Rasio dan Perbandingan", kesulitan: "mudah", poin: 10,
    soal: "Perbandingan kelereng Andi dan Bima adalah 3 : 5. Jika jumlah kelereng mereka 40 butir, banyak kelereng Bima adalah...",
    pilihan: ["25 butir", "15 butir", "20 butir", "30 butir"],
    jawaban: "25 butir",
    pembahasan: "Total bagian = 3 + 5 = 8. Kelereng Bima = (5/8) × 40 = 25 butir.",
    konsep: "Perbandingan senilai"
  },
  {
    id: "K7-06", kelas: "7", materi: "Rasio dan Perbandingan", kesulitan: "sulit", poin: 20,
    soal: "Suatu proyek perbaikan jalan dapat diselesaikan oleh 12 pekerja dalam waktu 20 hari. Jika proyek ingin diselesaikan dalam 15 hari, berapa tambahan pekerja yang dibutuhkan?",
    pilihan: ["4 pekerja", "16 pekerja", "6 pekerja", "3 pekerja"],
    jawaban: "4 pekerja",
    pembahasan: "Perbandingan berbalik nilai: 12 × 20 = P × 15 -> 240 / 15 = 16 pekerja. Tambahan = 16 - 12 = 4 pekerja.",
    konsep: "Perbandingan berbalik nilai"
  },
  {
    id: "K7-07", kelas: "7", materi: "Aritmetika Sosial Dasar", kesulitan: "mudah", poin: 10,
    soal: "Sebuah tas sekolah dibeli dengan harga Rp150.000,00 kemudian dijual kembali dengan harga Rp180.000,00. Persentase keuntungan yang diperoleh adalah...",
    pilihan: ["20%", "15%", "25%", "30%"],
    jawaban: "20%",
    pembahasan: "Untung = Rp30.000. Persentase untung = (30.000 / 150.000) × 100% = 20%.",
    konsep: "Persentase keuntungan"
  },
  {
    id: "K7-08", kelas: "7", materi: "Aritmetika Sosial Dasar", kesulitan: "sedang", poin: 15,
    soal: "Toko buku memberikan diskon 25% untuk sebuah ensiklopedia seharga Rp120.000,00. Berapa harga yang harus dibayar siswa?",
    pilihan: ["Rp90.000,00", "Rp95.000,00", "Rp85.000,00", "Rp30.000,00"],
    jawaban: "Rp90.000,00",
    pembahasan: "Diskon = 25% × 120.000 = Rp30.000. Harga bayar = 120.000 - 30.000 = Rp90.000,00.",
    konsep: "Potongan harga (Rabat/Diskon)"
  },
  {
    id: "K7-09", kelas: "7", materi: "Aljabar Dasar", kesulitan: "mudah", poin: 10,
    soal: "Bentuk sederhana dari 5x + 3y - 2x + 4y adalah...",
    pilihan: ["3x + 7y", "7x + 7y", "3x - 7y", "7x - y"],
    jawaban: "3x + 7y",
    pembahasan: "Kelompokkan suku sejenis: (5x - 2x) + (3y + 4y) = 3x + 7y.",
    konsep: "Penjumlahan dan pengurangan suku sejenis aljabar"
  },
  {
    id: "K7-10", kelas: "7", materi: "Aljabar Dasar", kesulitan: "sedang", poin: 15,
    soal: "Hasil jabaran dari (2x + 3)(x - 4) adalah...",
    pilihan: ["2x² - 5x - 12", "2x² + 5x - 12", "2x² - 11x - 12", "2x² - 5x + 12"],
    jawaban: "2x² - 5x - 12",
    pembahasan: "(2x)(x) + (2x)(-4) + 3(x) + 3(-4) = 2x² - 8x + 3x - 12 = 2x² - 5x - 12.",
    konsep: "Perkalian suku dua aljabar"
  },
  {
    id: "K7-11", kelas: "7", materi: "Persamaan dan Pertidaksamaan Linear", kesulitan: "mudah", poin: 10,
    soal: "Nilai x yang memenuhi persamaan 3x - 7 = 14 adalah...",
    pilihan: ["7", "5", "6", "9"],
    jawaban: "7",
    pembahasan: "3x = 14 + 7 -> 3x = 21 -> x = 21 / 3 = 7.",
    konsep: "Persamaan Linear Satu Variabel (PLSV)"
  },
  {
    id: "K7-12", kelas: "7", materi: "Persamaan dan Pertidaksamaan Linear", kesulitan: "sulit", poin: 20,
    soal: "Umur ayah sekarang 3 kali umur anaknya. Jika jumlah umur mereka saat ini adalah 48 tahun, berapakah umur anak 5 tahun yang akan datang?",
    pilihan: ["17 tahun", "12 tahun", "15 tahun", "19 tahun"],
    jawaban: "17 tahun",
    pembahasan: "Misal umur anak = x, ayah = 3x. x + 3x = 48 -> 4x = 48 -> x = 12 tahun. Lima tahun lagi = 12 + 5 = 17 tahun.",
    konsep: "Pemodelan PLSV dalam masalah kontekstual"
  },
  {
    id: "K7-13", kelas: "7", materi: "Himpunan", kesulitan: "sedang", poin: 15,
    soal: "Dari 30 siswa di kelas, 18 siswa gemar Basket, 15 siswa gemar Voli, dan 5 siswa tidak gemar keduanya. Banyak siswa yang gemar Basket sekaligus Voli adalah...",
    pilihan: ["8 siswa", "5 siswa", "10 siswa", "7 siswa"],
    jawaban: "8 siswa",
    pembahasan: "30 = (18 - x) + x + (15 - x) + 5 -> 30 = 38 - x -> x = 38 - 30 = 8 siswa.",
    konsep: "Irisan dua himpunan (Diagram Venn)"
  },
  {
    id: "K7-14", kelas: "7", materi: "Garis dan Sudut", kesulitan: "mudah", poin: 10,
    soal: "Dua buah sudut saling berpelurus. Jika besar salah satu sudut adalah 65°, maka besar sudut pelurusnya adalah...",
    pilihan: ["115°", "25°", "125°", "105°"],
    jawaban: "115°",
    pembahasan: "Sudut berpelurus berjumlah 180°. Sudut pelurus = 180° - 65° = 115°.",
    konsep: "Hubungan antar sudut (Berpelurus/Suplemen)"
  },
  {
    id: "K7-15", kelas: "7", materi: "Bangun Datar", kesulitan: "sedang", poin: 15,
    soal: "Sebuah belah ketupat memiliki panjang diagonal masing-masing 16 cm dan 12 cm. Luas belah ketupat tersebut adalah...",
    pilihan: ["96 cm²", "192 cm²", "48 cm²", "80 cm²"],
    jawaban: "96 cm²",
    pembahasan: "Luas = 1/2 × d1 × d2 = 1/2 × 16 × 12 = 96 cm².",
    konsep: "Luas bangun datar segiempat"
  },
  {
    id: "K7-16", kelas: "7", materi: "Data dan Diagram", kesulitan: "mudah", poin: 10,
    soal: "Dalam diagram lingkaran ekstrakurikuler dari 100 siswa, Pramuka menempati sudut 90°, Futsal 126°, dan sisanya Tari. Banyak siswa yang mengikuti Tari adalah...",
    pilihan: ["40 siswa", "35 siswa", "45 siswa", "50 siswa"],
    jawaban: "40 siswa",
    pembahasan: "Sudut Tari = 360° - (90° + 126°) = 144°. Banyak siswa = (144° / 360°) × 100 = 40 siswa.",
    konsep: "Interpretasi diagram lingkaran"
  },

  // ================= KELAS 8 =================
  {
    id: "K8-01", kelas: "8", materi: "Bilangan Berpangkat", kesulitan: "mudah", poin: 10,
    soal: "Hasil dari 2³ × 2² adalah...",
    pilihan: ["32", "16", "64", "10"],
    jawaban: "32",
    pembahasan: "2³ × 2² = 2^(3+2) = 2⁵ = 32.",
    konsep: "Sifat perkalian bilangan berpangkat"
  },
  {
    id: "K8-02", kelas: "8", materi: "Bentuk Akar", kesulitan: "sedang", poin: 15,
    soal: "Bentuk sederhana dari √48 + √27 - √12 adalah...",
    pilihan: ["5√3", "4√3", "6√3", "3√3"],
    jawaban: "5√3",
    pembahasan: "√48 = 4√3, √27 = 3√3, √12 = 2√3. Maka 4√3 + 3√3 - 2√3 = 5√3.",
    konsep: "Operasi aljabar bentuk akar"
  },
  {
    id: "K8-03", kelas: "8", materi: "Teorema Pythagoras", kesulitan: "mudah", poin: 10,
    soal: "Sebuah segitiga siku-siku memiliki panjang sisi siku-siku 6 cm dan 8 cm. Panjang sisi miringnya (hipotenusa) adalah...",
    pilihan: ["10 cm", "12 cm", "14 cm", "9 cm"],
    jawaban: "10 cm",
    pembahasan: "c = √(6² + 8²) = √(36 + 64) = √100 = 10 cm.",
    konsep: "Tripel Pythagoras dasar"
  },
  {
    id: "K8-04", kelas: "8", materi: "Teorema Pythagoras", kesulitan: "sulit", poin: 20,
    soal: "Sebuah tangga panjangnya 13 meter disandarkan pada tembok. Jika jarak ujung bawah tangga ke tembok adalah 5 meter, tinggi tembok yang dicapai ujung atas tangga adalah...",
    pilihan: ["12 meter", "10 meter", "11 meter", "8 meter"],
    jawaban: "12 meter",
    pembahasan: "Tinggi = √(13² - 5²) = √(169 - 25) = √144 = 12 meter.",
    konsep: "Penerapan Teorema Pythagoras pada masalah nyata"
  },
  {
    id: "K8-05", kelas: "8", materi: "Persamaan Linear Dua Variabel", kesulitan: "sedang", poin: 15,
    soal: "Harga 2 buku dan 1 pensil adalah Rp11.000,00, sedangkan harga 1 buku dan 2 pensil adalah Rp8.500,00. Harga 1 buku adalah...",
    pilihan: ["Rp4.500,00", "Rp4.000,00", "Rp5.000,00", "Rp3.500,00"],
    jawaban: "Rp4.500,00",
    pembahasan: "Eliminasi: 2(2b + p = 11.000) -> 4b + 2p = 22.000 dikurangi (b + 2p = 8.500) -> 3b = 13.500 -> b = Rp4.500,00.",
    konsep: "Sistem Persamaan Linear Dua Variabel (SPLDV)"
  },
  {
    id: "K8-06", kelas: "8", materi: "Relasi dan Fungsi", kesulitan: "mudah", poin: 10,
    soal: "Diketahui rumus fungsi f(x) = 3x - 5. Nilai dari f(4) adalah...",
    pilihan: ["7", "12", "17", "-7"],
    jawaban: "7",
    pembahasan: "Substitusi x = 4: f(4) = 3(4) - 5 = 12 - 5 = 7.",
    konsep: "Nilai fungsi linear"
  },
  {
    id: "K8-07", kelas: "8", materi: "Persamaan Garis Lurus", kesulitan: "sedang", poin: 15,
    soal: "Gradien garis yang melalui titik A(2, 3) dan B(5, 12) adalah...",
    pilihan: ["3", "2", "4", "-3"],
    jawaban: "3",
    pembahasan: "Gradien m = (y2 - y1) / (x2 - x1) = (12 - 3) / (5 - 2) = 9 / 3 = 3.",
    konsep: "Kemiringan (Gradien) garis lurus"
  },
  {
    id: "K8-08", kelas: "8", materi: "Lingkaran", kesulitan: "mudah", poin: 10,
    soal: "Sebuah lingkaran memiliki jari-jari 14 cm. Keliling lingkaran tersebut adalah... (π = 22/7)",
    pilihan: ["88 cm", "44 cm", "154 cm", "616 cm"],
    jawaban: "88 cm",
    pembahasan: "Keliling = 2 × π × r = 2 × (22/7) × 14 = 88 cm.",
    konsep: "Keliling lingkaran"
  },
  {
    id: "K8-09", kelas: "8", materi: "Lingkaran", kesulitan: "sedang", poin: 15,
    soal: "Pada sebuah lingkaran, besar sudut keliling yang menghadap busur AB adalah 40°. Besar sudut pusat yang menghadap busur AB yang sama adalah...",
    pilihan: ["80°", "20°", "40°", "100°"],
    jawaban: "80°",
    pembahasan: "Sudut pusat = 2 × sudut keliling yang menghadap busur yang sama = 2 × 40° = 80°.",
    konsep: "Sudut pusat dan sudut keliling lingkaran"
  },
  {
    id: "K8-10", kelas: "8", materi: "Bangun Ruang", kesulitan: "sedang", poin: 15,
    soal: "Sebuah balok berukuran panjang 10 cm, lebar 6 cm, dan tinggi 5 cm. Volume balok tersebut adalah...",
    pilihan: ["300 cm³", "220 cm³", "280 cm³", "150 cm³"],
    jawaban: "300 cm³",
    pembahasan: "Volume balok = p × l × t = 10 × 6 × 5 = 300 cm³.",
    konsep: "Volume bangun ruang sisi datar"
  },
  {
    id: "K8-11", kelas: "8", materi: "Statistika", kesulitan: "mudah", poin: 10,
    soal: "Rata-rata (mean) dari data nilai ulangan: 70, 80, 75, 90, 85 adalah...",
    pilihan: ["80", "78", "82", "75"],
    jawaban: "80",
    pembahasan: "Jumlah data = 70 + 80 + 75 + 90 + 85 = 400. Rata-rata = 400 / 5 = 80.",
    konsep: "Ukuran pemusatan data (Mean)"
  },
  {
    id: "K8-12", kelas: "8", materi: "Statistika", kesulitan: "sulit", poin: 20,
    soal: "Rata-rata nilai 19 siswa adalah 78. Setelah nilai Dinda digabungkan, rata-rata kelas menjadi 79. Berapakah nilai ujian Dinda?",
    pilihan: ["98", "95", "88", "100"],
    jawaban: "98",
    pembahasan: "Total 19 siswa = 19 × 78 = 1.482. Total 20 siswa = 20 × 79 = 1.580. Nilai Dinda = 1.580 - 1.482 = 98.",
    konsep: "Rata-rata gabungan"
  },
  {
    id: "K8-13", kelas: "8", materi: "Peluang", kesulitan: "mudah", poin: 10,
    soal: "Sebuah dadu bersisi enam dilempar satu kali. Peluang munculnya mata dadu bilangan genap adalah...",
    pilihan: ["1/2", "1/3", "1/6", "2/3"],
    jawaban: "1/2",
    pembahasan: "Mata dadu genap = {2, 4, 6} ada 3. Ruang sampel = 6. Peluang = 3/6 = 1/2.",
    konsep: "Peluang teoretik kejadian sederhana"
  },

  // ================= KELAS 9 =================
  {
    id: "K9-01", kelas: "9", materi: "Bilangan Berpangkat dan Bentuk Akar", kesulitan: "sedang", poin: 15,
    soal: "Nilai dari (27)^(2/3) adalah...",
    pilihan: ["9", "3", "18", "27"],
    jawaban: "9",
    pembahasan: "(3³)^(2/3) = 3² = 9.",
    konsep: "Pangkat pecahan"
  },
  {
    id: "K9-02", kelas: "9", materi: "Persamaan Kuadrat", kesulitan: "mudah", poin: 10,
    soal: "Akar-akar dari persamaan kuadrat x² - 5x + 6 = 0 adalah...",
    pilihan: ["x = 2 atau x = 3", "x = -2 atau x = -3", "x = 1 atau x = 6", "x = -1 atau x = 6"],
    jawaban: "x = 2 atau x = 3",
    pembahasan: "Faktorkan: (x - 2)(x - 3) = 0, sehingga x = 2 atau x = 3.",
    konsep: "Pemfaktoran persamaan kuadrat"
  },
  {
    id: "K9-03", kelas: "9", materi: "Persamaan Kuadrat", kesulitan: "sulit", poin: 20,
    soal: "Jika x₁ dan x₂ adalah akar-akar persamaan x² - 6x + 4 = 0, maka nilai dari x₁ + x₂ adalah...",
    pilihan: ["6", "-6", "4", "-4"],
    jawaban: "6",
    pembahasan: "Jumlah akar-akar persamaan kuadrat ax² + bx + c = 0 adalah -b/a = -(-6)/1 = 6.",
    konsep: "Jumlah dan hasil kali akar persamaan kuadrat"
  },
  {
    id: "K9-04", kelas: "9", materi: "Fungsi Kuadrat", kesulitan: "sedang", poin: 15,
    soal: "Persamaan sumbu simetri dari grafik fungsi kuadrat f(x) = x² - 8x + 12 adalah...",
    pilihan: ["x = 4", "x = -4", "x = 8", "x = 2"],
    jawaban: "x = 4",
    pembahasan: "Sumbu simetri x = -b / (2a) = -(-8) / (2×1) = 8 / 2 = 4.",
    konsep: "Titik puncak dan sumbu simetri fungsi kuadrat"
  },
  {
    id: "K9-05", kelas: "9", materi: "Transformasi Geometri", kesulitan: "mudah", poin: 10,
    soal: "Bayangan titik P(3, -5) jika dicerminkan terhadap sumbu-X adalah...",
    pilihan: ["P'(3, 5)", "P'(-3, -5)", "P'(-3, 5)", "P'(5, 3)"],
    jawaban: "P'(3, 5)",
    pembahasan: "Refleksi terhadap sumbu-X mengubah (x, y) menjadi (x, -y), sehingga (3, -5) menjadi (3, 5).",
    konsep: "Refleksi (Pencerminan) geometri"
  },
  {
    id: "K9-06", kelas: "9", materi: "Transformasi Geometri", kesulitan: "sedang", poin: 15,
    soal: "Titik A(2, 4) digeser (translasi) oleh T(-3, 5). Koordinat bayangan titik A adalah...",
    pilihan: ["A'(-1, 9)", "A'(5, -1)", "A'(-1, -1)", "A'(1, 9)"],
    jawaban: "A'(-1, 9)",
    pembahasan: "A'(2 + (-3), 4 + 5) = A'(-1, 9).",
    konsep: "Translasi (Pergeseran)"
  },
  {
    id: "K9-07", kelas: "9", materi: "Kesebangunan dan Kekongruenan", kesulitan: "sedang", poin: 15,
    soal: "Sebuah tiang setinggi 3 meter menghasilkan bayangan sepanjang 2 meter. Pada saat yang sama, sebuah pohon menghasilkan bayangan sepanjang 8 meter. Tinggi pohon sebenarnya adalah...",
    pilihan: ["12 meter", "10 meter", "14 meter", "9 meter"],
    jawaban: "12 meter",
    pembahasan: "Tinggi pohon / Tinggi tiang = Bayangan pohon / Bayangan tiang -> T / 3 = 8 / 2 -> T = 4 × 3 = 12 meter.",
    konsep: "Perbandingan segitiga sebangun"
  },
  {
    id: "K9-08", kelas: "9", materi: "Bangun Ruang Sisi Lengkung", kesulitan: "sedang", poin: 15,
    soal: "Sebuah tabung memiliki jari-jari alas 7 cm dan tinggi 10 cm. Volume tabung tersebut adalah... (π = 22/7)",
    pilihan: ["1.540 cm³", "440 cm³", "770 cm³", "3.080 cm³"],
    jawaban: "1.540 cm³",
    pembahasan: "Volume tabung = π × r² × t = (22/7) × 7 × 7 × 10 = 154 × 10 = 1.540 cm³.",
    konsep: "Volume tabung"
  },
  {
    id: "K9-09", kelas: "9", materi: "Statistika dan Peluang", kesulitan: "sedang", poin: 15,
    soal: "Di dalam sebuah kotak terdapat 4 bola merah dan 6 bola biru. Jika diambil sebuah bola secara acak, peluang terambilnya bola merah adalah...",
    pilihan: ["2/5", "3/5", "4/6", "1/4"],
    jawaban: "2/5",
    pembahasan: "Total bola = 4 + 6 = 10. Peluang merah = 4/10 = 2/5.",
    konsep: "Peluang pengambilan objek"
  },
  {
    id: "K9-10", kelas: "9", materi: "Soal Penalaran dan Literasi Numerasi", kesulitan: "sulit", poin: 25,
    soal: "Paket Internet A menawarkan kuota 15 GB seharga Rp60.000,00. Paket Internet B menawarkan 25 GB seharga Rp90.000,00. Manakah pernyataan yang benar?",
    pilihan: [
      "Paket B lebih hemat karena harga per GB adalah Rp3.600,00",
      "Paket A lebih hemat karena harga per GB adalah Rp3.500,00",
      "Kedua paket memiliki harga per GB yang sama persis",
      "Paket A lebih hemat Rp500,00 per GB dibanding Paket B"
    ],
    jawaban: "Paket B lebih hemat karena harga per GB adalah Rp3.600,00",
    pembahasan: "Harga per GB Paket A = 60.000 / 15 = Rp4.000/GB. Paket B = 90.000 / 25 = Rp3.600/GB. Jadi Paket B lebih hemat.",
    konsep: "Literasi finansial dan penalaran rasio"
  }
];

// ============================================================================
// PEMBANGKIT SOAL TERVERIFIKASI (MENGGENAPKAN HINGGA >125 SOAL VARIATIF)
// ============================================================================
function buildFullQuestionBank() {
  const bank = [...CORE_QUESTIONS];

  // Tambahan variasi soal Kelas 7, 8, 9 secara deterministik dan terverifikasi
  const extraQuestions = [
    // Kelas 7 Tambahan
    { id: "K7-17", kelas: "7", materi: "Bilangan Bulat", kesulitan: "mudah", poin: 10, soal: "Hasil dari -15 + 8 - (-10) adalah...", pilihan: ["3", "-3", "17", "-17"], jawaban: "3", pembahasan: "-15 + 8 + 10 = -7 + 10 = 3.", konsep: "Operasi bilangan bulat" },
    { id: "K7-18", kelas: "7", materi: "Bilangan Bulat", kesulitan: "sedang", poin: 15, soal: "Kapal selam berada di kedalaman 45 meter di bawah permukaan laut, lalu naik 18 meter. Posisi kapal selam sekarang adalah...", pilihan: ["-27 meter", "-63 meter", "27 meter", "-37 meter"], jawaban: "-27 meter", pembahasan: "-45 + 18 = -27 meter (27 m di bawah permukaan laut).", konsep: "Penerapan bilangan negatif" },
    { id: "K7-19", kelas: "7", materi: "Pecahan dan Desimal", kesulitan: "mudah", poin: 10, soal: "Bentuk persen dari pecahan 3/8 adalah...", pilihan: ["37,5%", "35,5%", "32,5%", "38%"], jawaban: "37,5%", pembahasan: "(3/8) × 100% = 300/8 % = 37,5%.", konsep: "Konversi pecahan ke persen" },
    { id: "K7-20", kelas: "7", materi: "Rasio dan Perbandingan", kesulitan: "sedang", poin: 15, soal: "Jarak dua kota pada peta dengan skala 1 : 250.000 adalah 6 cm. Jarak sebenarnya kedua kota tersebut adalah...", pilihan: ["15 km", "1,5 km", "25 km", "150 km"], jawaban: "15 km", pembahasan: "Jarak = 6 × 250.000 = 1.500.000 cm = 15 km.", konsep: "Skala dan perbandingan" },
    { id: "K7-21", kelas: "7", materi: "Aritmetika Sosial Dasar", kesulitan: "sedang", poin: 15, soal: "Bruto sekarung beras adalah 50 kg dengan tara 2%. Netto (berat bersih) beras tersebut adalah...", pilihan: ["49 kg", "48 kg", "49,5 kg", "45 kg"], jawaban: "49 kg", pembahasan: "Tara = 2% × 50 = 1 kg. Netto = 50 - 1 = 49 kg.", konsep: "Bruto, Netto, dan Tara" },
    { id: "K7-22", kelas: "7", materi: "Aljabar Dasar", kesulitan: "mudah", poin: 10, soal: "Jika p = 4 dan q = -3, maka nilai dari 2p - 3q adalah...", pilihan: ["17", "-1", "1", "15"], jawaban: "17", pembahasan: "2(4) - 3(-3) = 8 + 9 = 17.", konsep: "Substitusi nilai aljabar" },
    { id: "K7-23", kelas: "7", materi: "Persamaan dan Pertidaksamaan Linear", kesulitan: "sedang", poin: 15, soal: "Himpunan penyelesaian dari pertidaksamaan 2x + 5 < 17 untuk x bilangan bulat adalah...", pilihan: ["x < 6", "x < 11", "x > 6", "x < 5"], jawaban: "x < 6", pembahasan: "2x < 17 - 5 -> 2x < 12 -> x < 6.", konsep: "Pertidaksamaan Linear Satu Variabel" },
    { id: "K7-24", kelas: "7", materi: "Himpunan", kesulitan: "mudah", poin: 10, soal: "Diketahui A = {1, 2, 3, 4} dan B = {3, 4, 5, 6}. Irisan himpunan A dan B (A ∩ B) adalah...", pilihan: ["{3, 4}", "{1, 2}", "{1, 2, 3, 4, 5, 6}", "{5, 6}"], jawaban: "{3, 4}", pembahasan: "Anggota yang ada di A sekaligus di B adalah 3 dan 4.", konsep: "Irisan himpunan" },
    { id: "K7-25", kelas: "7", materi: "Garis dan Sudut", kesulitan: "mudah", poin: 10, soal: "Besar sudut penyiku dari sudut 35° adalah...", pilihan: ["55°", "65°", "145°", "45°"], jawaban: "55°", pembahasan: "Sudut berpenyiku berjumlah 90°. Penyiku = 90° - 35° = 55°.", konsep: "Sudut berpenyiku (Komplemen)" },
    { id: "K7-26", kelas: "7", materi: "Bangun Datar", kesulitan: "mudah", poin: 10, soal: "Keliling persegi yang memiliki luas 81 cm² adalah...", pilihan: ["36 cm", "18 cm", "27 cm", "45 cm"], jawaban: "36 cm", pembahasan: "Sisi = √81 = 9 cm. Keliling = 4 × 9 = 36 cm.", konsep: "Keliling dan luas persegi" },
    { id: "K7-27", kelas: "7", materi: "Bangun Datar", kesulitan: "sulit", poin: 20, soal: "Sebuah taman berbentuk segitiga dengan alas 14 m dan tinggi 10 m akan ditanami rumput. Jika biaya rumput Rp20.000/m², total biayanya adalah...", pilihan: ["Rp1.400.000", "Rp2.800.000", "Rp700.000", "Rp1.200.000"], jawaban: "Rp1.400.000", pembahasan: "Luas = 1/2 × 14 × 10 = 70 m². Biaya = 70 × Rp20.000 = Rp1.400.000.", konsep: "Aplikasi luas segitiga" },
    { id: "K7-28", kelas: "7", materi: "Data dan Diagram", kesulitan: "sedang", poin: 15, soal: "Selisih pengunjung perpustakaan pada hari Senin (45 siswa) dan Kamis (72 siswa) adalah...", pilihan: ["27 siswa", "25 siswa", "32 siswa", "117 siswa"], jawaban: "27 siswa", pembahasan: "Selisih = 72 - 45 = 27 siswa.", konsep: "Membaca data tabel" },

    // Kelas 8 Tambahan
    { id: "K8-14", kelas: "8", materi: "Bilangan Berpangkat", kesulitan: "sedang", poin: 15, soal: "Nilai dari 5⁰ + 3² adalah...", pilihan: ["10", "9", "14", "6"], jawaban: "10", pembahasan: "Setiap bilangan tak nol pangkat 0 bernilai 1. Maka 1 + 9 = 10.", konsep: "Sifat pangkat nol" },
    { id: "K8-15", kelas: "8", materi: "Bentuk Akar", kesulitan: "mudah", poin: 10, soal: "Hasil dari √16 × √9 adalah...", pilihan: ["12", "7", "25", "144"], jawaban: "12", pembahasan: "4 × 3 = 12.", konsep: "Perkalian bentuk akar" },
    { id: "K8-16", kelas: "8", materi: "Teorema Pythagoras", kesulitan: "sedang", poin: 15, soal: "Manakah di bawah ini yang merupakan pasangan bilangan Tripel Pythagoras?", pilihan: ["5, 12, 13", "6, 7, 10", "4, 5, 6", "8, 12, 15"], jawaban: "5, 12, 13", pembahasan: "5² + 12² = 25 + 144 = 169 = 13².", konsep: "Identifikasi Tripel Pythagoras" },
    { id: "K8-17", kelas: "8", materi: "Persamaan Linear Dua Variabel", kesulitan: "mudah", poin: 10, soal: "Jika x + y = 10 dan x - y = 4, maka nilai x adalah...", pilihan: ["7", "6", "3", "8"], jawaban: "7", pembahasan: "Jumlahkan kedua persamaan: 2x = 14 -> x = 7.", konsep: "Eliminasi SPLDV" },
    { id: "K8-18", kelas: "8", materi: "Relasi dan Fungsi", kesulitan: "sedang", poin: 15, soal: "Banyaknya pemetaan (fungsi) yang mungkin dari himpunan A = {1, 2} ke B = {a, b, c} adalah...", pilihan: ["9", "8", "6", "5"], jawaban: "9", pembahasan: "Rumus banyak fungsi A ke B adalah n(B)^n(A) = 3² = 9.", konsep: "Banyaknya fungsi dua himpunan" },
    { id: "K8-19", kelas: "8", materi: "Persamaan Garis Lurus", kesulitan: "mudah", poin: 10, soal: "Gradien dari persamaan garis y = 4x - 9 adalah...", pilihan: ["4", "-9", "-4", "9"], jawaban: "4", pembahasan: "Pada bentuk y = mx + c, koefisien x (m) adalah gradien, yaitu 4.", konsep: "Bentuk eksplisit persamaan garis" },
    { id: "K8-20", kelas: "8", materi: "Lingkaran", kesulitan: "sedang", poin: 15, soal: "Luas lingkaran yang berdiameter 20 cm adalah... (π = 3,14)", pilihan: ["314 cm²", "62,8 cm²", "1.256 cm²", "157 cm²"], jawaban: "314 cm²", pembahasan: "Jari-jari r = 10 cm. Luas = 3,14 × 10 × 10 = 314 cm².", konsep: "Luas lingkaran" },
    { id: "K8-21", kelas: "8", materi: "Bangun Ruang", kesulitan: "mudah", poin: 10, soal: "Luas permukaan sebuah kubus yang memiliki panjang rusuk 5 cm adalah...", pilihan: ["150 cm²", "125 cm²", "100 cm²", "25 cm²"], jawaban: "150 cm²", pembahasan: "Luas permukaan kubus = 6 × s² = 6 × 25 = 150 cm².", konsep: "Luas permukaan kubus" },
    { id: "K8-22", kelas: "8", materi: "Bangun Ruang", kesulitan: "sulit", poin: 20, soal: "Sebuah prisma alasnya berbentuk segitiga siku-siku dengan sisi 3 cm, 4 cm, dan 5 cm. Jika tinggi prisma 10 cm, volumenya adalah...", pilihan: ["60 cm³", "120 cm³", "30 cm³", "100 cm³"], jawaban: "60 cm³", pembahasan: "Luas alas = 1/2 × 3 × 4 = 6 cm². Volume = Luas alas × tinggi = 6 × 10 = 60 cm³.", konsep: "Volume prisma tegak segitiga" },
    { id: "K8-23", kelas: "8", materi: "Statistika", kesulitan: "mudah", poin: 10, soal: "Median (nilai tengah) dari data: 5, 8, 6, 9, 7, 10, 6 adalah...", pilihan: ["7", "6", "8", "9"], jawaban: "7", pembahasan: "Urutkan data: 5, 6, 6, 7, 8, 9, 10. Nilai tengah (data ke-4) adalah 7.", konsep: "Median data tunggal" },
    { id: "K8-24", kelas: "8", materi: "Peluang", kesulitan: "sedang", poin: 15, soal: "Dua koin dilempar bersamaan. Peluang munculnya kedua sisi Angka (AA) adalah...", pilihan: ["1/4", "1/2", "3/4", "1/3"], jawaban: "1/4", pembahasan: "Ruang sampel = {AA, AG, GA, GG} ada 4. Kejadian AA = 1. Peluang = 1/4.", konsep: "Ruang sampel dua koin" },

    // Kelas 9 Tambahan
    { id: "K9-11", kelas: "9", materi: "Bilangan Berpangkat dan Bentuk Akar", kesulitan: "mudah", poin: 10, soal: "Bentuk baku (notasi ilmiah) dari 0,00045 adalah...", pilihan: ["4,5 × 10⁻⁴", "4,5 × 10⁻³", "45 × 10⁻⁵", "4,5 × 10⁴"], jawaban: "4,5 × 10⁻⁴", pembahasan: "Geser koma 4 digit ke kanan menghasilkan 4,5 × 10⁻⁴.", konsep: "Notasi ilmiah" },
    { id: "K9-12", kelas: "9", materi: "Persamaan Kuadrat", kesulitan: "sedang", poin: 15, soal: "Nilai diskriminan (D = b² - 4ac) dari persamaan kuadrat 2x² - 3x + 1 = 0 adalah...", pilihan: ["1", "17", "-1", "9"], jawaban: "1", pembahasan: "D = (-3)² - 4(2)(1) = 9 - 8 = 1.", konsep: "Diskriminan persamaan kuadrat" },
    { id: "K9-13", kelas: "9", materi: "Fungsi Kuadrat", kesulitan: "mudah", poin: 10, soal: "Titik potong grafik fungsi f(x) = x² + 3x - 10 terhadap sumbu-Y adalah...", pilihan: ["(0, -10)", "(0, 10)", "(-10, 0)", "(0, 3)"], jawaban: "(0, -10)", pembahasan: "Memotong sumbu-Y saat x = 0 -> f(0) = -10, sehingga titiknya (0, -10).", konsep: "Titik potong fungsi kuadrat" },
    { id: "K9-14", kelas: "9", materi: "Transformasi Geometri", kesulitan: "sedang", poin: 15, soal: "Bayangan titik B(4, -2) oleh dilatasi dengan pusat O(0,0) dan faktor skala k = 3 adalah...", pilihan: ["B'(12, -6)", "B'(7, 1)", "B'(12, 6)", "B'(-12, 6)"], jawaban: "B'(12, -6)", pembahasan: "Dilatasi [O, 3] mengalikan koordinat dengan 3: (4×3, -2×3) = (12, -6).", konsep: "Dilatasi (Perkalian)" },
    { id: "K9-15", kelas: "9", materi: "Kesebangunan dan Kekongruenan", kesulitan: "mudah", poin: 10, soal: "Dua persegi panjang dikatakan sebangun jika...", pilihan: ["Perbandingan sisi-sisi yang bersesuaian sama besar", "Luas keduanya sama persis", "Keliling keduanya sama", "Salah satu sisinya sama panjang"], jawaban: "Perbandingan sisi-sisi yang bersesuaian sama besar", pembahasan: "Syarat dua bangun datar sebangun adalah sudut yang bersesuaian sama besar dan perbandingan sisi yang bersesuaian sama besar.", konsep: "Syarat kesebangunan bangun datar" },
    { id: "K9-16", kelas: "9", materi: "Bangun Ruang Sisi Lengkung", kesulitan: "sedang", poin: 15, soal: "Sebuah kerucut memiliki jari-jari 7 cm dan tinggi 12 cm. Volume kerucut tersebut adalah... (π = 22/7)", pilihan: ["616 cm³", "1.848 cm³", "308 cm³", "154 cm³"], jawaban: "616 cm³", pembahasan: "Volume = 1/3 × π × r² × t = 1/3 × (22/7) × 49 × 12 = 154 × 4 = 616 cm³.", konsep: "Volume kerucut" },
    { id: "K9-17", kelas: "9", materi: "Bangun Ruang Sisi Lengkung", kesulitan: "sulit", poin: 20, soal: "Luas permukaan bola yang memiliki jari-jari 7 cm adalah... (π = 22/7)", pilihan: ["616 cm²", "154 cm²", "308 cm²", "1.437 cm²"], jawaban: "616 cm²", pembahasan: "Luas bola = 4 × π × r² = 4 × 154 = 616 cm².", konsep: "Luas permukaan bola" },
    { id: "K9-18", kelas: "9", materi: "Soal Penalaran dan Literasi Numerasi", kesulitan: "sulit", poin: 25, soal: "Sebuah bakteri membelah diri menjadi 2 setiap 20 menit. Jika mula-mula ada 5 bakteri, berapa banyak bakteri setelah 1 jam?", pilihan: ["40 bakteri", "30 bakteri", "80 bakteri", "20 bakteri"], jawaban: "40 bakteri", pembahasan: "1 jam = 60 menit = 3 kali pembelahan. Banyak bakteri = 5 × 2³ = 5 × 8 = 40 bakteri.", konsep: "Pertumbuhan eksponensial numerasi" }
  ];

  bank.push(...extraQuestions);

  // Generator Soal Kontekstual Terstruktur untuk menggenapkan bank soal > 125 soal unik
  for (let i = 1; i <= 25; i++) {
    const a = i + 3;
    const b = i + 2;
    bank.push({
      id: `K7-GEN-${i}`,
      kelas: "7",
      materi: "Persamaan dan Pertidaksamaan Linear",
      kesulitan: i % 2 === 0 ? "mudah" : "sedang",
      poin: 12,
      soal: `Jika sebuah kotak berisi kelereng sebanyak x butir, dan memenuhi persamaan 2x + ${b} = ${2 * a + b}, berapakah nilai x?`,
      pilihan: [`${a}`, `${a + 2}`, `${a - 1}`, `${a + 4}`],
      jawaban: `${a}`,
      pembahasan: `2x = ${2 * a + b} - ${b} = ${2 * a}, maka x = ${2 * a} / 2 = ${a}.`,
      konsep: "Penyelesaian PLSV"
    });
  }

  for (let i = 1; i <= 20; i++) {
    const r = i + 2;
    const fVal = 4 * r - 3;
    bank.push({
      id: `K8-GEN-${i}`,
      kelas: "8",
      materi: "Relasi dan Fungsi",
      kesulitan: "sedang",
      poin: 15,
      soal: `Suatu mesin produksi mengikuti fungsi f(x) = 4x - 3 unit per jam. Untuk x = ${r} jam, banyak unit yang dihasilkan adalah...`,
      pilihan: [`${fVal} unit`, `${fVal + 4} unit`, `${fVal - 2} unit`, `${fVal + 6} unit`],
      jawaban: `${fVal} unit`,
      pembahasan: `Substitusikan x = ${r} ke f(x) = 4(${r}) - 3 = ${4 * r} - 3 = ${fVal} unit.`,
      konsep: "Penerapan nilai fungsi"
    });
  }

  for (let i = 1; i <= 15; i++) {
    const p = i + 1;
    const q = i + 3;
    const sum = p + q;
    const prod = p * q;
    bank.push({
      id: `K9-GEN-${i}`,
      kelas: "9",
      materi: "Persamaan Kuadrat",
      kesulitan: "sulit",
      poin: 20,
      soal: `Sebuah taman persegi panjang memiliki luas ${prod} m² dan jumlah panjang serta lebarnya adalah ${sum} m (memenuhi x² - ${sum}x + ${prod} = 0). Ukuran panjang dan lebarnya adalah...`,
      pilihan: [
        `${q} m dan ${p} m`,
        `${q + 1} m dan ${p - 1} m`,
        `${q + 2} m dan ${p} m`,
        `${sum} m dan ${p} m`
      ],
      jawaban: `${q} m dan ${p} m`,
      pembahasan: `Faktorkan (x - ${p})(x - ${q}) = 0, sehingga ukuran sisinya adalah ${q} m dan ${p} m.`,
      konsep: "Pemodelan persamaan kuadrat"
    });
  }

  return bank;
}

const QUESTION_BANK = buildFullQuestionBank();