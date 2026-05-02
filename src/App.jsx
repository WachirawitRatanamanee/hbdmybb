import React, { useState, useEffect } from 'react';
import { Lock, Heart, Calendar, Image as ImageIcon, MessageSquare, Puzzle, ChevronLeft, Gift } from 'lucide-react';

// ============================================================================
// ⚙️ [CONFIG] ตั้งค่าทุกอย่างตรงนี้ได้เลยครับ! 
// ============================================================================
const CONFIG = {
  password: "0610", 
  lockScreenHint: "วันเกิดเค้าคือรหัสผ่านนะ ❤️",

  // 🎨 2. สีหลักของแอป (ใช้โค้ดสี Hex)
  colors: {
    bg: "#FFF0F5", // สีพื้นหลัง (ชมพูอ่อน)
    primary: "#FFB6C1", // สีหลัก (ปุ่ม, แถบต่างๆ)
    text: "#d81b60", // สีตัวหนังสือ
  },

  // 🖼️ 3. รูปภาพทั้งหมด (เอาลิ้งค์รูปมาวางแทนที่ได้เลย)
  images: {
    introCake: "https://cdn-icons-png.flaticon.com/512/3962/3962916.png", // รูปเค้กหน้าแรก
    coupleMain: "https://images.unsplash.com/photo-1518199268815-95a171c6433e?w=500", // รูปคู่หน้าปลดล็อค (ถ้ามี)
    profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200", // รูปโปรไฟล์หน้าปฏิทิน
    
    // รูปในหน้า Our Memories (ใส่กี่รูปก็ได้)
    memoryPhotos: [
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400",
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400",
      "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=400",
      "https://images.unsplash.com/photo-1518199268815-95a171c6433e?w=400"
    ],
    
    // รูปในหน้า จิ๊กซอว์ 12 รูป (ตอนนี้ใส่รูปซ้ำให้เป็นตัวอย่าง)
    puzzlePhotos: 
      [
        1,2,
        3,4,
        5,6,
        7,8,
        9,10,
        11,12
      ],
  },

  // 📝 4. ข้อความต่างๆ
  text: {
    introTitle: "Happy Birthday",
    introSubtitle: "to ไออ้วน!!",
    introButton: "Special gift for you (Start!)",
    
    calendarStart: "2023-10-06T00:00:00", // วันเริ่มคบกัน (ปี-เดือน-วันTเวลา)
    calendarTitle: "Our Love Journey",
    calendarSubtitle: "เราคบกันมานานแค่ไหนแล้วน้าา 💖",
    
    puzzleSuccess: "ไอ้อ้วนของเค้าน่ารักที่สุดเลย!! 💖🐷",
    
    letterTitle: "Dear Petch", // ชื่อแฟน
    letterContent: `ถึงไอ้อ้วน... สุขสันต์วันเกิดนะ! ขอบคุณที่เข้ามาเป็นความสุขในทุกๆ วันของเค้า ขอบคุณที่คอยดูแลและทนความดื้อของเค้ามาตลอด ขอให้ปีนี้เป็นปีที่ดีของเธอ มีความสุขมากๆ และอยู่เป็นรอยยิ้มให้กันแบบนี้ไปนานๆ นะ รักเธอที่สุดเลย! 💕`
  }
};
// ============================================================================
// 🛑 จบส่วนตั้งค่า (ด้านล่างนี้คือโค้ดระบบ ไม่ต้องแก้ครับ)
// ============================================================================


export default function App() {
  const [currentScreen, setCurrentScreen] = useState('intro');

  // ควบคุมการเปลี่ยนหน้า
  const navigate = (screen) => setCurrentScreen(screen);

  // สไตล์พื้นฐานของแอป (จำกัดขนาดตาม iPhone 17 Air)
  const appStyle = {
    width: '420px',
    height: '912px',
    backgroundColor: CONFIG.colors.bg,
    color: CONFIG.colors.text,
    fontFamily: "'Prompt', sans-serif",
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    margin: '0 auto', // ให้อยู่ตรงกลางจอถ้าเปิดในคอม
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* โครงสร้างจำลอง iPhone */}
      <div style={appStyle} className="rounded-[40px] border-[8px] border-gray-800 bg-white relative">
        
        {/* Dynamic Screens */}
        {currentScreen === 'intro' && <IntroScreen onNext={() => navigate('lock')} />}
        {currentScreen === 'lock' && <LockScreen onUnlock={() => navigate('menu')} />}
        {currentScreen === 'menu' && <MenuScreen onNavigate={navigate} />}
        {currentScreen === 'memories' && <MemoriesScreen onBack={() => navigate('menu')} />}
        {currentScreen === 'calendar' && <CalendarScreen onBack={() => navigate('menu')} />}
        {currentScreen === 'puzzle' && <PuzzleScreen onBack={() => navigate('menu')} />}
        {currentScreen === 'notes' && <NotesScreen onBack={() => navigate('menu')} />}
        
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 1. หน้า Intro (หน้าแรกสุด)
// ------------------------------------------------------------------
function IntroScreen({ onNext }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center animate-fade-in" style={{ backgroundColor: CONFIG.colors.bg }}>
      <img src={CONFIG.images.introCake} alt="Cake" className="w-64 h-64 object-contain mb-8 drop-shadow-xl animate-bounce" />
      <h1 className="text-4xl font-bold mb-2">{CONFIG.text.introTitle}</h1>
      <h2 className="text-2xl mb-12">{CONFIG.text.introSubtitle}</h2>
      
      <button 
        onClick={onNext}
        className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg transform transition active:scale-95"
        style={{ backgroundColor: CONFIG.colors.primary }}
      >
        {CONFIG.text.introButton}
      </button>
    </div>
  );
}

// ------------------------------------------------------------------
// 2. หน้า Lock Screen (ใส่รหัสผ่าน)
// ------------------------------------------------------------------
function LockScreen({ onUnlock }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handlePress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === CONFIG.password) {
          setTimeout(onUnlock, 300);
        } else {
          setError(true);
          setTimeout(() => { setPin(""); setError(false); }, 500);
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 animate-slide-up" style={{ backgroundColor: CONFIG.colors.bg }}>
      <Lock size={48} color={CONFIG.colors.primary} className="mb-4" />
      <h2 className="text-2xl font-bold mb-2">Birthday's Lock</h2>
      <p className="mb-8 opacity-70">{CONFIG.text.lockScreenHint}</p>

      {/* จุดแสดงรหัส */}
      <div className={`flex gap-4 mb-12 ${error ? 'animate-shake' : ''}`}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={`w-6 h-6 rounded-full border-2 transition-all ${i < pin.length ? 'bg-pink-400 border-pink-400' : 'border-pink-300'}`} style={{ borderColor: CONFIG.colors.primary, backgroundColor: i < pin.length ? CONFIG.colors.primary : 'transparent' }} />
        ))}
      </div>

      {/* Numpad */}
      <div className="grid grid-cols-3 gap-6 w-full max-w-[280px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map((key, i) => (
          <div key={i} className="flex justify-center">
            {key !== '' && key !== 'del' ? (
              <button onClick={() => handlePress(key.toString())} className="w-16 h-16 rounded-full bg-white shadow-sm text-2xl font-bold active:bg-pink-100 flex items-center justify-center">
                {key}
              </button>
            ) : key === 'del' ? (
              <button onClick={() => setPin(pin.slice(0, -1))} className="w-16 h-16 flex items-center justify-center active:opacity-50">
                ⌫
              </button>
            ) : <div />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 3. หน้า Menu หลัก
// ------------------------------------------------------------------
function MenuScreen({ onNavigate }) {
  const menus = [
    { id: 'memories', icon: <ImageIcon size={32} />, title: 'Our Memories', desc: 'Every precious moment' },
    { id: 'calendar', icon: <Calendar size={32} />, title: 'Love Calendar', desc: 'Counting days of our story' },
    { id: 'puzzle', icon: <Puzzle size={32} />, title: 'Love Puzzle', desc: 'Pieces of our hearts' },
    { id: 'notes', icon: <MessageSquare size={32} />, title: 'Love Notes', desc: 'Sweet messages for you' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-6 animate-fade-in" style={{ backgroundColor: CONFIG.colors.bg }}>
      <div className="text-center mt-12 mb-10">
        <h2 className="text-3xl font-bold mb-2">Menu of Our Love</h2>
        <p className="flex items-center justify-center gap-2 opacity-80"><Heart size={16} fill={CONFIG.colors.primary} /> Together Forever</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {menus.map((m) => (
          <button 
            key={m.id} 
            onClick={() => onNavigate(m.id)}
            className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center text-center gap-3 active:scale-95 transition"
          >
            <div className="p-4 rounded-full bg-pink-50" style={{ color: CONFIG.colors.primary }}>
              {m.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm mb-1">{m.title}</h3>
              <p className="text-[10px] opacity-60 leading-tight">{m.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 4. หน้า Our Memories (แกลอรี่รูป)
// ------------------------------------------------------------------
function MemoriesScreen({ onBack }) {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden animate-slide-in">
      <Header title="Our Sweet Moments" onBack={onBack} />
      <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-3 pb-12">
        {CONFIG.images.memoryPhotos.map((img, idx) => (
          <div key={idx} className={`rounded-xl overflow-hidden shadow-sm ${idx % 3 === 0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}>
            <img src={img} alt={`Memory ${idx}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 5. หน้า Calendar (ตัวนับเวลา)
// ------------------------------------------------------------------
function CalendarScreen({ onBack }) {
  const [time, setTime] = useState({ y: 0, m: 0, d: 0, h: 0, min: 0, s: 0 });

  useEffect(() => {
    const start = new Date(CONFIG.text.calendarStart).getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - start;

      const y = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const m = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const d = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const min = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTime({ y, m, d, h, min, s });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center justify-center p-2 bg-white rounded-xl shadow-sm w-[55px]">
      <span className="text-xl font-bold" style={{ color: CONFIG.colors.primary }}>{value.toString().padStart(2, '0')}</span>
      <span className="text-[10px] opacity-70">{label}</span>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col animate-slide-in" style={{ backgroundColor: CONFIG.colors.bg }}>
      <Header title={CONFIG.text.calendarTitle} onBack={onBack} />
      <div className="flex-1 flex flex-col items-center pt-10 px-4">
        <p className="mb-8 font-medium">{CONFIG.text.calendarSubtitle}</p>
        
        <div className="w-32 h-32 rounded-full p-1 bg-white shadow-lg mb-10 relative">
          <img src={CONFIG.images.profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />
          <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md">
            <Heart size={20} fill={CONFIG.colors.primary} color={CONFIG.colors.primary} />
          </div>
        </div>

        <div className="flex gap-2 mb-8 justify-center flex-wrap px-2">
          <TimeBox value={time.y} label="Year" />
          <TimeBox value={time.m} label="Month" />
          <TimeBox value={time.d} label="Days" />
          <TimeBox value={time.h} label="Hours" />
          <TimeBox value={time.min} label="Mins" />
          <TimeBox value={time.s} label="Secs" />
        </div>

        <p className="text-sm opacity-80 mt-10">We've been in love for...</p>
        <p className="font-bold text-lg mt-1" style={{ color: CONFIG.colors.primary }}>love = 3000 inc ∞</p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 6. หน้า Puzzle (เกมจับคู่ Memory Game)
// ------------------------------------------------------------------
function PuzzleScreen({ onBack }) {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLocked, setIsLocked] = useState(false); // ป้องกันการกดรัวๆ ตอนกำลังเช็คคู่

  useEffect(() => {
    // ดึงรูป 6 รูปแรกจาก CONFIG มาทำเป็นคู่ (ถ้าใส่รูปมาไม่ถึง 6 ระบบจะวนซ้ำให้เอง)
    const basePhotos = [];
    for (let i = 0; i < 6; i++) {
      basePhotos.push(CONFIG.images.puzzlePhotos[i % CONFIG.images.puzzlePhotos.length]);
    }
    
    // สร้างไพ่ 12 ใบ (6 คู่) และสลับตำแหน่ง (Shuffle)
    const shuffledCards = [...basePhotos, ...basePhotos]
      .sort(() => Math.random() - 0.5)
      .map((img, id) => ({ id, img }));
      
    setCards(shuffledCards);
  }, []);

  const handleFlip = (index) => {
    // ห้ามกดถ้า: ระบบล็อคอยู่, ไพ่ถูกหงายอยู่แล้ว, หรือไพ่นั้นถูกจับคู่ไปแล้ว
    if (isLocked || flippedIndexes.includes(index) || matchedIndexes.includes(index)) return;

    const newFlipped = [...flippedIndexes, index];
    setFlippedIndexes(newFlipped);

    // เมื่อเปิดครบ 2 ใบ ให้ทำการเช็ค
    if (newFlipped.length === 2) {
      setIsLocked(true);
      const [firstIndex, secondIndex] = newFlipped;

      if (cards[firstIndex].img === cards[secondIndex].img) {
        // จับคู่ "สำเร็จ"
        const newMatched = [...matchedIndexes, firstIndex, secondIndex];
        setMatchedIndexes(newMatched);
        setFlippedIndexes([]);
        setIsLocked(false);

        // ถ้าจับคู่ครบทุกใบแล้ว (ชนะเกม)
        if (newMatched.length === cards.length) {
          setTimeout(() => setShowModal(true), 500);
        }
      } else {
        // จับคู่ "ผิด" ให้รอ 1 วินาทีแล้วคว่ำไพ่กลับ
        setTimeout(() => {
          setFlippedIndexes([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col animate-slide-in" style={{ backgroundColor: CONFIG.colors.bg }}>
      <Header title="Love Puzzle" onBack={onBack} />
      <p className="text-center text-sm opacity-70 mt-4 mb-6">จับคู่รูปความทรงจำของเราให้ครบนะ ❤️</p>
      
      <div className="grid grid-cols-3 gap-3 px-6">
        {cards.map((card, idx) => {
          const isRevealed = flippedIndexes.includes(idx) || matchedIndexes.includes(idx);
          return (
            <div 
              key={idx} 
              onClick={() => handleFlip(idx)}
              className={`aspect-square rounded-xl cursor-pointer transition-all duration-300 transform preserve-3d relative shadow-sm ${isRevealed ? 'scale-105 shadow-md' : 'active:scale-95'}`}
            >
              {isRevealed ? (
                <img src={card.img} alt="puzzle" className="w-full h-full object-cover rounded-xl animate-fade-in" />
              ) : (
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center border-2 border-dashed border-pink-200">
                  <span className="text-2xl opacity-30 text-pink-400">?</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pop-up แสดงตอนเล่นชนะ */}
      {showModal && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="bg-white p-8 rounded-3xl text-center shadow-2xl w-full max-w-[320px] animate-bounce-short">
            <Gift size={48} color={CONFIG.colors.primary} className="mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-6 text-gray-800">{CONFIG.text.puzzleSuccess}</h3>
            <button 
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl text-white font-bold active:scale-95 transition"
              style={{ backgroundColor: CONFIG.colors.primary }}
            >
              ปิด (Love you)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------
// 7. หน้า Love Notes (จดหมาย)
// ------------------------------------------------------------------
function NotesScreen({ onBack }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col animate-slide-in relative" style={{ backgroundColor: CONFIG.colors.bg }}>
      <Header title="Love Notes" onBack={onBack} />
      
      <div className="flex-1 flex items-center justify-center p-6">
        {!isOpen ? (
          <div 
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:scale-105 transition-transform animate-pulse text-center"
          >
            {/* วาดรูปซองจดหมาย CSS */}
            <div className="w-64 h-40 bg-pink-400 rounded-lg relative shadow-xl flex items-center justify-center">
              <div className="absolute top-0 w-0 h-0 border-l-[128px] border-r-[128px] border-t-[80px] border-transparent border-t-pink-300 opacity-80" />
              <Heart size={40} fill="white" color="white" className="z-10 mt-4" />
            </div>
            <p className="mt-6 text-sm font-bold opacity-70">Tap to open 💌</p>
          </div>
        ) : (
          <div className="w-full h-[70%] bg-white rounded-2xl shadow-xl p-8 relative animate-slide-up">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 opacity-50">✕</button>
            <h3 className="text-2xl font-bold mb-6" style={{ color: CONFIG.colors.primary }}>{CONFIG.text.letterTitle}</h3>
            <p className="leading-relaxed opacity-80 whitespace-pre-wrap">
              {CONFIG.text.letterContent}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// UI Component ย่อย: ส่วนหัว (Header) ที่มีปุ่ม Back
// ------------------------------------------------------------------
function Header({ title, onBack }) {
  return (
    <div className="pt-12 pb-4 px-4 flex items-center sticky top-0 z-10 bg-white/50 backdrop-blur-md">
      <button onClick={onBack} className="p-2 active:bg-pink-100 rounded-full transition">
        <ChevronLeft size={24} />
      </button>
      <h2 className="flex-1 text-center font-bold text-lg mr-8">{title}</h2>
    </div>
  );
}