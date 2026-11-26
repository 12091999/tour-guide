import { BedDouble, ExternalLink, MapPin, MessageCircle, Utensils } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { SupportedLanguage } from "@/app/[lang]/dictionaries"
import { formatPrice, getDayTourLabel } from "@/lib/currency"
import { getWhatsAppUrl } from "@/lib/whatsapp"
import { AvailabilityBooking } from "@/components/availability-booking"
import { Button } from "@/components/ui/button"

type Copy = {
  eyebrow: string; title: string; intro: string; ticket: string; stay: string
  dining: string; notice: string; verify: string; whatsapp: string
  descriptions: string[]; stayNotes: string[]; diningNotes: string[]
}

const copy: Record<string, Copy> = {
  en: {
    eyebrow: "More to explore", title: "Nature escapes beyond our featured four",
    intro: "Discover more of East Java's coast, rainforest, savanna and waterfalls. The displayed tour rate is for one day; entrance tickets, transport, accommodation and meals are separate.",
    ticket: "Entrance fee per person", stay: "Stay nearby", dining: "Eat nearby",
    notice: "Rates and availability can change. Confirm directly before travelling.", verify: "Check official information", whatsapp: "Book or ask via WhatsApp",
    descriptions: [
      "A south-coast beach known for its red offshore hill, surf breaks and beautiful sunsets. A relaxed day out for beach lovers and beginner surfers.",
      "Explore Bekol savanna, dry forest, wildlife and Bama Beach in this national park. Baluran is in neighbouring Situbondo, on the route between Banyuwangi and Surabaya.",
      "A vast lowland rainforest reserve with Sadengan savanna, ancient forest, secluded beaches and the famous G-Land surf break.",
      "A refreshing stop near Glagah with three waterfalls, clear pools and forest scenery, close to the Ijen highlands.",
    ],
    stayNotes: ["The Wisma Pulau Merah is a beachside homestay; room listings start around IDR 300,000 per night. Confirm current rates.", "RedDoorz near Baluran National Park or Grand Baluran Villa in Wonorejo are practical bases near the park entrance.", "Jawa Jiwa G-Land offers glamping, bungalows and apartments in the Alas Purwo area. Book and confirm access in advance.", "Herry's Guesthouse and Lintang Luku Tent Resort are options around Glagah and Licin, near Jagir and Ijen."],
    diningNotes: ["Wisma Bar & Restaurant serves Indonesian and Javanese dishes, with Western, Chinese and Japanese options too.", "RM Valentine in Wongsorejo is a convenient Indonesian-food stop; Warung Asri is another option near the park entrance.", "Jawa Jiwa G-Land is the closest resort dining option. Confirm meal arrangements before entering the park.", "The Osing Bamboo Restaurant serves Indonesian food and seafood. Small local warungs also operate around the waterfall village."],
  },
  id: {
    eyebrow: "Destinasi lainnya", title: "Wisata alam selain empat pilihan unggulan",
    intro: "Jelajahi pesisir, hutan, savana, dan air terjun di Jawa Timur. Tarif tur yang ditampilkan berlaku untuk satu hari; tiket masuk, transportasi, penginapan, dan makan terpisah.",
    ticket: "Tiket masuk per orang", stay: "Penginapan sekitar", dining: "Tempat makan sekitar",
    notice: "Tarif dan ketersediaan dapat berubah. Konfirmasikan langsung sebelum bepergian.", verify: "Cek informasi resmi", whatsapp: "Pesan / tanya via WhatsApp",
    descriptions: ["Pantai di pesisir selatan dengan bukit kecil kemerahan, ombak untuk berselancar, dan pemandangan matahari terbenam.", "Jelajahi Savana Bekol, hutan kering, satwa liar, dan Pantai Bama. Baluran berada di Situbondo, dekat jalur Banyuwangi.", "Kawasan hutan hujan dengan Savana Sadengan, hutan alami, pantai terpencil, dan ombak selancar G-Land.", "Wisata alam dekat Glagah dengan tiga air terjun, kolam jernih, dan suasana hutan di kaki kawasan Ijen.", "Teluk tersembunyi di kawasan Meru Betiri dengan air hijau jernih, pantai alami, dan perjalanan eksklusif ke pesisir selatan."],
    stayNotes: ["The Wisma Pulau Merah adalah homestay dekat pantai; harga kamar yang tercantum mulai sekitar Rp300.000 per malam. Konfirmasikan tarif terbaru.", "RedDoorz near Baluran National Park atau Grand Baluran Villa di Wonorejo dekat dengan pintu masuk taman nasional.", "Jawa Jiwa G-Land menyediakan glamping, bungalow, dan apartemen di kawasan Alas Purwo. Pesan dan konfirmasikan akses lebih awal.", "Herry's Guesthouse dan Lintang Luku Tent Resort berada di sekitar Glagah dan Licin, dekat Jagir dan Ijen."],
    diningNotes: ["Wisma Bar & Restaurant menyajikan hidangan Indonesia dan Jawa, serta menu Barat, Tiongkok, dan Jepang.", "RM Valentine di Wongsorejo cocok untuk singgah makan; Warung Asri juga dekat pintu masuk taman nasional.", "Jawa Jiwa G-Land adalah pilihan makan terdekat di area resort. Konfirmasikan pengaturan makan sebelum masuk taman.", "The Osing Bamboo Restaurant menyajikan makanan Indonesia dan seafood. Ada juga warung lokal di sekitar desa air terjun."],
  },
  de: {
    eyebrow: "Weitere Ausflugsziele", title: "Naturziele neben unseren vier Highlights",
    intro: "Entdecken Sie Küste, Regenwald, Savanne und Wasserfälle in Ostjava. Der angezeigte Tourpreis gilt für einen Tag; Eintritt, Transport, Unterkunft und Mahlzeiten sind separat.",
    ticket: "Eintritt pro Person", stay: "Unterkunft in der Nähe", dining: "Essen in der Nähe", notice: "Preise und Verfügbarkeit können sich ändern. Bitte vor der Reise bestätigen.", verify: "Offizielle Infos ansehen", whatsapp: "Per WhatsApp buchen oder fragen",
    descriptions: ["Ein Strand an der Südküste mit rötlichem Hügel im Meer, Surfspots und schönen Sonnenuntergängen.", "Entdecken Sie die Savanne Bekol, Trockenwald, Wildtiere und den Strand Bama. Baluran liegt im benachbarten Situbondo.", "Ein großes Tieflandregenwaldgebiet mit Savanne Sadengan, ursprünglichem Wald, abgelegenen Stränden und dem Surfspot G-Land.", "Ein Naturziel bei Glagah mit drei Wasserfällen, klaren Becken und Waldlandschaft nahe dem Ijen-Hochland."],
    stayNotes: ["The Wisma Pulau Merah ist ein strandnahes Homestay; Zimmer werden ab etwa IDR 300.000 pro Nacht angeboten. Aktuelle Preise bestätigen.", "RedDoorz near Baluran National Park oder Grand Baluran Villa in Wonorejo liegen nahe am Parkeingang.", "Jawa Jiwa G-Land bietet Glamping, Bungalows und Apartments im Gebiet von Alas Purwo. Zugang und Aufenthalt vorab bestätigen.", "Herry's Guesthouse und Lintang Luku Tent Resort liegen im Raum Glagah und Licin, nahe Jagir und Ijen."],
    diningNotes: ["Wisma Bar & Restaurant serviert indonesische und javanische Küche sowie westliche, chinesische und japanische Gerichte.", "RM Valentine in Wongsorejo ist ein praktischer Halt; Warung Asri liegt ebenfalls nahe dem Parkeingang.", "Jawa Jiwa G-Land ist die nächstgelegene Restaurantoption. Mahlzeiten vor dem Parkbesuch absprechen.", "The Osing Bamboo Restaurant bietet indonesische Küche und Meeresfrüchte; im Dorf gibt es kleine Warungs."],
  },
  zh: {
    eyebrow: "更多目的地", title: "四大精选景点之外的自然之旅",
    intro: "探索东爪哇的海岸、雨林、草原和瀑布。页面所示为一日游价格；景区门票、交通、住宿和餐饮另计。",
    ticket: "每人门票", stay: "附近住宿", dining: "附近餐饮", notice: "价格和空房情况可能变化，请出行前直接确认。", verify: "查看官方信息", whatsapp: "通过 WhatsApp 预订或咨询",
    descriptions: ["南部海岸的海滩，以海中红色小丘、冲浪点和日落景色闻名。", "游览贝科尔草原、旱林、野生动物和巴马海滩。巴鲁兰位于邻近的西图邦多。", "广阔的低地雨林保护区，拥有萨登甘草原、原始森林、僻静海滩和著名冲浪点G-Land。", "格拉加附近的自然景点，拥有三处瀑布、清澈水潭和森林景观，靠近伊真高地。"],
    stayNotes: ["The Wisma Pulau Merah是海边民宿，房价约从每晚印尼盾300,000起，请确认当前价格。", "Wonorejo的RedDoorz near Baluran National Park或Grand Baluran Villa靠近公园入口。", "Jawa Jiwa G-Land在Alas Purwo区域提供豪华露营、平房和公寓，请提前预订并确认入园安排。", "Herry's Guesthouse和Lintang Luku Tent Resort位于Glagah及Licin附近，方便前往Jagir和Ijen。"],
    diningNotes: ["Wisma Bar & Restaurant供应印尼和爪哇菜，也提供西餐、中餐和日餐。", "Wongsorejo的RM Valentine适合沿途用餐；公园入口附近还有Warung Asri。", "Jawa Jiwa G-Land是附近的度假村餐饮选择，请提前确认用餐安排。", "The Osing Bamboo Restaurant供应印尼菜和海鲜；瀑布村附近也有当地小餐馆。"],
  },
  ja: {
    eyebrow: "ほかのおすすめ", title: "人気の4か所以外の自然スポット",
    intro: "東ジャワの海岸、熱帯林、サバンナ、滝を巡りましょう。表示料金は1日ツアーの料金です。入場料、交通、宿泊、食事は別料金です。",
    ticket: "入場料（1名）", stay: "近くの宿泊先", dining: "近くの食事処", notice: "料金や空室状況は変わる場合があります。出発前にご確認ください。", verify: "公式情報を見る", whatsapp: "WhatsAppで予約・問い合わせ",
    descriptions: ["赤みがかった小島、サーフスポット、美しい夕日で知られる南海岸のビーチです。", "ベコル・サバンナ、乾燥林、野生動物、バマビーチを楽しめます。バルランは隣のシトゥボンド県にあります。", "サデンガン・サバンナ、原生林、静かな海岸、サーフスポットG-Landを擁する広大な熱帯林です。", "グラガ地区近くにある三つの滝と澄んだ滝つぼ、森の景色を楽しめる自然スポットです。"],
    stayNotes: ["The Wisma Pulau Merahはビーチ近くのホームステイです。客室料金は1泊約300,000ルピアから。最新料金をご確認ください。", "WonorejoのRedDoorz near Baluran National ParkまたはGrand Baluran Villaは公園入口に近く便利です。", "Jawa Jiwa G-LandはAlas Purwoエリアでグランピング、バンガロー、アパートを提供しています。事前予約がおすすめです。", "Herry's GuesthouseとLintang Luku Tent ResortはGlagah・Licin周辺にあり、JagirやIjenへのアクセスに便利です。"],
    diningNotes: ["Wisma Bar & Restaurantではインドネシア料理、ジャワ料理、西洋・中華・日本料理を楽しめます。", "WongsorejoのRM Valentineはインドネシア料理の立ち寄り先に便利です。Warung Asriも公園入口の近くにあります。", "Jawa Jiwa G-Landは近隣のリゾート食事処です。園内に入る前に食事プランをご確認ください。", "The Osing Bamboo Restaurantではインドネシア料理とシーフードを提供。滝の村には小さな食堂もあります。"],
  },
  ko: {
    eyebrow: "더 많은 여행지", title: "대표 명소 네 곳 외의 자연 여행",
    intro: "동자바의 해안, 열대림, 사바나와 폭포를 둘러보세요. 표시된 금액은 1일 투어 요금이며 입장료, 교통, 숙박, 식사는 별도입니다.",
    ticket: "1인 입장료", stay: "주변 숙소", dining: "주변 식당", notice: "요금과 예약 가능 여부는 변동될 수 있으니 여행 전에 확인해 주세요.", verify: "공식 정보 확인", whatsapp: "WhatsApp 예약 또는 문의",
    descriptions: ["바다 위 붉은 언덕, 서핑 포인트와 아름다운 석양으로 유명한 남쪽 해변입니다.", "베콜 사바나와 건조림, 야생동물, 바마 해변을 만날 수 있습니다. 발루란은 인접한 시투본도 지역에 있습니다.", "사덴간 사바나, 원시림, 한적한 해변과 유명한 서핑 명소 G-Land가 있는 열대림 보호구역입니다.", "글라가 인근에서 세 개의 폭포와 맑은 웅덩이, 숲 풍경을 즐길 수 있는 자연 명소입니다."],
    stayNotes: ["The Wisma Pulau Merah는 해변 가까운 홈스테이입니다. 객실 요금은 1박 약 300,000루피아부터이며 최신 요금을 확인하세요.", "Wonorejo의 RedDoorz near Baluran National Park 또는 Grand Baluran Villa는 공원 입구와 가깝습니다.", "Jawa Jiwa G-Land는 Alas Purwo 지역에서 글램핑, 방갈로, 아파트를 제공합니다. 미리 예약하고 입장 절차를 확인하세요.", "Herry's Guesthouse와 Lintang Luku Tent Resort는 Glagah와 Licin 주변에 있어 Jagir와 Ijen 방문에 편리합니다."],
    diningNotes: ["Wisma Bar & Restaurant에서 인도네시아와 자바 요리, 서양식·중국식·일본식 메뉴를 즐길 수 있습니다.", "Wongsorejo의 RM Valentine은 인도네시아 음식을 먹기 좋은 곳이며 공원 입구 근처에는 Warung Asri도 있습니다.", "Jawa Jiwa G-Land는 가장 가까운 리조트 식당입니다. 공원에 들어가기 전에 식사 계획을 확인하세요.", "The Osing Bamboo Restaurant은 인도네시아 음식과 해산물을 제공합니다. 폭포 마을 주변에도 현지 식당이 있습니다."],
  },
  fr: {
    eyebrow: "D’autres destinations", title: "Escapades nature en plus des quatre incontournables",
    intro: "Explorez les côtes, la forêt tropicale, la savane et les cascades de l’est de Java. Le tarif affiché correspond à une excursion d’une journée ; entrées, transport, hébergement et repas sont en supplément.",
    ticket: "Entrée par personne", stay: "Hébergement à proximité", dining: "Restaurants à proximité", notice: "Les tarifs et disponibilités peuvent évoluer. Confirmez avant votre départ.", verify: "Voir les infos officielles", whatsapp: "Réserver ou demander sur WhatsApp",
    descriptions: ["Une plage du sud connue pour son îlot rouge, ses spots de surf et ses couchers de soleil.", "Découvrez la savane de Bekol, la forêt sèche, les animaux sauvages et la plage de Bama. Baluran se trouve dans le Situbondo voisin.", "Une vaste forêt tropicale avec la savane de Sadengan, une forêt ancienne, des plages isolées et le spot de surf G-Land.", "Un site naturel près de Glagah avec trois cascades, des bassins limpides et des paysages forestiers."],
    stayNotes: ["The Wisma Pulau Merah est une maison d’hôtes près de la plage ; chambres affichées à partir d’environ 300 000 IDR la nuit. Tarif à confirmer.", "RedDoorz near Baluran National Park ou Grand Baluran Villa à Wonorejo sont des options pratiques près du parc.", "Jawa Jiwa G-Land propose glamping, bungalows et appartements dans la zone d’Alas Purwo. Réservez et confirmez l’accès à l’avance.", "Herry's Guesthouse et Lintang Luku Tent Resort se trouvent vers Glagah et Licin, près de Jagir et d’Ijen."],
    diningNotes: ["Wisma Bar & Restaurant sert des plats indonésiens et javanais, ainsi que des options occidentales, chinoises et japonaises.", "RM Valentine à Wongsorejo est une halte pratique ; Warung Asri se trouve aussi près de l’entrée du parc.", "Jawa Jiwa G-Land est l’option de restauration la plus proche. Confirmez les repas avant d’entrer dans le parc.", "The Osing Bamboo Restaurant propose cuisine indonésienne et fruits de mer ; de petits warungs sont aussi présents dans le village."],
  },
  nl: {
    eyebrow: "Meer om te ontdekken", title: "Natuuruitstapjes naast de vier uitgelichte plekken",
    intro: "Ontdek de kust, het regenwoud, de savanne en watervallen van Oost-Java. De getoonde prijs geldt voor een dagtour; entree, vervoer, verblijf en maaltijden zijn apart.",
    ticket: "Entree per persoon", stay: "Overnachten in de buurt", dining: "Eten in de buurt", notice: "Tarieven en beschikbaarheid kunnen veranderen. Controleer dit voor vertrek.", verify: "Officiële informatie", whatsapp: "Boek of vraag via WhatsApp",
    descriptions: ["Een strand aan de zuidkust, bekend om het roodachtige eilandje, surfplekken en prachtige zonsondergangen.", "Verken de Bekol-savanne, het droge bos, wilde dieren en Bama Beach. Baluran ligt in het aangrenzende Situbondo.", "Een groot laaglandregenwoud met de Sadengan-savanne, oud bos, afgelegen stranden en de beroemde surfspot G-Land.", "Een natuurplek bij Glagah met drie watervallen, heldere poelen en boslandschap."],
    stayNotes: ["The Wisma Pulau Merah is een homestay bij het strand; kamers vanaf ongeveer IDR 300.000 per nacht. Controleer de actuele prijs.", "RedDoorz near Baluran National Park of Grand Baluran Villa in Wonorejo liggen praktisch bij de ingang.", "Jawa Jiwa G-Land biedt glamping, bungalows en appartementen in het Alas Purwo-gebied. Boek vooraf en bevestig de toegang.", "Herry's Guesthouse en Lintang Luku Tent Resort liggen rond Glagah en Licin, vlak bij Jagir en Ijen."],
    diningNotes: ["Wisma Bar & Restaurant serveert Indonesische en Javaanse gerechten, plus westerse, Chinese en Japanse opties.", "RM Valentine in Wongsorejo is een handige stop; Warung Asri ligt ook dicht bij de ingang van het park.", "Jawa Jiwa G-Land is de dichtstbijzijnde eetgelegenheid bij het resort. Bevestig maaltijden vooraf.", "The Osing Bamboo Restaurant serveert Indonesisch eten en visgerechten; rond het watervaldorp zijn kleine warungs."],
  },
  ru: {
    eyebrow: "Другие места для отдыха", title: "Природные маршруты помимо четырёх главных",
    intro: "Исследуйте побережье, тропический лес, саванну и водопады Восточной Явы. Указана цена тура на один день; входные билеты, транспорт, проживание и питание оплачиваются отдельно.",
    ticket: "Вход на человека", stay: "Где остановиться рядом", dining: "Где поесть рядом", notice: "Тарифы и наличие мест меняются. Уточняйте данные перед поездкой.", verify: "Официальная информация", whatsapp: "Забронировать или спросить в WhatsApp",
    descriptions: ["Пляж на южном побережье, известный красноватым островком, местами для сёрфинга и красивыми закатами.", "Саванна Бекол, сухой лес, дикие животные и пляж Бама. Балuran находится в соседнем Ситубондо.", "Большой тропический лес с саванной Саденган, древними лесами, уединёнными пляжами и известным местом для сёрфинга G-Land.", "Природное место у Глагаха с тремя водопадами, прозрачными бассейнами и лесными пейзажами."],
    stayNotes: ["The Wisma Pulau Merah — гостевой дом у пляжа; номера указаны примерно от 300 000 IDR за ночь. Уточните актуальные цены.", "RedDoorz near Baluran National Park или Grand Baluran Villa в Вонореджо удобно расположены у входа в парк.", "Jawa Jiwa G-Land предлагает глэмпинг, бунгало и апартаменты в районе Alas Purwo. Бронируйте заранее и уточняйте доступ.", "Herry's Guesthouse и Lintang Luku Tent Resort находятся в районах Глагах и Личин, недалеко от Джагира и Иджена."],
    diningNotes: ["Wisma Bar & Restaurant предлагает индонезийскую и яванскую кухню, а также западные, китайские и японские блюда.", "RM Valentine в Вонореджо — удобная остановка; возле входа в парк также есть Warung Asri.", "Jawa Jiwa G-Land — ближайший ресторан в курортной зоне. Заранее уточните варианты питания.", "The Osing Bamboo Restaurant предлагает индонезийскую кухню и морепродукты; в деревне есть небольшие кафе."],
  },
}

const destinations = [
  { name: "Pulau Merah", location: "Pesanggaran, Banyuwangi", fee: 10000, dayRate: 250000, image: "/pulau-merah.jpg", url: "https://sisparnas.kemenpar.go.id/p/68539", stay: "The Wisma Pulau Merah", food: "Wisma Bar & Restaurant", stayUrl: "https://redislandwisma.com/" },
  { name: "Baluran National Park", location: "Situbondo, East Java", fee: 205000, dayRate: 300000, image: "/african-safari-wildlife-elephants-sunset.jpg", url: "https://tnbaluran.ksdae.kehutanan.go.id/tiket", stay: "RedDoorz near Baluran National Park / Grand Baluran Villa", food: "RM Valentine, Wongsorejo", stayUrl: "https://www.traveloka.com/id-id/hotel/indonesia/landmark/polsek-wongsorejo-91607407739105" },
  { name: "Alas Purwo & G-Land", location: "Tegaldlimo, Banyuwangi", fee: 150000, dayRate: 300000, image: "/djawatan.jpg", url: "https://tnalaspurwo.org/", stay: "Jawa Jiwa G-Land", food: "Jawa Jiwa G-Land resort dining", stayUrl: "https://jawajiwa.com/" },
  { name: "Jagir Waterfall", location: "Glagah, Banyuwangi", fee: 5000, dayRate: 300000, image: "/iceland-northern-lights-waterfalls-dramatic-landsc.jpg", url: "https://jadesta.kemenpar.go.id/atraksi/air_terjun_jagir", stay: "Herry's Guesthouse / Lintang Luku Tent Resort", food: "The Osing Bamboo Restaurant", stayUrl: "https://www.tripadvisor.co.id/HotelsNear-g317103-d15197910-Jagir_Waterfall-Banyuwangi_East_Java_Java.html" },
  { name: "Teluk Hijau", location: "Meru Betiri, Banyuwangi", fee: 10000, dayRate: 300000, image: "/teluk-hijau.jpg", url: "https://merubetiri.id/", stay: "Penginapan lokal Pesanggaran", food: "Warung lokal Pesanggaran", stayUrl: "https://www.google.com/maps/search/hotel+Pesanggaran+Banyuwangi" },
]

export async function ExtraDestinations({ lang }: { lang: SupportedLanguage }) {
  const locale = (lang === "en-au" ? "en" : lang) as string
  const text = copy[locale] ?? copy.en
  const prices = await Promise.all(destinations.map(({ dayRate }) => formatPrice(dayRate, "IDR", lang)))
  const entranceFees = await Promise.all(destinations.map(({ fee }) => formatPrice(fee, "IDR", lang)))

  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl sm:mb-12">
          <p className="mb-3 text-xs uppercase tracking-widest text-primary sm:mb-4 sm:text-sm">{text.eyebrow}</p>
          <h1 className="mb-4 text-3xl font-bold sm:mb-5 sm:text-4xl md:text-5xl">{text.title}</h1>
          <p className="text-base text-muted-foreground sm:text-lg">{text.intro}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 md:gap-7 xl:gap-8">
          {destinations.map((destination, index) => (
            <Card key={destination.name} className="overflow-hidden border-0 shadow-sm">
              <img src={destination.image} alt={destination.name} className="h-52 w-full object-cover sm:h-64" />
              <CardContent className="space-y-4 p-4 sm:space-y-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">{destination.name}</h2>
                    <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{destination.location}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-right text-sm font-semibold text-primary">
                    {prices[index].formatted}<span className="block text-xs font-normal">{getDayTourLabel(lang)}</span>
                    <span className="mt-1 block text-xs font-normal text-muted-foreground">{text.ticket}: {entranceFees[index].formatted}</span>
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{text.descriptions[index] ?? destination.name}</p>
                <div className="grid sm:grid-cols-2 gap-4 border-t pt-4">
                  <div>
                    <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold"><BedDouble className="h-4 w-4 text-primary" />{text.stay}</h3>
                    <a className="text-sm font-medium underline-offset-4 hover:underline" href={destination.stayUrl} target="_blank" rel="noreferrer">{destination.stay}</a>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text.stayNotes[index]}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold"><Utensils className="h-4 w-4 text-primary" />{text.dining}</h3>
                    <p className="text-sm font-medium">{destination.food}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text.diningNotes[index]}</p>
                  </div>
                </div>
                <a href={destination.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  {text.verify}<ExternalLink className="h-3.5 w-3.5" />
                </a>
                <AvailabilityBooking
                  tourId={destination.name === "Pulau Merah" ? "pulau-merah" : destination.name === "Baluran National Park" ? "baluran" : destination.name === "Alas Purwo & G-Land" ? "alas-purwo" : destination.name === "Jagir Waterfall" ? "jagir" : "teluk-hijau"}
                  tourName={destination.name}
                  lang={lang}
                >
                  <Button variant="outline" className="w-full">{lang === "id" ? "Pilih tanggal & pesan" : "Choose date & book"}</Button>
                </AvailabilityBooking>
                <a
                  href={getWhatsAppUrl(lang === "id"
                    ? `Hallo Kang Pir, saya ingin memesan atau bertanya tentang ${destination.name}. Mohon info jadwal dan ketersediaannya.`
                    : `Hello Tour Guide, I would like to book or ask about ${destination.name}. Please share the schedule and availability.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <MessageCircle className="h-4 w-4" />{text.whatsapp}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">{text.notice}</p>
      </div>
    </section>
  )
}
