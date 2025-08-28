const BASE = import.meta.env.BASE_URL; 

export const places = [
  {
    id: 'gazi-muh-maltepe',
    kind: 'university',
    title: 'Gazi Üniversitesi Mühendislik Fakültesi',
    subtitle: 'Maltepe / Ankara',
    role: 'Lisans · Bilgisayar Müh.',
    period: '2021 — (Devam)',
    lat: 39.9326, lng: 32.8539,
    highlights: [
      'Ortalama: 3.18/4 '
    ],
    skills: ['OOP-Java', 'C', 'Yazılım Geliştirme', 'Lineer Cebir', "Ayrık Matematik" ,"...."],
    address: 'Bahçelievler Mh., Maltepe/Çankaya',
    links: { website: "https://mf-bm.gazi.edu.tr/"},
    logo: BASE + 'logos/gazi.png'
  },
  {
    id: 'btk',
    kind: 'government',
    title: 'Bilgi Teknolojileri ve İletişim Kurumu (BTK)',
    subtitle: 'Çankaya/Ankara',
    role: 'Stajyer · Backend Developer',
    period: '28/07/2025 - 22/08/2025',
    lat: 39.9086227156644, lng: 32.75202073648916,
    highlights: [
      'Backend: Java (Spring Boot, JWT, Swagger, JPA/Hibernate, REST API, Validation)',
      'Database: PostgreSQL, pgAdmin4, Entity-Relationship Model (ERD)',
      "Version Control: Git & GitHub",
    ],
    skills: ['Java', 'Takım Çalışması', 'PostgreSQL', 'Spring Framework', 'Git'],
    address: 'Dumlupınar Blv. 10.Km No: 276, 06530 Çankaya/Ankara',
    links: { website: 'https://www.btk.gov.tr'},
    logo: BASE + 'logos/btk.png'
  },
  {
    id: 'odtu-teknokent-issd',
    kind: 'company',
    title: 'ISSD (ODTÜ Teknokent)',
    subtitle: 'ODTÜ Teknokent Halıcı Binası, 06800 Çankaya/Ankara',
    role: 'Stajyer · Computer Vision',
    period: '16/06/2025 - 11/07/2025',
    lat: 39.89757104456138, lng:  32.77591935376246,
    highlights: [
      "Programlama Dili: Python",
      "Kütüphaneler/Frameworkler: OpenCV, NumPy, Matplotlib/Pillow, PaddleOCR",
      "Algoritmalar ve Teknikler: Gürültü filtreleme (Gaussian/Median Blur), Thresholding (adaptive threshold, binary threshold), Morfolojik işlemler (closing, dilation, erosion), Connected Component Labeling (CCL), Kontur tespiti ve bounding box çıkarımı, segmentasyon + OCR "
    ],
    skills: ['Computer Vision', 'Python', 'OCR (PaddleOCR)', "Algoritma Geliştirme", "OpenCV","Git"],
    address: 'ODTÜ Teknokent, 06531 Çankaya',
    links: { website: 'https://www.issd.com.tr' },
    logo: BASE + 'logos/issd.png'
  },
  {
    id: 'isTechSoft',
    kind: 'company1',
    title: 'IsTechSoft Software Technologies',
    subtitle: 'OMÜ Teknopark, 55200 Atakum/Samsun',
    role: 'Stajyer · Unity Developer',
    period: '10/06/2023 - 18/11/2023',
    lat: 41.281503074749594, lng:  36.33551295767099,
    highlights: [
      "Unity ve C# ile 2D/3D Oyun Geliştirme",
      "Oyun Mekanikleri, Fizik Motoru, Programlama",
      "Proje Yönetimi ve Takım Çalışması",
      "Versiyon Kontrolü: Git & GitHub"
    ],
    skills: ['C#', 'Unity', 'OOP', "Yazılım Geliştirme", "Git", "Takım Çalışması"],
    address: 'OMÜ Teknopark, 55200 Atakum/Samsun',
    links: { website: 'https://www.istechsoft.com/' },
    logo: BASE + 'logos/istechsoft.png'
  },
  {
    id: 'yetgen',
    kind: 'company2',
    title: 'Yetgin Gençler',
    subtitle: 'İstanbul',
    role: 'Öğrenci',
    period: '12/02/2024 - 17/05/2024',
    lat: 41.10901678727002, lng:   29.007668571086345,
    highlights: [
      "YetGen 21. Yüzyıl Yetkinlikleri Farkındalık Eğitim Programı; Etkili Sunum Teknikleri, Takım Çalışması, Kariyer , Excel ile Modelleme , Bilgi / Medya / Finans / Sağlık Okuryazarlığı, Sosyal İnovasyon ve GirişGen (Fikir Maratonu) gibi eğitimlerin düzenlendiği 14 haftalık bir programdır."
    ],
    skills: ['Etkili Sunum Teknikleri', 'Takım Çalışması', 'Excel ile Modelleme', "Finans/Bilgi/Sağlık/Medya Okuryazarlığı", "Proje Yönetimi", "Sosyal İnovasyon"],
    address: 'İstanbul',
    links: { website: 'https://yetkingencler.com/' },
    logo: BASE + 'logos/yetgen.png'
  }
];
