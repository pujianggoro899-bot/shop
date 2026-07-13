import { Article } from "./types";

export const articles: Article[] = [
  {
    id: "art-1",
    title: "Panduan Lengkap Memilih Oli Mobil yang Tepat",
    slug: "panduan-memilih-oli-mobil-tepat",
    excerpt: "Bingung memilih oli mobil? Simak panduan lengkap cara memilih oli yang sesuai dengan spesifikasi mesin kendaraan Anda.",
    content: `
      <h2>Kenapa Pemilihan Oli Itu Penting?</h2>
      <p>Oli mesin adalah darah bagi kendaraan Anda. Memilih oli yang tepat tidak hanya menjaga performa mesin tetap optimal, tapi juga memperpanjang umur mesin kendaraan.</p>
      
      <h2>Tips Memilih Oli yang Tepat</h2>
      <p>Berikut adalah hal-hal yang perlu diperhatikan saat memilih oli mobil:</p>
      <ul>
        <li><strong>Viskositas (SAE)</strong> - Perhatikan kode SAE seperti 10W-40, 5W-30, dll. Kode ini menunjukkan kekentalan oli pada suhu dingin dan panas.</li>
        <li><strong>Sertifikasi API</strong> - Pastikan oli memiliki sertifikasi API (American Petroleum Institute) yang sesuai dengan tahun produksi mobil Anda.</li>
        <li><strong>Jenis Oli</strong> - Mineral, Semi-Sintetik, atau Fully-Sintetik. Semakin tinggi levelnya, semakin baik perlindungannya.</li>
        <li><strong>Rekomendasi Pabrikan</strong> - Selalu cek buku manual kendaraan untuk rekomendasi oli yang tepat.</li>
      </ul>
      
      <h2>Kesalahan Umum dalam Memilih Oli</h2>
      <p>Jangan tergiur harga murah! Oli palsu atau tidak sesuai spesifikasi dapat merusak mesin dalam jangka panjang. Selalu beli di toko resmi atau terpercaya seperti Shop and Drive.</p>
    `,
    categoryId: "cat-tips",
    categoryName: "Tips Otomotif",
    author: "Tim Shop and Drive",
    image: "/images/articles/oli-tips.jpg",
    tags: ["oli", "tips", "perawatan mesin"],
    status: "published",
    publishedAt: "2026-06-20",
    createdAt: "2026-06-18",
    metaTitle: "Panduan Memilih Oli Mobil yang Tepat | Shop and Drive",
    metaDescription: "Panduan lengkap cara memilih oli mobil yang sesuai dengan spesifikasi mesin kendaraan Anda. Tips dari ahli otomotif Shop and Drive.",
  },
  {
    id: "art-2",
    title: "5 Tanda Waktunya Servis AC Mobil",
    slug: "tanda-servis-ac-mobil",
    excerpt: "AC mobil kurang dingin? Kenali 5 tanda bahwa AC mobil Anda sudah perlu diservis sebelum rusak parah.",
    content: `
      <h2>Kenali Tanda-Tanda AC Mobil Bermasalah</h2>
      <p>AC mobil yang tidak terawat bukan hanya membuat tidak nyaman, tapi juga bisa menjadi sumber penyakit. Berikut 5 tanda AC mobil Anda perlu segera diservis:</p>
      
      <ol>
        <li><strong>AC Tidak Sedin Dulu</strong> - Jika udara yang keluar terasa kurang dingin padahal sudah diatur maksimal, kemungkinan freon berkurang atau ada kebocoran.</li>
        <li><strong>Ada Bau Apek atau Tidak Sedap</strong> - Bau tidak sedap saat AC menyala menandakan ada jamur atau bakteri di evaporator.</li>
        <li><strong>Keluar Suara Aneh</strong> - Suara berisik atau berdecit dari kompresor AC menandakan ada komponen yang mulai aus.</li>
        <li><strong>Ada Genangan Air di Kabin</strong> - Air menetes di kaki pengemudi atau penumpang menandakan selang pembuangan AC tersumbat.</li>
        <li><strong>Tagihan BBM Meningkat</strong> - AC yang bekerja terlalu keras akibat komponen kotor akan membebani mesin dan boros bahan bakar.</li>
      </ol>
      
      <p>Jangan tunda servis AC mobil Anda. Segera booking servis di Shop and Drive Taman Tekno untuk pemeriksaan AC gratis!</p>
    `,
    categoryId: "cat-tips",
    categoryName: "Tips Otomotif",
    author: "Tim Teknis Shop and Drive",
    image: "/images/articles/ac-servis.jpg",
    tags: ["AC mobil", "servis", "perawatan"],
    status: "published",
    publishedAt: "2026-06-15",
    createdAt: "2026-06-13",
    metaTitle: "5 Tanda AC Mobil Waktunya Diservis | Shop and Drive",
    metaDescription: "Kenali 5 tanda utama bahwa AC mobil Anda perlu segera diservis sebelum mengalami kerusakan parah.",
  },
  {
    id: "art-3",
    title: "Cara Merawat Aki Mobil Agar Lebih Awet",
    slug: "cara-merawat-aki-mobil-awet",
    excerpt: "Aki mobil cepat tekor? Ikuti tips perawatan aki mobil berikut agar usia pakainya lebih panjang.",
    content: `
      <h2>Aki Mobil dan Perawatannya</h2>
      <p>Aki adalah komponen vital yang menyuplai listrik ke seluruh sistem kelistrikan mobil. Rata-rata usia aki mobil adalah 2-3 tahun, namun dengan perawatan yang baik bisa lebih lama.</p>
      
      <h2>Tips Merawat Aki Mobil</h2>
      <ul>
        <li><strong>Cek Level Air Aki Secara Rutin</strong> - Untuk aki basah, periksa level air aki setiap 2 minggu sekali. Gunakan air aki murni (akuades) bukan air biasa.</li>
        <li><strong>Bersihkan Terminal Aki</strong> - Korosi pada terminal aki dapat mengganggu aliran listrik. Bersihkan dengan sikat kawat dan soda kue.</li>
        <li><strong>Hidupkan Mobil Secara Berkala</strong> - Jika mobil jarang dipakai, nyalakan minimal 15 menit setiap hari untuk mengisi ulang aki.</li>
        <li><strong>Matikan Perangkat Elektronik</strong> - Pastikan lampu, AC, dan audio dalam keadaan mati sebelum mematikan mesin.</li>
        <li><strong>Perhatikan Usia Aki</strong> - Jika sudah di atas 2,5 tahun, mulailah bersiap untuk mengganti aki baru.</li>
      </ul>
    `,
    categoryId: "cat-tips",
    categoryName: "Tips Otomotif",
    author: "Tim Shop and Drive",
    image: "/images/articles/aki-tips.jpg",
    tags: ["aki", "perawatan", "kelistrikan"],
    status: "published",
    publishedAt: "2026-06-10",
    createdAt: "2026-06-08",
    metaTitle: "Cara Merawat Aki Mobil Agar Lebih Awet | Shop and Drive",
    metaDescription: "Tips lengkap merawat aki mobil agar lebih awet dan tidak cepat tekor. Cocok untuk pemilik mobil pemula.",
  },
  {
    id: "art-4",
    title: "Promo Spesial Lebaran: Diskon hingga 40%",
    slug: "promo-spesial-lebaran-2026",
    excerpt: "Rayakan Lebaran dengan promo spesial dari Shop and Drive! Diskon hingga 40% untuk berbagai produk dan jasa servis.",
    content: `
      <h2>Promo Lebaran Shop and Drive</h2>
      <p>Dalam rangka menyambut Hari Raya, Shop and Drive Taman Tekno menghadirkan promo spesial untuk Anda!</p>
      
      <h3>Promo Produk</h3>
      <ul>
        <li>Diskon 40% untuk semua oli Shell</li>
        <li>Diskon 30% untuk aki GS Astra</li>
        <li>Buy 1 Get 1 untuk lampu LED Philips</li>
        <li>Gratis ongkir untuk pembelian di atas Rp 500.000</li>
      </ul>
      
      <h3>Promo Servis</h3>
      <ul>
        <li>Servis berkala ringan hanya Rp 199.000 (termasuk ganti oli)</li>
        <li>Servis AC gratis pemeriksaan + diskon 25%</li>
        <li>Spooring & balancing Rp 150.000 (termasuk free rotasi ban)</li>
      </ul>
      
      <p>Promo berlaku dari 1-30 Juli 2026. Segera kunjungi Shop and Drive Taman Tekno atau pesan online melalui website kami!</p>
    `,
    categoryId: "cat-promo",
    categoryName: "Promo",
    author: "Tim Marketing",
    image: "/images/articles/promo-lebaran.jpg",
    tags: ["promo", "lebaran", "diskon", "servis"],
    status: "published",
    publishedAt: "2026-06-28",
    createdAt: "2026-06-25",
    metaTitle: "Promo Spesial Lebaran Diskon 40% | Shop and Drive",
    metaDescription: "Rayakan Lebaran dengan promo spesial Shop and Drive! Diskon hingga 40% produk & jasa servis. Periode 1-30 Juli 2026.",
  },
  {
    id: "art-5",
    title: "Perbedaan Ban Tubeless dan Tubetype, Mana yang Lebih Baik?",
    slug: "perbedaan-ban-tubeless-tubetype",
    excerpt: "Bingung memilih antara ban tubeless dan tubetype? Simak perbandingan lengkapnya sebelum membeli ban baru.",
    content: `
      <h2>Ban Tubeless vs Tubetype</h2>
      <p>Pemilihan jenis ban yang tepat sangat mempengaruhi kenyamanan dan keamanan berkendara. Berikut perbedaan utama ban tubeless dan tubetype:</p>
      
      <h3>Ban Tubeless</h3>
      <ul>
        <li><strong>Kelebihan:</strong> Tidak menggunakan ban dalam, lebih tahan bocor, bobot lebih ringan, suhu ban lebih stabil.</li>
        <li><strong>Kekurangan:</strong> Harga lebih mahal, memerlukan velg khusus, perbaikan bocor lebih rumit.</li>
      </ul>
      
      <h3>Ban Tubetype</h3>
      <ul>
        <li><strong>Kelebihan:</strong> Harga lebih terjangkau, bisa dipasang di velg standar, perbaikan lebih mudah.</li>
        <li><strong>Kekurangan:</strong> Menggunakan ban dalam yang rawan bocor, bobot lebih berat, lebih rentan panas.</li>
      </ul>
      
      <h2>Rekomendasi</h2>
      <p>Untuk mobil modern (tahun 2010 ke atas), kami merekomendasikan ban tubeless karena lebih aman dan nyaman. Untuk mobil lama, tubetype masih menjadi pilihan yang ekonomis.</p>
    `,
    categoryId: "cat-review",
    categoryName: "Review Produk",
    author: "Tim Teknis Shop and Drive",
    image: "/images/articles/ban-tips.jpg",
    tags: ["ban", "tubeless", "tubetype", "tips"],
    status: "published",
    publishedAt: "2026-06-25",
    createdAt: "2026-06-23",
    metaTitle: "Perbedaan Ban Tubeless & Tubetype | Shop and Drive",
    metaDescription: "Bingung pilih ban? Simak perbandingan lengkap ban tubeless vs tubetype dari segi harga, keamanan, dan kenyamanan.",
  },
];

export const articleCategories = [
  { id: "cat-tips", name: "Tips Otomotif", slug: "tips-otomotif" },
  { id: "cat-review", name: "Review Produk", slug: "review-produk" },
  { id: "cat-promo", name: "Promo", slug: "promo" },
  { id: "cat-berita", name: "Berita", slug: "berita" },
];
