import "server-only"

import english from "./dictionaries/en.json"
import georgian from "./dictionaries/ka.json"
import russian from "./dictionaries/ru.json"

const allLanguages = ["id", "en", "en-au", "de", "zh", "ja", "ko", "fr", "nl", "ru", "ka"] as const

export const supportedLanguages = ["id", "en"] as const

export type SupportedLanguage = (typeof allLanguages)[number]

export function isSupportedLanguage(locale: string): locale is (typeof supportedLanguages)[number] {
  return (supportedLanguages as readonly string[]).includes(locale)
}

const translations: Partial<Record<SupportedLanguage, Record<string, unknown>>> = {
  id: {
    nav: { home: "Beranda", tours: "Tur Ekstrem", about: "Tentang", contact: "Kontak" },
    hero: { title: "Dolan Bareng Kang Pir", subtitle: "Jelajahi alam banyuwangi bersama kang pir", cta: "Jelajahi Petualangan" },
    tours: { title: "Tur Ekstrem", subtitle: "Pilih petualangan yang sesuai untuk Anda", viewDetails: "Lihat Detail", duration: "Durasi", price: "Harga", from: "mulai dari", allTours: "Semua Tur", filterBy: "Filter", all: "Semua", jeep: "Tur Jip", hiking: "Trekking Ekstrem", climbing: "Panjat Tebing", rafting: "Arung Jeram", winter: "Olahraga Musim Dingin", bookNow: "Pesan Sekarang", difficulty: "Tingkat Kesulitan", beginner: "Pemula", intermediate: "Menengah", advanced: "Lanjutan", expert: "Ahli" },
    testimonials: { title: "Ulasan Wisatawan", subtitle: "Pengalaman para pencinta petualangan" },
    staff: { title: "Tim Pemandu Kami", subtitle: "Kenali instruktur tur berpengalaman kami" },
    about: { title: "Tentang Kami", subtitle: "Dolan Bareng Kang Pir", description: "Kami menawarkan pengalaman petualangan unik dan tur alam sejak 2018.", mission: "Misi Kami", missionText: "Menghadirkan petualangan seru dengan mengutamakan keselamatan.", vision: "Visi Kami", visionText: "Menjadi penyedia petualangan alam terkemuka.", values: "Nilai Kami", valuesText: "Keselamatan, profesionalisme, dan kepedulian terhadap alam." },
    contact: { title: "Hubungi Kami", phone: "Telepon", email: "Email", address: "Alamat", workingHours: "Jam Operasional", form: { name: "Nama", email: "Email", subject: "Subjek", message: "Pesan", send: "Kirim Pesan", sending: "Mengirim…", success: "Pesan berhasil dikirim!", error: "Terjadi kesalahan, silakan coba lagi." }, info: { getInTouch: "Hubungi Kami", description: "Siap untuk petualangan? Hubungi kami untuk merencanakannya.", officeHours: "Jam Kantor", mondayFriday: "Senin–Jumat 08.00–20.00", saturday: "Sabtu 09.00–18.00", sunday: "Minggu 10.00–16.00" } },
    footer: { description: "Dolan Bareng Kang Pir — petualangan alam penuh adrenalin", quickLinks: "Tautan Cepat", followUs: "Ikuti Kami", rights: "Hak cipta dilindungi" },
  },
  de: {
    nav: { home: "Startseite", tours: "Abenteuertouren", about: "Über uns", contact: "Kontakt" },
    hero: { title: "Abenteuer in Georgien", subtitle: "Entdecken Sie Georgiens wilde Natur bei Jeep-Touren, Trekking und aufregenden Abenteuern", cta: "Abenteuer entdecken" },
    tours: { title: "Abenteuertouren", subtitle: "Finden Sie das passende Abenteuer", viewDetails: "Details ansehen", duration: "Dauer", price: "Preis", from: "ab", allTours: "Alle Touren", filterBy: "Filtern nach", all: "Alle", jeep: "Jeep-Touren", hiking: "Trekking", climbing: "Klettern", rafting: "Rafting", winter: "Wintersport", bookNow: "Jetzt buchen", difficulty: "Schwierigkeit", beginner: "Anfänger", intermediate: "Mittel", advanced: "Fortgeschritten", expert: "Experten" },
    testimonials: { title: "Bewertungen von Abenteurern", subtitle: "Erfahrungen unserer Reisenden" },
    staff: { title: "Unser Team", subtitle: "Lernen Sie unsere erfahrenen Guides kennen" },
    about: { title: "Über uns", subtitle: "Dolan Bareng Kang Pir", description: "Seit 2018 bieten wir einzigartige Abenteuer und Naturtouren an.", mission: "Unsere Mission", missionText: "Wir schaffen spannende Abenteuer mit Sicherheit an erster Stelle.", vision: "Unsere Vision", visionText: "Georgiens führender Anbieter für Naturabenteuer zu werden.", values: "Unsere Werte", valuesText: "Sicherheit, Professionalität und Respekt vor der Natur." },
    contact: { title: "Kontakt", phone: "Telefon", email: "E-Mail", address: "Adresse", workingHours: "Öffnungszeiten", form: { name: "Name", email: "E-Mail", subject: "Betreff", message: "Nachricht", send: "Nachricht senden", sending: "Wird gesendet...", success: "Nachricht erfolgreich gesendet!", error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." }, info: { getInTouch: "Kontaktieren Sie uns", description: "Bereit für ein Abenteuer? Kontaktieren Sie uns zur Planung.", officeHours: "Bürozeiten", mondayFriday: "Montag–Freitag: 08:00–20:00", saturday: "Samstag: 09:00–18:00", sunday: "Sonntag: 10:00–16:00" } },
    footer: { description: "Dolan Bareng Kang Pir — Abenteuer in Georgiens wilder Natur", quickLinks: "Direktlinks", followUs: "Folgen Sie uns", rights: "Alle Rechte vorbehalten" },
  },
  zh: {
    nav: { home: "首页", tours: "探险之旅", about: "关于我们", contact: "联系方式" },
    hero: { title: "格鲁吉亚探险之旅", subtitle: "乘坐吉普车、徒步探索格鲁吉亚的壮丽自然风光", cta: "探索旅程" },
    tours: { title: "探险之旅", subtitle: "选择适合您的冒险体验", viewDetails: "查看详情", duration: "时长", price: "价格", from: "起价", allTours: "所有行程", filterBy: "筛选", all: "全部", jeep: "吉普车之旅", hiking: "徒步旅行", climbing: "攀岩", rafting: "漂流", winter: "冬季运动", bookNow: "立即预订", difficulty: "难度", beginner: "初级", intermediate: "中级", advanced: "高级", expert: "专家级" },
    testimonials: { title: "游客评价", subtitle: "旅行者分享的冒险体验" },
    staff: { title: "我们的团队", subtitle: "认识经验丰富的向导" },
    about: { title: "关于我们", subtitle: "Dolan Bareng Kang Pir", description: "自2018年以来，我们一直提供独特的自然探险体验。", mission: "我们的使命", missionText: "在确保安全的同时创造精彩的探险体验。", vision: "我们的愿景", visionText: "成为格鲁吉亚领先的户外探险团队。", values: "我们的价值观", valuesText: "安全、专业以及尊重自然。" },
    contact: { title: "联系我们", phone: "电话", email: "邮箱", address: "地址", workingHours: "营业时间", form: { name: "姓名", email: "邮箱", subject: "主题", message: "留言", send: "发送留言", sending: "发送中…", success: "留言已发送！", error: "发生错误，请重试。" }, info: { getInTouch: "联系我们", description: "准备好开启探险了吗？请联系我们。", officeHours: "办公时间", mondayFriday: "周一至周五：08:00–20:00", saturday: "周六：09:00–18:00", sunday: "周日：10:00–16:00" } },
    footer: { description: "Dolan Bareng Kang Pir — 探索格鲁吉亚的自然风光", quickLinks: "快速链接", followUs: "关注我们", rights: "版权所有" },
  },
  ja: {
    nav: { home: "ホーム", tours: "アドベンチャーツアー", about: "会社概要", contact: "お問い合わせ" },
    hero: { title: "ジョージアの大自然を冒険", subtitle: "ジープツアーやトレッキングでジョージアの自然を満喫しましょう", cta: "ツアーを見る" },
    tours: { title: "アドベンチャーツアー", subtitle: "あなたにぴったりの冒険を見つけましょう", viewDetails: "詳細を見る", duration: "所要時間", price: "料金", from: "〜から", allTours: "すべてのツアー", filterBy: "絞り込み", all: "すべて", jeep: "ジープツアー", hiking: "トレッキング", climbing: "ロッククライミング", rafting: "ラフティング", winter: "ウィンタースポーツ", bookNow: "予約する", difficulty: "難易度", beginner: "初級", intermediate: "中級", advanced: "上級", expert: "エキスパート" },
    testimonials: { title: "旅行者の声", subtitle: "冒険を楽しんだ方々の感想" },
    staff: { title: "ガイドチーム", subtitle: "経験豊富なガイドをご紹介します" },
    about: { title: "会社概要", subtitle: "Dolan Bareng Kang Pir", description: "2018年から特別な自然体験ツアーを提供しています。", mission: "ミッション", missionText: "安全を第一に、心に残る冒険をお届けします。", vision: "ビジョン", visionText: "ジョージアを代表する自然ツアー会社を目指します。", values: "大切にしていること", valuesText: "安全、プロ意識、自然への敬意。" },
    contact: { title: "お問い合わせ", phone: "電話", email: "メール", address: "住所", workingHours: "営業時間", form: { name: "お名前", email: "メールアドレス", subject: "件名", message: "メッセージ", send: "送信する", sending: "送信中…", success: "送信しました！", error: "エラーが発生しました。もう一度お試しください。" }, info: { getInTouch: "お問い合わせ", description: "冒険の計画についてお気軽にご相談ください。", officeHours: "営業時間", mondayFriday: "月〜金 08:00〜20:00", saturday: "土 09:00〜18:00", sunday: "日 10:00〜16:00" } },
    footer: { description: "Dolan Bareng Kang Pir — ジョージアの自然を冒険", quickLinks: "リンク", followUs: "フォローする", rights: "無断転載を禁じます" },
  },
  ko: {
    nav: { home: "홈", tours: "모험 투어", about: "소개", contact: "문의" },
    hero: { title: "조지아 대자연 어드벤처", subtitle: "지프 투어와 트레킹으로 조지아의 아름다운 자연을 만나보세요", cta: "모험 둘러보기" },
    tours: { title: "모험 투어", subtitle: "나에게 맞는 특별한 여행을 찾아보세요", viewDetails: "자세히 보기", duration: "기간", price: "가격", from: "부터", allTours: "전체 투어", filterBy: "필터", all: "전체", jeep: "지프 투어", hiking: "트레킹", climbing: "암벽 등반", rafting: "래프팅", winter: "겨울 스포츠", bookNow: "예약하기", difficulty: "난이도", beginner: "초급", intermediate: "중급", advanced: "고급", expert: "전문가" },
    testimonials: { title: "여행자 후기", subtitle: "모험을 즐긴 여행자들의 이야기" },
    staff: { title: "가이드 팀", subtitle: "경험 많은 가이드를 만나보세요" },
    about: { title: "소개", subtitle: "Dolan Bareng Kang Pir", description: "2018년부터 특별한 자연 모험 여행을 제공하고 있습니다.", mission: "미션", missionText: "안전을 최우선으로 잊지 못할 모험을 만듭니다.", vision: "비전", visionText: "조지아 최고의 자연 모험 여행사가 되겠습니다.", values: "핵심 가치", valuesText: "안전, 전문성, 자연 존중." },
    contact: { title: "문의하기", phone: "전화", email: "이메일", address: "주소", workingHours: "운영 시간", form: { name: "이름", email: "이메일", subject: "제목", message: "메시지", send: "메시지 보내기", sending: "전송 중…", success: "메시지를 보냈습니다!", error: "오류가 발생했습니다. 다시 시도해 주세요." }, info: { getInTouch: "문의하기", description: "모험을 계획하고 계신가요? 편하게 문의해 주세요.", officeHours: "운영 시간", mondayFriday: "월–금 08:00–20:00", saturday: "토요일 09:00–18:00", sunday: "일요일 10:00–16:00" } },
    footer: { description: "Dolan Bareng Kang Pir — 조지아의 자연 속 모험", quickLinks: "바로가기", followUs: "팔로우", rights: "모든 권리 보유" },
  },
  fr: {
    nav: { home: "Accueil", tours: "Circuits aventure", about: "À propos", contact: "Contact" },
    hero: { title: "Aventures en Géorgie", subtitle: "Explorez la nature sauvage de la Géorgie en jeep ou en randonnée", cta: "Découvrir les aventures" },
    tours: { title: "Circuits aventure", subtitle: "Choisissez l’aventure qui vous correspond", viewDetails: "Voir les détails", duration: "Durée", price: "Prix", from: "à partir de", allTours: "Tous les circuits", filterBy: "Filtrer par", all: "Tout", jeep: "Circuits en jeep", hiking: "Randonnée", climbing: "Escalade", rafting: "Rafting", winter: "Sports d’hiver", bookNow: "Réserver", difficulty: "Difficulté", beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé", expert: "Expert" },
    testimonials: { title: "Avis des voyageurs", subtitle: "Leurs expériences d’aventure" },
    staff: { title: "Notre équipe", subtitle: "Rencontrez nos guides expérimentés" },
    about: { title: "À propos", subtitle: "Dolan Bareng Kang Pir", description: "Depuis 2018, nous proposons des expériences uniques au cœur de la nature.", mission: "Notre mission", missionText: "Créer des aventures mémorables en privilégiant la sécurité.", vision: "Notre vision", visionText: "Devenir la référence des aventures en plein air en Géorgie.", values: "Nos valeurs", valuesText: "Sécurité, professionnalisme et respect de la nature." },
    contact: { title: "Contactez-nous", phone: "Téléphone", email: "E-mail", address: "Adresse", workingHours: "Horaires", form: { name: "Nom", email: "E-mail", subject: "Sujet", message: "Message", send: "Envoyer le message", sending: "Envoi…", success: "Message envoyé !", error: "Une erreur s’est produite. Veuillez réessayer." }, info: { getInTouch: "Nous contacter", description: "Prêt pour l’aventure ? Contactez-nous pour la préparer.", officeHours: "Horaires du bureau", mondayFriday: "Lundi–vendredi : 08 h–20 h", saturday: "Samedi : 09 h–18 h", sunday: "Dimanche : 10 h–16 h" } },
    footer: { description: "Dolan Bareng Kang Pir — aventures au cœur de la nature géorgienne", quickLinks: "Liens rapides", followUs: "Suivez-nous", rights: "Tous droits réservés" },
  },
  nl: {
    nav: { home: "Home", tours: "Avontuurlijke tours", about: "Over ons", contact: "Contact" },
    hero: { title: "Avontuur in Georgië", subtitle: "Ontdek de ruige natuur van Georgië met jeeptours en trektochten", cta: "Ontdek avonturen" },
    tours: { title: "Avontuurlijke tours", subtitle: "Kies het avontuur dat bij je past", viewDetails: "Bekijk details", duration: "Duur", price: "Prijs", from: "vanaf", allTours: "Alle tours", filterBy: "Filter op", all: "Alles", jeep: "Jeeptours", hiking: "Trekking", climbing: "Klimmen", rafting: "Raften", winter: "Wintersport", bookNow: "Boek nu", difficulty: "Moeilijkheid", beginner: "Beginner", intermediate: "Gemiddeld", advanced: "Gevorderd", expert: "Expert" },
    testimonials: { title: "Ervaringen van reizigers", subtitle: "Verhalen van avonturiers" },
    staff: { title: "Ons team", subtitle: "Maak kennis met onze ervaren gidsen" },
    about: { title: "Over ons", subtitle: "Dolan Bareng Kang Pir", description: "Sinds 2018 bieden we unieke avonturen en natuurervaringen.", mission: "Onze missie", missionText: "Onvergetelijke avonturen bieden met veiligheid voorop.", vision: "Onze visie", visionText: "De toonaangevende aanbieder van natuuravonturen in Georgië worden.", values: "Onze waarden", valuesText: "Veiligheid, vakmanschap en respect voor de natuur." },
    contact: { title: "Contact", phone: "Telefoon", email: "E-mail", address: "Adres", workingHours: "Openingstijden", form: { name: "Naam", email: "E-mail", subject: "Onderwerp", message: "Bericht", send: "Bericht versturen", sending: "Verzenden…", success: "Bericht verzonden!", error: "Er is iets misgegaan. Probeer het opnieuw." }, info: { getInTouch: "Neem contact op", description: "Klaar voor avontuur? Neem contact met ons op om het te plannen.", officeHours: "Kantooruren", mondayFriday: "Maandag–vrijdag: 08.00–20.00", saturday: "Zaterdag: 09.00–18.00", sunday: "Zondag: 10.00–16.00" } },
    footer: { description: "Dolan Bareng Kang Pir — avontuur in de wilde natuur van Georgië", quickLinks: "Snelle links", followUs: "Volg ons", rights: "Alle rechten voorbehouden" },
  },
}

const pageTranslations: Partial<Record<SupportedLanguage, Record<string, unknown>>> = {
  ru: {
    site: {
      home: { kicker: "Откройте Восточную Яву", title: "Откройте для себя Баньюванги", description: "Вас ждут потрясающие пейзажи, тропические пляжи, красивые леса и незабываемые впечатления в Баньюванги, Индонезия.", explore: "Смотреть направления", aboutKicker: "О Баньюванги", aboutTitle: "Откройте чудеса Баньюванги", aboutDescription: "От голубого огня кратера Иджен до тихого леса Джаватан и прозрачных вод пляжа Бангсринг — Баньюванги подарит особенные впечатления каждому путешественнику." },
      destinations: { kicker: "Исследуйте Индонезию", title: "Популярные направления", description: "Откройте красивые места и незабываемые впечатления в Баньюванги, Восточная Ява.", explore: "Подробнее", viewAll: "Все направления", ijen: "Увидьте редкое голубое пламя и бирюзовое кратерное озеро.", djawatan: "Прогуляйтесь по волшебному лесу среди огромных деревьев трембези.", bangsring: "Насладитесь чистыми пляжами, прозрачной водой и морскими развлечениями.", teluk: "Откройте скрытый рай в национальном парке Меру-Бетири." },
      detail: { about: "Об этом месте", itinerary: "Маршрут тура", included: "Включено", maxPeople: "До {count} человек", maxPeopleLabel: "Максимум гостей", startingPrice: "Цена от", perPerson: "На человека", duration: "Продолжительность", rating: "Рейтинг", location: "Место", contact: "Связаться с нами", back: "Назад к направлениям", notFound: "Направление не найдено", notFoundDescription: "Запрошенное направление недоступно.", backHome: "На главную" },
      footer: { destinations: "Направления", company: "Компания", support: "Поддержка", about: "О нас", careers: "Карьера", press: "Пресса", blog: "Блог", partners: "Партнёры", help: "Центр помощи", contact: "Контакты", privacy: "Конфиденциальность", terms: "Условия использования", cancellation: "Правила отмены", copyright: "Все права защищены." },
    },
  },
  id: {
    site: {
      home: { kicker: "Jelajahi keindahan Jawa Timur", title: "Jelajahi Banyuwangi", description: "Temukan api biru Ijen, suasana hutan vintage Djawatan, petualangan laut dan terumbu karang, hingga sunset di pantai selatan.", explore: "Jelajahi Destinasi", aboutKicker: "Tentang Banyuwangi", aboutTitle: "Rasakan Keajaiban Banyuwangi", aboutDescription: "Nikmati perjalanan di Banyuwangi yang disambut keindahan gunung dan api biru, suasana hutan vintage, perjalanan di laut, menyelam melihat terumbu karang, serta suasana sunset di pantai selatan." },
      destinations: { kicker: "Jelajahi Indonesia", title: "Destinasi Pilihan", description: "Temukan destinasi indah dan pengalaman tak terlupakan di Banyuwangi, Jawa Timur.", explore: "Jelajahi", viewAll: "Lihat Semua Destinasi", ijen: "Temukan api biru yang langka dan danau kawah berwarna toska.", djawatan: "Jelajahi hutan magis dengan pepohonan trembesi raksasa.", bangsring: "Nikmati pantai yang asri, air jernih, dan aktivitas laut.", teluk: "Temukan surga tersembunyi di Taman Nasional Meru Betiri." },
      detail: { about: "Tentang Destinasi Ini", itinerary: "Rencana Perjalanan", included: "Termasuk", maxPeople: "Maksimal {count} orang", maxPeopleLabel: "Maksimal Orang", startingPrice: "Harga mulai", perPerson: "Per orang", duration: "Durasi", rating: "Penilaian", location: "Lokasi", contact: "Hubungi Kami", back: "Kembali ke Destinasi", notFound: "Destinasi Tidak Ditemukan", notFoundDescription: "Destinasi yang Anda cari tidak tersedia.", backHome: "Kembali ke Beranda" },
      footer: { description: "Jelajahi api biru, hutan vintage, petualangan laut, terumbu karang, dan sunset pantai selatan Banyuwangi bersama pemandu lokal.", destinations: "Destinasi", company: "Perusahaan", support: "Bantuan", about: "Tentang Kami", careers: "Karier", press: "Pers", blog: "Blog", partners: "Mitra", help: "Pusat Bantuan", contact: "Hubungi Kami", privacy: "Kebijakan Privasi", terms: "Syarat Layanan", cancellation: "Kebijakan Pembatalan", copyright: "Hak cipta dilindungi." },
    },
  },
  de: {
    site: {
      home: { kicker: "Entdecken Sie Ostjava", title: "Banyuwangi entdecken", description: "Entdecken Sie beeindruckende Landschaften, tropische Strände, üppige Wälder und unvergessliche Erlebnisse in Banyuwangi, Indonesien.", explore: "Reiseziele entdecken", aboutKicker: "Über Banyuwangi", aboutTitle: "Die Wunder Banyuwangis erleben", aboutDescription: "Vom blauen Feuer am Ijen-Krater über den ruhigen Djawatan-Wald bis zum klaren Wasser am Bangsring-Strand bietet Banyuwangi besondere Erlebnisse." },
      destinations: { kicker: "Indonesien entdecken", title: "Ausgewählte Reiseziele", description: "Entdecken Sie die schönsten Orte und unvergessliche Erlebnisse in Banyuwangi, Ostjava.", explore: "Entdecken", viewAll: "Alle Reiseziele ansehen", ijen: "Erleben Sie das seltene blaue Feuer und den türkisfarbenen Kratersee.", djawatan: "Entdecken Sie einen zauberhaften Wald mit riesigen Trembesi-Bäumen.", bangsring: "Genießen Sie unberührte Strände, klares Wasser und Aktivitäten auf dem Meer.", teluk: "Entdecken Sie ein verborgenes Paradies im Nationalpark Meru Betiri." },
      detail: { about: "Über dieses Reiseziel", itinerary: "Reiseplan", included: "Inklusive", maxPeople: "Maximal {count} Personen", maxPeopleLabel: "Maximale Personenanzahl", startingPrice: "Preis ab", perPerson: "Pro Person", duration: "Dauer", rating: "Bewertung", location: "Ort", contact: "Kontaktieren Sie uns", back: "Zurück zu den Reisezielen", notFound: "Reiseziel nicht gefunden", notFoundDescription: "Das gesuchte Reiseziel ist nicht verfügbar.", backHome: "Zur Startseite" },
      footer: { destinations: "Reiseziele", company: "Unternehmen", support: "Service", about: "Über uns", careers: "Karriere", press: "Presse", blog: "Blog", partners: "Partner", help: "Hilfe", contact: "Kontakt", privacy: "Datenschutz", terms: "Nutzungsbedingungen", cancellation: "Stornierungsbedingungen", copyright: "Alle Rechte vorbehalten." },
    },
  },
  zh: {
    site: {
      home: { kicker: "探索东爪哇之美", title: "探索外南梦", description: "在印度尼西亚外南梦发现壮丽风景、热带海滩、宁静森林与难忘体验。", explore: "探索目的地", aboutKicker: "关于外南梦", aboutTitle: "体验外南梦的魅力", aboutDescription: "从伊真火山口的蓝色火焰，到宁静的爪哇森林和邦斯林海滩的清澈海水，外南梦为每位游客带来独特体验。" },
      destinations: { kicker: "探索印度尼西亚", title: "精选目的地", description: "探索东爪哇外南梦的迷人景点与难忘体验。", explore: "探索", viewAll: "查看所有目的地", ijen: "观赏罕见的蓝色火焰和碧绿色火山湖。", djawatan: "漫步在巨大的雨树环绕的奇幻森林。", bangsring: "享受纯净海滩、清澈海水和丰富海上活动。", teluk: "探索梅鲁贝蒂里国家公园内的隐秘海湾。" },
      detail: { about: "目的地介绍", itinerary: "行程安排", included: "费用包含", maxPeople: "最多 {count} 人", maxPeopleLabel: "人数上限", startingPrice: "起价", perPerson: "每人", duration: "时长", rating: "评分", location: "地点", contact: "联系我们", back: "返回目的地", notFound: "未找到目的地", notFoundDescription: "您查找的目的地暂不可用。", backHome: "返回首页" },
      footer: { destinations: "目的地", company: "公司", support: "帮助", about: "关于我们", careers: "招聘", press: "媒体", blog: "博客", partners: "合作伙伴", help: "帮助中心", contact: "联系我们", privacy: "隐私政策", terms: "服务条款", cancellation: "取消政策", copyright: "版权所有。" },
    },
  },
  ja: {
    site: {
      home: { kicker: "東ジャワの魅力を発見", title: "バニュワンギを旅しよう", description: "インドネシア・バニュワンギの絶景、熱帯のビーチ、美しい森、心に残る体験をお楽しみください。", explore: "観光地を見る", aboutKicker: "バニュワンギについて", aboutTitle: "バニュワンギの魅力を体験", aboutDescription: "イジェン火口の青い炎から、静かなジャワンタンの森、透明なバンスリン海岸まで、特別な体験が待っています。" },
      destinations: { kicker: "インドネシアを探索", title: "おすすめの観光地", description: "東ジャワ・バニュワンギの美しい場所と忘れられない体験をご紹介します。", explore: "詳しく見る", viewAll: "すべての観光地", ijen: "珍しい青い炎とターコイズ色の火口湖をご覧ください。", djawatan: "巨大なトレンベシの木々に囲まれた神秘的な森を散策。", bangsring: "美しいビーチ、透明な海、海のアクティビティを満喫。", teluk: "メル・ベティリ国立公園にある隠れた楽園を発見。" },
      detail: { about: "観光地について", itinerary: "旅行日程", included: "含まれるもの", maxPeople: "最大{count}名", maxPeopleLabel: "最大人数", startingPrice: "料金", perPerson: "1名あたり", duration: "所要時間", rating: "評価", location: "場所", contact: "お問い合わせ", back: "観光地一覧へ戻る", notFound: "観光地が見つかりません", notFoundDescription: "お探しの観光地は見つかりませんでした。", backHome: "ホームに戻る" },
      footer: { destinations: "観光地", company: "会社情報", support: "サポート", about: "会社概要", careers: "採用情報", press: "プレス", blog: "ブログ", partners: "パートナー", help: "ヘルプセンター", contact: "お問い合わせ", privacy: "プライバシーポリシー", terms: "利用規約", cancellation: "キャンセル規定", copyright: "無断転載を禁じます。" },
    },
  },
  ko: {
    site: {
      home: { kicker: "동자바의 아름다움을 발견하세요", title: "반유왕이를 여행하세요", description: "인도네시아 반유왕이에서 아름다운 풍경, 열대 해변, 숲과 잊지 못할 경험을 만나보세요.", explore: "여행지 둘러보기", aboutKicker: "반유왕이 소개", aboutTitle: "반유왕이의 매력을 경험하세요", aboutDescription: "이젠 화산의 푸른 불꽃부터 평화로운 자와탄 숲과 방스링 해변의 맑은 바다까지 특별한 경험이 기다립니다." },
      destinations: { kicker: "인도네시아 탐험", title: "추천 여행지", description: "동자바 반유왕이의 아름다운 명소와 특별한 경험을 만나보세요.", explore: "둘러보기", viewAll: "모든 여행지 보기", ijen: "희귀한 푸른 불꽃과 청록색 분화호를 만나보세요.", djawatan: "거대한 트렘베시 나무가 있는 신비로운 숲을 산책하세요.", bangsring: "깨끗한 해변과 맑은 바다, 다양한 해양 활동을 즐겨보세요.", teluk: "메루 베티리 국립공원의 숨은 해변을 발견하세요." },
      detail: { about: "여행지 소개", itinerary: "여행 일정", included: "포함 사항", maxPeople: "최대 {count}명", maxPeopleLabel: "최대 인원", startingPrice: "시작 가격", perPerson: "1인 기준", duration: "기간", rating: "평점", location: "위치", contact: "문의하기", back: "여행지로 돌아가기", notFound: "여행지를 찾을 수 없습니다", notFoundDescription: "요청하신 여행지를 찾을 수 없습니다.", backHome: "홈으로 돌아가기" },
      footer: { destinations: "여행지", company: "회사", support: "고객 지원", about: "소개", careers: "채용", press: "언론", blog: "블로그", partners: "파트너", help: "도움말", contact: "문의", privacy: "개인정보 처리방침", terms: "이용 약관", cancellation: "취소 정책", copyright: "모든 권리 보유." },
    },
  },
  fr: {
    site: {
      home: { kicker: "Découvrez l’est de Java", title: "Explorez Banyuwangi", description: "Découvrez les paysages grandioses, les plages tropicales, les forêts paisibles et des expériences inoubliables à Banyuwangi, en Indonésie.", explore: "Découvrir les destinations", aboutKicker: "À propos de Banyuwangi", aboutTitle: "Découvrez les merveilles de Banyuwangi", aboutDescription: "Du feu bleu du cratère d’Ijen à la forêt paisible de Djawatan et aux eaux claires de Bangsring, Banyuwangi vous réserve des expériences uniques." },
      destinations: { kicker: "Explorez l’Indonésie", title: "Destinations à découvrir", description: "Découvrez les plus beaux sites et des expériences inoubliables à Banyuwangi, dans l’est de Java.", explore: "Découvrir", viewAll: "Voir toutes les destinations", ijen: "Admirez le rare feu bleu et le lac turquoise du cratère.", djawatan: "Explorez une forêt magique peuplée d’immenses arbres trembesi.", bangsring: "Profitez de plages préservées, d’eaux limpides et d’activités nautiques.", teluk: "Découvrez un paradis caché dans le parc national de Meru Betiri." },
      detail: { about: "À propos de cette destination", itinerary: "Programme", included: "Compris", maxPeople: "Maximum {count} personnes", maxPeopleLabel: "Nombre maximum", startingPrice: "À partir de", perPerson: "Par personne", duration: "Durée", rating: "Note", location: "Lieu", contact: "Nous contacter", back: "Retour aux destinations", notFound: "Destination introuvable", notFoundDescription: "La destination recherchée est indisponible.", backHome: "Retour à l’accueil" },
      footer: { destinations: "Destinations", company: "Entreprise", support: "Assistance", about: "À propos", careers: "Carrières", press: "Presse", blog: "Blog", partners: "Partenaires", help: "Centre d’aide", contact: "Contact", privacy: "Confidentialité", terms: "Conditions d’utilisation", cancellation: "Politique d’annulation", copyright: "Tous droits réservés." },
    },
  },
  nl: {
    site: {
      home: { kicker: "Ontdek Oost-Java", title: "Ontdek Banyuwangi", description: "Ontdek indrukwekkende landschappen, tropische stranden, rustige bossen en bijzondere ervaringen in Banyuwangi, Indonesië.", explore: "Ontdek bestemmingen", aboutKicker: "Over Banyuwangi", aboutTitle: "Beleef de wonderen van Banyuwangi", aboutDescription: "Van het blauwe vuur bij de Ijen-krater tot het rustige Djawatan-bos en het heldere water bij Bangsring: Banyuwangi biedt bijzondere ervaringen." },
      destinations: { kicker: "Ontdek Indonesië", title: "Uitgelichte bestemmingen", description: "Ontdek de mooiste plekken en bijzondere ervaringen in Banyuwangi, Oost-Java.", explore: "Ontdekken", viewAll: "Alle bestemmingen bekijken", ijen: "Bewonder het zeldzame blauwe vuur en het turquoise kratermeer.", djawatan: "Verken een magisch bos met reusachtige trembesibomen.", bangsring: "Geniet van ongerepte stranden, helder water en activiteiten op zee.", teluk: "Ontdek een verborgen paradijs in nationaal park Meru Betiri." },
      detail: { about: "Over deze bestemming", itinerary: "Reisprogramma", included: "Inbegrepen", maxPeople: "Maximaal {count} personen", maxPeopleLabel: "Maximumaantal personen", startingPrice: "Vanaf", perPerson: "Per persoon", duration: "Duur", rating: "Beoordeling", location: "Locatie", contact: "Neem contact op", back: "Terug naar bestemmingen", notFound: "Bestemming niet gevonden", notFoundDescription: "De gezochte bestemming is niet beschikbaar.", backHome: "Terug naar home" },
      footer: { destinations: "Bestemmingen", company: "Bedrijf", support: "Ondersteuning", about: "Over ons", careers: "Vacatures", press: "Pers", blog: "Blog", partners: "Partners", help: "Helpcentrum", contact: "Contact", privacy: "Privacybeleid", terms: "Gebruiksvoorwaarden", cancellation: "Annuleringsbeleid", copyright: "Alle rechten voorbehouden." },
    },
  },
}

const aboutPageTranslations: Partial<Record<SupportedLanguage, Record<string, unknown>>> = {
  ru: { site: { about: { stats: ["Довольных путешественников", "Туров", "Лет опыта", "Опытных гидов"], team: [["Основатель и CEO", "15 лет опыта в туристической индустрии"], ["Операционный менеджер", "Специалист по культурным турам"], ["Эксперт горных туров", "Инструктор по альпинизму и гид"]], whyTitle: "Почему выбирают нас?", features: [["Качество", "Высокий уровень сервиса"], ["Опыт", "Более 8 лет опыта"], ["Языки", "Многоязычные гиды"], ["Забота", "Индивидуальный подход"]] } } },
  id: { site: { about: { stats: ["Wisatawan Puas", "Tur", "Tahun Pengalaman", "Pemandu Ahli"], team: [["Pendiri & CEO", "Berpengalaman 15 tahun di industri pariwisata"], ["Manajer Operasional", "Spesialis tur budaya"], ["Ahli Tur Pegunungan", "Instruktur dan pemandu pendakian"]], whyTitle: "Mengapa Memilih Kami?", features: [["Kualitas", "Layanan berkualitas tinggi"], ["Pengalaman", "Pengalaman lebih dari 8 tahun"], ["Bahasa", "Pemandu multibahasa"], ["Kepedulian", "Layanan yang personal"]] } } },
  de: { site: { about: { stats: ["Zufriedene Reisende", "Touren", "Jahre Erfahrung", "Erfahrene Guides"], team: [["Gründer & CEO", "15 Jahre Erfahrung in der Tourismusbranche"], ["Betriebsleitung", "Spezialistin für Kulturreisen"], ["Experte für Bergtouren", "Bergsteiger und Guide"]], whyTitle: "Warum mit uns reisen?", features: [["Qualität", "Service mit hohen Qualitätsstandards"], ["Erfahrung", "Mehr als 8 Jahre Erfahrung"], ["Sprachen", "Mehrsprachige Guides"], ["Persönlich", "Individuelle Betreuung"]] } } },
  zh: { site: { about: { stats: ["满意的游客", "条线路", "年经验", "专业向导"], team: [["创始人兼首席执行官", "拥有15年旅游行业经验"], ["运营经理", "文化旅游专家"], ["山地旅行专家", "登山教练与向导"]], whyTitle: "为什么选择我们？", features: [["品质", "提供高品质服务"], ["经验", "拥有8年以上经验"], ["语言", "多语种向导"], ["贴心服务", "提供个性化服务"]] } } },
  ja: { site: { about: { stats: ["満足した旅行者", "ツアー", "年の経験", "経験豊富なガイド"], team: [["創業者兼CEO", "観光業界で15年の経験"], ["運営マネージャー", "文化ツアーの専門家"], ["山岳ツアー専門家", "登山インストラクター兼ガイド"]], whyTitle: "選ばれる理由", features: [["品質", "質の高いサービス"], ["経験", "8年以上の経験"], ["言語", "多言語対応のガイド"], ["心配り", "一人ひとりに合わせた対応"]] } } },
  ko: { site: { about: { stats: ["만족한 여행자", "투어", "년 경력", "전문 가이드"], team: [["창립자 및 CEO", "관광 업계 15년 경력"], ["운영 매니저", "문화 투어 전문가"], ["산악 투어 전문가", "등산 강사 겸 가이드"]], whyTitle: "저희를 선택해야 하는 이유", features: [["품질", "높은 품질의 서비스"], ["경험", "8년 이상의 경험"], ["언어", "다국어 가이드"], ["배려", "개인 맞춤 서비스"]] } } },
  fr: { site: { about: { stats: ["Voyageurs satisfaits", "Circuits", "Ans d’expérience", "Guides experts"], team: [["Fondateur et PDG", "15 ans d’expérience dans le tourisme"], ["Responsable des opérations", "Spécialiste des circuits culturels"], ["Expert en montagne", "Instructeur d’alpinisme et guide"]], whyTitle: "Pourquoi voyager avec nous ?", features: [["Qualité", "Un service de grande qualité"], ["Expérience", "Plus de 8 ans d’expérience"], ["Langues", "Guides multilingues"], ["Attention", "Un accompagnement personnalisé"]] } } },
  nl: { site: { about: { stats: ["Tevreden reizigers", "Tours", "Jaar ervaring", "Ervaren gidsen"], team: [["Oprichter en CEO", "15 jaar ervaring in de reisbranche"], ["Operationeel manager", "Specialist in culturele tours"], ["Bergtourexpert", "Bergsportinstructeur en gids"]], whyTitle: "Waarom voor ons kiezen?", features: [["Kwaliteit", "Service van hoge kwaliteit"], ["Ervaring", "Meer dan 8 jaar ervaring"], ["Talen", "Meertalige gidsen"], ["Persoonlijk", "Persoonlijke begeleiding"]] } } },
}

const aboutBrandTranslations: Partial<Record<SupportedLanguage, Record<string, unknown>>> = {
  en: { about: { title: "About Tour Guide", subtitle: "Your travel guide to Banyuwangi", description: "Tour Guide was created for international travelers planning a holiday in Banyuwangi, with curated nature destinations, outdoor experiences, and contemporary local hangouts.", mission: "Our Mission", missionText: "To introduce Banyuwangi and its destinations to travelers around the world.", vision: "Our Vision", visionText: "To make Tour Guide a trusted travel website known internationally.", values: "Safety and Friendly Support", valuesText: "From arrival in Banyuwangi until the end of each trip, our friendly local companions help guests travel safely." }, staff: { title: "Our Expert Team", subtitle: "Meet the people behind Tour Guide" }, site: { about: { team: [["CEO & Founder", "Founded Tour Guide to introduce Banyuwangi to international travelers."], ["Development", "Builds and maintains the Tour Guide website."], ["Mentor", "Guides and supports the project team."]] } } },
  id: { about: { title: "Tentang Dolan Bareng Kang Pir", subtitle: "Pemandu wisata Anda di Banyuwangi", description: "Dolan Bareng Kang Pir dibuat untuk wisatawan mancanegara dan lokal yang ingin berlibur di Banyuwangi, dengan pilihan destinasi alam, pengalaman view ciamik, dan tempat nongkrong lokal yang trendi.", mission: "Misi Kami", missionText: "Mengenalkan Banyuwangi beserta destinasinya kepada wisatawan dari seluruh dunia.", vision: "Visi Kami", visionText: "Menjadikan Dolan Bareng Kang Pir sebagai situs wisata tepercaya yang dikenal hingga mancanegara.", values: "Keamanan dan Pendampingan Ramah", valuesText: "Sejak tiba di Banyuwangi hingga perjalanan selesai, teman-teman lokal kami yang ramah siap mendampingi dan membantu menjaga keamanan wisatawan." }, staff: { title: "Tim Ahli Kami", subtitle: "Kenali tim di balik Dolan Bareng Kang Pir" }, site: { about: { team: [["CEO & Founder", "Mendirikan Dolan Bareng Kang Pir untuk mengenalkan Banyuwangi kepada wisatawan mancanegara."], ["Pengembangan", "Membangun dan mengelola website Dolan Bareng Kang Pir."], ["Mentor", "Membimbing dan mendukung tim proyek."]] } } },
  "en-au": { about: { title: "About Tour Guide", subtitle: "Your travel guide to Banyuwangi", description: "Tour Guide was created for international travellers planning a holiday in Banyuwangi, with curated nature destinations, outdoor experiences and contemporary local hangouts.", mission: "Our Mission", missionText: "To introduce Banyuwangi and its destinations to travellers around the world.", vision: "Our Vision", visionText: "To make Tour Guide a trusted travel website known internationally.", values: "Safety and Friendly Support", valuesText: "From arrival in Banyuwangi until the end of each trip, our friendly local companions help guests travel safely." }, staff: { title: "Our Expert Team", subtitle: "Meet the people behind Tour Guide" }, site: { about: { team: [["CEO & Founder", "Founded Tour Guide to introduce Banyuwangi to international travellers."], ["Development", "Builds and maintains the Tour Guide website."], ["Mentor", "Guides and supports the project team."]] } } },
  de: { about: { title: "Über Tour Guide", subtitle: "Ihr Reiseführer für Banyuwangi", description: "Tour Guide wurde für internationale Gäste entwickelt, die einen Urlaub in Banyuwangi planen – mit ausgewählten Naturzielen, Outdoor-Erlebnissen und angesagten Treffpunkten vor Ort.", mission: "Unsere Mission", missionText: "Banyuwangi und seine Reiseziele Reisenden aus aller Welt näherzubringen.", vision: "Unsere Vision", visionText: "Tour Guide zu einer vertrauenswürdigen, international bekannten Reisewebsite zu machen.", values: "Sicherheit und persönliche Betreuung", valuesText: "Von der Ankunft in Banyuwangi bis zum Ende der Reise unterstützen unsere freundlichen lokalen Begleiter die Gäste und achten auf eine sichere Reise." }, staff: { title: "Unser Expertenteam", subtitle: "Lernen Sie das Team hinter Tour Guide kennen" }, site: { about: { team: [["CEO & Gründer", "Hat Tour Guide gegründet, um Banyuwangi internationalen Reisenden näherzubringen."], ["Entwicklung", "Entwickelt und betreut die Tour-Guide-Website."], ["Mentor", "Begleitet und unterstützt das Projektteam."]] } } },
  zh: { about: { title: "关于 Tour Guide", subtitle: "您的外南梦旅行指南", description: "Tour Guide 面向计划到外南梦度假的国际游客，精选自然景点、户外体验和当地热门休闲场所。", mission: "我们的使命", missionText: "向世界各地的游客介绍外南梦及其旅游目的地。", vision: "我们的愿景", visionText: "让 Tour Guide 成为值得信赖并享誉国际的旅游网站。", values: "安全与友善陪伴", valuesText: "从抵达外南梦到旅程结束，我们友善的当地伙伴将陪伴游客并协助保障旅途安全。" }, staff: { title: "我们的专业团队", subtitle: "认识 Tour Guide 背后的团队" }, site: { about: { team: [["首席执行官兼创始人", "创立 Tour Guide，向国际游客介绍外南梦。"], ["开发", "负责 Tour Guide 网站的开发与维护。"], ["导师", "指导并支持项目团队。"]] } } },
  ja: { about: { title: "Tour Guideについて", subtitle: "バニュワンギ旅行ガイド", description: "Tour Guideは、バニュワンギ旅行を計画する海外旅行者のために作られました。自然の名所、アウトドア体験、地元で人気のカフェやくつろぎスポットをご紹介します。", mission: "ミッション", missionText: "バニュワンギとその魅力的な観光地を世界中の旅行者に紹介します。", vision: "ビジョン", visionText: "Tour Guideを、世界で知られる信頼できる旅行サイトにします。", values: "安全と親しみやすいサポート", valuesText: "バニュワンギ到着から旅の終了まで、親切な地元スタッフが同行し、安全な旅行をサポートします。" }, staff: { title: "専門チーム", subtitle: "Tour Guideを支えるメンバーをご紹介します" }, site: { about: { team: [["CEO・創設者", "海外旅行者にバニュワンギを紹介するためTour Guideを設立。"], ["開発", "Tour Guideウェブサイトの開発と運営を担当。"], ["メンター", "プロジェクトチームを指導し、支援します。"]] } } },
  ko: { about: { title: "Tour Guide 소개", subtitle: "반유왕이 여행 가이드", description: "Tour Guide는 반유왕이 여행을 계획하는 해외 여행객을 위해 자연 명소, 야외 체험, 현지에서 인기 있는 감성 공간을 소개합니다.", mission: "미션", missionText: "반유왕이와 다양한 여행지를 전 세계 여행객에게 알립니다.", vision: "비전", visionText: "Tour Guide를 전 세계에서 신뢰받고 알려진 여행 웹사이트로 만듭니다.", values: "안전과 친절한 동행", valuesText: "반유왕이 도착부터 여행이 끝날 때까지 친절한 현지 동행자가 함께하며 안전한 여행을 돕습니다." }, staff: { title: "전문 팀 소개", subtitle: "Tour Guide를 만드는 사람들을 만나보세요" }, site: { about: { team: [["CEO 겸 창립자", "해외 여행객에게 반유왕이를 알리기 위해 Tour Guide를 설립했습니다."], ["개발", "Tour Guide 웹사이트를 개발하고 관리합니다."], ["멘토", "프로젝트 팀을 지도하고 지원합니다."]] } } },
  fr: { about: { title: "À propos de Tour Guide", subtitle: "Votre guide de voyage à Banyuwangi", description: "Tour Guide accompagne les voyageurs internationaux qui préparent un séjour à Banyuwangi : sites naturels, activités de plein air et lieux de détente locaux très appréciés.", mission: "Notre mission", missionText: "Faire découvrir Banyuwangi et ses destinations aux voyageurs du monde entier.", vision: "Notre vision", visionText: "Faire de Tour Guide un site de voyage fiable et connu à l’international.", values: "Sécurité et accompagnement convivial", valuesText: "De leur arrivée à Banyuwangi jusqu’à la fin du séjour, nos accompagnateurs locaux accueillants aident les visiteurs à voyager en toute sécurité." }, staff: { title: "Notre équipe d’experts", subtitle: "Découvrez l’équipe de Tour Guide" }, site: { about: { team: [["PDG et fondateur", "A fondé Tour Guide pour faire découvrir Banyuwangi aux voyageurs internationaux."], ["Développement", "Développe et maintient le site Tour Guide."], ["Mentor", "Guide et soutient l’équipe du projet."]] } } },
  nl: { about: { title: "Over Tour Guide", subtitle: "Jouw reisgids voor Banyuwangi", description: "Tour Guide is gemaakt voor internationale reizigers die een vakantie in Banyuwangi plannen, met geselecteerde natuurgebieden, buitenactiviteiten en populaire lokale ontmoetingsplekken.", mission: "Onze missie", missionText: "Banyuwangi en de bestemmingen onder de aandacht brengen van reizigers wereldwijd.", vision: "Onze visie", visionText: "Tour Guide laten uitgroeien tot een betrouwbare reissite met internationale bekendheid.", values: "Veiligheid en vriendelijke begeleiding", valuesText: "Vanaf aankomst in Banyuwangi tot het einde van de reis helpen onze vriendelijke lokale begeleiders bezoekers veilig op pad." }, staff: { title: "Ons deskundige team", subtitle: "Maak kennis met de mensen achter Tour Guide" }, site: { about: { team: [["CEO en oprichter", "Richtte Tour Guide op om Banyuwangi bij internationale reizigers bekend te maken."], ["Ontwikkeling", "Bouwt en onderhoudt de Tour Guide-website."], ["Mentor", "Begeleidt en ondersteunt het projectteam."]] } } },
  ru: { about: { title: "О Tour Guide", subtitle: "Ваш путеводитель по Баньюванги", description: "Tour Guide создан для иностранных туристов, планирующих отдых в Баньюванги: здесь собраны природные достопримечательности, активный отдых и популярные местные места для встреч.", mission: "Наша миссия", missionText: "Знакомить путешественников со всего мира с Баньюванги и его направлениями.", vision: "Наше видение", visionText: "Сделать Tour Guide надежным туристическим сайтом, известным во всем мире.", values: "Безопасность и дружелюбное сопровождение", valuesText: "От прибытия в Баньюванги до конца поездки наши дружелюбные местные сопровождающие помогают туристам путешествовать безопасно." }, staff: { title: "Наша команда экспертов", subtitle: "Познакомьтесь с командой Tour Guide" }, site: { about: { team: [["CEO и основатель", "Создал Tour Guide, чтобы знакомить иностранных туристов с Баньюванги."], ["Разработка", "Разрабатывает и поддерживает сайт Tour Guide."], ["Наставник", "Направляет и поддерживает команду проекта."]] } } },
}

const defaultSite = {
  site: {
    home: { kicker: "Discover the beauty of East Java", title: "Explore Banyuwangi", description: "Discover breathtaking landscapes, tropical beaches, beautiful forests, and unforgettable adventures in Banyuwangi, Indonesia.", explore: "Explore Destinations", aboutKicker: "About Banyuwangi", aboutTitle: "Experience the Wonders of Banyuwangi", aboutDescription: "From Ijen Crater's spectacular blue fire to the peaceful Djawatan Forest and the clear waters of Bangsring Beach, Banyuwangi offers extraordinary experiences for every traveler." },
    destinations: { kicker: "Explore Indonesia", title: "Featured Destinations", description: "Discover beautiful destinations and unforgettable experiences in Banyuwangi, East Java.", explore: "Explore", viewAll: "View All Destinations", ijen: "Discover the rare blue fire and breathtaking turquoise crater lake.", djawatan: "Explore a magical forest surrounded by giant trembesi trees.", bangsring: "Enjoy pristine beaches, crystal-clear waters, and marine activities.", teluk: "Discover a hidden paradise in Meru Betiri National Park." },
    detail: { about: "About This Destination", itinerary: "Tour Itinerary", included: "What's Included", maxPeople: "Max {count} people", maxPeopleLabel: "Max People", startingPrice: "Starting price", perPerson: "Per person", duration: "Duration", rating: "Rating", location: "Location", contact: "Contact Us", back: "Back to Destinations", notFound: "Destination Not Found", notFoundDescription: "The destination you are looking for is unavailable.", backHome: "Back to Home" },
    footer: { destinations: "Destinations", company: "Company", support: "Support", about: "About Us", careers: "Careers", press: "Press", blog: "Blog", partners: "Partners", help: "Help Center", contact: "Contact Us", privacy: "Privacy Policy", terms: "Terms of Service", cancellation: "Cancellation Policy", copyright: "All rights reserved." },
    about: { stats: ["Happy Travelers", "Tours", "Years Experience", "Expert Guides"], team: [["Founder & CEO", "15 years of experience in the tourism industry"], ["Operations Manager", "Cultural tours specialist"], ["Mountain Tours Expert", "Mountaineering instructor and guide"]], whyTitle: "Why Choose Us?", features: [["Quality", "High quality service"], ["Experience", "More than 8 years of experience"], ["Languages", "Multilingual guides"], ["Care", "Personal approach"]] },
  },
}

function merge(base: Record<string, any>, override: Record<string, unknown>) {
  const result: Record<string, any> = { ...base }
  for (const [key, value] of Object.entries(override)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key] = merge((base[key] ?? {}) as Record<string, any>, value as Record<string, unknown>)
    } else {
      result[key] = value
    }
  }
  return result
}

export async function getDictionary(locale: SupportedLanguage) {
  const base = locale === "ka" ? georgian : locale === "ru" ? russian : english
  const regionalEnglish = locale === "en-au"
    ? { ...english, nav: { ...english.nav, tours: "Tours" } }
    : base
  const merged = merge(
    merge(merge(regionalEnglish as Record<string, any>, defaultSite), translations[locale] ?? {}),
    pageTranslations[locale] ?? {},
  )
  const withAboutCopy = merge(
    merge(merged as Record<string, any>, aboutPageTranslations[locale] ?? {}),
    aboutBrandTranslations[locale] ?? aboutBrandTranslations.en!,
  )
  const navLabels: Record<string, string> = {
    id: "Destinasi Lain", en: "Other Destinations", "en-au": "Other Destinations",
    de: "Weitere Ziele", zh: "更多目的地", ja: "その他の目的地", ko: "다른 여행지",
    fr: "Autres destinations", nl: "Andere bestemmingen", ru: "Другие направления", ka: "Other Destinations",
  }
  const footerDescriptions: Record<string, string> = {
    id: "Dolan Bareng Kang Pir membantu wisatawan menjelajahi alam, budaya, dan pengalaman lokal Banyuwangi.",
    en: "Dolan Bareng Kang Pir helps international visitors discover Banyuwangi's nature, culture and local experiences.",
    "en-au": "Dolan Bareng Kang Pir helps international travellers discover Banyuwangi's nature, culture and local experiences.",
    de: "Dolan Bareng Kang Pir hilft internationalen Gästen, Natur, Kultur und lokale Erlebnisse in Banyuwangi zu entdecken.",
    zh: "Dolan Bareng Kang Pir 帮助国际游客探索外南梦的自然风光、文化与当地体验。",
    ja: "Dolan Bareng Kang Pirは、海外旅行者にバニュワンギの自然、文化、地域の体験をご紹介します。",
    ko: "Dolan Bareng Kang Pir는 해외 여행객에게 반유왕이의 자연, 문화와 현지 경험을 소개합니다.",
    fr: "Dolan Bareng Kang Pir aide les visiteurs internationaux à découvrir la nature, la culture et les expériences locales de Banyuwangi.",
    nl: "Dolan Bareng Kang Pir helpt internationale reizigers de natuur, cultuur en lokale ervaringen van Banyuwangi te ontdekken.",
    ru: "Dolan Bareng Kang Pir помогает иностранным гостям открыть природу, культуру и местные впечатления Баньюванги.",
    ka: "Dolan Bareng Kang Pir helps international visitors discover Banyuwangi's nature, culture and local experiences.",
  }
  return merge(withAboutCopy, {
    nav: { tours: navLabels[locale] ?? navLabels.en },
    footer: { brandName: "Dolan Bareng Kang Pir", description: footerDescriptions[locale] ?? footerDescriptions.en },
  })
}
