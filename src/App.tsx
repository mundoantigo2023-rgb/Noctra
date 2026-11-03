import React, { useState, useEffect, useRef } from 'react';
import {
  X, Menu, Check, ChevronDown, ArrowRight,
  ExternalLink, Sparkles, Disc3, Play
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LINKS_CONFIG, SingleConfig } from './config';

/* ─────────────────────────────────────────────────────────────
   OFFICIAL BRAND ICONS & SYMBOLS
───────────────────────────────────────────────────────────── */
const FlowerIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Delicate blooming nocturnal flower */}
    <circle cx="12" cy="12" r="2.5" fill="currentColor" fillOpacity="0.25" />
    <path d="M12 9.5C12 6.5 13.8 4.5 16 4.5C18 4.5 19.5 6 19.5 8C19.5 10.2 17.5 12 14.5 12" />
    <path d="M14.5 12C17.5 12 19.5 13.8 19.5 16C19.5 18 18 19.5 16 19.5C13.8 19.5 12 17.5 12 14.5" />
    <path d="M12 14.5C12 17.5 10.2 19.5 8 19.5C6 19.5 4.5 18 4.5 16C4.5 13.8 6.5 12 9.5 12" />
    <path d="M9.5 12C6.5 12 4.5 10.2 4.5 8C4.5 6 6 4.5 8 4.5C10.2 4.5 12 6.5 12 9.5" />
  </svg>
);

const Icons = {
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.241 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.72 12.9c.36.181.54.78.241 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.559.3z"/>
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.68-.82 1.14-1.97.01-3.12-1.01.04-2.26.68-2.97 1.5-.63.73-1.18 1.9-.03 3.04 1.13.09 2.31-.6 2.99-1.42z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────────────────────
   ATMOSPHERIC RAIN & PARTICLES COMPONENT (Ultra-lightweight)
───────────────────────────────────────────────────────────── */
function AtmosphereRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Subtle rain drops
    const dropsCount = Math.min(width < 768 ? 35 : 65, 70);
    const drops = Array.from({ length: dropsCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 18 + 12,
      speed: Math.random() * 8 + 10,
      opacity: Math.random() * 0.18 + 0.05,
    }));

    // Soft glowing motes
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.4 + 0.2,
      alpha: Math.random() * 0.35 + 0.1,
    }));

    let animationId: number;
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        // Draw soft rain streaks
        ctx.strokeStyle = 'rgba(163, 177, 198, 0.45)';
        ctx.lineWidth = 1;
        for (let i = 0; i < drops.length; i++) {
          const d = drops[i];
          ctx.beginPath();
          ctx.globalAlpha = d.opacity;
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - 1, d.y + d.length);
          ctx.stroke();

          d.y += d.speed;
          d.x -= 0.6;
          if (d.y > height) {
            d.y = -d.length;
            d.x = Math.random() * (width + 50);
          }
        }

        // Draw soft amber/blue motes
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = i % 2 === 0 ? '#d97706' : '#60a5fa';
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;
          if (p.y > height) p.y = 0;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
        }
        ctx.globalAlpha = 1;
      }
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-70"
      aria-hidden="true"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────── */
export default function App() {
  // Active visualizer selection ("217-am" or "two-cups")
  const [activeVisualizerId, setActiveVisualizerId] = useState<string>('217-am');

  // Video modal
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [modalVideoId, setModalVideoId] = useState(LINKS_CONFIG.youtubeFeaturedVideoId);

  // Community Newsletter
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  useScrollReveal();

  useEffect(() => {
    if (!isVideoModalOpen) return;
    document.body.style.overflow = 'hidden';
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsVideoModalOpen(false); };
    window.addEventListener('keydown', fn);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', fn); };
  }, [isVideoModalOpen]);

  const handleOpenVideo = (videoId: string) => {
    setModalVideoId(videoId);
    setIsVideoModalOpen(true);
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setJoined(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#d97706', '#1e3a8a', '#F3EEE7'],
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-[#F3EEE7] font-sans overflow-x-hidden w-full selection:bg-[#d97706]/30 selection:text-white relative">
      {/* Film grain subtle overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Atmospheric rain & glowing dust */}
      <AtmosphereRainCanvas />

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-ambient-glow opacity-90" aria-hidden="true" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* TOP NAVBAR */}
        <Navbar onOpenReleases={() => document.getElementById('releases')?.scrollIntoView({ behavior: 'smooth' })} />

        {/* ABOVE THE FOLD — MOBILE-FIRST HIGH CONVERSION HERO */}
        <HeroAboveTheFold
          onOpenVideo={() => handleOpenVideo(LINKS_CONFIG.youtubeFeaturedVideoId)}
        />

        {/* RELEASES & INTERACTIVE DISCOGRAPHY */}
        <ReleasesSection
          onOpenVideo={handleOpenVideo}
        />

        {/* YOUTUBE VISUALIZER EMBED SECTION */}
        <VisualizerSection
          activeId={activeVisualizerId}
          onSelect={setActiveVisualizerId}
        />

        {/* ABOUT NOCTRA (Official Biography) */}
        <AboutSection />

        {/* NEWSLETTER / INNER CIRCLE */}
        <CommunitySection
          email={email}
          setEmail={setEmail}
          joined={joined}
          onSubmit={handleJoin}
        />

        {/* FOOTER */}
        <SiteFooter />
      </div>

      {/* MODAL VIDEO PLAYER */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#050508]/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Official Music Video Player"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-10 right-0 flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#A3B1C6] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" /> CLOSE
            </button>
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/15 shadow-[0_30px_90px_-15px_rgba(0,0,0,1)]">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${modalVideoId}?autoplay=1&rel=0`}
                title="NOCTRA — Official Music Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div className="mt-3.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#d97706] uppercase">NOCTRA • OFFICIAL VISUALIZER</span>
                <p className="text-sm sm:text-base font-cinzel font-semibold text-white">Cinematic Dark Pop</p>
              </div>
              <a
                href={LINKS_CONFIG.youtubeFeaturedVideoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#d97706] hover:underline font-mono flex items-center gap-1"
              >
                Open in YouTube <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TOP NAVBAR
───────────────────────────────────────────────────────────── */
const Navbar = ({ onOpenReleases }: { onOpenReleases: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050508]/90 backdrop-blur-xl border-b border-white/8 py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo with Flower */}
          <a
            href="#home"
            className="flex items-center gap-2 group text-white hover:text-[#d97706] transition-colors"
            aria-label="Noctra Official Home"
          >
            <span className="font-cinzel text-xl sm:text-2xl font-bold tracking-[0.25em] text-white">
              {LINKS_CONFIG.artistName}
            </span>
            <FlowerIcon className="w-4 h-4 text-[#d97706] group-hover:rotate-45 transition-transform duration-300" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-[0.2em] text-[#A3B1C6]">
            <a href="#releases" className="hover:text-white transition-colors">RELEASES</a>
            <a href="#visualizer" className="hover:text-white transition-colors">VISUALIZER</a>
            <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
            <a href="#community" className="hover:text-white transition-colors">CLUB</a>
          </nav>

          {/* Quick Stream CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={LINKS_CONFIG.spotifyArtistUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-[#1DB954]/20 text-[#A3B1C6] hover:text-[#1DB954] transition-all"
              aria-label="Spotify Profile"
            >
              {Icons.spotify}
            </a>
            <a
              href={LINKS_CONFIG.appleMusicArtistUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-[#A3B1C6] hover:text-white transition-all"
              aria-label="Apple Music Profile"
            >
              {Icons.apple}
            </a>
            <a
              href="#releases"
              onClick={onOpenReleases}
              className="ml-1 px-3.5 py-1.5 rounded-full border border-[#d97706]/40 hover:border-[#d97706] text-[#F3EEE7] hover:text-[#d97706] text-[10px] font-mono tracking-[0.2em] transition-all"
            >
              STREAM NOW
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#A3B1C6] hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#050508]/98 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 transition-all duration-300 md:hidden ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-3">
          {[
            { label: 'RELEASES', href: '#releases' },
            { label: 'VISUALIZER', href: '#visualizer' },
            { label: 'ABOUT NOCTRA', href: '#about' },
            { label: 'COMMUNITY', href: '#community' },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-cinzel text-xl text-white/90 hover:text-[#d97706] py-3 border-b border-white/5 tracking-wider"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-center gap-5 py-2">
            <a href={LINKS_CONFIG.spotifyArtistUrl} target="_blank" rel="noreferrer" className="text-[#1DB954]">{Icons.spotify}</a>
            <a href={LINKS_CONFIG.appleMusicArtistUrl} target="_blank" rel="noreferrer" className="text-white">{Icons.apple}</a>
            <a href={LINKS_CONFIG.youtubeChannelUrl} target="_blank" rel="noreferrer" className="text-[#FF0000]">{Icons.youtube}</a>
            <a href={LINKS_CONFIG.instagramUrl} target="_blank" rel="noreferrer" className="text-[#E1306C]">{Icons.instagram}</a>
            <a href={LINKS_CONFIG.tiktokUrl} target="_blank" rel="noreferrer" className="text-[#00f2fe]">{Icons.tiktok}</a>
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              document.getElementById('releases')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-[#d97706] text-black font-bold py-3.5 rounded-full text-xs tracking-[0.2em] uppercase"
          >
            EXPLORE SINGLES
          </button>
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────────────────────
   2. ABOVE THE FOLD (Mobile-First High Conversion Hero)
   Contains Identity + Tagline + Hero Release + Thumb CTA buttons
───────────────────────────────────────────────────────────── */
const HeroAboveTheFold = ({
  onOpenVideo,
}: {
  onOpenVideo: () => void;
}) => {
  const twoCups = LINKS_CONFIG.singles.find((s) => s.id === 'two-cups') || LINKS_CONFIG.singles[0];
  const single217 = LINKS_CONFIG.singles.find((s) => s.id === '217-am') || LINKS_CONFIG.singles[1];

  // Active highlighted single in hero switcher
  const [activeSingle, setActiveSingle] = useState<SingleConfig>(twoCups);

  return (
    <section
      id="home"
      className="min-h-[100svh] w-full flex flex-col justify-center items-center px-4 sm:px-6 pt-20 pb-8 sm:py-24 relative overflow-hidden"
    >
      {/* Background ambient video loop (silent) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/noctra_hero_bg.png"
          className="w-full h-full object-cover brightness-[0.22] contrast-125 saturate-[0.65]"
        >
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-[#050508]/80" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md sm:max-w-xl mx-auto flex flex-col items-center text-center">
        
        {/* Brand Header with Flower */}
        <div className="flex items-center justify-center gap-2.5 mb-1.5">
          <FlowerIcon className="w-5 h-5 text-[#d97706] animate-pulse" />
          <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-[0.28em] text-white text-glow-hero uppercase">
            {LINKS_CONFIG.artistName}
          </h1>
          <FlowerIcon className="w-5 h-5 text-[#d97706] animate-pulse" />
        </div>

        {/* Tagline */}
        <p className="font-cormorant italic text-[#F3EEE7]/90 text-base sm:text-lg mb-5 max-w-sm sm:max-w-md leading-snug">
          "{LINKS_CONFIG.tagline}"
        </p>

        {/* Hero Release Spotlight Card */}
        <div className="w-full glass-card rounded-2xl p-4 sm:p-5 mb-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] border border-white/10 relative overflow-hidden">
          {/* Subtle amber / midnight gradient wash */}
          <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#d97706]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#1e3a8a]/25 rounded-full blur-3xl pointer-events-none" />

          {/* Quick Toggle between Two Cups & 2:17 AM */}
          <div className="flex items-center justify-center gap-2 mb-3.5 bg-black/40 p-1 rounded-full border border-white/8">
            <button
              onClick={() => setActiveSingle(twoCups)}
              className={`flex-1 py-1.5 px-3 rounded-full text-[11px] font-mono tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                activeSingle.id === 'two-cups'
                  ? 'bg-[#d97706] text-black font-bold shadow-md'
                  : 'text-[#A3B1C6] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
              Two Cups (NEW)
            </button>
            <button
              onClick={() => setActiveSingle(single217)}
              className={`flex-1 py-1.5 px-3 rounded-full text-[11px] font-mono tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                activeSingle.id === '217-am'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-[#A3B1C6] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] shrink-0" />
              2:17 AM
            </button>
          </div>

          {/* Single Preview Row */}
          <div className="flex items-center gap-3.5 text-left mb-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-white/15 shadow-md">
              <img
                src={activeSingle.coverImage}
                alt={`${activeSingle.title} single artwork`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <span className="absolute top-1 left-1 bg-black/70 backdrop-blur-md text-[8px] font-mono px-1.5 py-0.5 rounded text-[#d97706]">
                {activeSingle.tag}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[9px] font-mono tracking-widest text-[#d97706] uppercase">
                  {activeSingle.badge}
                </span>
                <span className="text-white/30 text-xs">•</span>
                <span className="text-[9px] font-mono text-[#A3B1C6]/70">CINEMATIC DARK POP</span>
              </div>
              <h2 className="font-cormorant font-bold text-xl sm:text-2xl text-white tracking-wide truncate">
                {activeSingle.title}
              </h2>
              <p className="font-cormorant italic text-xs sm:text-sm text-[#A3B1C6]/85 line-clamp-2 leading-relaxed mt-0.5">
                "{activeSingle.subtitle}"
              </p>
            </div>
          </div>

          {/* DIRECT STREAMING CALL-TO-ACTIONS (Large, Thumb-Friendly) */}
          <div className="flex flex-col gap-2.5">
            {/* 1. Spotify CTA (Primary) */}
            <a
              href={activeSingle.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-spotify w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 shadow-lg select-none"
            >
              {Icons.spotify}
              <span>LISTEN ON SPOTIFY</span>
            </a>

            {/* 2. Apple Music CTA */}
            <a
              href={activeSingle.appleMusicUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-apple w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 select-none"
            >
              {Icons.apple}
              <span>LISTEN ON APPLE MUSIC</span>
            </a>

            {/* 3. YouTube Visualizer CTA */}
            <button
              onClick={onOpenVideo}
              className="btn-youtube w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 select-none"
            >
              {Icons.youtube}
              <span>WATCH ON YOUTUBE</span>
            </button>

            {/* 4. Follow on TikTok & Instagram (Split Thumb Pills) */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <a
                href={LINKS_CONFIG.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-social py-2.5 px-3 rounded-xl text-[11px] font-mono tracking-wider text-white/90 flex items-center justify-center gap-1.5 select-none"
              >
                {Icons.tiktok}
                <span>TIKTOK</span>
              </a>
              <a
                href={LINKS_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-social py-2.5 px-3 rounded-xl text-[11px] font-mono tracking-wider text-white/90 flex items-center justify-center gap-1.5 select-none"
              >
                {Icons.instagram}
                <span>INSTAGRAM</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll down pill */}
        <a
          href="#releases"
          className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.25em] text-[#A3B1C6]/60 hover:text-[#d97706] transition-colors py-1"
        >
          <span>EXPLORE DISCOGRAPHY</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   3. RELEASES SECTION (Interactive Discography)
───────────────────────────────────────────────────────────── */
const ReleasesSection = ({
  onOpenVideo,
}: {
  onOpenVideo: (videoId: string) => void;
}) => {
  return (
    <section id="releases" className="py-16 sm:py-20 border-t border-white/5 relative scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 reveal">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.3em] text-[#d97706] uppercase mb-1.5">
            <FlowerIcon className="w-3.5 h-3.5" />
            <span>OFFICIAL RELEASES</span>
          </div>
          <h2 className="font-cinzel font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide">
            DISCOGRAPHY
          </h2>
          <p className="font-cormorant italic text-sm sm:text-base text-[#A3B1C6]/70 mt-1 max-w-md mx-auto">
            Music for the silence of 2 AM and the cold morning after.
          </p>
        </div>

        {/* 2-Column Singles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {LINKS_CONFIG.singles.map((single) => {
            const isTwoCups = single.id === 'two-cups';
            return (
              <div
                key={single.id}
                className={`reveal rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] ${
                  isTwoCups ? 'glass-card-amber' : 'glass-card-blue'
                }`}
              >
                <div>
                  {/* Card Header Badge */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isTwoCups
                          ? 'bg-[#d97706] text-black'
                          : 'bg-[#1e3a8a] text-blue-200 border border-blue-400/30'
                      }`}>
                        {single.tag}
                      </span>
                      <span className="text-[9px] font-mono text-[#d97706] tracking-wider uppercase">
                        {single.badge}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#A3B1C6]/50">2026</span>
                  </div>

                  {/* Artwork Cover */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 border border-white/10 group shadow-md">
                    <img
                      src={single.coverImage}
                      alt={`${single.title} Cover Artwork`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                      <span className="bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] tracking-wider text-[#d97706]">
                        NOCTRA • {single.title.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Title & Official Subtitle */}
                  <h3 className="font-cinzel font-bold text-xl sm:text-2xl text-white mb-2">
                    {single.title}
                  </h3>
                  <p className="font-cormorant italic text-sm sm:text-base text-[#F3EEE7]/90 leading-relaxed mb-2.5">
                    "{single.subtitle}"
                  </p>
                  <p className="text-xs text-[#A3B1C6]/70 font-light leading-relaxed mb-4">
                    {single.description}
                  </p>

                  {/* Spotify Player Embed (for 2:17 AM) */}
                  {single.spotifyEmbedUrl && (
                    <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-black/60 shadow-inner">
                      <iframe
                        style={{ borderRadius: '12px' }}
                        src={single.spotifyEmbedUrl}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title={`Spotify Player - ${single.title}`}
                      />
                    </div>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="flex flex-col gap-2.5 pt-2 border-t border-white/8">
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={single.spotifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(29,185,84,0.3)]"
                    >
                      {Icons.spotify}
                      <span>SPOTIFY</span>
                    </a>
                    <a
                      href={single.appleMusicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 border border-white/15 transition-all"
                    >
                      {Icons.apple}
                      <span>APPLE MUSIC</span>
                    </a>
                    <button
                      onClick={() => onOpenVideo(single.youtubeVisualizerId)}
                      className="py-2.5 px-3.5 rounded-xl border border-[#FF0000]/40 hover:border-[#FF0000] bg-[#FF0000]/15 hover:bg-[#FF0000]/30 text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-1.5 transition-all"
                      aria-label={`Watch ${single.title} visualizer`}
                    >
                      {Icons.youtube}
                      <span className="hidden sm:inline">VIDEO</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   4. VIDEO SECTION (YouTube Visualizer Embed)
───────────────────────────────────────────────────────────── */
const VisualizerSection = ({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) => {
  const currentSingle = LINKS_CONFIG.singles.find((s) => s.id === activeId) || LINKS_CONFIG.singles[0];

  return (
    <section id="visualizer" className="py-16 sm:py-20 border-t border-white/5 relative scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8 reveal">
          <span className="text-[10px] font-mono tracking-[0.35em] text-[#d97706] uppercase block mb-1.5">
            CINEMATIC EXPERIENCE
          </span>
          <h2 className="font-cinzel font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide">
            OFFICIAL VISUALIZER
          </h2>
          <p className="text-xs sm:text-sm text-[#A3B1C6]/70 font-light mt-1 max-w-md mx-auto">
            Experience the dark aesthetics of late-night tension in full 16:9 widescreen.
          </p>
        </div>

        {/* Video Selector Tabs */}
        <div className="flex items-center justify-center gap-2.5 mb-6 reveal">
          {LINKS_CONFIG.singles.map((single) => (
            <button
              key={single.id}
              onClick={() => onSelect(single.id)}
              className={`py-2 px-4 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-2 ${
                activeId === single.id
                  ? 'bg-[#d97706] text-black font-bold shadow-[0_0_20px_rgba(217,119,6,0.35)]'
                  : 'bg-white/5 hover:bg-white/10 text-[#A3B1C6] border border-white/10'
              }`}
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{single.title} Visualizer</span>
            </button>
          ))}
        </div>

        {/* 16:9 Cinematic Frame Embed */}
        <div className="reveal relative rounded-2xl overflow-hidden border border-[#d97706]/35 shadow-[0_25px_80px_-15px_rgba(0,0,0,1)] bg-black mb-6">
          <div className="aspect-video w-full relative">
            <iframe
              key={currentSingle.youtubeVisualizerId}
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${currentSingle.youtubeVisualizerId}?rel=0`}
              title={`NOCTRA — ${currentSingle.title} (Official Visualizer)`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="p-4 bg-[#080B14]/90 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-[#d97706] uppercase block mb-0.5">NOW SCREENING</span>
              <h3 className="font-cinzel font-bold text-base sm:text-lg text-white">
                NOCTRA — {currentSingle.title} (Official Visualizer)
              </h3>
            </div>
            <a
              href={currentSingle.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-full bg-[#FF0000] hover:bg-[#ff2222] text-white font-semibold text-xs tracking-wider flex items-center gap-2 transition-all shadow-[0_4px_20px_rgba(255,0,0,0.3)]"
            >
              {Icons.youtube}
              <span>WATCH ON YOUTUBE</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   5. ABOUT NOCTRA (Official Biography Section)
───────────────────────────────────────────────────────────── */
const AboutSection = () => (
  <section id="about" className="py-16 sm:py-20 border-t border-white/5 relative scroll-mt-16 overflow-hidden">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <div className="glass-card rounded-2xl p-6 sm:p-10 border border-white/10 relative">
        
        {/* Subtle accent corner glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1e3a8a]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d97706]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Portrait Column */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] group">
              <img
                src="/noctra_portrait_studio.png"
                alt="Noctra in the studio"
                className="w-full h-full object-cover brightness-95 contrast-105 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-center">
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#d97706] uppercase bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
                  NOCTRA • 2 AM
                </span>
              </div>
            </div>
          </div>

          {/* Biography Text Column */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FlowerIcon className="w-4 h-4 text-[#d97706]" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#d97706] uppercase">
                THE ARTIST & UNIVERSE
              </span>
            </div>

            <h2 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-wide">
              ABOUT NOCTRA
            </h2>

            {/* Official Bio Paragraph */}
            <p className="text-xs sm:text-sm text-[#F3EEE7]/85 font-light leading-relaxed">
              {LINKS_CONFIG.officialBio}
            </p>

            {/* Subtle Style Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {LINKS_CONFIG.genreBadges.map((badge) => (
                <span
                  key={badge}
                  className="text-[10px] font-mono tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#d97706]"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Follow Links */}
            <div className="flex items-center gap-3 pt-3 border-t border-white/8 text-xs font-mono text-[#A3B1C6]/70">
              <span>Follow Noctra:</span>
              <div className="flex items-center gap-2">
                <a href={LINKS_CONFIG.spotifyArtistUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:text-[#1DB954] transition-colors" aria-label="Spotify">
                  {Icons.spotify}
                </a>
                <a href={LINKS_CONFIG.youtubeChannelUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:text-[#FF0000] transition-colors" aria-label="YouTube">
                  {Icons.youtube}
                </a>
                <a href={LINKS_CONFIG.instagramUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:text-[#E1306C] transition-colors" aria-label="Instagram">
                  {Icons.instagram}
                </a>
                <a href={LINKS_CONFIG.tiktokUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-white/5 hover:text-[#00f2fe] transition-colors" aria-label="TikTok">
                  {Icons.tiktok}
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   NEWSLETTER / INNER CIRCLE (The 2:17 Club)
───────────────────────────────────────────────────────────── */
const CommunitySection = ({
  email,
  setEmail,
  joined,
  onSubmit,
}: {
  email: string;
  setEmail: (s: string) => void;
  joined: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) => (
  <section id="community" className="py-16 sm:py-20 border-t border-white/5 relative scroll-mt-16">
    <div className="max-w-md mx-auto px-4 sm:px-6 text-center reveal">
      <span className="text-[10px] font-mono tracking-[0.35em] text-[#d97706] uppercase block mb-1.5">
        PRIVATE CIRCLE
      </span>
      <h2 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-wide mb-2">
        THE 2:17 CLUB
      </h2>
      <p className="font-cormorant italic text-base sm:text-lg text-[#A3B1C6]/85 mb-5">
        "For the ones still awake when the world goes quiet."
      </p>

      {joined ? (
        <div className="p-4 rounded-xl bg-white/5 border border-[#d97706]/40 text-[#d97706] font-cormorant italic text-base flex items-center justify-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>You are in the circle. Welcome to Noctra.</span>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 mb-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-white/5 border border-white/15 focus:border-[#d97706] text-white placeholder-[#A3B1C6]/40 text-xs px-4 py-3 rounded-full focus:outline-none transition-colors text-center sm:text-left"
          />
          <button
            type="submit"
            className="bg-[#d97706] hover:bg-[#b45309] text-black font-bold px-6 py-3 rounded-full text-xs tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(217,119,6,0.3)] whitespace-nowrap"
          >
            JOIN CLUB
          </button>
        </form>
      )}

      <p className="text-[11px] text-[#A3B1C6]/50 font-light">
        Unreleased demos, private visual drops, and priority release alerts. No spam.
      </p>
    </div>
  </section>
);

/* ─────────────────────────────────────────────────────────────
   SITE FOOTER
───────────────────────────────────────────────────────────── */
const SiteFooter = () => (
  <footer className="border-t border-white/5 py-10 safe-pb bg-[#030305]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-5 text-center">
      
      {/* Brand & Flower */}
      <div className="flex items-center gap-2">
        <span className="font-cinzel font-bold text-lg tracking-[0.3em] text-white">
          {LINKS_CONFIG.artistName}
        </span>
        <FlowerIcon className="w-3.5 h-3.5 text-[#d97706]" />
      </div>

      {/* Social Platforms */}
      <div className="flex justify-center gap-4 text-[#A3B1C6]/70">
        <a href={LINKS_CONFIG.spotifyArtistUrl} target="_blank" rel="noreferrer" aria-label="Spotify" className="hover:text-[#1DB954] transition-colors p-1">
          {Icons.spotify}
        </a>
        <a href={LINKS_CONFIG.appleMusicArtistUrl} target="_blank" rel="noreferrer" aria-label="Apple Music" className="hover:text-white transition-colors p-1">
          {Icons.apple}
        </a>
        <a href={LINKS_CONFIG.youtubeChannelUrl} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[#FF0000] transition-colors p-1">
          {Icons.youtube}
        </a>
        <a href={LINKS_CONFIG.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#E1306C] transition-colors p-1">
          {Icons.instagram}
        </a>
        <a href={LINKS_CONFIG.tiktokUrl} target="_blank" rel="noreferrer" className="hover:text-[#00f2fe] transition-colors p-1" aria-label="TikTok">
          {Icons.tiktok}
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-center items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-[#A3B1C6]/50">
        <a href="#home" className="hover:text-white transition-colors">HOME</a>
        <a href="#releases" className="hover:text-white transition-colors">RELEASES</a>
        <a href="#visualizer" className="hover:text-white transition-colors">VISUALIZER</a>
        <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
        <a href={`mailto:${LINKS_CONFIG.contactEmail}`} className="hover:text-[#d97706] transition-colors">SUPPORT</a>
      </nav>

      {/* Copyright */}
      <p className="font-cormorant italic text-[#F3EEE7]/35 text-xs tracking-wider">
        © 2026 {LINKS_CONFIG.artistName}. All rights reserved. {LINKS_CONFIG.genreBadges.join(' • ')}.
      </p>
    </div>
  </footer>
);
