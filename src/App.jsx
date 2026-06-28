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
    when: 'Day 2',
    level: '一定要提前',
    detail: '尾浦 -> 青沙浦方向，建議先搶 10:30 或 16:00 後；沒提前預約很容易沒票。',
    url: maps('Haeundae Blue Line Park Mipo Station'),
  },
  {
    title: 'Skyline Luge Busan',
    when: 'Day 2',
    level: '建議先買',
    detail: '若買釜山 Pass 或套票，出發前先確認可用設施、入場方式與營業時間。',
    url: maps('Skyline Luge Busan'),
  },
  {
    title: '烤肉的男子 廣安里店',
    when: 'Day 4',
    level: 'Naver Map 訂位',
    detail: '週六晚餐熱門，建議 17:30-19:00 間訂位；全程代烤，接廣安里夜景剛好。',
    url: maps('고기굽는남자 광안리점'),
  },
  {
    title: '廣安里遊艇',
    when: 'Day 4',
    level: '提前預約',
    detail: '選日落後或無人機表演前後時段，並確認集合碼頭與報到時間。',
    url: maps('Gwangalli yacht tour Busan'),
  },
  {
    title: '廣安里無人機表演',
    when: 'Day 4',
    level: '出發前確認',
    detail: '通常週六才有，但時間、場次與取消資訊要看官方公告，天候差可能停演。',
    url: maps('Gwangalli Beach drone show'),
  },
  {
    title: '豚笑 南浦店',
    when: 'Day 3',
    level: '現場取號',
    detail: '參考做法：10:00 先抽號碼牌，附近晃一下，約 10:50 回來吃。',
    url: maps('돈카츠 톤쇼우 남포점'),
  },
];

const foodShortlist = [
  {
    category: 'Day 2 青沙浦晚餐二選一',
    note: '31cm 海鮮刀削麵和秀敏家都在青沙浦/海雲台東側一帶，適合接膠囊列車後吃；不需要跨區折返。',
    picks: [
      { name: '31cm 海鮮刀削麵', url: maps('31cm 해물칼국수 부산 청사포') },
      { name: '秀敏家烤扇貝', url: maps('수민이네 청사포') },
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
    category: '本次排入主線',
    note: '依照地理位置放進每天路線，不特地折返。',
    picks: [
      { name: '陜川一流豬肉湯飯', url: maps('합천일류돼지국밥 부산') },
      { name: 'DIART Coffee 青沙浦', url: maps('디아트커피 청사포') },
      { name: '機張市場吃蟹', url: maps('기장시장 대게') },
      { name: '豚笑 南浦店', url: maps('돈카츠 톤쇼우 남포점') },
      { name: '烤肉的男子 廣安里店', url: maps('고기굽는남자 광안리점') },
      { name: 'Your Type 田浦店', url: maps('Your Type Jeonpo Busan') },
      { name: '60炸雞 西面店', url: maps('60계치킨 서면') },
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
        place: '陜川一流豬肉湯飯',
        url: maps('합천일류돼지국밥 부산'),
        detail: '24 小時、比較不用排隊，適合抵達日晚餐。若太累，也可換海雲台市場小麥麵或草梁小麥麵。',
        transport: '飯店 -> 店家：依實際分店用 Naver Map，海雲台圈內多半步行或計程車 5-10 分。',
        next: '到下一站：去海雲台海灘步行約 5-15 分。',
        reserve: '不用預約，當晚機動安排。',
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
    meals: ['陜川一流豬肉湯飯', '海雲台傳統市場小麥麵備案', '海雲台名品糖餅', '常客客人宵夜備案'],
    uberTip: '第一天機場到海雲台建議計程車/Uber，省轉乘與拖行李時間。',
  },
  {
    day: 2,
    date: '8/27 週四',
    title: '膠囊列車・青沙浦・東釜山 Pass 日',
    base: '尾浦 / 青沙浦 / 松亭 / 海東龍宮寺 / 機張',
    accent: '#2563eb',
    summary: '把海雲台往東的景點全部排一起：膠囊列車、青沙浦咖啡、海東龍宮寺、Skyline Luge、機張市場吃蟹。',
    plan: [
      {
        time: '09:00',
        place: 'All Sunday Bagel 海雲台',
        url: maps('올선데이베이글 해운대'),
        detail: '貝果當早餐，肉桂胡桃糖霜如果太厚可以刮掉一點。吃完去尾浦站剛好。',
        transport: '飯店 -> All Sunday：步行/計程車約 5-15 分；All Sunday -> 尾浦站約 10-15 分。',
        next: '到下一站：尾浦站約 10-15 分。',
        reserve: '熱門店可能排隊，早點去。',
        icon: Utensils,
      },
      {
        time: '10:30',
        place: '天空膠囊列車：尾浦 -> 青沙浦',
        url: maps('Haeundae Blue Line Park Mipo Station'),
        detail: '選海景方向，早上光線清楚；若更想拍夕陽，可改訂 16:00 後，但後面機張行程會更趕。',
        transport: '尾浦站上車，膠囊列車到青沙浦約 30 分。',
        next: '到下一站：青沙浦站到咖啡廳/天空步道步行約 5-12 分。',
        reserve: '必須提前預約。Klook/官網都可看票，熱門時段很快滿。',
        icon: Train,
      },
      {
        time: '11:20',
        place: '青沙浦天空步道 + DIART Coffee',
        url: maps('디아트커피 청사포'),
        detail: 'DIART Coffee 青沙浦店建議開門前 10 分鐘到；天空步道順路拍照，不要停太久。',
        transport: '青沙浦站 -> DIART / 天空步道：步行約 5-12 分。',
        next: '到下一站：回青沙浦站搭海岸列車約 5-10 分。',
        reserve: 'DIART 不一定能訂，重點是早到。',
        icon: Sparkles,
      },
      {
        time: '12:50',
        place: '海岸列車：青沙浦 -> 松亭',
        url: maps('Cheongsapo Station Haeundae Blue Line Park to Songjeong Station'),
        detail: '接海岸列車到松亭，午餐吃龍宮炸醬麵，當作去海東龍宮寺前的中繼。',
        transport: '青沙浦 -> 松亭海岸列車約 10-15 分；松亭站 -> 午餐步行/計程車約 5-10 分。',
        next: '到下一站：松亭到海東龍宮寺計程車約 12-20 分。',
        reserve: '海岸列車班次也先查，避免等太久。',
        icon: Train,
      },
      {
        time: '14:20',
        place: '海東龍宮寺',
        url: maps('Haedong Yonggungsa Temple'),
        detail: '海邊寺廟很值得，但樓梯不少。排下午剛好避開最早人潮。',
        transport: '松亭 -> 海東龍宮寺：計程車約 12-20 分；公車約 30-45 分。',
        next: '到下一站：到 Skyline Luge / Outlet 計程車約 10-15 分。',
        reserve: '不用預約，穿好走鞋。',
        icon: MapPin,
      },
      {
        time: '16:00',
        place: 'Skyline Luge 或樂天 Outlet',
        url: maps('Skyline Luge Busan'),
        detail: '想玩就 Luge，想輕鬆就 Outlet。若買釜山 Pass，這天最適合集中使用。',
        transport: '海東龍宮寺 -> Skyline Luge / Outlet：計程車約 10-15 分。',
        next: '到下一站：到機張市場計程車約 15-25 分。',
        reserve: 'Luge 建議先買票，確認 Pass 當日可用。',
        icon: Ticket,
      },
      {
        time: '18:00',
        place: '機張市場吃帝王蟹 / 松葉蟹',
        url: maps('기장시장 대게'),
        detail: '這餐是本日主菜。比起札嘎其，機張更符合你想吃新鮮蟹的方向。',
        transport: 'Luge/Outlet -> 機張市場：計程車約 15-25 分；機張 -> 飯店約 30-45 分。',
        next: '今日結束：回海雲台飯店計程車約 30-45 分。',
        reserve: '現場挑蟹，價格先問清楚；清蒸最推薦。',
        icon: Utensils,
      },
    ],
    meals: ['All Sunday Bagel', 'DIART Coffee', '龍宮炸醬麵', '機張市場帝王蟹/松葉蟹', '海城烤腸宵夜備案'],
    uberTip: '今天後半段景點分散，松亭之後建議一路計程車，省下大量等車和轉乘時間。',
  },
  {
    day: 3,
    date: '8/28 週五',
    title: '南浦・松島・影島・白淺灘',
    base: '南浦洞 / 松島 / 影島 / 白淺灘文化村',
    accent: '#d97706',
    summary: '把西邊景點集中一天，避免每天從海雲台來回橫跨。先取號吃豚笑，再玩松島纜車、影島咖啡和白淺灘。',
    plan: [
      {
        time: '08:45',
        place: '海雲台出發到南浦洞',
        url: maps('Haeundae Beach to Nampo-dong Busan'),
        detail: '今天跨區較遠，早點出門。若 3 人以上可直接計程車，不然搭地鐵避塞車。',
        transport: '飯店 -> 南浦洞：地鐵約 60-75 分；計程車約 50-70 分。',
        next: '到下一站：抵達後步行到豚笑約 5-15 分。',
        reserve: '用 Naver Map 看即時路況再決定。',
        icon: Navigation,
      },
      {
        time: '10:00',
        place: '豚笑 南浦店抽號碼牌',
        url: maps('돈카츠 톤쇼우 남포점'),
        detail: '參考你給的做法：10:00 先取號，登記後去附近晃，10:50 左右回來吃。',
        transport: '南浦站周邊步行約 5-15 分。',
        next: '到下一站：附近快逛再回店，約 40-50 分緩衝。',
        reserve: '必做：現場取號。晚到可能等很久。',
        icon: Ticket,
      },
      {
        time: '10:50',
        place: '豚笑碳烤黑豬肉炸豬排',
        url: maps('돈카츠 톤쇼우 남포점'),
        detail: '這餐列為必吃。札嘎其海鮮不排正餐，只順路逛市場。',
        transport: '店內用餐；吃完可步行到札嘎其/BIFF。',
        next: '到下一站：札嘎其/BIFF 步行約 10-15 分。',
        reserve: '用餐後不要再塞太多小吃，下午還有咖啡。',
        icon: Utensils,
      },
      {
        time: '12:20',
        place: '札嘎其市場 / BIFF / 國際市場快逛',
        url: maps('Jagalchi Market BIFF Square Busan'),
        detail: '札嘎其觀光價偏高，這版只安排看市場和補小吃，不在這裡吃帝王蟹。',
        transport: '豚笑 -> 札嘎其/BIFF：步行約 10-15 分。',
        next: '到下一站：松島纜車站計程車約 15-25 分。',
        reserve: '逛街時注意人多和包包。',
        icon: WalletCards,
      },
      {
        time: '13:40',
        place: '松島海上纜車',
        url: maps('Songdo Marine Cable Car Busan'),
        detail: '選透明車廂會比較好拍，腳下就是海。接著可走松島龍宮雲橋。',
        transport: '南浦洞 -> 松島纜車站：計程車約 15-25 分；公車約 25-40 分。',
        next: '到下一站：白淺灘文化村計程車約 20-30 分。',
        reserve: '現場可買，但假日或天氣好建議先買票。',
        icon: Ticket,
      },
      {
        time: '16:00',
        place: '白淺灘文化村 + Having Moment',
        url: maps('흰여울문화마을 Having Moment'),
        detail: '靠海巷弄很好拍，坡路多。Having Moment 是本日咖啡主選。',
        transport: '松島 -> 白淺灘文化村：計程車約 20-30 分。',
        next: '到下一站：Momos Coffee 影島店計程車約 10-20 分。',
        reserve: '穿好走鞋，海邊風大。',
        icon: MapPin,
      },
      {
        time: '17:30',
        place: 'Momos Coffee 影島店',
        url: maps('모모스커피 영도'),
        detail: '舊海港倉庫改建，工業風質感很好。若白淺灘拍太久，Momos 可當備案不硬塞。',
        transport: '白淺灘 -> Momos Coffee：計程車約 10-20 分。',
        next: '到下一站：回海雲台晚餐計程車約 55-75 分。',
        reserve: '咖啡廳出發前確認營業時間。',
        icon: Utensils,
      },
      {
        time: '19:30',
        place: '回海雲台：尾浦家生醃或釜飯 solssot',
        url: maps('해운대 미포끝집 솔솥 부산해운대점'),
        detail: '晚餐回飯店附近吃，避免在西邊玩到太晚再找餐廳。',
        transport: '影島/南浦 -> 海雲台：計程車約 55-75 分；地鐵約 70-90 分。',
        next: '今日結束：飯店附近步行或短程計程車約 5-15 分。',
        reserve: '尾浦家可能等位，太累就吃釜飯 solssot 或錦秀河豚。',
        icon: Utensils,
      },
    ],
    meals: ['豚笑 南浦店', 'Having Moment', 'Momos Coffee 影島店', '尾浦家生醃', '釜飯 solssot 海雲台'],
    uberTip: '今天跨區距離長，南浦到松島、松島到白淺灘都建議計程車；回海雲台看體力決定地鐵或計程車。',
  },
  {
    day: 4,
    date: '8/29 週六',
    title: 'Centum・廣安里遊艇・無人機夜',
    base: '海雲台 / Centum City / 廣安里',
    accent: '#7c3aed',
    summary: '週六留給廣安里，因為無人機表演通常只在週六。白天逛新世界，晚上烤肉、遊艇、看橋景。',
    plan: [
      {
        time: '09:30',
        place: '海雲台瓦房鱈魚湯或錦秀河豚',
        url: maps('해운대 기와집 대구탕 금수복국 해운대'),
        detail: '早上先吃一餐海雲台名店，兩間都比跑遠更順。',
        transport: '飯店 -> 店家：步行/計程車約 5-15 分。',
        next: '到下一站：Centum City 地鐵約 15-25 分，計程車約 12-20 分。',
        reserve: '熱門時段可能排隊，早點出門。',
        icon: Utensils,
      },
      {
        time: '11:30',
        place: '新世界百貨 Centum City / Spa Land',
        url: maps('Shinsegae Centum City Spa Land Busan'),
        detail: '世界級大百貨，潮牌、免稅、吃的都有。天氣不好也完全不影響。',
        transport: '海雲台 -> Centum City：地鐵約 15-25 分；計程車約 12-20 分。',
        next: '到下一站：廣安里計程車約 10-20 分，地鐵/公車約 25-35 分。',
        reserve: '退稅帶護照，單筆滿 15,000 韓元留意。',
        icon: WalletCards,
      },
      {
        time: '15:30',
        place: '廣安里海邊散步',
        url: maps('Gwangalli Beach Busan'),
        detail: '先到廣安里看白天到傍晚的廣安大橋，咖啡廳休息一下。',
        transport: 'Centum City -> 廣安里：計程車約 10-20 分；地鐵/公車約 25-35 分。',
        next: '到下一站：烤肉店步行/計程車約 5-15 分。',
        reserve: '海邊風很大，外套帶著。',
        icon: MapPin,
      },
      {
        time: '17:30',
        place: '烤肉的男子 廣安里店',
        url: maps('고기굽는남자 광안리점'),
        detail: 'Naver Map 可訂位、專人代烤、五花肉不油膩。放在廣安里晚餐最順。',
        transport: '廣安里海邊 -> 店家：步行/計程車約 5-15 分。',
        next: '到下一站：遊艇集合碼頭依位置計程車約 10-20 分。',
        reserve: '必須預約：Naver Map 訂位，週六晚不建議現場賭。',
        icon: Utensils,
      },
      {
        time: '19:30',
        place: '廣安里遊艇',
        url: maps('Gwangalli yacht tour Busan'),
        detail: '晚上出海看廣安大橋夜景，音樂和飲料餅乾很 chill。',
        transport: '烤肉店 -> 遊艇碼頭：依集合點計程車約 10-20 分。',
        next: '到下一站：回廣安里沙灘步行/計程車約 10-20 分。',
        reserve: '必須提前預約，並確認集合碼頭與報到時間。',
        icon: Ticket,
      },
      {
        time: '21:00',
        place: '廣安里無人機表演',
        url: maps('Gwangalli Beach drone show'),
        detail: '若當週有演出，這是整趟最適合放週六的亮點；若取消就改海邊酒吧或回飯店。',
        transport: '遊艇結束 -> 廣安里沙灘：步行/計程車依碼頭約 10-20 分。',
        next: '今日結束：回海雲台飯店計程車約 20-35 分。',
        reserve: '出發前查官方公告，天候或活動可能異動。',
        icon: Sparkles,
      },
    ],
    meals: ['海雲台瓦房鱈魚湯', '錦秀河豚', '烤肉的男子 廣安里店', 'BADA SAND 伴手禮', '伍班長備案'],
    uberTip: '廣安里晚上人多，遊艇集合點和飯店來回都建議叫車；但塞車時要預留緩衝。',
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
