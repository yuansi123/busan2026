import React, { useMemo, useState } from 'react';
import {
  BedDouble,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Download,
  ExternalLink,
  Luggage,
  MapPin,
  Navigation,
  Plane,
  Route,
  Sparkles,
  Star,
  Ticket,
  Train,
  Utensils,
  WalletCards,
} from 'lucide-react';

const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const hotel = {
  name: '釜山迎武遊行飯店-海雲台海灘',
  localName: '부산 영무파라드호텔 해운대 비치',
  dates: '2026/8/26 - 2026/8/30',
  base: '海雲台海灘附近',
  url: maps('부산 영무파라드호텔 해운대 비치'),
  note: '以海雲台為基地：東釜山、青沙浦、機張排同一天；南浦、松島、影島排同一天；廣安里與西面/田浦分開走，移動最順。',
};

const flights = [
  {
    label: '去程',
    date: '8/26 週三',
    flight: '7C6152',
    booking: 'BBILHG',
    route: '桃園 T1 -> 釜山金海 PUS',
    time: '12:00 - 15:30',
    duration: '2 小時 30 分',
  },
  {
    label: '回程',
    date: '8/30 週日',
    flight: 'BR163',
    booking: 'F3O39J',
    route: '釜山金海 PUS -> 桃園 T2',
    time: '19:10 - 20:35',
    duration: '2 小時 25 分',
  },
];

const quickInfo = [
  { label: '旅行日期', value: '2026/8/26 - 8/30', icon: CalendarDays },
  { label: '住宿基地', value: '海雲台海灘', icon: BedDouble },
  { label: '航班', value: '7C6152 / BR163', icon: Plane },
  { label: '策略', value: '同區排一起，跨區用計程車', icon: Navigation },
];

const reservationItems = [
  {
    title: '天空膠囊列車',
    when: 'Day 3',
    level: '一定要提前',
    detail: '尾浦 -> 青沙浦方向，依截圖行程排 15:00 左右；沒提前預約很容易沒票。',
    url: maps('Haeundae Blue Line Park Mipo Station'),
  },
  {
    title: '松島海上纜車',
    when: 'Day 2',
    level: '建議先買',
    detail: '透明車廂更好拍；假日或天氣好時建議先買票。',
    url: maps('Songdo Marine Cable Car Busan'),
  },
  {
    title: 'Arte Museum Busan',
    when: 'Day 2',
    level: '建議先買',
    detail: '沉浸式光影展，排在白淺灘後順路接晚餐。',
    url: maps('Arte Museum Busan'),
  },
  {
    title: '廣安里遊艇',
    when: 'Day 4',
    level: '提前預約',
    detail: '選日落後或無人機表演前後時段，並確認集合碼頭與報到時間。',
    url: maps('Gwangalli yacht tour Busan'),
  },
  {
    title: 'Spa Land',
    when: 'Day 4',
    level: '先確認票券',
    detail: '排在機張午餐後，下午汗蒸幕休息最剛好。',
    url: maps('Spa Land Centum City Busan'),
  },
  {
    title: '海東龍宮寺 / 機張市場',
    when: 'Day 4',
    level: '出發前查營業',
    detail: '機張市場吃蟹或海鮮先問價格，龍宮寺不需預約但要穿好走鞋。',
    url: maps('Haedong Yonggungsa Temple 기장시장 대게'),
  },
];

const foodShortlist = [
  {
    category: '主線照截圖安排',
    note: 'Day2 到 Day4 已改成截圖路線；飯店退房/寄行李不放進主線。',
    picks: [
      { name: 'Egg Drop 早餐備案', url: maps('Egg Drop Busan') },
      { name: '明星一隻雞', url: maps('명성닭한마리 부산') },
      { name: '道地韓式烤肉', url: maps('부산 현지 한식 고기집') },
      { name: '鐵板蚵海鮮', url: maps('부산 철판 굴 해산물') },
      { name: '31cm 海鮮刀削麵', url: maps('31cm 해물칼국수 부산 광안리') },
      { name: '韓式炸雞配啤酒', url: maps('해운대 치킨 맥주') },
    ],
  },
  {
    category: '海雲台近距離備案',
    note: '住海雲台最順，晚上累了就從這組挑。',
    picks: [
      { name: '尾浦家 生醃', url: maps('해운대 미포끝집') },
      { name: '釜飯 solssot 海雲台', url: maps('솔솥 부산해운대점') },
      { name: '錦秀河豚', url: maps('금수복국 해운대') },
      { name: '海雲台瓦房鱈魚湯', url: maps('해운대 기와집 대구탕') },
      { name: '伍班長烤肉', url: maps('해운대 오반장') },
    ],
  },
  {
    category: '前面推薦保留參考',
    note: '這些不強塞主線，放在同區時再替換，避免為了吃一間店跨很遠。',
    picks: [
      { name: 'Samhwan 畜產 Jungdong 店', url: maps('Samhwan畜产 Jungdong店 釜山 海云台区 中洞 1271-33') },
      { name: 'DIART Coffee 青沙浦', url: maps('디아트커피 청사포') },
      { name: '機張市場吃蟹', url: maps('기장시장 대게') },
      { name: '豚笑 南浦店', url: maps('돈카츠 톤쇼우 남포점') },
      { name: '烤肉的男子 廣安里店', url: maps('고기굽는남자 광안리점') },
      { name: 'Your Type 田浦店', url: maps('Your Type Jeonpo Busan') },
      { name: '60炸雞 西面店', url: maps('60계치킨 서면') },
      { name: '秀敏家烤扇貝', url: maps('수민이네 청사포') },
      { name: '海城烤腸 本店', url: maps('해성막창집 본점') },
    ],
  },
  {
    category: '甜點咖啡',
    note: '咖啡廳保留休息時間，不塞太滿。',
    picks: [
      { name: 'All Sunday Bagel', url: maps('올선데이베이글 해운대') },
      { name: 'Momos Coffee 影島', url: maps('모모스커피 영도') },
      { name: 'Having Moment', url: maps('Having Moment 흰여울문화마을') },
      { name: 'BADA SAND', url: maps('부산바다샌드 해운대') },
      { name: '海雲台名品糖餅', url: maps('해운대 명품호떡') },
    ],
  },
];

const packingList = [
  '護照、機票訂位代號、飯店訂房資料',
  'Naver Map、Papago、Kakao T 或 Uber',
  '天空膠囊列車 / 遊艇 / 烤肉訂位截圖',
  '行動電源、轉接頭、充電線',
  '好走的鞋：甘川洞與白淺灘坡路多',
  '薄外套：海邊太陽下山後風很大',
  '退稅要用護照，單筆滿 15,000 韓元留意',
  '行李秤：最後一天不要掃貨到超重',
];

const routeNotes = [
  'Naver Map 一定要用，Google Map 在釜山很容易帶錯，但本頁仍附 Google Maps 搜尋連結方便快速開圖。',
  '公車不能帶手搖飲，拿飲料時改搭地鐵或計程車。',
  '計程車用 Kakao T 比較不怕繞路；多人同行時通常很划算。',
  '週末小店可能公休或客滿，咖啡廳與餐廳出發前先查營業狀態。',
  '西面商圈晚上熱鬧，小巷與擁擠處注意手機和錢包。',
  'Olive Young 特價常變，路過看到想買就買，不要全部留最後一天。',
];

const tripDays = [
  {
    day: 1,
    date: '8/26 週三',
    title: '抵達釜山・海雲台暖身',
    base: '台中 / 桃園機場 / 金海機場 / 海雲台',
    accent: '#0f766e',
    summary: '第一天不硬塞景點，把體力留給後面。重點是順利入住、吃一碗在地湯飯、走海雲台夜海。',
    plan: [
      {
        time: '07:00',
        place: '台中出發到桃園機場 T1',
        url: maps('Taiwan Taichung to Taoyuan Airport Terminal 1'),
        detail: '建議包車或 Uber/計程車，約 1 小時 45 分 - 2 小時 15 分；若搭高鐵，整段抓 2 小時含轉乘。',
        transport: '台中 -> 桃園 T1：包車最穩；高鐵台中 -> 桃園約 40 分，再轉機捷/接駁約 20 分。',
        next: '到下一站：機場報到與登機，預留約 3 小時。',
        reserve: '航班報到建議起飛前 3 小時抵達。',
        icon: Luggage,
      },
      {
        time: '12:00',
        place: '7C6152 起飛',
        url: maps('Taoyuan Airport Terminal 1'),
        detail: '桃園 T1 12:00 -> 釜山金海 15:30。機上先休息，晚餐排飯店附近。',
        transport: '飛行時間約 2 小時 30 分。',
        next: '到下一站：入境、領行李、叫車，約 60-90 分抵達飯店。',
        reserve: '訂位代號 BBILHG。',
        icon: Plane,
      },
      {
        time: '16:30',
        place: '金海機場前往海雲台飯店',
        url: maps('Gimhae International Airport to 부산 영무파라드호텔 해운대 비치'),
        detail: '有行李直接計程車最舒服；若搭大眾運輸要轉乘，第一天不建議折磨自己。',
        transport: '金海機場 -> 海雲台飯店：計程車約 55-75 分；大眾運輸約 80-100 分。',
        next: '到下一站：飯店辦理入住，約 10-20 分。',
        reserve: '用 Kakao T / Uber 叫車較安心。',
        icon: Navigation,
      },
      {
        time: '18:00',
        place: '入住釜山迎武遊行飯店-海雲台海灘',
        url: hotel.url,
        detail: '放行李、整理一下，晚上全程步行圈。',
        transport: '飯店 -> 海雲台市場/海灘：步行約 5-15 分。',
        next: '到下一站：步行或短程叫車約 5-15 分。',
        reserve: '飯店地址先存在 Naver Map。',
        icon: BedDouble,
      },
      {
        time: '19:00',
        place: '海雲台晚餐：Samhwan 畜產 Jungdong 店',
        url: maps('Samhwan畜产 Jungdong店 釜山 海云台区 中洞 1271-33'),
        detail: '改成你補的海雲台中洞烤肉店，地址在釜山廣域市海雲台區中洞 1271-33。抵達日住海雲台，吃這間比跨去沙上合理很多。',
        transport: '飯店 -> Samhwan 畜產 Jungdong 店：依實際位置步行或短程計程車約 5-15 分。',
        next: '到下一站：去海雲台海灘或回飯店約 5-15 分。',
        reserve: '先用 Naver Map 確認店名與營業狀態；Google Maps 用地址搜尋輔助。',
        icon: Utensils,
      },
      {
        time: '20:30',
        place: '海雲台海灘 + 名品糖餅',
        url: maps('Haeundae Beach 해운대 명품호떡'),
        detail: '散步看夜海，糖餅建議先吃堅果黑糖原味；喜歡鹹甜再試起司堅果。',
        transport: '海雲台市場 -> 海灘：步行約 5-8 分；海灘 -> 飯店：步行約 5-10 分。',
        next: '今日結束：回飯店步行約 5-10 分。',
        reserve: '海邊風大，薄外套直接帶出門。',
        icon: Sparkles,
      },
    ],
    meals: ['Samhwan 畜產 Jungdong 店', '海雲台名品糖餅', '海雲台草梁小麥麵備案', '常客客人宵夜備案'],
    uberTip: '第一天機場到海雲台建議計程車/Uber，省轉乘與拖行李時間。',
  },
  {
    day: 2,
    date: '8/27 週四',
    title: '松島纜車・白淺灘・Arte・南浦',
    base: '松島 / 白淺灘文化村 / Arte Museum / 南浦洞',
    accent: '#2563eb',
    summary: '照截圖改成西南邊一天：暖心早餐、松島海上纜車、明星一隻雞、白淺灘、Arte Museum、韓式烤肉、南浦洞 BIFF。',
    plan: [
      {
        time: '08:10',
        place: '暖心早餐：雪濃湯或 Egg Drop 三明治',
        url: maps('Haeundae seolleongtang Egg Drop Busan'),
        detail: '今天要跨到松島，早餐選飯店附近快速吃。想喝熱湯選雪濃湯，想簡單選 Egg Drop。',
        transport: '飯店 -> 早餐：步行或短程計程車約 5-15 分。',
        next: '到下一站：早餐後前往松島海上纜車約 55-75 分。',
        reserve: '不用預約，出發前用 Naver Map 看營業狀態。',
        icon: Utensils,
      },
      {
        time: '09:00',
        place: '松島海上纜車',
        url: maps('Songdo Marine Cable Car Busan'),
        detail: '照截圖第一站排松島，透明車廂最適合拍海景。',
        transport: '海雲台 -> 松島纜車站：計程車約 50-70 分；大眾運輸約 70-90 分。',
        next: '到下一站：松島纜車 -> 明星一隻雞約 25-40 分。',
        reserve: '建議先買票，天氣好或假日透明車廂較熱門。',
        icon: Ticket,
      },
      {
        time: '11:15',
        place: '午餐：明星一隻雞',
        url: maps('명성닭한마리 부산'),
        detail: '截圖午餐排明星一隻雞，熱湯類中午吃剛好補體力。',
        transport: '松島 -> 明星一隻雞：依分店位置計程車約 25-40 分。',
        next: '到下一站：白淺灘文化村約 20-35 分。',
        reserve: '出發前確認店名與分店，避免導航到錯店。',
        icon: Utensils,
      },
      {
        time: '13:00',
        place: '白淺灘文化村',
        url: maps('흰여울문화마을'),
        detail: '靠海彩色村落和咖啡廳很多，坡路不少，穿好走鞋。',
        transport: '午餐 -> 白淺灘文化村：計程車約 20-35 分。',
        next: '到下一站：Arte Museum 約 15-25 分。',
        reserve: '不用預約，海邊風大帶外套。',
        icon: MapPin,
      },
      {
        time: '14:40',
        place: 'Arte Museum Busan',
        url: maps('Arte Museum Busan'),
        detail: '沉浸式光影展，拍照效果穩，排在白淺灘後順路。',
        transport: '白淺灘 -> Arte Museum：計程車約 15-25 分。',
        next: '到下一站：晚餐烤肉約 20-35 分。',
        reserve: '建議先買票，並確認最晚入場時間。',
        icon: Sparkles,
      },
      {
        time: '17:00',
        place: '晚餐：道地韓式烤肉',
        url: maps('부산 현지 한식 고기집'),
        detail: '照截圖排一餐在地韓式烤肉。若想吃你指定的名單，可用附近分店替換，不要跨回海雲台。',
        transport: 'Arte Museum -> 烤肉店：計程車約 20-35 分。',
        next: '到下一站：南浦洞 BIFF 廣場約 10-20 分。',
        reserve: '烤肉店建議先訂位或避開尖峰。',
        icon: Utensils,
      },
      {
        time: '19:00',
        place: '南浦洞 BIFF 廣場',
        url: maps('BIFF Square Busan Nampo-dong'),
        detail: '飯後逛南浦洞和 BIFF，小吃、藥妝、街景一起收。',
        transport: '晚餐 -> BIFF 廣場：計程車約 10-20 分；若在南浦周邊可步行。',
        next: '今日結束：南浦 -> 海雲台飯店約 55-80 分。',
        reserve: '人多注意手機錢包；回程太累就直接叫車。',
        icon: WalletCards,
      },
    ],
    meals: ['雪濃湯或 Egg Drop', '明星一隻雞', '道地韓式烤肉', 'BIFF 小吃備案', '南浦洞咖啡備案'],
    uberTip: 'Day2 從海雲台跨到松島距離較長，早上和晚上回程建議計程車；中間短距離也用 Kakao T 會比較順。',
  },
  {
    day: 3,
    date: '8/28 週五',
    title: '甘川洞・富平市場・海雲台膠囊',
    base: '甘川洞 / 富平罐頭市場 / 海雲台 / 青沙浦',
    accent: '#d97706',
    summary: '照截圖安排：便利商店早餐後去甘川洞，富平市場午餐，下午回海雲台搭膠囊列車，DIART 咖啡，晚上吃鐵板蚵海鮮逛夜市。',
    plan: [
      {
        time: '08:20',
        place: '便利商店早餐',
        url: maps('Haeundae convenience store breakfast'),
        detail: '照截圖先簡單吃早餐，節省時間去甘川洞。',
        transport: '飯店附近便利商店：步行約 3-8 分。',
        next: '到下一站：海雲台 -> 甘川洞文化村約 60-85 分。',
        reserve: '不用預約，早餐簡單處理。',
        icon: Utensils,
      },
      {
        time: '09:20',
        place: '甘川洞文化村',
        url: maps('Gamcheon Culture Village Busan'),
        detail: '彩色山城和小王子拍照點。路很陡，鞋子一定要好走。',
        transport: '海雲台 -> 甘川洞：計程車約 55-75 分；大眾運輸約 75-95 分。',
        next: '到下一站：富平罐頭市場約 15-25 分。',
        reserve: '不用預約，早上去人比較少。',
        icon: MapPin,
      },
      {
        time: '11:30',
        place: '富平罐頭市場：逛街兼午餐烤韓牛',
        url: maps('Bupyeong Kkangtong Market Korean beef Busan'),
        detail: '照截圖中午排富平罐頭市場，邊逛邊吃，主餐抓烤韓牛或市場熟食。',
        transport: '甘川洞 -> 富平罐頭市場：計程車約 15-25 分；公車約 25-40 分。',
        next: '到下一站：回海雲台約 55-80 分。',
        reserve: '市場類不用預約，現場看想吃什麼。',
        icon: Utensils,
      },
      {
        time: '14:10',
        place: '移動至海雲台，飯店休息',
        url: maps('Bupyeong Kkangtong Market to Haeundae Beach Busan'),
        detail: '截圖有新飯店 Check-in，這裡不放退房/寄行李，只保留回海雲台休息和整理。',
        transport: '富平市場 -> 海雲台：計程車約 55-75 分；地鐵約 65-85 分。',
        next: '到下一站：尾浦站約 10-20 分。',
        reserve: '下午要搭膠囊列車，別逛市場逛太晚。',
        icon: BedDouble,
      },
      {
        time: '15:00',
        place: '天空膠囊列車：尾浦 -> 青沙浦',
        url: maps('Haeundae Blue Line Park Mipo Station'),
        detail: '照截圖下午搭膠囊列車，尾浦到青沙浦方向最順。',
        transport: '飯店/海雲台 -> 尾浦站：步行或計程車約 10-20 分；膠囊列車約 30 分。',
        next: '到下一站：DIART Coffee 步行約 5-12 分。',
        reserve: '必須提前預約，15:00 前後時段先搶。',
        icon: Train,
      },
      {
        time: '15:30',
        place: 'DIART Coffee 青沙浦',
        url: maps('디아트커피 청사포'),
        detail: '照截圖排膠囊後咖啡，青沙浦海景咖啡廳。',
        transport: '青沙浦站 -> DIART：步行約 5-12 分。',
        next: '到下一站：晚餐鐵板蚵海鮮約 5-20 分。',
        reserve: '熱門時段可能排隊，拍照和咖啡抓 1.5-2 小時。',
        icon: Sparkles,
      },
      {
        time: '17:30',
        place: '晚餐：鐵板蚵海鮮，餐後逛海雲台夜市',
        url: maps('해운대 철판 굴 해산물 해운대시장'),
        detail: '照截圖晚餐吃鐵板蚵海鮮，餐後回海雲台市場/夜市散步。',
        transport: '青沙浦 -> 海雲台市場：計程車約 15-25 分；若在青沙浦吃則步行/短程約 5-15 分。',
        next: '今日結束：回飯店步行或計程車約 5-15 分。',
        reserve: '想替換可選 31cm 海鮮刀削麵或秀敏家，但兩者在青沙浦附近，不要再跨區。',
        icon: Utensils,
      },
    ],
    meals: ['便利商店早餐', '富平市場烤韓牛', 'DIART Coffee', '鐵板蚵海鮮', '31cm/秀敏家備案'],
    uberTip: 'Day3 上午從海雲台到甘川洞很遠，建議計程車；下午從富平回海雲台也抓 1 小時以上，不要壓膠囊列車時間。',
  },
  {
    day: 4,
    date: '8/29 週六',
    title: '龍宮寺・機張海鮮・Spa Land・廣安里',
    base: '海東龍宮寺 / 機張市場 / Centum City / 廣安里',
    accent: '#7c3aed',
    summary: '照截圖安排：鮑魚粥早餐、海東龍宮寺、機張市場吃蟹、Spa Land 汗蒸幕、鑽石灣遊船、廣安里海鮮拉麵與宵夜炸雞。',
    plan: [
      {
        time: '09:00',
        place: '早餐：大海鮑魚粥',
        url: maps('대해전복죽 해운대'),
        detail: '照截圖早餐吃營養滿分的鮑魚粥。若想換，濟州家也留在參考清單。',
        transport: '飯店 -> 店家：步行/計程車約 5-15 分。',
        next: '到下一站：海東龍宮寺約 25-40 分。',
        reserve: '不用預約，先確認營業時間。',
        icon: Utensils,
      },
      {
        time: '10:00',
        place: '海東龍宮寺',
        url: maps('Haedong Yonggungsa Temple'),
        detail: '海邊寺廟是這天主景點，樓梯和坡道不少。',
        transport: '海雲台早餐店 -> 海東龍宮寺：計程車約 25-40 分；公車約 45-60 分。',
        next: '到下一站：機張市場約 15-25 分。',
        reserve: '不用預約，穿好走鞋。',
        icon: MapPin,
      },
      {
        time: '11:20',
        place: '午餐：機張市場大啖螃蟹海鮮',
        url: maps('기장시장 대게'),
        detail: '照截圖吃機張市場海鮮。帝王蟹/松葉蟹/大閘蟹現場先問價格，清蒸最穩。',
        transport: '海東龍宮寺 -> 機張市場：計程車約 15-25 分。',
        next: '到下一站：Spa Land 約 35-55 分。',
        reserve: '現場挑蟹，確認總價和料理費再坐下。',
        icon: Utensils,
      },
      {
        time: '13:40',
        place: 'Spa Land：五星級汗蒸幕',
        url: maps('Spa Land Centum City Busan'),
        detail: '下午用 Spa Land 休息，行程不會一直暴走。',
        transport: '機張市場 -> Spa Land Centum City：計程車約 35-55 分；大眾運輸約 55-75 分。',
        next: '到下一站：鑽石灣遊船集合點約 20-35 分。',
        reserve: '先確認票券、營業時間和入場規定。',
        icon: Sparkles,
      },
      {
        time: '18:00',
        place: '鑽石灣遊船：夕陽與夜景',
        url: maps('Diamond Bay Busan yacht cruise'),
        detail: '照截圖排傍晚遊船，看夕陽接廣安大橋夜景。',
        transport: 'Spa Land -> 遊船碼頭：計程車約 20-35 分。',
        next: '到下一站：廣安里晚餐約 15-30 分。',
        reserve: '必須提前預約，確認集合碼頭和報到時間。',
        icon: Ticket,
      },
      {
        time: '19:45',
        place: '廣安里晚餐：海鮮拉麵',
        url: maps('광안리 해물라면'),
        detail: '照截圖排廣安里海鮮拉麵。若想換成刀削麵，31cm 或附近海鮮麵類都可。',
        transport: '遊船碼頭 -> 廣安里：計程車約 15-30 分。',
        next: '到下一站：回飯店約 20-35 分。',
        reserve: '熱門晚餐時段可先查店家是否排隊。',
        icon: Utensils,
      },
      {
        time: '21:20',
        place: '宵夜回飯店：韓式炸雞配啤酒',
        url: maps('해운대 치킨 맥주'),
        detail: '照截圖最後回飯店吃炸雞配啤酒，輕鬆收尾。',
        transport: '廣安里 -> 海雲台飯店：計程車約 20-35 分；大眾運輸約 35-50 分。',
        next: '今日結束：外送或飯店附近步行約 5-15 分。',
        reserve: '可外送到飯店，或用附近炸雞店替換。',
        icon: Utensils,
      },
    ],
    meals: ['大海鮑魚粥', '機張市場螃蟹海鮮', '廣安里海鮮拉麵', '韓式炸雞配啤酒', '濟州家備案'],
    uberTip: 'Day4 點位分散又有遊船時間，海東龍宮寺、機張、市區之間建議計程車，Spa Land 到遊船碼頭務必抓緩衝。',
  },
  {
    day: 5,
    date: '8/30 週日',
    title: '田浦咖啡街・西面補買・回台',
    base: '海雲台 / 田浦 / 西面 / 金海機場',
    accent: '#db2777',
    summary: '回程 19:10，最後一天不跑遠郊。退房後把行李帶去西面寄放，留半天給田浦咖啡街和最後採買。',
    plan: [
      {
        time: '09:00',
        place: '退房前早餐：元祖奶奶牛肉湯飯或小麥麵',
        url: maps('해운대 원조할매국밥 해운대 초량밀면'),
        detail: '想吃熱湯選元祖奶奶牛肉湯飯；想清爽選海雲台草梁小麥麵。',
        transport: '飯店周邊：步行/計程車約 5-15 分。',
        next: '到下一站：回飯店整理退房約 20-40 分。',
        reserve: '早餐後回飯店整理行李。',
        icon: Utensils,
      },
      {
        time: '10:30',
        place: '退房，前往西面寄放行李',
        url: maps('Haeundae Beach to Seomyeon Station Busan'),
        detail: '不要寄回海雲台，會浪費回頭路。西面/田浦逛完直接去機場比較順。',
        transport: '海雲台 -> 西面：地鐵約 45-55 分；計程車約 35-50 分。',
        next: '到下一站：西面站到田浦咖啡街步行約 10-20 分。',
        reserve: '先查西面站置物櫃或行李寄放點。',
        icon: Luggage,
      },
      {
        time: '12:00',
        place: '田浦咖啡街：Your Type',
        url: maps('Your Type Jeonpo Busan'),
        detail: '美式鄉村風咖啡廳，這天直接留時間給它，不再硬塞遠景點。',
        transport: '西面站 -> 田浦咖啡街：步行約 10-20 分。',
        next: '到下一站：回西面商圈步行約 10-15 分。',
        reserve: '週末小店可能公休，出發前查 Naver Map。',
        icon: Utensils,
      },
      {
        time: '14:00',
        place: '西面商圈 / Olive Young / 選物店',
        url: maps('Seomyeon Olive Young Busan'),
        detail: '最後補買美妝、零食和伴手禮。Olive Young 特價看到就買，不要拖到機場。',
        transport: '田浦 -> 西面商圈：步行約 10-15 分。',
        next: '到下一站：60炸雞西面店步行約 5-15 分。',
        reserve: '退稅帶護照；注意行李重量。',
        icon: WalletCards,
      },
      {
        time: '15:00',
        place: '60炸雞 西面店',
        url: maps('60계치킨 서면'),
        detail: 'BTS 柾國吃播同款，皮薄酥脆，醃蘿蔔解膩。當晚餐前的早晚餐剛好。',
        transport: '西面商圈內：步行約 5-15 分。',
        next: '到下一站：拿行李並前往金海機場約 35-65 分。',
        reserve: '若要趕機場，建議外帶或控制用餐時間。',
        icon: Utensils,
      },
      {
        time: '16:10',
        place: '西面出發前往金海機場',
        url: maps('Seomyeon Station to Gimhae International Airport'),
        detail: 'BR163 19:10 起飛，抓 17:00 前後到機場比較穩。拿行李後直接叫車。',
        transport: '西面 -> 金海機場：計程車約 35-55 分；地鐵/輕軌約 45-65 分。',
        next: '到下一站：報到、安檢、登機，約 2 小時緩衝。',
        reserve: '週日路況抓寬，別壓線。',
        icon: Navigation,
      },
      {
        time: '19:10',
        place: 'BR163 回台灣',
        url: maps('Gimhae International Airport'),
        detail: '釜山金海 19:10 -> 桃園 T2 20:35。抵台後再接車或高鐵回台中。',
        transport: '桃園 T2 -> 台中：包車約 1 小時 45 分 - 2 小時 15 分；機捷+高鐵約 1.5-2 小時。',
        next: '旅程結束。',
        reserve: '訂位代號 F3O39J。',
        icon: Plane,
      },
    ],
    meals: ['Your Type 田浦店', '60炸雞 西面店', '海雲台元祖奶奶牛肉湯飯', '海雲台草梁小麥麵', 'Olive Young 掃貨'],
    uberTip: '最後一天有行李，海雲台到西面、西面到機場都可以計程車；若遇塞車再改地鐵/輕軌。',
  },
];

function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('busan2026-checks') || '{}');
    } catch {
      return {};
    }
  });

  const day = useMemo(
    () => tripDays.find((item) => item.day === selectedDay) || tripDays[0],
    [selectedDay],
  );

  const toggleItem = (item) => {
    const next = { ...checked, [item]: !checked[item] };
    setChecked(next);
    localStorage.setItem('busan2026-checks', JSON.stringify(next));
  };

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow"><Plane size={16} /> Busan 2026 PWA</p>
          <h1>釜山 5 天 4 夜精選行程</h1>
          <p className="hero__copy">
            依照海雲台住宿、航班時間和你的美食景點清單重排，補上 Google Maps 連結與每段到下一站的移動時間。
          </p>
          <div className="hero__actions">
            <a href="#itinerary" className="primary-action">
              查看每日路線 <ChevronRight size={18} />
            </a>
            <a href="#map-ranges" className="secondary-action">
              <MapPin size={18} /> 分區圖片
            </a>
          </div>
        </div>
      </section>

      <section className="quick-grid" aria-label="旅程摘要">
        {quickInfo.map(({ label, value, icon: Icon }) => (
          <article key={label} className="quick-card">
            <Icon size={20} />
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="section trip-basics">
        <article className="info-panel hotel-panel">
          <div className="section-heading compact">
            <p>Stay</p>
            <h2>{hotel.name}</h2>
          </div>
          <p className="local-name">{hotel.localName}</p>
          <div className="fact-row">
            <span>入住</span>
            <strong>{hotel.dates}</strong>
          </div>
          <div className="fact-row">
            <span>基地</span>
            <strong>{hotel.base}</strong>
          </div>
          <p className="soft-note">{hotel.note}</p>
          <a className="text-link" href={hotel.url} target="_blank" rel="noreferrer">
            飯店 Google Maps <ExternalLink size={15} />
          </a>
        </article>

        <article className="info-panel">
          <div className="section-heading compact">
            <p>Flights</p>
            <h2>航班資訊</h2>
          </div>
          <div className="flight-grid">
            {flights.map((flight) => (
              <div key={flight.flight} className="flight-card">
                <div>
                  <span>{flight.label}｜{flight.date}</span>
                  <strong>{flight.flight}</strong>
                </div>
                <p>{flight.route}</p>
                <b>{flight.time}</b>
                <small>{flight.duration}｜訂位代號 {flight.booking}</small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section id="map-ranges" className="section map-section">
        <div className="section-heading">
          <p>Range Map</p>
          <h2>每天主要活動範圍</h2>
        </div>
        <img src="/busan-day-ranges.svg" alt="釜山五天四夜每日活動範圍圖" />
      </section>

      <section id="reservations" className="section">
        <div className="section-heading">
          <p>Book First</p>
          <h2>需要預約 / 先取號</h2>
        </div>
        <div className="reservation-grid">
          {reservationItems.map((item) => (
            <article key={item.title} className="reserve-card">
              <div>
                <span>{item.when}</span>
                <b>{item.level}</b>
              </div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <a href={item.url} target="_blank" rel="noreferrer">
                Google Maps <ExternalLink size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="itinerary" className="section itinerary-section">
        <div className="section-heading">
          <p>Daily Route</p>
          <h2>每段都有地圖與到下一站時間</h2>
        </div>

        <div className="day-tabs" role="tablist" aria-label="選擇天數">
          {tripDays.map((item) => (
            <button
              key={item.day}
              type="button"
              role="tab"
              aria-selected={item.day === selectedDay}
              className={item.day === selectedDay ? 'active' : ''}
              onClick={() => setSelectedDay(item.day)}
            >
              Day {item.day}
            </button>
          ))}
        </div>

        <article className="day-panel" style={{ '--accent': day.accent }}>
          <div className="day-summary">
            <span>{day.date}</span>
            <h3>{day.title}</h3>
            <p><MapPin size={16} /> {day.base}</p>
            <p>{day.summary}</p>
            <div className="uber-tip">
              <Navigation size={16} />
              <strong>交通判斷：</strong>{day.uberTip}
            </div>
          </div>

          <div className="timeline">
            {day.plan.map(({ time, place, url, detail, transport, next, reserve, icon: Icon }) => (
              <div key={`${time}-${place}`} className="timeline-item">
                <div className="timeline-icon"><Icon size={18} /></div>
                <div>
                  <time>{time}</time>
                  <h4>{place}</h4>
                  <p>{detail}</p>
                  <div className="stop-actions">
                    <a href={url} target="_blank" rel="noreferrer">
                      Google Maps <ExternalLink size={14} />
                    </a>
                  </div>
                  <p className="transport"><Route size={14} /> {transport}</p>
                  <p className="next-leg"><Clock3 size={14} /> {next}</p>
                  <p className="reserve-note"><Ticket size={14} /> {reserve}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="section split-section">
        <div className="info-panel">
          <div className="section-heading compact">
            <p>Food Map</p>
            <h2>精選美食與地圖連結</h2>
          </div>
          <div className="food-grid">
            {foodShortlist.map((item) => (
              <div key={item.category} className="food-day">
                <strong>{item.category}</strong>
                <div>
                  {item.picks.map((food) => (
                    <a key={food.name} href={food.url} target="_blank" rel="noreferrer">
                      {food.name}
                    </a>
                  ))}
                </div>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="info-panel checklist">
          <div className="section-heading compact">
            <p>Checklist</p>
            <h2>出發前確認</h2>
          </div>
          {packingList.map((item) => (
            <button key={item} type="button" onClick={() => toggleItem(item)} className={checked[item] ? 'done' : ''}>
              <span>{checked[item] ? <Check size={16} /> : null}</span>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section id="transport" className="section tips-section">
        <div className="section-heading">
          <p>Travel Notes</p>
          <h2>容易踩雷的提醒</h2>
        </div>
        <div className="tips-grid transport-grid">
          {routeNotes.map((note) => (
            <article key={note}>
              <h3><Clock3 size={18} /> 注意</h3>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section tips-section">
        <div className="section-heading">
          <p>Meals By Day</p>
          <h2>每天優先吃這些</h2>
        </div>
        <div className="tips-grid meals-grid">
          {tripDays.map((item) => (
            <article key={item.day}>
              <h3>Day {item.day}</h3>
              {item.meals.map((meal) => (
                <p key={meal}><Utensils size={15} /> {meal}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section id="install" className="section install-section">
        <div>
          <p className="eyebrow"><Download size={16} /> PWA Install</p>
          <h2>同行的人都可以加到手機主畫面</h2>
          <p>
            用 Safari 或 Chrome 打開網址後加入主畫面，旅途中就能像 App 一樣查看航班、住宿、交通與每日行程。
          </p>
        </div>
        <ol>
          <li>iPhone：Safari 開啟網站，按分享，再選「加入主畫面」。</li>
          <li>Android：Chrome 開啟網站，按選單，再選「安裝應用程式」。</li>
          <li>出門前先開過一次，讓瀏覽器快取 PWA 資源。</li>
        </ol>
        <a className="map-link" href="https://www.google.com/maps/search/Haeundae+Busan" target="_blank" rel="noreferrer">
          開啟海雲台地圖 <ExternalLink size={16} />
        </a>
      </section>
    </main>
  );
}

export default App;
