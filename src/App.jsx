import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Download,
  ExternalLink,
  MapPin,
  Plane,
  ShipWheel,
  Star,
  Train,
  Utensils,
  WalletCards,
} from 'lucide-react';

const tripDays = [
  {
    day: 1,
    title: '抵達釜山・南浦洞夜景',
    area: '金海機場 / 南浦洞 / 札嘎其',
    vibe: '抵達後先放慢，從海味與夜景進入釜山節奏。',
    accent: '#0f766e',
    stops: [
      { time: '上午', name: '抵達金海國際機場', detail: '搭輕軌轉地鐵進市區，先買 T-money 或交通卡。', icon: Plane },
      { time: '中午', name: '飯店寄放行李', detail: '建議住西面、南浦洞或海雲台，移動最省力。', icon: MapPin },
      { time: '下午', name: 'BIFF 廣場與國際市場', detail: '吃黑糖餅、魚板、辣炒年糕，順路買小物。', icon: Utensils },
      { time: '傍晚', name: '札嘎其市場', detail: '看港邊漁市場，晚餐可安排海鮮鍋或烤魚。', icon: ShipWheel },
      { time: '晚上', name: '釜山塔 / 龍頭山公園', detail: '第一晚用城市夜景收尾，步行回南浦洞很方便。', icon: Star },
    ],
    food: ['黑糖餅', '釜山魚板', '海鮮鍋'],
    notes: ['第一天不要塞太滿', '機場到市區約 45-70 分鐘', '晚餐尖峰可先取號'],
  },
  {
    day: 2,
    title: '甘川文化村・松島海岸',
    area: '甘川 / 松島 / 影島',
    vibe: '彩色山城、海上纜車與港口散步，是很釜山的一天。',
    accent: '#d97706',
    stops: [
      { time: '上午', name: '甘川文化村', detail: '早點到避開人潮，從小王子觀景點一路慢慢逛。', icon: MapPin },
      { time: '中午', name: '土城站附近午餐', detail: '可找豬肉湯飯或冷麵，補足體力。', icon: Utensils },
      { time: '下午', name: '松島海上纜車', detail: '天氣好選水晶車廂，海景最漂亮。', icon: Train },
      { time: '傍晚', name: '松島天空步道', detail: '海風吹起來很舒服，適合拍夕陽。', icon: ShipWheel },
      { time: '晚上', name: '影島咖啡街或回南浦洞', detail: '想安靜就去影島咖啡廳，想熱鬧就回南浦。', icon: Star },
    ],
    food: ['豬肉湯飯', '冷麵', '海景咖啡'],
    notes: ['甘川坡多，穿好走的鞋', '纜車視天候調整', '影島晚上叫車較方便'],
  },
  {
    day: 3,
    title: '海雲台・青沙浦・膠囊列車',
    area: '海雲台 / 青沙浦 / 尾浦',
    vibe: '把海留給今天，安排經典膠囊列車與海邊散步。',
    accent: '#2563eb',
    stops: [
      { time: '上午', name: '海雲台海水浴場', detail: '從海邊散步開始，順路拍 Haeundae 標誌。', icon: ShipWheel },
      { time: '中午', name: '海雲台市場午餐', detail: '可吃密陽血腸豬肉湯飯、烤貝或小吃。', icon: Utensils },
      { time: '下午', name: 'Blue Line Park 膠囊列車', detail: '建議事先訂票，尾浦到青沙浦方向視野很棒。', icon: Train },
      { time: '傍晚', name: '青沙浦天空步道', detail: '安排在日落前後，海與燈塔都好拍。', icon: MapPin },
      { time: '晚上', name: 'The Bay 101 夜景', detail: '看海雲台高樓倒影，晚餐或宵夜都適合。', icon: Star },
    ],
    food: ['豬肉湯飯', '烤貝', '海鮮拉麵'],
    notes: ['膠囊列車熱門時段要預約', '海邊風大帶外套', '這天適合排住宿在海雲台'],
  },
  {
    day: 4,
    title: '海東龍宮寺・西面購物',
    area: '機張 / 海東龍宮寺 / 西面',
    vibe: '上午看海邊寺廟，下午回到市中心採買與美食。',
    accent: '#7c3aed',
    stops: [
      { time: '上午', name: '海東龍宮寺', detail: '面海寺廟很有代表性，早上去光線柔和、人也較少。', icon: MapPin },
      { time: '中午', name: '機張市場或海雲台午餐', detail: '想吃海鮮走機張，想省移動就回海雲台。', icon: Utensils },
      { time: '下午', name: '新世界 Centum City', detail: '雨天備案也很好，逛街、甜點、汗蒸幕都能排。', icon: WalletCards },
      { time: '傍晚', name: '西面地下街', detail: '買美妝、衣服、伴手禮，動線集中。', icon: WalletCards },
      { time: '晚上', name: '西面美食街', detail: '用韓牛、烤肉或辣雞爪當最後一個完整夜晚。', icon: Star },
    ],
    food: ['機張海鮮', '韓式烤肉', '辣雞爪'],
    notes: ['海東龍宮寺交通時間較長', '購物可預留退稅時間', '最後一晚整理行李'],
  },
  {
    day: 5,
    title: '咖啡收尾・返程',
    area: '田浦咖啡街 / 西面 / 金海機場',
    vibe: '最後一天不趕景點，留時間補買、喝咖啡、順順去機場。',
    accent: '#db2777',
    stops: [
      { time: '上午', name: '田浦咖啡街', detail: '挑一間喜歡的咖啡廳，慢慢整理照片與戰利品。', icon: Utensils },
      { time: '中午', name: '西面午餐', detail: '回訪最喜歡的一餐，或吃拌飯、炸雞、冷麵。', icon: Utensils },
      { time: '下午', name: '樂天百貨 / 超市補貨', detail: '買泡麵、零食、面膜與伴手禮。', icon: WalletCards },
      { time: '返程前', name: '前往金海機場', detail: '國際線建議起飛前 2.5-3 小時抵達機場。', icon: Train },
      { time: '晚上', name: '回程', detail: '把 PWA 留在手機，下一趟旅行可以沿用格式。', icon: Plane },
    ],
    food: ['咖啡甜點', '韓式炸雞', '超市零食'],
    notes: ['預留交通與退稅時間', '液體伴手禮注意托運', '最後確認護照與充電器'],
  },
];

const quickInfo = [
  { label: '天數', value: '5 天 4 夜', icon: CalendarDays },
  { label: '城市', value: '韓國釜山', icon: MapPin },
  { label: '節奏', value: '景點 + 美食 + 購物', icon: Star },
  { label: '交通', value: '地鐵 / 公車 / 計程車', icon: Train },
];

const packingList = [
  '護照與訂房資料',
  'T-money / 信用卡 / 少量現金',
  '行動電源與轉接頭',
  '好走的鞋',
  '薄外套',
  '雨傘或輕便雨衣',
  '常備藥',
  '購物袋',
];

function App() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('busan-trip-checks') || '{}');
    } catch {
      return {};
    }
  });

  const day = useMemo(
    () => tripDays.find((item) => item.day === selectedDay) || tripDays[0],
    [selectedDay],
  );

  const toggleItem = (item) => {
    const key = `day-${day.day}-${item}`;
    const next = { ...checked, [key]: !checked[key] };
    setChecked(next);
    localStorage.setItem('busan-trip-checks', JSON.stringify(next));
  };

  const installTips = [
    'iPhone：Safari 開啟網站，按分享，再選「加入主畫面」。',
    'Android：Chrome 開啟網站，按選單，再選「安裝應用程式」。',
    '安裝後可從手機桌面打開，行程會快取，旅途中查看更方便。',
  ];

  return (
    <main className="app-shell">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow"><Plane size={16} /> Busan PWA Guide</p>
          <h1>釜山 5 天 4 夜行程</h1>
          <p className="hero__copy">
            從南浦洞、甘川文化村到海雲台膠囊列車，把景點、美食、購物與返程提醒整理成手機可安裝的離線行程。
          </p>
          <div className="hero__actions">
            <a href="#itinerary" className="primary-action">
              查看行程 <ChevronRight size={18} />
            </a>
            <a href="#install" className="secondary-action">
              <Download size={18} /> 安裝到手機
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

      <section id="itinerary" className="section itinerary-section">
        <div className="section-heading">
          <p>Daily Plan</p>
          <h2>每天打開就知道去哪裡</h2>
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
            <span>Day {day.day}</span>
            <h3>{day.title}</h3>
            <p><MapPin size={16} /> {day.area}</p>
            <p>{day.vibe}</p>
          </div>

          <div className="timeline">
            {day.stops.map(({ time, name, detail, icon: Icon }) => (
              <div key={`${time}-${name}`} className="timeline-item">
                <div className="timeline-icon"><Icon size={18} /></div>
                <div>
                  <time>{time}</time>
                  <h4>{name}</h4>
                  <p>{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="section split-section">
        <div className="info-panel">
          <div className="section-heading compact">
            <p>Food List</p>
            <h2>每天想吃什麼</h2>
          </div>
          <div className="food-grid">
            {tripDays.map((item) => (
              <div key={item.day} className="food-day">
                <strong>Day {item.day}</strong>
                <div>
                  {item.food.map((food) => (
                    <span key={food}>{food}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="info-panel checklist">
          <div className="section-heading compact">
            <p>Checklist</p>
            <h2>出發前確認</h2>
          </div>
          {packingList.map((item) => {
            const key = `packing-${item}`;
            return (
              <button key={item} type="button" onClick={() => toggleItem(item)} className={checked[key] ? 'done' : ''}>
                <span>{checked[key] ? <Check size={16} /> : null}</span>
                {item}
              </button>
            );
          })}
        </div>
      </section>

      <section className="section tips-section">
        <div className="section-heading">
          <p>Travel Notes</p>
          <h2>實用提醒</h2>
        </div>
        <div className="tips-grid">
          {tripDays.map((item) => (
            <article key={item.day}>
              <h3>Day {item.day}</h3>
              {item.notes.map((note) => (
                <p key={note}><Clock3 size={15} /> {note}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section id="install" className="section install-section">
        <div>
          <p className="eyebrow"><Download size={16} /> PWA Install</p>
          <h2>大家都可以下載到手機查看</h2>
          <p>
            部署後把網址傳給同行朋友，大家用手機瀏覽器打開，就能加入主畫面；之後像 App 一樣從桌面開啟。
          </p>
        </div>
        <ol>
          {installTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ol>
        <a className="map-link" href="https://www.google.com/maps/search/Busan+South+Korea" target="_blank" rel="noreferrer">
          開啟釜山地圖 <ExternalLink size={16} />
        </a>
      </section>
    </main>
  );
}

export default App;
