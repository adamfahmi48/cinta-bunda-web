import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  MapPin, ShoppingCart, MessageCircle, ArrowRight, ArrowLeft, 
  Star, Heart, Phone, Clock, ShieldCheck, ThumbsUp, MoreVertical,
} from 'lucide-react';

// --- MOCK DATA ---
const stores = [
  {
    id: 1,
    name: "Cinta Bunda Jakarta Selatan",
    description: "Pusat kebutuhan ibu dan anak terlengkap dengan produk berkualitas, harga bersahabat, dan pelayanan yang hangat.",
    image: "https://placehold.co/800x600/07613F/FFFFFF?text=Toko+Jakarta+Selatan",
    mapsUrl: "#",
    whatsappUrl: "#"
  },
  {
    id: 2,
    name: "Cinta Bunda Bandung",
    description: "Kini hadir di Bandung! Temukan berbagai kebutuhan si kecil dengan promo menarik setiap harinya.",
    image: "https://placehold.co/800x600/10895c/FFFFFF?text=Toko+Bandung",
    mapsUrl: "#",
    whatsappUrl: "#"
  },
  {
    id: 3,
    name: "Cinta Bunda Surabaya",
    description: "Cabang terbesar kami di Jawa Timur. Fasilitas lengkap dan area bermain anak yang luas.",
    image: "https://placehold.co/800x600/0a452e/FFFFFF?text=Toko+Surabaya",
    mapsUrl: "#",
    whatsappUrl: "#"
  }
];

const catalogData = [
  {
    id: 1,
    title: "Perlengkapan Ibu dan Anak",
    bgColor: "bg-[#D1F2EB]", // Pastel Mint
    textColor: "text-[#07613F]",
    svg: (
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#07613F] opacity-50 drop-shadow-md">
        <path d="M10 2v7.31M14 2v7.31M7 21h10a2 2 0 0 0 2-2v-3.38a2 2 0 0 0-.58-1.41l-3.83-3.83A2 2 0 0 1 14 9.31V2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v7.31a2 2 0 0 1-.59 1.41l-3.82 3.83A2 2 0 0 0 5 15.62V19a2 2 0 0 0 2 2z"/>
      </svg>
    )
  },
  {
    id: 2,
    title: "Produk Mainan Anak",
    bgColor: "bg-[#FCF3CF]", // Pastel Yellow
    textColor: "text-[#D68910]",
    svg: (
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#D68910] opacity-50 drop-shadow-md">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    )
  },
  {
    id: 3,
    title: "Produk Terbaru",
    bgColor: "bg-[#E8DAEF]", // Pastel Lavender
    textColor: "text-[#6C3483]",
    svg: (
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#6C3483] opacity-50 drop-shadow-md">
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
      </svg>
    )
  },
  {
    id: 4,
    title: "Lagi Promo",
    bgColor: "bg-[#FADBD8]", // Pastel Pink
    textColor: "text-[#C0392B]",
    svg: (
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#C0392B] opacity-50 drop-shadow-md">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
        <path d="M3 6h18"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    )
  }
];

const reviews = [
  {
    id: 1,
    name: "Dewi Lestari",
    date: "2 minggu lalu",
    rating: 5,
    text: "Toko lengkap, harga bersahabat, dan pelayanannya ramah banget. Belanja jadi nyaman tiap kali ke sini!",
    avatar: "https://i.pravatar.cc/150?u=dewi",
    googleUrl: "#"
  },
  {
    id: 2,
    name: "Andini & Raka",
    date: "3 minggu lalu",
    rating: 5,
    text: "Mainannya bagus-bagus dan aman buat anak. Anak kami suka banget belanja di Cinta Bunda!",
    avatar: "https://i.pravatar.cc/150?u=andini",
    googleUrl: "#"
  },
  {
    id: 3,
    name: "Nadia Putri",
    date: "1 bulan lalu",
    rating: 5,
    text: "Perlengkapan ibu dan anak super lengkap. Promo menarik setiap minggu. Recommended!",
    avatar: "https://i.pravatar.cc/150?u=nadia",
    googleUrl: "#"
  },
  {
    id: 4,
    name: "Budi Santoso",
    date: "2 bulan lalu",
    rating: 5,
    text: "Parkiran luas, kasir cepat. Sangat membantu bapak-bapak yang disuruh istri belanja bulanan.",
    avatar: "https://i.pravatar.cc/150?u=budi",
    googleUrl: "#"
  }
];

// --- CUSTOM ICONS & SHAPES ---
type IconProps = {
  className?: string;
};

const InstagramIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M13.5 21v-8h2.75l.4-3H13.5V8.1c0-.87.24-1.46 1.53-1.46H16.8V4a23.4 23.4 0 0 0-2.42-.13c-2.4 0-4.05 1.47-4.05 4.17V10H7.6v3h2.73v8h3.17Z" />
  </svg>
);

const TikTokIcon = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const LeafShape = ({ className }: IconProps) => (
  <svg className={className} viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 0C50 0 100 20 100 50C100 80 50 100 50 100C50 100 0 80 0 50C0 20 50 0 50 0Z" opacity="0.6"/>
  </svg>
);

const LogoSVG = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
        {/* Simplified abstract logo resembling the reference */}
        <div className="absolute inset-0 bg-green-500 rounded-full transform -translate-x-2 translate-y-1"></div>
        <div className="absolute inset-0 bg-teal-300 rounded-full transform translate-x-2 -translate-y-2 scale-75"></div>
        <Heart className="text-white relative z-10 w-5 h-5 fill-current" />
    </div>
    <div className="flex flex-col text-white">
      <span className="font-bold text-lg leading-none tracking-wide">CINTA BUNDA</span>
      <span className="font-semibold text-sm leading-none tracking-widest">GROUP</span>
      <span className="text-[0.5rem] mt-1 opacity-80">Caring Today, Brighter Tomorrow</span>
    </div>
  </div>
);

// --- COMPONENTS ---

const Header = () => (
  <header className="bg-[#07613F] text-white py-4 px-6 md:px-12 flex justify-between items-center rounded-b-[2rem] md:rounded-b-[3rem] shadow-lg relative z-50">
    <LogoSVG />
    <div className="flex items-center gap-4">
      <span className="hidden md:inline text-sm font-medium">Follow Us:</span>
      <a href="#" className="hover:opacity-80 transition bg-white/20 p-2 rounded-full"><InstagramIcon className="w-[18px] h-[18px]" /></a>
      <a href="#" className="hover:opacity-80 transition bg-white/20 p-2 rounded-full"><FacebookIcon className="w-[18px] h-[18px]" /></a>
      <a href="#" className="hover:opacity-80 transition bg-white/20 p-2 rounded-full"><TikTokIcon className="w-[18px] h-[18px]" /></a>
    </div>
  </header>
);

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === stores.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? stores.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches.item(0);
    if (touch) {
      touchStartX.current = touch.clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches.item(0);
    if (touch) {
      touchEndX.current = touch.clientX;
    }
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

  const currentStore = stores[currentIndex];

  return (
    <section className="relative pt-8 pb-16 px-4 md:px-12 overflow-hidden bg-gradient-to-b from-[#f0f9f4] to-white">
      {/* Decorative Background Elements */}
      <LeafShape className="absolute top-10 left-[-5%] w-24 h-24 text-green-200 -rotate-45" />
      <LeafShape className="absolute bottom-20 right-[-2%] w-32 h-32 text-green-100 rotate-45" />
      <div className="absolute top-40 right-10 w-4 h-4 bg-yellow-300 rounded-full opacity-50 blur-[2px]"></div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#07613F] leading-tight mb-4">
            Toko Kami <br />
            <span className="relative inline-block">
              Ada di Mana Saja?
              <svg className="absolute -right-8 -top-6 w-12 h-12 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </span>
          </h1>
          
          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#07613F] px-4 py-2 rounded-full font-semibold text-sm mb-6 border border-green-200">
            <MapPin size={16} className="fill-current text-[#07613F]" />
            {currentStore.name}
          </div>

          <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md">
            {currentStore.description}
          </p>

          <div className="grid grid-cols-3 gap-2 md:gap-6 w-full max-w-md mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 text-[#07613F] flex items-center justify-center mb-2 shadow-sm border border-green-200">
                <ShieldCheck size={24} />
              </div>
              <span className="text-xs md:text-sm font-semibold text-gray-700">Produk Lengkap & Berkualitas</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 text-[#07613F] flex items-center justify-center mb-2 shadow-sm border border-green-200">
                <ThumbsUp size={24} />
              </div>
              <span className="text-xs md:text-sm font-semibold text-gray-700">Harga Bersahabat</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 text-[#07613F] flex items-center justify-center mb-2 shadow-sm border border-green-200">
                <Heart size={24} />
              </div>
              <span className="text-xs md:text-sm font-semibold text-gray-700">Pelayanan Ramah & Cepat</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row w-full max-w-md gap-4">
            <a href={currentStore.mapsUrl} className="flex-1 bg-[#07613F] text-white py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-[#054a30] transition shadow-lg shadow-green-900/20">
              <MapPin size={18} /> Lokasi Google Maps
            </a>
            <a href={currentStore.whatsappUrl} className="flex-1 bg-white text-[#07613F] py-3 px-6 rounded-full font-semibold flex items-center justify-center gap-2 border-2 border-[#07613F] hover:bg-green-50 transition shadow-lg">
              <MessageCircle size={18} /> Kontak WhatsApp
            </a>
          </div>
        </div>

        {/* Right Content - Carousel Image */}
        <div 
          className="w-full lg:w-1/2 relative z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] md:aspect-auto md:h-[500px]">
             {/* Transition wrapper */}
             <div 
                className="w-full h-full flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
             >
                {stores.map((store) => (
                  <img 
                    key={store.id}
                    src={store.image} 
                    alt={store.name} 
                    className="w-full h-full object-cover flex-shrink-0"
                    loading="lazy"
                  />
                ))}
             </div>
             
             {/* Decorative overlay matching reference */}
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

             {/* Carousel Controls */}
             <button type="button" aria-label="Slide sebelumnya" onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#07613F] text-white p-2 md:p-3 rounded-full hover:bg-[#054a30] transition shadow-lg z-20">
                <ArrowLeft size={20} />
             </button>
             <button type="button" aria-label="Slide berikutnya" onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#07613F] text-white p-2 md:p-3 rounded-full hover:bg-[#054a30] transition shadow-lg z-20">
                <ArrowRight size={20} />
             </button>
          </div>
          
          {/* Pagination & Status */}
          <div className="flex flex-col items-center mt-6 gap-3">
            <div className="flex gap-2">
              {stores.map((_, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${currentIndex === idx ? 'bg-[#07613F] w-6' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
              <Clock size={14} /> Slide otomatis setiap 5 detik
            </div>
          </div>
        </div>

      </div>
      
      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,126.38,201.5,119.53,243.68,115.46,283.47,94.94,321.39,56.44Z" className="fill-[#f8fcf9]"></path>
        </svg>
      </div>
    </section>
  );
};

const CatalogSection = () => {
  return (
    <section className="py-16 px-4 md:px-12 bg-[#f8fcf9] relative z-10">
      
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-green-50 mb-4">
          <div className="bg-[#82E0AA] text-white p-2 rounded-full">
            <ShoppingCart size={24} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#07613F]">
            Kunjungi Katalog Kami
          </h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {catalogData.map((item) => (
          <a key={item.id} href="#" className="group block relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white">
            <div className={`pt-8 pb-16 px-4 flex justify-center items-center ${item.bgColor} h-40 md:h-56 relative`}>
              {item.svg}
              {/* Overlay shadow for depth */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/60 to-transparent"></div>
            </div>
            
            <div className="p-4 md:p-6 bg-white flex flex-col justify-between h-32 md:h-36">
              <h3 className={`text-lg md:text-xl font-bold leading-tight ${item.textColor} pr-8`}>
                {item.title.split(' ').map((word, i, arr) => (
                   <React.Fragment key={i}>
                     {word}{i < arr.length - 1 && <br/>}
                   </React.Fragment>
                ))}
              </h3>
              
              <div className={`absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110 ${
                item.id === 1 ? 'bg-[#48C9B0]' : 
                item.id === 2 ? 'bg-[#F39C12]' : 
                item.id === 3 ? 'bg-[#8E44AD]' : 'bg-[#E74C3C]'
              }`}>
                <ArrowRight size={20} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

const ReviewSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 px-0 md:px-12 bg-white relative overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center transform rotate-12 opacity-80">
        <Heart className="text-pink-400 fill-current w-10 h-10" />
      </div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center transform -rotate-12 opacity-80 hidden md:flex">
         <Star className="text-yellow-400 fill-current w-8 h-8" />
      </div>

      <div className="text-center mb-12 px-4">
        <div className="inline-flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#07613F] text-white p-2 rounded-full">
              <MessageCircle size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#07613F]">
              Apa Kata Pelanggan?
            </h2>
          </div>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Ulasan asli dari pelanggan kami di Google
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative px-4 md:px-12">
        
        {/* Desktop Navigation Arrows */}
        <button type="button" aria-label="Ulasan sebelumnya" onClick={() => scroll('left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-[#07613F] text-white p-3 rounded-full hover:bg-[#054a30] transition shadow-lg z-10">
          <ArrowLeft size={24} />
        </button>
        
        {/* Carousel Container (Mobile Scroll Snap, Desktop Grid/Flex) */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-8 pt-4 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="flex-none w-[85vw] md:w-[350px] lg:w-[calc(33.333%_-_1rem)] snap-start bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 font-bold">G</div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <button type="button" aria-label="Menu ulasan" className="text-gray-400 hover:text-gray-600"><MoreVertical size={20}/></button>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-green-100" />
                <div>
                  <h4 className="font-bold text-gray-800 leading-tight">{review.name}</h4>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm flex-grow mb-6 leading-relaxed">
                "{review.text}"
              </p>
              
              <a href={review.googleUrl} className="text-blue-500 text-sm font-semibold flex items-center gap-1 hover:underline mt-auto">
                Lihat di Google <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>

        <button type="button" aria-label="Ulasan berikutnya" onClick={() => scroll('right')} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-[#07613F] text-white p-3 rounded-full hover:bg-[#054a30] transition shadow-lg z-10">
          <ArrowRight size={24} />
        </button>
      </div>
      
      {/* CSS to hide scrollbar but keep functionality */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#07613F] text-white relative pt-20 pb-8 mt-10">
      {/* Decorative Wavy Top */}
      <div className="absolute top-[-2px] left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,126.38,201.5,119.53,243.68,115.46,283.47,94.94,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        {/* Column 1: Brand */}
        <div className="flex flex-col items-start gap-4">
          <LogoSVG />
          <p className="text-green-100 text-sm mt-4 max-w-xs">
            Mendampingi setiap keluarga dengan produk berkualitas dan layanan penuh cinta.
          </p>
          <div className="flex gap-4 mt-2 text-green-200">
             <Heart size={24} className="fill-current opacity-50"/>
             <Star size={24} className="fill-current opacity-50"/>
          </div>
        </div>

        {/* Column 2: Social Media */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-lg mb-2">Ikuti Kami di Media Sosial</h4>
          <a href="#" className="flex items-center gap-3 hover:text-green-200 transition">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center"><InstagramIcon className="w-4 h-4" /></div>
            <span>@cintabundagroup</span>
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-green-200 transition">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center"><InstagramIcon className="w-4 h-4" /></div>
            <span>@cintabundagroup.kids</span>
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-green-200 transition">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center"><FacebookIcon className="w-4 h-4" /></div>
            <span>Cinta Bunda Group</span>
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-green-200 transition">
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center"><TikTokIcon className="w-4 h-4" /></div>
            <span>@cintabundagroup</span>
          </a>
        </div>

        {/* Column 3: Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-lg mb-2">Kritik & Saran</h4>
          <p className="text-green-100 text-sm mb-2">
            Kami terbuka untuk kritik dan saran Anda demi pelayanan yang lebih baik.
          </p>
          <a href="https://wa.me/6281234565678" className="bg-[#82E0AA] text-[#07613F] p-4 rounded-2xl flex items-center gap-4 hover:bg-[#6edc9d] transition w-full md:w-max group">
            <div className="bg-white p-2 rounded-full group-hover:scale-110 transition-transform">
              <Phone size={24} className="fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider opacity-80">Hubungi SPV Kami</span>
              <span className="text-xl font-black">0812-3456-5678</span>
            </div>
          </a>
          <span className="text-xs text-green-200 mt-1 italic">Fast Response via WhatsApp</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-6 border-t border-white/10 text-center text-sm text-green-200">
        © 2025 Cinta Bunda Group. All rights reserved.
      </div>
    </footer>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 antialiased selection:bg-[#07613F] selection:text-white">
      <Header />
      <main>
        <HeroSection />
        <CatalogSection />
        <ReviewSection />
      </main>
      <Footer />
    </div>
  );
}