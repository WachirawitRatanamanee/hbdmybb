import { useState, useEffect } from 'react';
import { Lock, Heart, Calendar, Image as ImageIcon, MessageSquare, Puzzle, ChevronLeft, Gift } from 'lucide-react';

// ============================================================================
// ⚙️ [CONFIG] ตั้งค่าทุกอย่างตรงนี้ได้เลยครับ! 
// ============================================================================
const CONFIG = {
  password: "0411", // รหัสผ่านหน้าล็อค (เปลี่ยนได้ตามใจชอบ)
  lockScreenHint: "วันครบรอบวันไหนง่ะ",

  // 🎨 2. สีหลักของแอป (ใช้โค้ดสี Hex)
  colors: {
    bg: "#FFF0F5", // สีพื้นหลัง (ชมพูอ่อน)
    primary: "#FFB6C1", // สีหลัก (ปุ่ม, แถบต่างๆ)
    text: "#d81b60", // สีตัวหนังสือ
  },

  // 🖼️ 3. รูปภาพทั้งหมด (เอาลิ้งค์รูปมาวางแทนที่ได้เลย)
  images: {
    introCake: "pic/pic44.jpg", // รูปเค้กหน้าแรก
    coupleMain: "https://images.unsplash.com/photo-1518199268815-95a171c6433e?w=500", // รูปคู่หน้าปลดล็อค (ถ้ามี)
    profilePic: "pic/memoryPhotos/pic43.jpg", // รูปโปรไฟล์หน้าปฏิทิน
    
    // รูปในหน้า Our Memories (ใส่กี่รูปก็ได้)
    memoryPhotos: [
      {
        src: "/pic/memoryPhotos/pic1.jpg",
        message: "มันคือรูปแรกที่บบเปิดตัวเค้า ค่ดตึงงง ิิิ"
      },
      {
        src: "/pic/memoryPhotos/pic2.jpg",
        message: "หลังจากที่บบหนีเค้าไปนอนกะข้าวเจ้า เค้าเลยไปตามทวงคืน😡"
      },
      {
        src: "/pic/memoryPhotos/pic3.jpg",
        message: "แล้วเค้าก็ไปเที่ยวกะบบครั้งแรก วันนั้นเค้ายังง่วงๆงงๆอยากนอนยุเลย🥺"
      },
      {
        src: "/pic/memoryPhotos/pic4.jpg",
        message: "บบไปกดสิวที่หลังฟิรมากกก เค้าแอบถ่าย ิิ"
      },
      {
        src: "/pic/memoryPhotos/pic5.jpg",
        message: "บบไปเท่วกะเค้าอีกแล้วววว"
      },
      {
        src: "/pic/memoryPhotos/pic6.jpg",
        message: "อยู่รีเจ้นแล้วจ้าา เค้าย้อมผมด้วยยแหละ"
      },
      {
        src: "/pic/memoryPhotos/pic7.jpg",
        message: "เค้าพาบบแต่งคอสเพลย์ไปคอน คงจะฟิรมากสินะ😤"
      },
      {
        src: "/pic/memoryPhotos/pic8.jpg",
        message: "เค้าแอบพร่ำเพ้อถึงบบด้วยย (ข้อความบอกข้างกันของเราเป็นแบบนี้)"
      },
      {
        src: "/pic/memoryPhotos/pic9.jpg",
        message: "บบกายล่างเป็นเดดพูล😱 (ไปคอนอีกแล้วว)"
      },
      {
        src: "/pic/memoryPhotos/pic10.jpg",
        message: "บบไปคอนอีกแล้ววว รอบนี้จัดเต็มสุดดดด"
      },
      {
        src: "/pic/memoryPhotos/pic11.jpg",
        message: "และผลลัพธ์นั้น ฟิรมากกกกกก🫪"
      },
      {
        src: "/pic/memoryPhotos/pic12.jpg",
        message: "เค้าก็เลยเข้าร่วมด้วย.... เป็นปีใหม่ที่คอ่นข้างงงๆฟิรๆ ิิ"
      },
      {
        src: "/pic/memoryPhotos/pic13.jpg",
        message: "ตอนบบไปคอนแล้วบบอยากใส่ชุดไทยๆ (เห็นด้านหลังนั่นมั้ย เราย้ายมาอยู่ออคิดแร้ววววววว)"
      },
      {
        src: "/pic/memoryPhotos/pic14.jpg",
        message: "แล้วบบก็พาเค้าไปสงกรานต์ข้าวสาร (เกือบขาดอากาศหายใจตาย) แต่ฟิรมากก"
      },
      {
        src: "/pic/memoryPhotos/pic15.jpg",
        message: "บบก็เรยกายเป็นเจ้าหญิงตัวน้อยๆของเค้า"
      },
      {
        src: "/pic/memoryPhotos/pic16.jpg",
        message: "ถ่ายพรีกับบบด้วยแหละ"
      },
      {
        src: "/pic/memoryPhotos/pic17.jpg",
        message: "เฟี้ยวมั้ยยย บบนรสุดๆๆๆ"
      },
      {
        src: "/pic/memoryPhotos/pic18.jpg",
        message: "บบฟิรมากกก เค้าก็ฟิรมากกก"
      },
      {
        src: "/pic/memoryPhotos/pic19.jpg",
        message: "และในวันรับปริญญาบบ เค้าก็เรยจัดเตมเลยยยย"
      },
      {
        src: "/pic/memoryPhotos/pic20.jpg",
        message: "ิินรรร เค้าชอบมากกกกกกก"
      },
      {
        src: "/pic/memoryPhotos/pic21.jpg",
        message: "เค้าพาบบเดินพระนคร และซื้อดอกไม้"
      },
      {
        src: "/pic/memoryPhotos/pic22.jpg",
        message: "เค้าพาบบเดินพระนคร และซื้อดอกไม้ อีกแล้ว...."
      },
      {
        src: "/pic/memoryPhotos/pic23.jpg",
        message: "แล้วเค้าก็พาบบเดินพระนคร"
      },
      {
        src: "/pic/memoryPhotos/pic24.jpg",
        message: "แล้วก็พาบบเดินพระนคร"
      },
      {
        src: "/pic/memoryPhotos/pic25.jpg",
        message: "บบคงจะฟิรมาก เค้าก็เลยพาบบวิ่งพระนครซะเลย ฮ่าๆ"
      },
      {
        src: "/pic/memoryPhotos/pic26.jpg",
        message: "วันเกิดบบ บบจัดเตมมากกก บบสวยมากกกก"
      },
      {
        src: "/pic/memoryPhotos/pic27.jpg",
        message: "T_T บบเก่งสุดๆๆๆๆๆ"
      },
      {
        src: "/pic/memoryPhotos/pic28.jpg",
        message: "จากนั้นก็พาไปเดินพระนคร..."
      },
      {
        src: "/pic/memoryPhotos/pic29.jpg",
        message: "และเดินพระนครอีกครั้ง...."
      },
      {
        src: "/pic/memoryPhotos/pic30.jpg",
        message: "เค้าพาบบไปนอนเล่นเสาชิงช้าด้วยแหละะะ"
      },
      {
        src: "/pic/memoryPhotos/pic31.jpg",
        message: "ด้วยความฟิร เค้าก็เลยซื้อปลาเค็มให้บบ3เล่ม (ไม่รู้บบอ่านจบยังเค้าตะเตือนไตมาก T_T)"
      },
      {
        src: "/pic/memoryPhotos/pic32.jpg",
        message: "ก็เลยซื้อดอกไม้ให้อีก ิิ"
      },
      {
        src: "/pic/memoryPhotos/pic33.jpg",
        message: "เค้าฟิรวาเลนไทน์ชุดนี้มากกก บบตั้งใจสุดๆๆๆๆๆ"
      },
      {
        src: "/pic/memoryPhotos/pic34.jpg",
        message: "ฮืออออ เค้ารักบบ บบนรที่สุด บบทรงพระเจริญ บบยิ่งยืนนานT^T"
      },
      {
        src: "/pic/memoryPhotos/pic35.jpg",
        message: "ปีหม่ายยยยยยยยแล้วววว"
      },
      {
        src: "/pic/memoryPhotos/pic36.jpg",
        message: "เค้าแอบเซอไพรส์บบด้วยยย"
      },
      {
        src: "/pic/memoryPhotos/pic37.jpg",
        message: "บบแอบซื้อของขวัญวันเกิดให้เค้าT_T"
      },
      {
        src: "/pic/memoryPhotos/pic38.jpg",
        message: "วันคริสมาสสสสสสส"
      },
      {
        src: "/pic/memoryPhotos/pic39.jpg",
        message: "พรี่เสกกับเจ้กบตรึงๆ ิิ"
      },
      {
        src: "/pic/memoryPhotos/pic40.jpg",
        message: "เค้าแอบโดนงานไปทะเลกะบบด้วยยยยยย"
      },
      {
        src: "/pic/memoryPhotos/pic41.jpg",
        message: "ดอกบัวเซตแรกของบบ บบเกือบวีน แต่ดีนะที่รอดตายมาได้"
      },
      {
        src: "/pic/memoryPhotos/pic42.jpg",
        message: "บบพาเค้าไปเท่วบ้าน เค้าฟิรมากกกกT^T T^T T^T"
      },
      {
        src: "/pic/memoryPhotos/pic43.jpg",
        message: "เค้าซื้อดอกบัวให้บบด้วยแหละะะะ ฮี่ๆๆๆ"
      },
      {
        src: "/pic/memoryPhotos/pic32.jpg",
        message: "เค้ารักบบ T______T"
      }
    ],
    
    // รูปในหน้า จิ๊กซอว์ 12 รูป (ตอนนี้ใส่รูปซ้ำให้เป็นตัวอย่าง)
    puzzlePhotos: 
      [
        "/pic/puzzlePhotos/pic1.jpg",
        "/pic/puzzlePhotos/pic2.jpg",
        "/pic/puzzlePhotos/pic3.jpg",
        "/pic/puzzlePhotos/pic4.jpg",
        "/pic/puzzlePhotos/pic5.jpg",
        "/pic/puzzlePhotos/pic6.jpg",
      ],
  },

  // 📝 4. ข้อความต่างๆ
  text: {
    introTitle: "HBD my โบเบ๋", // ข้อความใหญ่หน้าแรก
    introSubtitle: "เด้กเร้กของเค้า", // ข้อความเล็กหน้าแรก
    introButton: "อยากรู้มั้ยว่ามีอะไรด้านใน? 🎁", // ข้อความปุ่มหน้าแรก
    
    calendarStart: "2022-10-21T00:00:00", // วันเริ่มคบกัน (ปี-เดือน-วันTเวลา) // 11 -1,4 +17
    calendarTitle: "ปฏิทินเหม้นฟามรักกกก", // ชื่อหน้าปฏิทิน
    calendarSubtitle: "เราคบกันมานานแค่ไหนแล้วน้าา 💖",
    calendarSec: "จำนวนวินาทีที่เค้ามีบบ 🌼", // ข้อความใต้ตัวนับเวลา
    
    puzzleSuccess: "ไอ้อ้วนของเค้าน่ารักที่สุดเลย!! 💖🐷",
    
    letterTitle: "Dear Khunsa", // ชื่อแฟน
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
      <img src={CONFIG.images.introCake} alt="Cake" className="w-64 h-64 object-contain mb-8 drop-shadow-xl rounded-full border-2 fill" />
      <h1 className="text-4xl font-bold mb-2">{CONFIG.text.introTitle}</h1>
      <h2 className="text-2xl mb-12">{CONFIG.text.introSubtitle}</h2>
      
      <button 
        onClick={onNext}
        className="px-8 animate-pulse py-4 rounded-full text-white font-bold text-lg shadow-lg transform transition active:scale-95"
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
  const [invalidAttempts, setInvalidAttempts] = useState(false);

  const handlePress = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === CONFIG.password) {
          setTimeout(onUnlock, 300);
        } else {
          setError(true);
          setInvalidAttempts(true);
          setTimeout(() => { setPin(""); setError(false); }, 500);
        }
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8 animate-slide-up" style={{ backgroundColor: CONFIG.colors.bg }}>
      <Lock size={48} color={CONFIG.colors.primary} className="mb-4" />
      <h2 className="text-2xl font-bold mb-2">คุณใช่บบตัวเร้กหรือไม่</h2>
      
      {/* 🟢 แก้ไขตรงนี้: เปลี่ยนจาก CONFIG.text.lockScreenHint เป็น CONFIG.lockScreenHint */}
      {invalidAttempts && <p className="mb-8 opacity-70 text-center">{CONFIG.lockScreenHint}</p>}

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
              <button onClick={() => setPin(pin.slice(0, -1))} className="w-16 h-16 flex items-center justify-center active:opacity-50 text-2xl">
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
    { id: 'memories', icon: <ImageIcon size={32} />, title: 'เก็บฟามทรงจำอิอิ', desc: 'เยอะมว๊ากกกกก' },
    { id: 'calendar', icon: <Calendar size={32} />, title: 'ปฏิทินเหม้นฟามรักกกก', desc: 'นับตั้งแต่เราคบกันอิอิ' },
    { id: 'puzzle', icon: <Puzzle size={32} />, title: 'เกมสำหรับเด้กเร้ก', desc: 'มีของขวัญด้วยยย' },
    { id: 'notes', icon: <MessageSquare size={32} />, title: 'ไม่บอก', desc: 'อย่ากดเข้ามานะ เค้าเขิน T^T' },
  ];

  return (
    <div className="w-full h-full flex flex-col p-6 animate-fade-in" style={{ backgroundColor: CONFIG.colors.bg }}>
      <div className="text-center mt-12 mb-10">
        <h2 className="text-3xl font-bold mb-2">อยากรู้ก็ต้องลองจิ้ม</h2>
        <p className="flex items-center justify-center gap-2 opacity-80"><Heart size={16} fill={CONFIG.colors.primary} />เค้าขยันเร้กน้อย ิิ</p>
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
// 4. หน้า Our Memories (ปัดทิ้งแบบ Tinder & เฟดภาพใหม่เข้ามา)
// ------------------------------------------------------------------
function MemoriesScreen({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // 🎛️ State สำหรับระบบ Tinder Swipe
  const [startX, setStartX] = useState(null);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [exitX, setExitX] = useState(0);
  const [isFading, setIsFading] = useState(false); // เพิ่ม State ควบคุมการเฟดภาพ

  const totalPhotos = CONFIG.images.memoryPhotos.length;
  const currentMemory = CONFIG.images.memoryPhotos[currentIndex];

  const handlePointerDown = (e) => {
    if (isFading) return; // บล็อคไม่ให้กดถ้ารูปกำลังเฟดอยู่
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setStartX(clientX);
    setIsDragging(true);
    setExitX(0);
  };

  const handlePointerMove = (e) => {
    if (!isDragging || startX === null) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setCurrentX(clientX - startX);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100; // ระยะทางที่ต้องลากให้ถึง

    if (currentX > threshold) {
      // ➡️ ปัดขวา (บินออกขวา แล้วย้อนรูป)
      setExitX(500); 
      triggerChangePhoto('prev');
    } else if (currentX < -threshold) {
      // ⬅️ ปัดซ้าย (บินออกซ้าย แล้วไปรูปถัดไป)
      setExitX(-500);
      triggerChangePhoto('next');
    } else if (Math.abs(currentX) < 10) {
      // 👆 แตะเฉยๆ (พลิกรูป)
      setIsFlipped(!isFlipped);
      setCurrentX(0);
    } else {
      // ↩️ ปล่อยนิ้วแต่ไม่ถึงระยะ (เด้งกลับ)
      setCurrentX(0);
    }
    setStartX(null);
  };

  // ฟังก์ชันจัดการจังหวะบินออก -> ซ่อน -> เฟดอิน
  const triggerChangePhoto = (direction) => {
    setTimeout(() => {
      // 1. หลังจากภาพบินออกไปแล้ว ให้ซ่อนภาพ (isFading=true) และดึงกลับมาตรงกลางทันที
      setIsFading(true);
      setIsFlipped(false);
      
      setCurrentIndex((prev) => {
        if (direction === 'next') return prev === totalPhotos - 1 ? 0 : prev + 1;
        return prev === 0 ? totalPhotos - 1 : prev - 1;
      });
      
      setCurrentX(0);
      setExitX(0);

      // 2. รอแปบนึงให้ DOM จัดตำแหน่งล่องหนเสร็จ แล้วค่อยสั่งเฟดภาพโชว์ (isFading=false)
      setTimeout(() => {
        setIsFading(false);
      }, 50); 
      
    }, 300); // 300ms คือเวลารอให้ภาพบินออกไปนอกจอให้เสร็จก่อน
  };

  // คำนวณสไตล์ของภาพแบบ Real-time
  const xOffset = exitX !== 0 ? exitX : currentX;
  const rotateDeg = xOffset * 0.05; 
  
  let transformStyle = `translateX(${xOffset}px) rotate(${rotateDeg}deg)`;
  let transitionStyle = isDragging ? 'none' : 'transform 0.3s ease-out';
  let opacityStyle = 1;

  if (isFading) {
    // จังหวะดึงรูปกลับมาตรงกลางแบบ "ล่องหน"
    transformStyle = `translateX(0px) rotate(0deg)`;
    transitionStyle = 'none'; // ปิดอนิเมชั่นเพื่อให้วาร์ปกลับมาทันที
    opacityStyle = 0; // ซ่อนรูป
  } else if (!isDragging && exitX === 0 && currentX === 0) {
    // จังหวะเฟดรูปใหม่เข้ามา หรือตั้งอยู่เฉยๆ
    transitionStyle = 'opacity 0.4s ease-in, transform 0.3s ease-out';
    opacityStyle = 1;
  }

  const swipeStyle = {
    transform: transformStyle,
    transition: transitionStyle,
    opacity: opacityStyle,
  };

  return (
    <div className="w-full h-full flex flex-col animate-slide-in overflow-hidden" style={{ backgroundColor: CONFIG.colors.bg }}>
      <Header title="เก็บฟามทรงจำอิอิ" onBack={onBack} />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16 relative">
        
        <div 
          className="w-full aspect-[4/5] cursor-grab active:cursor-grabbing absolute z-10"
          style={swipeStyle}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
        >
          <div 
            className="w-full h-full relative transition-transform duration-500 shadow-2xl rounded-3xl"
            style={{ 
              transformStyle: 'preserve-3d', 
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              perspective: '1000px'
            }}
          >
            {/* 🖼️ ด้านหน้า: รูปภาพ */}
            <div 
              className="absolute inset-0 w-full h-full bg-white border-4 border-white rounded-3xl overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <img 
                src={currentMemory.src} 
                alt={`Memory ${currentIndex}`} 
                className="w-full h-full object-cover select-none pointer-events-none"
                draggable="false"
              />
            </div>

            {/* 💌 ด้านหลัง: ข้อความ */}
            <div 
              className="absolute inset-0 w-full h-full rounded-3xl border-4 border-white flex items-center justify-center p-6 text-center shadow-inner"
              style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateY(180deg)',
                backgroundColor: CONFIG.colors.primary,
                color: 'white'
              }}
            >
              <p className="text-xl font-bold leading-relaxed whitespace-pre-wrap drop-shadow-md select-none">
                {currentMemory.message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------
// 5. หน้า Calendar (ตัวนับเวลา)
// ------------------------------------------------------------------
function CalendarScreen({ onBack }) {
  // 🟢 เพิ่ม totalSecs เข้าไปใน State เพื่อเก็บวินาทีทั้งหมด
  const [time, setTime] = useState({ y: 0, m: 0, d: 0, h: 0, min: 0, s: 0, totalSecs: 0 });

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
      
      // 🟢 คำนวณวินาทีทั้งหมด (เอา Milliseconds ทั้งหมดมาหาร 1000)
      const totalSecs = Math.floor(diff / 1000);

      // 🟢 อัปเดต State พร้อมวินาทีทั้งหมด
      setTime({ y, m, d, h, min, s, totalSecs });
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

        <div className="flex gap-1 mb-8 justify-center flex-wrap px-2">
          <TimeBox value={time.y} label="Year" />
          <TimeBox value={time.m} label="Month" />
          <TimeBox value={time.d} label="Days" />
          <TimeBox value={time.h} label="Hours" />
          <TimeBox value={time.min} label="Mins" />
          <TimeBox value={time.s} label="Secs" />
        </div>

        {/* 🟢 แถบล่างแสดงวินาทีทั้งหมด */}
        <div className="mt-8 w-full max-w-[280px] py-4 bg-white rounded-2xl shadow-sm border border-pink-100 flex flex-col items-center transition-all animate-pulse-slow">
          <span className="text-xl opacity-60 mb-1">{CONFIG.text.calendarSec}</span>
          <span className="text-2xl font-mono font-bold tracking-wider" style={{ color: CONFIG.colors.text }}>
            {time.totalSecs.toLocaleString()} {/* ใช้ toLocaleString() เพื่อใส่ลูกน้ำ */}
          </span>
          <span className="text-[10px] opacity-60 mt-1 font-medium uppercase tracking-widest text-pink-400">Seconds</span>
        </div>

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
      <Header title="เกมสำหรับเด้กเร้ก" onBack={onBack} />
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
      <Header title="ไม่บอกก" onBack={onBack} />
      
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
            <p className="mt-6 text-sm font-bold opacity-70">อย่ากดดดดนะะะะ {">//<"}</p>
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