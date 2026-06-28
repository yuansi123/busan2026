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
  Train,
  Utensils,
  WalletCards,
} from 'lucide-react';

const hotel = {
  name: '釜山迎武遊行飯店-海雲台海灘',
  localName: '부산 영무파라드호텔 해운대 비치',
  dates: '2026/8/26 - 2026/8/30',
  base: '海雲台海灘附近',
  note: '住海雲台很適合把東釜山、青沙浦、機張排在前面，廣安里和西面用計程車或地鐵穿插。',
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
  { label: '移動策略', value: '近程地鐵，跨區多用 Uber/計程車', icon: Navigation },
];

const foodShortlist = [
  {
    category: '豬肉湯飯',
    picks: ['密陽血腸豬肉湯飯 海雲台店', '松亭3代豬肉湯飯', '秀英本家豬肉湯飯'],
    note: '住海雲台，優先吃海雲台或水營線上順路店，不特地繞遠。',
  },
  {
    category: '烤肉',
    picks: ['83 獬豸烤肉', '伍班長', '男子烤肉', '釜山宅'],
    note: '晚上若不想等，能預約的店優先；熱門店建議用 Catch Table 或早點到。',
  },
  {
    category: '海鮮',
    picks: ['機張市場帝王蟹/松葉蟹', '秀敏家烤扇貝', '31cm 海鮮刀削麵'],
    note: '機張適合接在斜坡滑車或東釜山行程後，計程車直達最省力。',
  },
  {
    category: '小吃甜點',
    picks: ['海雲台名品糖餅', '西面맛분식 堅果糖餅', 'BADA SAND', 'All Sunday Bagel'],
    note: '糖餅口味建議先吃堅果黑糖原味；想甜一點再選起司或種子款。',
  },
  {
    category: '烤腸',
    picks: ['海城烤腸 본점', '味酒工房', '百花'],
    note: '海城烤腸本店在海雲台，最符合住宿位置，排宵夜最順。',
  },
];

const packingList = [
  '護照、機票訂位代號、飯店訂房資料',
  '台幣、韓元、信用卡、交通卡',
  '行動電源、轉接頭、充電線',
  '好走的鞋、薄外套、防曬',
  '雨傘或輕便雨衣',
  '常備藥、腸胃藥、暈車藥',
  '購物袋與行李秤',
  'Naver Map / Papago / Uber 或 Kakao T',
];

const routeNotes = [
  '釜山計程車通常比日本便宜，多人同行或跨區移動時很值得用。',
  '海雲台到青沙浦、機張、廣安里，用計程車能省很多轉乘時間。',
  '地鐵適合海雲台到西面、南浦洞這種避開塞車的長距離移動。',
  '所有交通時間都是預估值，出門前用 Naver Map 依當下路況確認。',
];

const tripDays = [
  {
    day: 1,
    date: '8/26 週三',
    title: '台中出發・抵達海雲台',
    base: '台中 / 桃園機場 T1 / 金海機場 / 海雲台',
    accent: '#0f766e',
    summary: '第一天重點是順利抵達，不硬塞景點。晚餐與散步都排飯店附近，飛完也不累。',
    plan: [
      {
        time: '07:00',
        place: '台中出發前往桃園機場 T1',
        detail: '建議包車或 Uber/計程車直達，約 1 小時 45 分 - 2 小時 15 分；若搭高鐵，抓 2 小時含轉乘。',
        transport: '台中 -> 桃園 T1：包車/計程車最穩；高鐵台中 -> 桃園約 40 分，再轉機捷/接駁約 20 分。',
        icon: Luggage,
      },
      {
        time: '09:00',
        place: '抵達桃園機場 T1',
        detail: '7C6152 12:00 起飛，抓起飛前 3 小時到機場；先報到、托運、吃早餐。',
        transport: '航班：7C6152，桃園 T1 12:00 -> 金海 PUS 15:30。',
        icon: Plane,
      },
      {
        time: '15:30',
        place: '抵達釜山金海機場',
        detail: '入境、領行李、買交通卡。若同行 2 人以上且有行李，直接叫 Uber/計程車到飯店最舒服。',
        transport: '金海機場 -> 海雲台飯店：計程車約 55-75 分；大眾運輸約 80-100 分。',
        icon: Navigation,
      },
      {
        time: '17:20',
        place: '入住釜山迎武遊行飯店-海雲台海灘',
        detail: '先放行李、整理一下。飯店在海雲台，晚上都用步行圈安排。',
        transport: '飯店 -> 海雲台市場/海灘：步行約 5-15 分。',
        icon: BedDouble,
      },
      {
        time: '18:30',
        place: '海雲台市場晚餐',
        detail: '首餐建議密陽血腸豬肉湯飯海雲台店，或先吃海雲台市場小吃。',
        transport: '飯店 -> 海雲台市場：步行約 8-12 分。',
        icon: Utensils,
      },
      {
        time: '20:00',
        place: '海雲台海灘 + 海雲台名品糖餅',
        detail: '散步看夜海，糖餅先點堅果黑糖原味；想更濃可以試起司堅果。',
        transport: '市場 -> 海灘：步行約 5-8 分；海灘 -> 飯店：步行約 5-10 分。',
        icon: Sparkles,
      },
    ],
    meals: ['密陽血腸豬肉湯飯', '海雲台名品糖餅', '海城烤腸本店宵夜備案'],
    uberTip: '第一天從機場到飯店建議直接計程車/Uber，省轉乘與拖行李時間。',
  },
  {
    day: 2,
    date: '8/27 週四',
    title: '海雲台・青沙浦・膠囊列車',
    base: '海雲台 / 尾浦 / 青沙浦',
    accent: '#2563eb',
    summary: '今天完全以飯店周邊向東延伸，膠囊列車、海景咖啡與海雲台美食一條線完成。',
    plan: [
      {
        time: '09:30',
        place: '海雲台海灘晨間散步',
        detail: '從飯店走到海灘，拍海雲台海岸線。天氣好可以順路買咖啡。',
        transport: '飯店 -> 海雲台海灘：步行約 5-10 分。',
        icon: MapPin,
      },
      {
        time: '10:30',
        place: 'BUSAN X the SKY 或海雲台市場',
        detail: '想看高空景就上 X the SKY；想輕鬆吃早午餐就 All Sunday Bagel 或市場小吃。',
        transport: '海灘 -> X the SKY：步行約 10-15 分；或計程車約 5 分。',
        icon: Star,
      },
      {
        time: '13:00',
        place: 'Blue Line Park 膠囊列車',
        detail: '建議提早線上買票，尾浦到青沙浦方向海景最好。票熱門，這段是本日優先保留。',
        transport: '飯店/海灘 -> 尾浦站：步行約 15-20 分；計程車約 5-8 分。',
        icon: Train,
      },
      {
        time: '14:00',
        place: '青沙浦 Cafe Grinabom / DIART Coffee',
        detail: '選一間海景咖啡廳休息，也能買小伴手禮。若想拍窗景，Rendeja-vous 海雲台可改排回程。',
        transport: '青沙浦站 -> 咖啡廳：步行約 5-12 分。',
        icon: Utensils,
      },
      {
        time: '16:00',
        place: '青沙浦天空步道 / 燈塔',
        detail: '海邊風大，拍照後不要待太久。若天候差，改去新世界 Centum City。',
        transport: '咖啡廳 -> 天空步道：步行約 5-10 分。',
        icon: Route,
      },
      {
        time: '18:30',
        place: '31cm 海鮮刀削麵或烤扇貝',
        detail: '想吃熱湯麵選 31cm；想吃烤扇貝可選秀敏家。青沙浦晚餐後直接回飯店。',
        transport: '青沙浦 -> 飯店：計程車約 15-25 分；公車/地鐵轉乘約 35-50 分。',
        icon: Utensils,
      },
    ],
    meals: ['All Sunday Bagel', '青沙浦海景咖啡', '31cm 海鮮刀削麵', '秀敏家烤扇貝'],
    uberTip: '青沙浦晚上回海雲台建議計程車，通常省 20 分以上，也不用找轉乘。',
  },
  {
    day: 3,
    date: '8/28 週五',
    title: '機張・海東龍宮寺・市場吃蟹',
    base: '海東龍宮寺 / 機張市場 / 海雲台',
    accent: '#d97706',
    summary: '把東釜山遠一點的點集中同一天，寺廟、海景咖啡、機張市場吃蟹順路完成。',
    plan: [
      {
        time: '09:00',
        place: '海東龍宮寺',
        detail: '從飯店直接搭計程車最省時間。早上去人潮較少，也比較不曬。',
        transport: '飯店 -> 海東龍宮寺：計程車約 25-35 分；大眾運輸約 55-75 分。',
        icon: MapPin,
      },
      {
        time: '11:00',
        place: 'Coralani Cafe 或 Moody Bread Market',
        detail: '海景咖啡和麵包店都在東釜山路線上，二選一即可，避免太撐。',
        transport: '海東龍宮寺 -> Coralani：計程車約 8-12 分；-> Moody Bread Market 約 10-15 分。',
        icon: Utensils,
      },
      {
        time: '13:00',
        place: '斜坡滑車 / 樂天 Outlet 備案',
        detail: '想玩就排 Skyline Luge；想逛街吹冷氣就改樂天 Premium Outlet 東釜山。',
        transport: '咖啡廳 -> 斜坡滑車/Outlet：計程車約 8-15 分。',
        icon: Sparkles,
      },
      {
        time: '16:30',
        place: '機張市場吃帝王蟹 / 松葉蟹',
        detail: '照你參考的建議，玩完東釜山直接計程車去機張市場。蟹類清蒸最值得，把今天當海鮮大餐日。',
        transport: '斜坡滑車/Outlet -> 機張市場：計程車約 15-25 分，參考車資可能約 KRW 10,000-18,000。',
        icon: Utensils,
      },
      {
        time: '19:30',
        place: '回海雲台休息 / 海城烤腸宵夜',
        detail: '吃蟹後回飯店休息。若晚點還想吃，海城烤腸本店在海雲台，當宵夜最順。',
        transport: '機張市場 -> 飯店：計程車約 30-45 分；大眾運輸約 60-80 分。',
        icon: BedDouble,
      },
    ],
    meals: ['機張市場帝王蟹/松葉蟹', 'Coralani Cafe', 'Moody Bread Market', '海城烤腸本店'],
    uberTip: '今天幾乎每段都建議計程車，因為景點分散；多人分攤會比轉乘舒服很多。',
  },
  {
    day: 4,
    date: '8/29 週六',
    title: '廣安里・新世界・西面夜晚',
    base: '廣安里 / Centum City / 西面',
    accent: '#7c3aed',
    summary: '最後一個完整日排城市感：廣安大橋、百貨購物、西面美食，晚上不用趕回遠郊。',
    plan: [
      {
        time: '10:00',
        place: '廣安里海水浴場',
        detail: '看廣安大橋，白天拍照舒服。若想吃早午餐，廣安里有很多咖啡與貝果店。',
        transport: '飯店 -> 廣安里：計程車約 20-30 分；地鐵約 35-45 分。',
        icon: MapPin,
      },
      {
        time: '12:00',
        place: '水邊最高豬肉湯飯 / 秀英本家',
        detail: '午餐排你想吃的豬肉湯飯候選，水營/廣安里一帶順路。',
        transport: '廣安里 -> 水營/湯飯店：計程車約 8-15 分；地鐵/步行約 20-30 分。',
        icon: Utensils,
      },
      {
        time: '14:00',
        place: '新世界百貨 Centum City',
        detail: '購物、甜點、Sanrio/Kitty Cafe 類型打卡都放這裡；下雨也不怕。',
        transport: '水營/廣安里 -> Centum City：計程車約 10-15 分；地鐵約 15-25 分。',
        icon: WalletCards,
      },
      {
        time: '17:00',
        place: '西面地下街 / Olive Young / BADA SAND',
        detail: '補買伴手禮、美妝、零食。BADA SAND 可當伴手禮候選。',
        transport: 'Centum City -> 西面：地鐵約 25-35 分；計程車約 25-40 分視塞車。',
        icon: WalletCards,
      },
      {
        time: '19:00',
        place: '西面烤肉晚餐',
        detail: '優先 83 獬豸烤肉或伍班長；週六晚餐一定早點排或先預約。',
        transport: '西面商圈內：步行約 5-15 分。',
        icon: Utensils,
      },
      {
        time: '21:30',
        place: '回海雲台飯店',
        detail: '若還有體力可到 The Bay 101 看夜景；想休息就直接回飯店整理行李。',
        transport: '西面 -> 飯店：地鐵約 45-55 分；計程車約 35-50 分。',
        icon: BedDouble,
      },
    ],
    meals: ['水邊最高豬肉湯飯', '秀英本家豬肉湯飯', '83 獬豸烤肉', '伍班長', 'BADA SAND'],
    uberTip: '西面回海雲台若超過 3 人或購物很多，計程車會比地鐵舒服；週六晚可能塞車，時間抓鬆。',
  },
  {
    day: 5,
    date: '8/30 週日',
    title: '退房補買・南浦可選・回台灣',
    base: '海雲台 / 南浦洞可選 / 金海機場',
    accent: '#db2777',
    summary: '回程 19:10 起飛，今天不要排遠郊。以退房、寄放行李、補買和準時到機場為主。',
    plan: [
      {
        time: '09:30',
        place: '退房前海雲台早餐',
        detail: '濟州家鮑魚粥、大海鮑魚粥或簡單咖啡都可以。吃完回飯店退房寄行李。',
        transport: '飯店周邊早餐：步行約 5-15 分。',
        icon: Utensils,
      },
      {
        time: '11:00',
        place: '退房並寄放行李',
        detail: '把液體、保養品、戰利品先整理好，避免下午趕機場時重打包。',
        transport: '飯店內完成。',
        icon: Luggage,
      },
      {
        time: '11:30',
        place: '海雲台最後補買 / Spa Land 備案',
        detail: '如果想輕鬆，留在海雲台與 Centum City；如果很想跑南浦洞，午餐後再出發且 15:00 前回到取行李節奏。',
        transport: '飯店 -> Centum City：計程車約 12-20 分；地鐵約 15-25 分。',
        icon: WalletCards,
      },
      {
        time: '13:00',
        place: '可選：南浦洞 BIFF / 國際市場',
        detail: '只建議體力好、想補糖餅或伴手禮再去。否則留海雲台更穩。',
        transport: '海雲台 -> 南浦洞：地鐵約 60-75 分；計程車約 50-70 分。',
        icon: MapPin,
      },
      {
        time: '15:45',
        place: '回飯店取行李，出發金海機場',
        detail: 'BR163 19:10 起飛，建議 16:30-17:00 抵達機場。週日路況抓寬一點。',
        transport: '飯店 -> 金海機場：計程車約 55-75 分；大眾運輸約 80-100 分。',
        icon: Navigation,
      },
      {
        time: '19:10',
        place: 'BR163 回台北',
        detail: '金海 PUS 19:10 -> 桃園 T2 20:35。回台後再接車或高鐵回台中。',
        transport: '桃園 T2 -> 台中：包車約 1 小時 45 分 - 2 小時 15 分；機捷+高鐵約 1.5-2 小時。',
        icon: Plane,
      },
    ],
    meals: ['濟州家鮑魚粥', '大海鮑魚粥', '西面맛분식 堅果糖餅備案', '機場前簡餐'],
    uberTip: '最後一天最推薦飯店到機場直接計程車，尤其有行李與伴手禮時，不值得轉乘。',
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
          <h1>釜山 5 天 4 夜優化行程</h1>
          <p className="hero__copy">
            從台中出發到桃園搭機，住海雲台海灘，把航班、飯店、美食清單、景點與每段交通時間整理成手機可安裝的 PWA。
          </p>
          <div className="hero__actions">
            <a href="#itinerary" className="primary-action">
              查看每日路線 <ChevronRight size={18} />
            </a>
            <a href="#transport" className="secondary-action">
              <Navigation size={18} /> 交通策略
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

      <section id="itinerary" className="section itinerary-section">
        <div className="section-heading">
          <p>Daily Route</p>
          <h2>以海雲台為中心的五天動線</h2>
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
            {day.plan.map(({ time, place, detail, transport, icon: Icon }) => (
              <div key={`${time}-${place}`} className="timeline-item">
                <div className="timeline-icon"><Icon size={18} /></div>
                <div>
                  <time>{time}</time>
                  <h4>{place}</h4>
                  <p>{detail}</p>
                  <p className="transport"><Route size={14} /> {transport}</p>
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
            <h2>依住宿與動線挑過的美食</h2>
          </div>
          <div className="food-grid">
            {foodShortlist.map((item) => (
              <div key={item.category} className="food-day">
                <strong>{item.category}</strong>
                <div>
                  {item.picks.map((food) => (
                    <span key={food}>{food}</span>
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
          <p>Transport</p>
          <h2>交通優化原則</h2>
        </div>
        <div className="tips-grid transport-grid">
          {routeNotes.map((note) => (
            <article key={note}>
              <h3><Clock3 size={18} /> 預估提醒</h3>
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
