import "server-only"

import english from "./dictionaries/en.json"
import georgian from "./dictionaries/ka.json"
import russian from "./dictionaries/ru.json"

export const supportedLanguages = [
  "id", "en", "en-au", "de", "zh", "ja", "ko", "fr", "nl", "ru", "ka",
] as const

export type SupportedLanguage = (typeof supportedLanguages)[number]

export function isSupportedLanguage(locale: string): locale is SupportedLanguage {
  return supportedLanguages.includes(locale as SupportedLanguage)
}

const translations: Partial<Record<SupportedLanguage, Record<string, unknown>>> = {
  id: {
    nav: { home: "Beranda", tours: "Tur Ekstrem", about: "Tentang", contact: "Kontak" },
    hero: { title: "Petualangan Ekstrem di Georgia", subtitle: "Jelajahi alam liar Georgia dengan tur jip, trekking ekstrem, dan petualangan penuh adrenalin", cta: "Jelajahi Petualangan" },
    tours: { title: "Tur Ekstrem", subtitle: "Pilih petualangan yang sesuai untuk Anda", viewDetails: "Lihat Detail", duration: "Durasi", price: "Harga", from: "mulai dari", allTours: "Semua Tur", filterBy: "Filter", all: "Semua", jeep: "Tur Jip", hiking: "Trekking Ekstrem", climbing: "Panjat Tebing", rafting: "Arung Jeram", winter: "Olahraga Musim Dingin", bookNow: "Pesan Sekarang", difficulty: "Tingkat Kesulitan", beginner: "Pemula", intermediate: "Menengah", advanced: "Lanjutan", expert: "Ahli" },
    testimonials: { title: "Ulasan Wisatawan", subtitle: "Pengalaman para pencinta petualangan" },
    staff: { title: "Tim Pemandu Kami", subtitle: "Kenali instruktur tur berpengalaman kami" },
    about: { title: "Tentang Kami", subtitle: "Georgia Extreme Tours", description: "Kami menawarkan pengalaman petualangan unik dan tur alam sejak 2018.", mission: "Misi Kami", missionText: "Menghadirkan petualangan seru dengan mengutamakan keselamatan.", vision: "Visi Kami", visionText: "Menjadi penyedia petualangan alam terkemuka.", values: "Nilai Kami", valuesText: "Keselamatan, profesionalisme, dan kepedulian terhadap alam." },
    contact: { title: "Hubungi Kami", phone: "Telepon", email: "Email", address: "Alamat", workingHours: "Jam Operasional", form: { name: "Nama", email: "Email", subject: "Subjek", message: "Pesan", send: "Kirim Pesan", sending: "Mengirim...", success: "Pesan berhasil dikirim!", error: "Terjadi kesalahan. Silakan coba lagi." }, info: { getInTouch: "Hubungi Kami", description: "Siap untuk petualangan? Hubungi kami untuk merencanakannya.", officeHours: "Jam Kantor", mondayFriday: "Senin–Jumat: 08.00–20.00", saturday: "Sabtu: 09.00–18.00", sunday: "Minggu: 10.00–16.00" } },
    footer: { description: "Georgia Extreme Tours — petualangan alam penuh adrenalin", quickLinks: "Tautan Cepat", followUs: "Ikuti Kami", rights: "Hak cipta dilindungi" },
  },
  de: {
    nav: { home: "Startseite", tours: "Abenteuertouren", about: "Über uns", contact: "Kontakt" },
    hero: { title: "Abenteuer in Georgien", subtitle: "Entdecken Sie Georgiens wilde Natur bei Jeep-Touren, Trekking und aufregenden Abenteuern", cta: "Abenteuer entdecken" },
    tours: { title: "Abenteuertouren", subtitle: "Finden Sie das passende Abenteuer", viewDetails: "Details ansehen", duration: "Dauer", price: "Preis", from: "ab", allTours: "Alle Touren", filterBy: "Filtern nach", all: "Alle", jeep: "Jeep-Touren", hiking: "Trekking", climbing: "Klettern", rafting: "Rafting", winter: "Wintersport", bookNow: "Jetzt buchen", difficulty: "Schwierigkeit", beginner: "Anfänger", intermediate: "Mittel", advanced: "Fortgeschritten", expert: "Experten" },
    testimonials: { title: "Bewertungen von Abenteurern", subtitle: "Erfahrungen unserer Reisenden" },
    staff: { title: "Unser Team", subtitle: "Lernen Sie unsere erfahrenen Guides kennen" },
    about: { title: "Über uns", subtitle: "Georgia Extreme Tours", description: "Seit 2018 bieten wir einzigartige Abenteuer und Naturtouren an.", mission: "Unsere Mission", missionText: "Wir schaffen spannende Abenteuer mit Sicherheit an erster Stelle.", vision: "Unsere Vision", visionText: "Georgiens führender Anbieter für Naturabenteuer zu werden.", values: "Unsere Werte", valuesText: "Sicherheit, Professionalität und Respekt vor der Natur." },
    contact: { title: "Kontakt", phone: "Telefon", email: "E-Mail", address: "Adresse", workingHours: "Öffnungszeiten", form: { name: "Name", email: "E-Mail", subject: "Betreff", message: "Nachricht", send: "Nachricht senden", sending: "Wird gesendet...", success: "Nachricht erfolgreich gesendet!", error: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut." }, info: { getInTouch: "Kontaktieren Sie uns", description: "Bereit für ein Abenteuer? Kontaktieren Sie uns zur Planung.", officeHours: "Bürozeiten", mondayFriday: "Montag–Freitag: 08:00–20:00", saturday: "Samstag: 09:00–18:00", sunday: "Sonntag: 10:00–16:00" } },
    footer: { description: "Georgia Extreme Tours — Abenteuer in Georgiens wilder Natur", quickLinks: "Direktlinks", followUs: "Folgen Sie uns", rights: "Alle Rechte vorbehalten" },
  },
  zh: {
    nav: { home: "首页", tours: "探险之旅", about: "关于我们", contact: "联系方式" },
    hero: { title: "格鲁吉亚探险之旅", subtitle: "乘坐吉普车、徒步探索格鲁吉亚的壮丽自然风光", cta: "探索旅程" },
    tours: { title: "探险之旅", subtitle: "选择适合您的冒险体验", viewDetails: "查看详情", duration: "时长", price: "价格", from: "起价", allTours: "所有行程", filterBy: "筛选", all: "全部", jeep: "吉普车之旅", hiking: "徒步旅行", climbing: "攀岩", rafting: "漂流", winter: "冬季运动", bookNow: "立即预订", difficulty: "难度", beginner: "初级", intermediate: "中级", advanced: "高级", expert: "专家级" },
    testimonials: { title: "游客评价", subtitle: "旅行者分享的冒险体验" },
    staff: { title: "我们的团队", subtitle: "认识经验丰富的向导" },
    about: { title: "关于我们", subtitle: "Georgia Extreme Tours", description: "自2018年以来，我们一直提供独特的自然探险体验。", mission: "我们的使命", missionText: "在确保安全的同时创造精彩的探险体验。", vision: "我们的愿景", visionText: "成为格鲁吉亚领先的户外探险团队。", values: "我们的价值观", valuesText: "安全、专业以及尊重自然。" },
    contact: { title: "联系我们", phone: "电话", email: "邮箱", address: "地址", workingHours: "营业时间", form: { name: "姓名", email: "邮箱", subject: "主题", message: "留言", send: "发送留言", sending: "发送中…", success: "留言已发送！", error: "发生错误，请重试。" }, info: { getInTouch: "联系我们", description: "准备好开启探险了吗？请联系我们。", officeHours: "办公时间", mondayFriday: "周一至周五：08:00–20:00", saturday: "周六：09:00–18:00", sunday: "周日：10:00–16:00" } },
    footer: { description: "Georgia Extreme Tours — 探索格鲁吉亚的自然风光", quickLinks: "快速链接", followUs: "关注我们", rights: "版权所有" },
  },
  ja: {
    nav: { home: "ホーム", tours: "アドベンチャーツアー", about: "会社概要", contact: "お問い合わせ" },
    hero: { title: "ジョージアの大自然を冒険", subtitle: "ジープツアーやトレッキングでジョージアの自然を満喫しましょう", cta: "ツアーを見る" },
    tours: { title: "アドベンチャーツアー", subtitle: "あなたにぴったりの冒険を見つけましょう", viewDetails: "詳細を見る", duration: "所要時間", price: "料金", from: "〜から", allTours: "すべてのツアー", filterBy: "絞り込み", all: "すべて", jeep: "ジープツアー", hiking: "トレッキング", climbing: "ロッククライミング", rafting: "ラフティング", winter: "ウィンタースポーツ", bookNow: "予約する", difficulty: "難易度", beginner: "初級", intermediate: "中級", advanced: "上級", expert: "エキスパート" },
    testimonials: { title: "旅行者の声", subtitle: "冒険を楽しんだ方々の感想" },
    staff: { title: "ガイドチーム", subtitle: "経験豊富なガイドをご紹介します" },
    about: { title: "会社概要", subtitle: "Georgia Extreme Tours", description: "2018年から特別な自然体験ツアーを提供しています。", mission: "ミッション", missionText: "安全を第一に、心に残る冒険をお届けします。", vision: "ビジョン", visionText: "ジョージアを代表する自然ツアー会社を目指します。", values: "大切にしていること", valuesText: "安全、プロ意識、自然への敬意。" },
    contact: { title: "お問い合わせ", phone: "電話", email: "メール", address: "住所", workingHours: "営業時間", form: { name: "お名前", email: "メールアドレス", subject: "件名", message: "メッセージ", send: "送信する", sending: "送信中…", success: "送信しました！", error: "エラーが発生しました。もう一度お試しください。" }, info: { getInTouch: "お問い合わせ", description: "冒険の計画についてお気軽にご相談ください。", officeHours: "営業時間", mondayFriday: "月〜金 08:00〜20:00", saturday: "土 09:00〜18:00", sunday: "日 10:00〜16:00" } },
    footer: { description: "Georgia Extreme Tours — ジョージアの自然を冒険", quickLinks: "リンク", followUs: "フォローする", rights: "無断転載を禁じます" },
  },
  ko: {
    nav: { home: "홈", tours: "모험 투어", about: "소개", contact: "문의" },
    hero: { title: "조지아 대자연 어드벤처", subtitle: "지프 투어와 트레킹으로 조지아의 아름다운 자연을 만나보세요", cta: "모험 둘러보기" },
    tours: { title: "모험 투어", subtitle: "나에게 맞는 특별한 여행을 찾아보세요", viewDetails: "자세히 보기", duration: "기간", price: "가격", from: "부터", allTours: "전체 투어", filterBy: "필터", all: "전체", jeep: "지프 투어", hiking: "트레킹", climbing: "암벽 등반", rafting: "래프팅", winter: "겨울 스포츠", bookNow: "예약하기", difficulty: "난이도", beginner: "초급", intermediate: "중급", advanced: "고급", expert: "전문가" },
    testimonials: { title: "여행자 후기", subtitle: "모험을 즐긴 여행자들의 이야기" },
    staff: { title: "가이드 팀", subtitle: "경험 많은 가이드를 만나보세요" },
    about: { title: "소개", subtitle: "Georgia Extreme Tours", description: "2018년부터 특별한 자연 모험 여행을 제공하고 있습니다.", mission: "미션", missionText: "안전을 최우선으로 잊지 못할 모험을 만듭니다.", vision: "비전", visionText: "조지아 최고의 자연 모험 여행사가 되겠습니다.", values: "핵심 가치", valuesText: "안전, 전문성, 자연 존중." },
    contact: { title: "문의하기", phone: "전화", email: "이메일", address: "주소", workingHours: "운영 시간", form: { name: "이름", email: "이메일", subject: "제목", message: "메시지", send: "메시지 보내기", sending: "전송 중…", success: "메시지를 보냈습니다!", error: "오류가 발생했습니다. 다시 시도해 주세요." }, info: { getInTouch: "문의하기", description: "모험을 계획하고 계신가요? 편하게 문의해 주세요.", officeHours: "운영 시간", mondayFriday: "월–금 08:00–20:00", saturday: "토요일 09:00–18:00", sunday: "일요일 10:00–16:00" } },
    footer: { description: "Georgia Extreme Tours — 조지아의 자연 속 모험", quickLinks: "바로가기", followUs: "팔로우", rights: "모든 권리 보유" },
  },
  fr: {
    nav: { home: "Accueil", tours: "Circuits aventure", about: "À propos", contact: "Contact" },
    hero: { title: "Aventures en Géorgie", subtitle: "Explorez la nature sauvage de la Géorgie en jeep ou en randonnée", cta: "Découvrir les aventures" },
    tours: { title: "Circuits aventure", subtitle: "Choisissez l’aventure qui vous correspond", viewDetails: "Voir les détails", duration: "Durée", price: "Prix", from: "à partir de", allTours: "Tous les circuits", filterBy: "Filtrer par", all: "Tout", jeep: "Circuits en jeep", hiking: "Randonnée", climbing: "Escalade", rafting: "Rafting", winter: "Sports d’hiver", bookNow: "Réserver", difficulty: "Difficulté", beginner: "Débutant", intermediate: "Intermédiaire", advanced: "Avancé", expert: "Expert" },
    testimonials: { title: "Avis des voyageurs", subtitle: "Leurs expériences d’aventure" },
    staff: { title: "Notre équipe", subtitle: "Rencontrez nos guides expérimentés" },
    about: { title: "À propos", subtitle: "Georgia Extreme Tours", description: "Depuis 2018, nous proposons des expériences uniques au cœur de la nature.", mission: "Notre mission", missionText: "Créer des aventures mémorables en privilégiant la sécurité.", vision: "Notre vision", visionText: "Devenir la référence des aventures en plein air en Géorgie.", values: "Nos valeurs", valuesText: "Sécurité, professionnalisme et respect de la nature." },
    contact: { title: "Contactez-nous", phone: "Téléphone", email: "E-mail", address: "Adresse", workingHours: "Horaires", form: { name: "Nom", email: "E-mail", subject: "Sujet", message: "Message", send: "Envoyer le message", sending: "Envoi…", success: "Message envoyé !", error: "Une erreur s’est produite. Veuillez réessayer." }, info: { getInTouch: "Nous contacter", description: "Prêt pour l’aventure ? Contactez-nous pour la préparer.", officeHours: "Horaires du bureau", mondayFriday: "Lundi–vendredi : 08 h–20 h", saturday: "Samedi : 09 h–18 h", sunday: "Dimanche : 10 h–16 h" } },
    footer: { description: "Georgia Extreme Tours — aventures au cœur de la nature géorgienne", quickLinks: "Liens rapides", followUs: "Suivez-nous", rights: "Tous droits réservés" },
  },
  nl: {
    nav: { home: "Home", tours: "Avontuurlijke tours", about: "Over ons", contact: "Contact" },
    hero: { title: "Avontuur in Georgië", subtitle: "Ontdek de ruige natuur van Georgië met jeeptours en trektochten", cta: "Ontdek avonturen" },
    tours: { title: "Avontuurlijke tours", subtitle: "Kies het avontuur dat bij je past", viewDetails: "Bekijk details", duration: "Duur", price: "Prijs", from: "vanaf", allTours: "Alle tours", filterBy: "Filter op", all: "Alles", jeep: "Jeeptours", hiking: "Trekking", climbing: "Klimmen", rafting: "Raften", winter: "Wintersport", bookNow: "Boek nu", difficulty: "Moeilijkheid", beginner: "Beginner", intermediate: "Gemiddeld", advanced: "Gevorderd", expert: "Expert" },
    testimonials: { title: "Ervaringen van reizigers", subtitle: "Verhalen van avonturiers" },
    staff: { title: "Ons team", subtitle: "Maak kennis met onze ervaren gidsen" },
    about: { title: "Over ons", subtitle: "Georgia Extreme Tours", description: "Sinds 2018 bieden we unieke avonturen en natuurervaringen.", mission: "Onze missie", missionText: "Onvergetelijke avonturen bieden met veiligheid voorop.", vision: "Onze visie", visionText: "De toonaangevende aanbieder van natuuravonturen in Georgië worden.", values: "Onze waarden", valuesText: "Veiligheid, vakmanschap en respect voor de natuur." },
    contact: { title: "Contact", phone: "Telefoon", email: "E-mail", address: "Adres", workingHours: "Openingstijden", form: { name: "Naam", email: "E-mail", subject: "Onderwerp", message: "Bericht", send: "Bericht versturen", sending: "Verzenden…", success: "Bericht verzonden!", error: "Er is iets misgegaan. Probeer het opnieuw." }, info: { getInTouch: "Neem contact op", description: "Klaar voor avontuur? Neem contact met ons op om het te plannen.", officeHours: "Kantooruren", mondayFriday: "Maandag–vrijdag: 08.00–20.00", saturday: "Zaterdag: 09.00–18.00", sunday: "Zondag: 10.00–16.00" } },
    footer: { description: "Georgia Extreme Tours — avontuur in de wilde natuur van Georgië", quickLinks: "Snelle links", followUs: "Volg ons", rights: "Alle rechten voorbehouden" },
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
  return merge(regionalEnglish as Record<string, any>, translations[locale] ?? {})
}
