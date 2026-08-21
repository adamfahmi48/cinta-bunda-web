import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  MoreVertical,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Star,
  ThumbsUp,
} from "lucide-react";

import "./App.css";

/* =========================================================
   DATA TOKO
========================================================= */

const stores = [
  {
    id: 1,
    name: "Cinta Bunda Jakarta Selatan",
    description:
      "Pusat kebutuhan ibu dan anak terlengkap dengan produk berkualitas, harga bersahabat, dan pelayanan yang hangat.",
    image:
      "https://placehold.co/800x600/07613F/FFFFFF?text=Toko+Jakarta+Selatan",
    mapsUrl: "#",
    whatsappUrl: "#",
  },
  {
    id: 2,
    name: "Cinta Bunda Bandung",
    description:
      "Kini hadir di Bandung! Temukan berbagai kebutuhan si kecil dengan promo menarik setiap harinya.",
    image:
      "https://placehold.co/800x600/10895c/FFFFFF?text=Toko+Bandung",
    mapsUrl: "#",
    whatsappUrl: "#",
  },
  {
    id: 3,
    name: "Cinta Bunda Surabaya",
    description:
      "Cabang terbesar kami di Jawa Timur. Fasilitas lengkap dan area bermain anak yang luas.",
    image:
      "https://placehold.co/800x600/0a452e/FFFFFF?text=Toko+Surabaya",
    mapsUrl: "#",
    whatsappUrl: "#",
  },
];

/* =========================================================
   DATA KATALOG
========================================================= */

const catalogData = [
  {
    id: 1,
    title: "Perlengkapan Ibu dan Anak",
    bgColor: "bg-[#D1F2EB]",
    textColor: "text-[#07613F]",
    iconColor: "text-[#07613F]",
    buttonColor: "bg-[#48C9B0]",
    svg: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-[#07613F] opacity-50 drop-shadow-md"
      >
        <path d="M10 2v7.31M14 2v7.31M7 21h10a2 2 0 0 0 2-2v-3.38a2 2 0 0 0-.58-1.41l-3.83-3.83A2 2 0 0 1 14 9.31V2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v7.31a2 2 0 0 1-.59 1.41l-3.82 3.83A2 2 0 0 0 5 15.62V19a2 2 0 0 0 2 2z" />
      </svg>
    ),
  },

  {
    id: 2,
    title: "Produk Mainan Anak",
    bgColor: "bg-[#FCF3CF]",
    textColor: "text-[#D68910]",
    iconColor: "text-[#D68910]",
    buttonColor: "bg-[#F39C12]",
    svg: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-[#D68910] opacity-50 drop-shadow-md"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },

  {
    id: 3,
    title: "Produk Terbaru",
    bgColor: "bg-[#E8DAEF]",
    textColor: "text-[#6C3483]",
    iconColor: "text-[#6C3483]",
    buttonColor: "bg-[#8E44AD]",
    svg: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-[#6C3483] opacity-50 drop-shadow-md"
      >
        <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },

  {
    id: 4,
    title: "Lagi Promo",
    bgColor: "bg-[#FADBD8]",
    textColor: "text-[#C0392B]",
    iconColor: "text-[#C0392B]",
    buttonColor: "bg-[#E74C3C]",
    svg: (
      <svg
        width="120"
        height="120"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-[#C0392B] opacity-50 drop-shadow-md"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

/* =========================================================
   DATA REVIEW
========================================================= */

const reviews = [
  {
    id: 1,
    name: "Dewi Lestari",
    date: "2 minggu lalu",
    rating: 5,
    text: "Toko lengkap, harga bersahabat, dan pelayanannya ramah banget. Belanja jadi nyaman tiap kali ke sini!",
    avatar: "https://i.pravatar.cc/150?u=dewi",
    googleUrl: "#",
  },
  {
    id: 2,
    name: "Andini & Raka",
    date: "3 minggu lalu",
    rating: 5,
    text: "Mainannya bagus-bagus dan aman buat anak. Anak kami suka banget belanja di Cinta Bunda!",
    avatar: "https://i.pravatar.cc/150?u=andini",
    googleUrl: "#",
  },
  {
    id: 3,
    name: "Nadia Putri",
    date: "1 bulan lalu",
    rating: 5,
    text: "Perlengkapan ibu dan anak super lengkap. Promo menarik setiap minggu. Recommended!",
    avatar: "https://i.pravatar.cc/150?u=nadia",
    googleUrl: "#",
  },
  {
    id: 4,
    name: "Budi Santoso",
    date: "2 bulan lalu",
    rating: 5,
    text: "Parkiran luas, kasir cepat. Sangat membantu bapak-bapak yang disuruh istri belanja bulanan.",
    avatar: "https://i.pravatar.cc/150?u=budi",
    googleUrl: "#",
  },
];

/* =========================================================
   CUSTOM ICONS
========================================================= */

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
    <circle
      cx="17.5"
      cy="6.5"
      r="1"
      fill="currentColor"
      stroke="none"
    />
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
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const LeafShape = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      d="M50 0C50 0 100 20 100 50C100 80 50 100 50 100C50 100 0 80 0 50C0 20 50 0 50 0Z"
      opacity="0.6"
    />
  </svg>
);

/* =========================================================
   LOGO

   Nanti jika Anda sudah punya file logo asli PNG/SVG,
   bagian ini bisa diganti menggunakan <img>.
========================================================= */

const LogoSVG = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0">
      <div className="absolute inset-0 bg-[#62C83E] rounded-full -translate-x-2 translate-y-1" />

      <div className="absolute inset-0 bg-[#54D9C6] rounded-full translate-x-2 -translate-y-2 scale-75" />

      <Heart className="text-white relative z-10 w-5 h-5 md:w-6 md:h-6 fill-current" />
    </div>

    <div className="flex flex-col text-white">
      <span className="font-black text-base md:text-xl leading-[0.95] tracking-wide">
        CINTA BUNDA
      </span>

      <span className="font-bold text-xs md:text-sm leading-none tracking-[0.22em]">
        GROUP
      </span>

      <span className="text-[7px] md:text-[8px] mt-1 opacity-90 whitespace-nowrap">
        Caring Today, Brighter Tomorrow
      </span>
    </div>
  </div>
);

/* =========================================================
   HEADER
   REVISI SESUAI UI/UX REFERENSI
========================================================= */

const Header = () => (
  <header className="cb-header">
    <div className="cb-header__inner">
      <div className="cb-header__logo">
        <LogoSVG />
      </div>

      <div className="cb-header__social">
        <span className="cb-header__follow-label">
          Follow Us:
        </span>

        <a
          href="#"
          aria-label="Instagram Cinta Bunda Group"
          className="cb-header__social-link"
        >
          <InstagramIcon className="w-[18px] h-[18px]" />
        </a>

        <a
          href="#"
          aria-label="Instagram Cinta Bunda Kids"
          className="cb-header__social-link"
        >
          <InstagramIcon className="w-[18px] h-[18px]" />
        </a>

        <a
          href="#"
          aria-label="Facebook Cinta Bunda Group"
          className="cb-header__social-link"
        >
          <FacebookIcon className="w-[18px] h-[18px]" />
        </a>

        <a
          href="#"
          aria-label="TikTok Cinta Bunda Group"
          className="cb-header__social-link"
        >
          <TikTokIcon className="w-[18px] h-[18px]" />
        </a>
      </div>
    </div>

    {/* ORGANIC/WAVE SHAPE */}
    <svg
      className="cb-header__wave"
      viewBox="0 0 1440 92"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="
          M0,27
          C170,73 340,61 515,48
          C690,35 865,38 1040,51
          C1195,63 1315,53 1440,29
          L1440,92
          L0,92
          Z
        "
      />
    </svg>
  </header>
);

/* =========================================================
   HERO / STORE SLIDER
========================================================= */

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((previous) =>
      previous === stores.length - 1
        ? 0
        : previous + 1,
    );
  }, []);

  const prevSlide = () => {
    setCurrentIndex((previous) =>
      previous === 0
        ? stores.length - 1
        : previous - 1,
    );
  };

  useEffect(() => {
    if (isHovered) return;

    const timer = window.setInterval(
      nextSlide,
      5000,
    );

    return () => {
      window.clearInterval(timer);
    };
  }, [nextSlide, isHovered]);

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    const touch = event.touches.item(0);

    if (touch) {
      touchStartX.current = touch.clientX;
      touchEndX.current = touch.clientX;
    }
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    const touch = event.touches.item(0);

    if (touch) {
      touchEndX.current = touch.clientX;
    }
  };

  const handleTouchEnd = () => {
    const distance =
      touchStartX.current - touchEndX.current;

    if (distance > 50) {
      nextSlide();
    }

    if (distance < -50) {
      prevSlide();
    }
  };

  const currentStore = stores[currentIndex];

  return (
    <section className="relative pt-5 md:pt-8 pb-20 px-4 md:px-10 lg:px-12 overflow-hidden bg-gradient-to-b from-[#f0f9f4] via-[#fbfdf9] to-white">
      {/* BACKGROUND DECORATIONS */}

      <LeafShape className="absolute top-10 left-[-5%] w-24 h-24 text-green-200 -rotate-45 opacity-70" />

      <LeafShape className="absolute bottom-20 right-[-2%] w-32 h-32 text-green-100 rotate-45" />

      <div className="absolute top-40 right-10 w-4 h-4 bg-yellow-300 rounded-full opacity-50 blur-[2px]" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* LEFT */}

        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-[56px] font-black text-[#07613F] leading-[1.12] mb-5">
            Toko Kami
            <br />

            <span className="relative inline-block">
              Ada di Mana Saja?

              <svg
                className="absolute -right-8 md:-right-10 -top-5 md:-top-7 w-10 md:w-12 h-10 md:h-12 text-[#FFBD0A]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
            </span>
          </h1>

          <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#07613F] px-4 py-2 rounded-full font-bold text-sm mb-6 border border-[#B8E7C7]">
            <MapPin
              size={16}
              className="fill-current"
            />

            {currentStore.name}
          </div>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            {currentStore.description}
          </p>

          {/* BENEFITS */}

          <div className="grid grid-cols-3 gap-3 md:gap-6 w-full max-w-lg mb-9">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#E7F7ED] text-[#07613F] flex items-center justify-center mb-2 border border-[#BCE7CA]">
                <ShieldCheck size={24} />
              </div>

              <span className="text-[11px] md:text-sm font-bold text-gray-700 leading-snug">
                Produk Lengkap & Berkualitas
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#E7F7ED] text-[#07613F] flex items-center justify-center mb-2 border border-[#BCE7CA]">
                <ThumbsUp size={24} />
              </div>

              <span className="text-[11px] md:text-sm font-bold text-gray-700 leading-snug">
                Harga Bersahabat
              </span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#E7F7ED] text-[#07613F] flex items-center justify-center mb-2 border border-[#BCE7CA]">
                <Heart size={24} />
              </div>

              <span className="text-[11px] md:text-sm font-bold text-gray-700 leading-snug">
                Pelayanan Ramah & Cepat
              </span>
            </div>
          </div>

          {/* CTA */}

          <div className="flex flex-col sm:flex-row w-full max-w-lg gap-4">
            <a
              href={currentStore.mapsUrl}
              className="flex-1 bg-[#07613F] text-white min-h-[52px] px-6 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#054A30] transition shadow-lg shadow-green-900/15"
            >
              <MapPin size={18} />

              Lokasi Google Maps
            </a>

            <a
              href={currentStore.whatsappUrl}
              className="flex-1 bg-white text-[#07613F] min-h-[52px] px-6 rounded-full font-bold flex items-center justify-center gap-2 border-2 border-[#07613F] hover:bg-green-50 transition"
            >
              <MessageCircle size={18} />

              Kontak WhatsApp
            </a>
          </div>
        </div>

        {/* RIGHT / CAROUSEL */}

        <div
          className="w-full lg:w-1/2 relative z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(7,97,63,0.15)] border-[4px] border-white aspect-[4/3] md:h-[500px]">
            <div
              className="w-full h-full flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {stores.map((store) => (
                <img
                  key={store.id}
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover flex-shrink-0"
                />
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

            <button
              type="button"
              aria-label="Slide sebelumnya"
              onClick={prevSlide}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 bg-[#07613F]/95 text-white p-2.5 md:p-3 rounded-full hover:bg-[#054A30] transition shadow-lg z-20"
            >
              <ArrowLeft size={20} />
            </button>

            <button
              type="button"
              aria-label="Slide berikutnya"
              onClick={nextSlide}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 bg-[#07613F]/95 text-white p-2.5 md:p-3 rounded-full hover:bg-[#054A30] transition shadow-lg z-20"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="flex flex-col items-center mt-5 gap-3">
            <div className="flex gap-2">
              {stores.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() =>
                    setCurrentIndex(index)
                  }
                  aria-label={`Tampilkan slide ${index + 1}`}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-[#07613F] w-7"
                      : "bg-gray-300 w-3"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
              <Clock size={14} />

              Slide otomatis setiap 5 detik
            </div>
          </div>
        </div>
      </div>

      {/* HERO BOTTOM WAVE */}

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-[45px] md:h-[85px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,126.38,201.5,119.53,243.68,115.46,283.47,94.94,321.39,56.44Z"
            className="fill-[#f8fcf9]"
          />
        </svg>
      </div>
    </section>
  );
};

/* =========================================================
   CATALOG
========================================================= */

const CatalogSection = () => (
  <section className="py-14 md:py-16 px-4 md:px-12 bg-[#f8fcf9] relative overflow-hidden">
    <div className="text-center mb-10 md:mb-12">
      <div className="inline-flex items-center justify-center gap-3">
        <div className="bg-[#78C83B] text-white p-2.5 rounded-full">
          <ShoppingCart size={25} />
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-[#07613F]">
          Kunjungi Katalog Kami
        </h2>
      </div>
    </div>

    <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {catalogData.map((item) => (
        <a
          key={item.id}
          href="#"
          className="group block relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-white border border-black/5 shadow-[0_8px_25px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div
            className={`pt-8 pb-10 px-4 flex justify-center items-center ${item.bgColor} h-40 md:h-56 relative`}
          >
            {item.svg}

            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/55 to-transparent" />
          </div>

          <div className="p-4 md:p-6 bg-white relative min-h-[118px] md:min-h-[142px]">
            <h3
              className={`text-base md:text-xl font-black leading-tight ${item.textColor} pr-10`}
            >
              {item.title}
            </h3>

            <div
              className={`absolute bottom-4 right-4 md:bottom-6 md:right-6 w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white ${item.buttonColor} transition-transform group-hover:scale-110`}
            >
              <ArrowRight size={19} />
            </div>
          </div>
        </a>
      ))}
    </div>
  </section>
);

/* =========================================================
   REVIEW
========================================================= */

const ReviewSection = () => {
  const scrollContainerRef =
    useRef<HTMLDivElement | null>(null);

  const scroll = (
    direction: "left" | "right",
  ) => {
    if (!scrollContainerRef.current) {
      return;
    }

    const scrollAmount =
      direction === "left"
        ? -360
        : 360;

    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 md:py-24 px-0 md:px-12 bg-white relative overflow-hidden">
      {/* DECORATIONS */}

      <div className="absolute top-10 right-7 md:right-10 w-16 md:w-20 h-16 md:h-20 bg-pink-100 rounded-full flex items-center justify-center rotate-12 opacity-80">
        <Heart className="text-pink-400 fill-current w-8 md:w-10 h-8 md:h-10" />
      </div>

      <div className="absolute bottom-20 left-10 w-16 h-16 bg-yellow-100 rounded-full items-center justify-center -rotate-12 opacity-80 hidden md:flex">
        <Star className="text-yellow-400 fill-current w-8 h-8" />
      </div>

      <div className="text-center mb-10 md:mb-12 px-4 relative z-10">
        <div className="inline-flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-[#07613F] text-white p-2.5 rounded-full">
              <MessageCircle size={24} />
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-[#07613F]">
              Apa Kata Pelanggan?
            </h2>
          </div>

          <p className="text-gray-500 font-medium text-sm md:text-base">
            Ulasan asli dari pelanggan kami di Google
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative px-4 md:px-12">
        <button
          type="button"
          aria-label="Ulasan sebelumnya"
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-[#07613F] text-white p-3 rounded-full hover:bg-[#054A30] transition shadow-lg z-20"
        >
          <ArrowLeft size={24} />
        </button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 md:gap-6 pb-8 pt-4 hide-scrollbar snap-x snap-mandatory"
        >
          {reviews.map((review) => (
            <article
              key={review.id}
              className="flex-none w-[84vw] sm:w-[380px] md:w-[350px] lg:w-[calc(33.333%_-_1rem)] snap-start bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.07)] flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 font-black">
                  G
                </div>

                <div className="flex gap-1">
                  {Array.from({
                    length: review.rating,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                <button
                  type="button"
                  aria-label="Menu ulasan"
                  className="text-gray-400"
                >
                  <MoreVertical size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-100"
                />

                <div>
                  <h4 className="font-bold text-gray-800 leading-tight">
                    {review.name}
                  </h4>

                  <span className="text-xs text-gray-500">
                    {review.date}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 text-sm flex-grow mb-6 leading-relaxed">
                "{review.text}"
              </p>

              <a
                href={review.googleUrl}
                className="text-blue-500 text-sm font-bold flex items-center gap-1 hover:underline mt-auto"
              >
                Lihat di Google

                <ArrowRight size={14} />
              </a>
            </article>
          ))}
        </div>

        <button
          type="button"
          aria-label="Ulasan berikutnya"
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-[#07613F] text-white p-3 rounded-full hover:bg-[#054A30] transition shadow-lg z-20"
        >
          <ArrowRight size={24} />
        </button>
      </div>

      <div className="flex md:hidden justify-center gap-2 mt-1">
        <span className="w-6 h-2 rounded-full bg-[#07613F]" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
        <span className="w-2 h-2 rounded-full bg-gray-300" />
      </div>
    </section>
  );
};

/* =========================================================
   FOOTER
========================================================= */

const Footer = () => (
  <footer className="bg-[#07613F] text-white relative pt-20 pb-8 overflow-hidden">
    {/* WAVE TOP */}

    <div className="absolute -top-[2px] left-0 w-full overflow-hidden leading-none rotate-180">
      <svg
        className="relative block w-full h-[60px] md:h-[100px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,126.38,201.5,119.53,243.68,115.46,283.47,94.94,321.39,56.44Z"
          className="fill-white"
        />
      </svg>
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 relative z-10">
      {/* BRAND */}

      <div className="flex flex-col items-start gap-4">
        <LogoSVG />

        <p className="text-green-100 text-sm mt-3 max-w-xs leading-relaxed">
          Mendampingi setiap keluarga dengan produk
          berkualitas dan layanan penuh cinta.
        </p>

        <div className="flex gap-4 mt-2 text-green-200">
          <Heart
            size={24}
            className="opacity-60"
          />

          <Star
            size={24}
            className="opacity-60"
          />
        </div>
      </div>

      {/* SOCIAL */}

      <div className="flex flex-col gap-4">
        <h4 className="font-black text-lg mb-2">
          Ikuti Kami di Media Sosial
        </h4>

        <a
          href="#"
          className="flex items-center gap-3 hover:text-green-200 transition"
        >
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
            <InstagramIcon className="w-4 h-4" />
          </div>

          <span>@cintabundagroup</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 hover:text-green-200 transition"
        >
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
            <InstagramIcon className="w-4 h-4" />
          </div>

          <span>@cintabundagroup.kids</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 hover:text-green-200 transition"
        >
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
            <FacebookIcon className="w-4 h-4" />
          </div>

          <span>Cinta Bunda Group</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 hover:text-green-200 transition"
        >
          <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
            <TikTokIcon className="w-4 h-4" />
          </div>

          <span>@cintabundagroup</span>
        </a>
      </div>

      {/* CONTACT */}

      <div className="flex flex-col gap-4">
        <h4 className="font-black text-lg mb-2">
          Kritik & Saran
        </h4>

        <p className="text-green-100 text-sm mb-2 leading-relaxed">
          Kami terbuka untuk kritik dan saran Anda demi
          pelayanan yang lebih baik.
        </p>

        <a
          href="https://wa.me/6281234565678"
          className="bg-[#82E044] text-[#07613F] p-4 rounded-2xl flex items-center gap-4 hover:bg-[#90EC51] transition w-full md:w-max group"
        >
          <div className="bg-white p-2 rounded-full group-hover:scale-110 transition-transform">
            <Phone
              size={24}
              className="fill-current"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-black uppercase tracking-wider opacity-80">
              Hubungi SPV Kami
            </span>

            <span className="text-xl font-black">
              0812-3456-5678
            </span>
          </div>
        </a>

        <span className="text-xs text-green-200 mt-1">
          Fast Response via WhatsApp
        </span>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-6 border-t border-white/10 text-center text-sm text-green-200">
      © 2025 Cinta Bunda Group. All rights reserved.
    </div>
  </footer>
);

/* =========================================================
   APP
========================================================= */

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