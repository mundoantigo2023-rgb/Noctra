import React, { useState, useEffect, useRef } from 'react';
import {
  X, Menu, Check, ChevronDown, ArrowRight,
  ExternalLink, Sparkles, Disc3, Play, Pause,
  Volume2, VolumeX, Maximize2, Clock, Music
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LINKS_CONFIG, SingleConfig, AlbumTrackConfig } from './config';

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

      {/* Fixed Ambient Background Video Loop (Silent) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/noctra_hero_bg.png"
          className="w-full h-full object-cover brightness-[0.20] contrast-125 saturate-[0.75]"
        >
          <source src="/noctra.mp4" type="video/mp4" />
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        {/* Cinematic dark overlays to preserve contrast and text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/60 via-[#050508]/80 to-[#050508]/95" />
      </div>

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
            <a href="#the-first-night" className="hover:text-white transition-colors">THE FIRST NIGHT</a>
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
              href="#the-first-night"
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
            { label: 'THE FIRST NIGHT', href: '#the-first-night' },
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
          className="w-full h-full object-cover brightness-[0.28] contrast-125 saturate-[0.80]"
        >
          <source src="/noctra.mp4" type="video/mp4" />
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/50 to-[#050508]/80" />
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
              Two Cups (Nov 13)
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
              2:17 AM (Out Now)
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
                <span className={`text-[9px] font-mono tracking-widest uppercase ${
                  activeSingle.isReleased ? 'text-[#1DB954]' : 'text-[#d97706]'
                }`}>
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
              <span>{activeSingle.isReleased ? 'LISTEN ON SPOTIFY' : 'PRE-SAVE ON SPOTIFY'}</span>
            </a>

            {/* 2. Apple Music CTA */}
            <a
              href={activeSingle.appleMusicUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-apple w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 select-none"
            >
              {Icons.apple}
              <span>{activeSingle.isReleased ? 'LISTEN ON APPLE MUSIC' : 'PRE-ADD ON APPLE MUSIC'}</span>
            </a>

            {/* 3. YouTube Visualizer CTA */}
            <button
              onClick={onOpenVideo}
              className="btn-youtube w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm tracking-wider flex items-center justify-center gap-2.5 select-none"
            >
              {Icons.youtube}
              <span>{activeSingle.isReleased ? 'WATCH ON YOUTUBE' : 'WATCH TEASER / VIDEO'}</span>
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
          href="#the-first-night"
          className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-[0.25em] text-[#A3B1C6]/70 hover:text-[#d97706] transition-colors py-1 group"
        >
          <span>EXPLORE "THE FIRST NIGHT"</span>
          <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform animate-bounce" />
        </a>
      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────────────────────
   3. THE FIRST NIGHT — ALBUM EXPERIENCE (10 Tracks)
   Expands and redesigns the existing album section into an
   immersive cinematic journey from 2:17 AM to 5:47 AM.
───────────────────────────────────────────────────────────── */
const WAVEFORM_PROFILES: Record<string, number[]> = {
  '01': [24, 38, 52, 65, 58, 42, 70, 88, 94, 80, 66, 82, 96, 90, 62, 48, 76, 92, 86, 70, 52, 74, 90, 100, 82, 68, 56, 80, 85, 62, 48, 40, 52, 44, 32, 22],
  '02': [20, 30, 44, 60, 78, 70, 54, 62, 84, 92, 76, 60, 72, 88, 96, 84, 68, 52, 70, 82, 90, 78, 64, 76, 88, 94, 80, 62, 50, 42, 54, 46, 36, 28, 22, 16],
  '03': [26, 42, 58, 72, 68, 50, 60, 78, 90, 82, 64, 74, 88, 92, 80, 62, 54, 70, 84, 96, 88, 72, 60, 78, 90, 94, 78, 60, 48, 40, 46, 52, 42, 34, 26, 18],
  '04': [22, 34, 48, 54, 70, 82, 74, 60, 68, 80, 90, 94, 82, 68, 56, 68, 80, 88, 92, 80, 66, 54, 72, 86, 98, 90, 74, 58, 46, 40, 50, 44, 36, 28, 20, 15],
  '05': [32, 48, 64, 80, 92, 100, 88, 74, 86, 96, 100, 90, 78, 70, 84, 96, 100, 88, 74, 62, 80, 94, 100, 92, 80, 68, 82, 94, 88, 70, 54, 46, 40, 32, 24, 18],
  '06': [18, 28, 40, 52, 66, 78, 70, 58, 64, 76, 88, 80, 68, 60, 72, 84, 90, 78, 64, 56, 70, 82, 88, 76, 62, 52, 66, 78, 72, 56, 44, 36, 46, 38, 28, 20],
  '07': [25, 38, 50, 62, 74, 88, 78, 66, 72, 84, 92, 86, 72, 64, 78, 90, 94, 82, 68, 60, 74, 88, 96, 84, 70, 56, 70, 82, 76, 60, 48, 40, 50, 42, 32, 22],
  '08': [20, 32, 46, 58, 70, 80, 72, 60, 68, 80, 88, 94, 82, 70, 58, 70, 82, 90, 94, 80, 66, 56, 72, 86, 92, 84, 70, 56, 44, 38, 48, 40, 32, 24, 18, 14],
  '09': [22, 36, 50, 64, 78, 90, 82, 70, 76, 88, 96, 90, 78, 66, 80, 92, 98, 88, 74, 64, 78, 90, 96, 86, 72, 60, 74, 86, 80, 64, 50, 42, 52, 44, 34, 24],
  '10': [24, 40, 54, 70, 84, 96, 92, 80, 88, 98, 100, 94, 82, 74, 86, 96, 100, 90, 78, 68, 82, 96, 100, 92, 80, 68, 82, 94, 88, 72, 56, 46, 54, 46, 36, 26],
};

const WaveformBars = ({
  trackNumber,
  isPlaying,
  progress,
  accentColor,
  onSeek,
}: {
  trackNumber: string;
  isPlaying: boolean;
  progress: number;
  accentColor: string;
  onSeek?: (fraction: number) => void;
}) => {
  const bars = WAVEFORM_PROFILES[trackNumber] || WAVEFORM_PROFILES['01'];
  
  return (
    <div
      onClick={(e) => {
        if (!onSeek) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        onSeek(fraction);
      }}
      className="flex items-center gap-[2.5px] sm:gap-[3px] h-9 w-full cursor-pointer py-1 select-none"
      title="Click to seek position"
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    >
      {bars.map((height, i) => {
        const barFraction = (i + 1) / bars.length;
        const isPast = barFraction <= progress;
        const animClass = isPlaying
          ? i % 3 === 0
            ? 'animate-waveform-slow'
            : i % 3 === 1
            ? 'animate-waveform-med'
            : 'animate-waveform-fast'
          : '';

        return (
          <div
            key={i}
            className="flex-1 rounded-full flex flex-col justify-end h-full"
          >
            <div
              className={`w-full rounded-full transition-all duration-150 ${animClass}`}
              style={{
                height: `${height}%`,
                backgroundColor: isPast ? '#F3EEE7' : 'rgba(243, 238, 231, 0.2)',
                boxShadow: isPast && isPlaying ? `0 0 8px ${accentColor}` : 'none',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

const ReleasesSection = ({
  onOpenVideo,
}: {
  onOpenVideo: (videoId: string) => void;
}) => {
  const album = LINKS_CONFIG.album;

  // Active track modal for full-screen cinematic viewer
  const [activeModalTrack, setActiveModalTrack] = useState<AlbumTrackConfig | null>(null);

  // Active navigator track indicator
  const [activeNavTrack, setActiveNavTrack] = useState<string>('01');

  // Subtle toast notification for digital platforms / notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 4200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Escape key closes modal viewer
  useEffect(() => {
    if (!activeModalTrack) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalTrack(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalTrack]);

  const handleScrollToTrack = (trackNumber: string) => {
    setActiveNavTrack(trackNumber);
    const el = document.getElementById(`track-${trackNumber}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="releases" className="relative scroll-mt-16 py-20 sm:py-28 overflow-hidden border-t border-white/5">
      {/* Anchor for nav */}
      <span id="the-first-night" className="absolute -top-24 pointer-events-none" />

      {/* Subtle overarching ambient lighting across the 3 phases */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#1e3a8a]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#881337]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#d97706]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* 1. ALBUM EXPERIENCE HEADER */}
        <div className="text-center mb-12 sm:mb-16 reveal">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.35em] text-[#d97706] uppercase mb-2 bg-[#d97706]/10 px-3.5 py-1 rounded-full border border-[#d97706]/25">
            <FlowerIcon className="w-3.5 h-3.5 text-[#d97706]" />
            <span>NOCTRA • DEBUT ALBUM</span>
          </div>

          <h2 className="font-cinzel font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-wider mb-3">
            {album.title}
          </h2>

          <p className="font-cormorant italic text-lg sm:text-2xl text-[#F3EEE7]/90 max-w-xl mx-auto leading-relaxed">
            "{album.subtitle}"
          </p>

          <p className="text-xs sm:text-sm text-[#A3B1C6]/70 font-light mt-2 max-w-lg mx-auto">
            {album.supportingCopy}
          </p>

          {/* Timeline Overview Strip */}
          <div className="mt-8 max-w-2xl mx-auto p-4 rounded-2xl bg-black/40 border border-white/8 backdrop-blur-md">
            <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-[#A3B1C6]/70 uppercase mb-2">
              <span className="flex items-center gap-1.5 text-blue-300">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                Phase I • 2:17 AM
              </span>
              <span className="flex items-center gap-1.5 text-rose-300">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                Phase II • 4:11 AM
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Phase III • 5:47 AM
              </span>
            </div>
            
            {/* Gradient Journey Bar */}
            <div className="w-full h-1.5 rounded-full bg-gradient-to-r from-[#1e3a8a] via-[#881337] to-[#d97706] shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>

            <div className="flex justify-between items-center text-[9px] font-mono text-[#A3B1C6]/50 mt-2">
              <span>Midnight Isolation (Tracks 01–04)</span>
              <span>Cold Detachment (Tracks 05–08)</span>
              <span>The First Light (Tracks 09–10)</span>
            </div>
          </div>
        </div>

        {/* 2. HORIZONTAL TRACK NAVIGATOR (01 - 10) */}
        <div className="sticky top-16 z-30 mb-12 sm:mb-16 py-3 px-2 bg-[#050508]/90 backdrop-blur-xl border-y border-white/8 -mx-4 sm:mx-0 sm:rounded-2xl">
          <div className="flex items-center justify-between gap-1.5 overflow-x-auto no-scrollbar px-2">
            {album.tracks.map((track) => {
              const isCurrent = activeNavTrack === track.number;
              return (
                <button
                  key={track.number}
                  onClick={() => handleScrollToTrack(track.number)}
                  className={`shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-full transition-all duration-300 font-mono text-xs border ${
                    isCurrent
                      ? 'bg-[#F3EEE7] text-black font-bold shadow-[0_0_20px_rgba(243,238,231,0.3)] border-[#F3EEE7]'
                      : 'bg-white/5 text-[#A3B1C6] hover:text-white border-white/8 hover:border-white/20'
                  }`}
                  aria-label={`Scroll to Track ${track.number} - ${track.title}`}
                >
                  <span>{track.number}</span>
                  <span className="hidden md:inline text-[10px] opacity-70">
                    {track.title}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: track.accentColor }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. THE 10 TRACK EXPERIENCES (Editorial Alternating Layout) */}
        <div className="flex flex-col gap-10 sm:gap-14">
          {album.tracks.map((track, index) => {
            const isTrackOut = track.status === 'OUT NOW';
            const isEven = index % 2 === 1;

            // Phase-based card container styling
            let phaseCardClass = 'glass-card-blue';
            if (track.phase === 'cold-darkness') phaseCardClass = 'glass-card-burgundy';
            if (track.phase === 'dawn') phaseCardClass = 'glass-card-dawn';

            return (
              <div
                key={track.id}
                id={`track-${track.number}`}
                className={`reveal rounded-3xl p-5 sm:p-8 transition-all duration-500 relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] border ${phaseCardClass} ${
                  isTrackOut
                    ? 'ring-1 ring-[#1DB954]/25 shadow-[0_0_50px_rgba(29,185,84,0.12)]'
                    : ''
                }`}
                style={{
                  borderColor: isTrackOut ? 'rgba(29, 185, 84, 0.35)' : undefined,
                }}
              >
                {/* Subtle phase ambient light corner */}
                <div
                  className={`absolute -top-24 ${isEven ? '-left-24' : '-right-24'} w-72 h-72 rounded-full blur-3xl pointer-events-none opacity-40`}
                  style={{ backgroundColor: track.accentColor }}
                />

                {/* Editorial Track Layout */}
                <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch gap-6 sm:gap-10 relative z-10`}>
                  
                  {/* ARTWORK COLUMN */}
                  <div className="w-full lg:w-5/12 shrink-0 flex flex-col justify-between">
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/12 shadow-2xl group">
                      {track.hasOfficialArtwork && track.coverImage ? (
                        <img
                          src={track.coverImage}
                          alt={`NOCTRA Track ${track.number} — ${track.title} Cover`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-95 contrast-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#0c0f1d] via-[#070913] to-[#040408]">
                          {/* Concentric subtle vinyl grooves */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                            <div className="w-64 h-64 rounded-full border border-white/20" />
                            <div className="w-48 h-48 rounded-full border border-white/20 absolute" />
                            <div className="w-32 h-32 rounded-full border border-white/20 absolute" />
                          </div>

                          {/* Soft ambient center glow in track accent color */}
                          <div
                            className="absolute w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-25"
                            style={{ backgroundColor: track.accentColor }}
                          />

                          {/* Giant subtle watermark of track number */}
                          <span className="absolute font-cinzel font-black text-7xl sm:text-8xl text-white/[0.04] select-none pointer-events-none">
                            {track.number}
                          </span>

                          {/* Center Coming Soon Badge */}
                          <div className="relative z-10 flex flex-col items-center gap-2.5">
                            <div
                              className="w-11 h-11 rounded-full flex items-center justify-center border shadow-lg backdrop-blur-md"
                              style={{
                                borderColor: track.borderColor,
                                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                              }}
                            >
                              <FlowerIcon className="w-5 h-5 text-[#d97706] animate-pulse" />
                            </div>

                            <div className="flex flex-col items-center">
                              <span className="font-cinzel text-base sm:text-lg font-bold tracking-[0.28em] text-white">
                                COMING SOON
                              </span>
                              <span className="text-[10px] font-mono tracking-[0.2em] text-[#d97706]/80 uppercase mt-0.5">
                                OFFICIAL ARTWORK
                              </span>
                            </div>

                            <p className="text-[10px] text-[#A3B1C6]/60 font-light max-w-[200px] leading-relaxed mt-1">
                              Artwork unlocks with the full album release.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Film grain vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Top badges on artwork */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                        <span className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] tracking-widest text-[#F3EEE7]/90 border border-white/10 flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: track.accentColor }}
                          />
                          {track.timecode}
                        </span>

                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          track.status === 'OUT NOW'
                            ? 'bg-[#1DB954] text-black shadow-md'
                            : track.status === 'PRE-SAVE'
                            ? 'bg-[#d97706] text-black shadow-md'
                            : 'bg-white/10 text-white/80 border border-white/15'
                        }`}>
                          {track.status}
                        </span>
                      </div>

                      {/* Bottom title & Zoom trigger button */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono tracking-widest text-[#F3EEE7]">
                          NOCTRA • {track.number}
                        </span>

                        <button
                          onClick={() => setActiveModalTrack(track)}
                          className="p-2 rounded-full bg-black/70 hover:bg-[#d97706] text-white hover:text-black backdrop-blur-md border border-white/15 transition-all duration-300"
                          title="Open Fullscreen Story Viewer"
                          aria-label={`View details for ${track.title}`}
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Mood Pill on Desktop */}
                    <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-[#A3B1C6]/60 mt-3 capitalize">
                      <FlowerIcon className="w-3 h-3 text-[#d97706]/70" />
                      <span>{track.mood}</span>
                    </div>
                  </div>

                  {/* EDITORIAL INFORMATION & AUDIO PLAYER COLUMN */}
                  <div className="w-full lg:w-7/12 flex flex-col justify-between">
                    <div>
                      {/* Track Meta Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono tracking-[0.25em] text-[#d97706] uppercase">
                            {track.phaseLabel}
                          </span>
                          <span className="text-white/20">•</span>
                          <span className="text-[10px] font-mono text-[#A3B1C6]/70">
                            {track.duration}
                          </span>
                        </div>
                        <span className="font-cinzel text-xs font-bold text-white/30 tracking-widest">
                          {track.number} / 10
                        </span>
                      </div>

                      {/* Song Title */}
                      <h3 className="font-cinzel font-bold text-2xl sm:text-3xl lg:text-4xl text-white tracking-wide mb-3">
                        {track.title}
                      </h3>

                      {/* Emotional Description */}
                      <p className="text-xs sm:text-sm text-[#A3B1C6]/90 font-light leading-relaxed mb-5">
                        {track.description}
                      </p>

                      {/* VISUAL STORYTELLING LYRIC QUOTE */}
                      <div className="my-5 sm:my-6 p-4 sm:p-5 rounded-2xl bg-black/45 border-l-2 relative overflow-hidden"
                        style={{ borderLeftColor: track.accentColor }}
                      >
                        <p className="font-cormorant italic font-semibold text-lg sm:text-xl md:text-2xl text-[#F3EEE7] tracking-wide leading-snug">
                          “{track.lyricQuote}”
                        </p>
                        <span className="block text-[9px] font-mono uppercase tracking-[0.25em] text-[#d97706]/80 mt-2">
                          NOCTRA • OFFICIAL LYRICS
                        </span>
                      </div>
                    </div>

                    {/* DIGITAL STREAMING & SPOTIFY PLAYER EXPERIENCE */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                      
                      {/* Official Spotify Embed Player (for released tracks like 2:17 AM) */}
                      {track.spotifyEmbedUrl && (
                        <div className="overflow-hidden rounded-2xl border border-[#1DB954]/30 bg-black/80 shadow-[0_4px_25px_rgba(29,185,84,0.18)] mb-1">
                          <iframe
                            style={{ borderRadius: '12px' }}
                            src={track.spotifyEmbedUrl}
                            width="100%"
                            height="152"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title={`Spotify Stream - ${track.title}`}
                          />
                        </div>
                      )}

                      {/* Primary Platform Streaming Action */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {track.status === 'OUT NOW' ? (
                            <a
                              href={track.spotifyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-spotify flex items-center gap-2 py-2.5 px-4 rounded-full font-mono text-xs font-bold tracking-wider shadow-md select-none"
                            >
                              {Icons.spotify}
                              <span>STREAM ON SPOTIFY</span>
                            </a>
                          ) : track.status === 'PRE-SAVE' ? (
                            <a
                              href={track.preSaveUrl || track.spotifyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 py-2.5 px-4 rounded-full font-mono text-xs font-bold tracking-wider transition-all duration-300 shadow-md bg-[#d97706] hover:bg-[#b45309] text-black shadow-[0_0_20px_rgba(217,119,6,0.35)] select-none"
                            >
                              {Icons.spotify}
                              <span>PRE-SAVE ON SPOTIFY</span>
                            </a>
                          ) : (
                            <a
                              href={track.spotifyUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => setToastMessage(`Track ${track.number} — "${track.title}" unlocks with the album. Opening Noctra on Spotify...`)}
                              className="flex items-center gap-2 py-2.5 px-4 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-300 bg-white/10 hover:bg-[#1DB954]/20 hover:text-[#1ed760] hover:border-[#1DB954]/40 text-[#F3EEE7] border border-white/15 select-none"
                            >
                              {Icons.spotify}
                              <span>FOLLOW ON SPOTIFY</span>
                            </a>
                          )}

                          <span className="font-mono text-xs text-[#A3B1C6]/70">
                            {track.duration}
                          </span>
                        </div>
                      </div>

                      {/* Minimal Acoustic Waveform Visualizer (Connected to Digital Platforms) */}
                      <div
                        onClick={() => {
                          window.open(track.spotifyUrl, '_blank');
                          setToastMessage(`Opening "${track.title}" on Spotify...`);
                        }}
                        className="cursor-pointer group/wave py-1"
                        title={`Stream ${track.title} on Spotify`}
                      >
                        <WaveformBars
                          trackNumber={track.number}
                          isPlaying={track.status === 'OUT NOW'}
                          progress={track.status === 'OUT NOW' ? 0.72 : 0.25}
                          accentColor={track.status === 'OUT NOW' ? '#1DB954' : track.accentColor}
                        />
                        <div className="flex justify-between items-center text-[10px] font-mono text-[#A3B1C6]/50 group-hover/wave:text-[#1DB954] transition-colors mt-1">
                          <span className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${track.status === 'OUT NOW' ? 'bg-[#1DB954] animate-pulse' : 'bg-white/30'}`} />
                            <span>Digital Streaming • Connected to Spotify</span>
                          </span>
                          <span className="underline decoration-dotted group-hover/wave:no-underline">Open Spotify</span>
                        </div>
                      </div>

                      {/* Direct External Links Row */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-3 text-xs font-mono text-[#A3B1C6]/70">
                          {track.spotifyUrl && (
                            <a
                              href={track.spotifyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-[#1DB954] transition-colors flex items-center gap-1"
                              title="Listen / Pre-Save on Spotify"
                            >
                              {Icons.spotify}
                              <span className="hidden sm:inline">Spotify</span>
                            </a>
                          )}

                          {track.appleMusicUrl && (
                            <a
                              href={track.appleMusicUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="hover:text-white transition-colors flex items-center gap-1"
                              title="Apple Music"
                            >
                              {Icons.apple}
                              <span className="hidden sm:inline">Apple</span>
                            </a>
                          )}

                          {track.youtubeUrl && (
                            <button
                              onClick={() => onOpenVideo(LINKS_CONFIG.youtubeFeaturedVideoId)}
                              className="hover:text-[#FF0000] transition-colors flex items-center gap-1"
                              title="Watch Visualizer"
                            >
                              {Icons.youtube}
                              <span className="hidden sm:inline">Visualizer</span>
                            </button>
                          )}
                        </div>

                        {/* Fullscreen Art Trigger */}
                        <button
                          onClick={() => setActiveModalTrack(track)}
                          className="text-[10px] font-mono tracking-wider text-[#A3B1C6]/60 hover:text-[#d97706] transition-colors flex items-center gap-1"
                        >
                          <span>EXPAND STORY</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* 4. FINAL ALBUM MOMENT (Quiet Cinematic Ending) */}
        <div className="mt-20 sm:mt-28 reveal text-center p-8 sm:p-14 rounded-3xl relative overflow-hidden border border-amber-900/35 bg-gradient-to-b from-[#070914] via-[#100c1c] to-[#1c1214] shadow-2xl">
          {/* Subtle dawn background glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#d97706]/15 via-[#881337]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.35em] text-[#d97706] uppercase mb-3">
              <FlowerIcon className="w-3.5 h-3.5 text-[#d97706]" />
              <span>THE FIRST NIGHT • COMPLETE VOYAGE</span>
            </div>
            
            <h3 className="font-cinzel font-bold text-3xl sm:text-5xl text-white tracking-wider mb-2">
              {album.timelineStart} → {album.timelineEnd}
            </h3>
            
            <p className="font-cormorant italic text-xl sm:text-2xl text-[#d97706] mb-4">
              “One night changed everything.”
            </p>
            
            <p className="text-xs sm:text-sm text-[#A3B1C6]/80 font-light leading-relaxed max-w-lg mb-8">
              Ten songs born from the silence after everyone leaves. From the suffocating tension of late-night memory to the quiet survival of first light.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <a
                href={LINKS_CONFIG.spotifyArtistUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold text-xs font-mono tracking-wider transition-all shadow-[0_4px_25px_rgba(29,185,84,0.35)] flex items-center justify-center gap-2"
              >
                {Icons.spotify}
                <span>LISTEN TO THE ALBUM</span>
              </a>
              
              <button
                onClick={() => onOpenVideo(LINKS_CONFIG.youtubeFeaturedVideoId)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs font-mono tracking-wider transition-all border border-white/15 flex items-center justify-center gap-2"
              >
                {Icons.youtube}
                <span>WATCH NOCTRA</span>
              </button>
              
              <a
                href="#community"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#d97706]/40 hover:border-[#d97706] bg-[#d97706]/10 hover:bg-[#d97706]/20 text-[#d97706] hover:text-white font-semibold text-xs font-mono tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>JOIN THE 2:17 CLUB</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* 5. FULL-SCREEN CINEMATIC ARTWORK MODAL VIEWER */}
      {activeModalTrack && (
        <div
          className="fixed inset-0 z-50 bg-[#050508]/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`Cinematic viewer for ${activeModalTrack.title}`}
          onClick={() => setActiveModalTrack(null)}
        >
          <div
            className="relative w-full max-w-3xl glass-card rounded-3xl p-6 sm:p-8 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,1)] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModalTrack(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/20 text-[#A3B1C6] hover:text-white transition-colors"
              aria-label="Close viewer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              
              {/* Large Artwork or Coming Soon Placeholder */}
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                {activeModalTrack.hasOfficialArtwork && activeModalTrack.coverImage ? (
                  <img
                    src={activeModalTrack.coverImage}
                    alt={`${activeModalTrack.title} Artwork`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center relative overflow-hidden bg-gradient-to-b from-[#0c0f1d] via-[#070913] to-[#040408]">
                    {/* Concentric subtle vinyl grooves */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <div className="w-64 h-64 rounded-full border border-white/20" />
                      <div className="w-48 h-48 rounded-full border border-white/20 absolute" />
                      <div className="w-32 h-32 rounded-full border border-white/20 absolute" />
                    </div>

                    {/* Soft ambient center glow in track accent color */}
                    <div
                      className="absolute w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-25"
                      style={{ backgroundColor: activeModalTrack.accentColor }}
                    />

                    {/* Giant subtle watermark of track number */}
                    <span className="absolute font-cinzel font-black text-8xl text-white/[0.04] select-none pointer-events-none">
                      {activeModalTrack.number}
                    </span>

                    {/* Center Coming Soon Badge */}
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center border shadow-lg backdrop-blur-md"
                        style={{
                          borderColor: activeModalTrack.borderColor,
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                        }}
                      >
                        <FlowerIcon className="w-6 h-6 text-[#d97706] animate-pulse" />
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="font-cinzel text-lg font-bold tracking-[0.25em] text-white">
                          COMING SOON
                        </span>
                        <span className="text-[10px] font-mono tracking-[0.2em] text-[#d97706]/80 uppercase mt-0.5">
                          OFFICIAL ARTWORK
                        </span>
                      </div>

                      <p className="text-[11px] text-[#A3B1C6]/60 font-light max-w-[210px] leading-relaxed">
                        Artwork unlocks with the full album release.
                      </p>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                  <span className="bg-black/80 px-2.5 py-1 rounded text-[10px] text-[#d97706]">
                    TRACK {activeModalTrack.number}
                  </span>
                  <span className="text-white/70 text-[10px]">
                    {activeModalTrack.timecode}
                  </span>
                </div>
              </div>

              {/* Story Details */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#d97706] uppercase">
                    {activeModalTrack.phaseLabel}
                  </span>
                </div>

                <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white">
                  {activeModalTrack.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A3B1C6]/90 font-light leading-relaxed">
                  {activeModalTrack.description}
                </p>

                {/* Lyric typography centerpiece */}
                <div className="p-4 rounded-xl bg-white/5 border-l-2 border-[#d97706] my-2">
                  <p className="font-cormorant italic text-lg sm:text-xl text-[#F3EEE7]">
                    “{activeModalTrack.lyricQuote}”
                  </p>
                </div>

                <p className="text-[11px] text-[#A3B1C6]/60 font-light italic">
                  Visual concept: {activeModalTrack.visualDirection}
                </p>

                {/* Spotify Embedded Streaming Player inside Modal */}
                {activeModalTrack.spotifyEmbedUrl && (
                  <div className="rounded-xl overflow-hidden my-2 border border-[#1DB954]/30 shadow-md">
                    <iframe
                      src={activeModalTrack.spotifyEmbedUrl}
                      width="100%"
                      height="80"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`Spotify player for ${activeModalTrack.title}`}
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3 flex flex-wrap items-center gap-3">
                  {activeModalTrack.status === 'OUT NOW' ? (
                    <a
                      href={activeModalTrack.spotifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-spotify px-5 py-2.5 rounded-full font-bold text-xs tracking-wider font-mono flex items-center gap-2 shadow-lg"
                    >
                      {Icons.spotify}
                      <span>STREAM ON SPOTIFY</span>
                    </a>
                  ) : activeModalTrack.status === 'PRE-SAVE' ? (
                    <a
                      href={activeModalTrack.preSaveUrl || activeModalTrack.spotifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full bg-[#d97706] hover:bg-[#b45309] text-black font-bold text-xs tracking-wider font-mono flex items-center gap-2 shadow-lg transition-colors"
                    >
                      {Icons.spotify}
                      <span>PRE-SAVE ON SPOTIFY</span>
                    </a>
                  ) : (
                    <a
                      href={activeModalTrack.spotifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-[#1DB954]/20 hover:text-[#1ed760] hover:border-[#1DB954]/40 text-[#F3EEE7] border border-white/15 font-semibold text-xs tracking-wider font-mono flex items-center gap-2 transition-colors"
                    >
                      {Icons.spotify}
                      <span>FOLLOW ON SPOTIFY</span>
                    </a>
                  )}

                  {activeModalTrack.appleMusicUrl && (
                    <a
                      href={activeModalTrack.appleMusicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-xs tracking-wider font-mono flex items-center gap-1.5 border border-white/15"
                    >
                      {Icons.apple}
                      <span>APPLE MUSIC</span>
                    </a>
                  )}

                  {activeModalTrack.youtubeUrl && (
                    <button
                      onClick={() => {
                        setActiveModalTrack(null);
                        onOpenVideo(LINKS_CONFIG.youtubeFeaturedVideoId);
                      }}
                      className="px-4 py-2.5 rounded-full bg-[#FF0000]/20 hover:bg-[#FF0000]/30 text-white font-semibold text-xs tracking-wider font-mono flex items-center gap-1.5 border border-[#FF0000]/40"
                    >
                      {Icons.youtube}
                      <span>VISUALIZER</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* 6. TOAST NOTIFICATION FOR UNRELEASED TRACKS */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] bg-[#080B14]/95 border border-[#d97706]/40 text-[#F3EEE7] px-4 py-3 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl flex items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#d97706] shrink-0 animate-pulse" />
            <span className="font-light leading-snug">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#A3B1C6] hover:text-white p-1"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

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
              <span>{single.title} {single.isReleased ? 'Visualizer' : 'Teaser'}</span>
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
              title={`NOCTRA — ${currentSingle.title} (${currentSingle.isReleased ? 'Official Visualizer' : 'Official Teaser'})`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="p-4 bg-[#080B14]/90 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-[#d97706] uppercase block mb-0.5">
                {currentSingle.isReleased ? 'NOW SCREENING • OFFICIAL VISUALIZER' : 'NOW SCREENING • OFFICIAL TEASER'}
              </span>
              <h3 className="font-cinzel font-bold text-base sm:text-lg text-white">
                NOCTRA — {currentSingle.title} ({currentSingle.isReleased ? 'Official Visualizer' : 'Official Teaser'})
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
