import React, { useState, useEffect } from 'react';
import {
  Play, X, Menu, Check,
  ChevronDown, BookOpen, Music, Film, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

/* ─────────────────────────────────────────────
   LINKS & CONSTANTS
───────────────────────────────────────────── */
const RELEASE_DATE_217AM = new Date('2026-10-16T00:00:00');
const SPOTIFY_TRACK_URL = 'https://open.spotify.com/intl-es/track/7ob3AKsKCbB1UpK2JJLbzx?si=2eb69c02317f4049';
const SPOTIFY_EMBED_URL = 'https://open.spotify.com/embed/track/7ob3AKsKCbB1UpK2JJLbzx?utm_source=generator&theme=0';
const SPOTIFY_PRE_SAVE_URL = 'https://open.spotify.com/album/2kTTSs1W7InLEuPQ4pRvXn';
const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/intl-es/artist/4501dvruPQPwODUjWkWpz4';
const YOUTUBE_URL = 'https://youtube.com/@noctra_artist?si=us4X75Agv3icDT-Y';
const INSTAGRAM_URL = 'https://www.instagram.com/noctra.artist';
const TIKTOK_URL = 'https://www.tiktok.com/@noctramusic';

/* ─────────────────────────────────────────────
   BRAND ICONS
───────────────────────────────────────────── */
const Icons = {
  spotify: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.241 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.72 12.9c.36.181.54.78.241 1.14zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.559.3z"/>
    </svg>
  ),
  apple: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.87c.68-.82 1.14-1.97.01-3.12-1.01.04-2.26.68-2.97 1.5-.63.73-1.18 1.9-.03 3.04 1.13.09 2.31-.6 2.99-1.42z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
};

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   NAVIGATION LINKS
───────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'RELEASES', href: '#releases' },
  { label: 'WATCH', href: '#watch' },
  { label: 'ABOUT', href: '#about' },
  { label: 'COMMUNITY', href: '#community' },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function App() {
  const [isReleased217, setIsReleased217] = useState(true);

  useEffect(() => {
    const checkRelease = () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('released') === 'false') {
        setIsReleased217(false);
        return;
      }
      setIsReleased217(true);
    };
    checkRelease();
  }, []);

  // Video modal
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Community Newsletter
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  // Two Cups notification
  const [notifyEmail, setNotifyEmail] = useState('');
  const [notified, setNotified] = useState(false);

  useScrollReveal();

  useEffect(() => {
    if (!isVideoOpen) return;
    document.body.style.overflow = 'hidden';
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsVideoOpen(false); };
    window.addEventListener('keydown', fn);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', fn); };
  }, [isVideoOpen]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setJoined(true);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.75 }, colors: ['#C8A25A', '#F3EEE7', '#6c8ea4'] });
    }
  };

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotified(true);
      confetti({ particleCount: 25, spread: 45, origin: { y: 0.65 }, colors: ['#C8A25A', '#8B2035', '#F3EEE7'] });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F3EEE7] font-sans overflow-x-hidden w-full selection:bg-[#C8A25A]/30 selection:text-[#F3EEE7]">
      {/* Film grain subtle overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* NAVBAR */}
      <Navbar onOpenVideo={() => setIsVideoOpen(true)} />

      {/* HERO */}
      <HeroSection
        onOpenVideo={() => setIsVideoOpen(true)}
        isReleased={isReleased217}
      />

      {/* UNIFIED RELEASES & ROADMAP SECTION */}
      <ReleasesSection
        onOpenVideo={() => setIsVideoOpen(true)}
        isReleased={isReleased217}
        notifyEmail={notifyEmail}
        setNotifyEmail={setNotifyEmail}
        notified={notified}
        onNotify={handleNotify}
      />

      {/* WATCH */}
      <WatchSection onOpenVideo={() => setIsVideoOpen(true)} />

      {/* ABOUT */}
      <AboutSection />

      {/* COMMUNITY */}
      <CommunitySection email={email} setEmail={setEmail} joined={joined} onSubmit={handleJoin} />

      {/* FOOTER */}
      <SiteFooter />

      {/* VIDEO MODAL */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="2:17 AM Official Music Video"
        >
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-10 right-0 flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#A3B1C6] hover:text-[#F3EEE7] transition-colors"
            >
              <X className="w-4 h-4" /> CLOSE
            </button>
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden border border-[#C8A25A]/25 shadow-[0_30px_70px_-15px_rgba(0,0,0,1)]">
              <video
                src="/Versao_Video_Oficial.mp4"
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#C8A25A] uppercase">NOCTRA • OFFICIAL VIDEO</span>
                <p className="text-base sm:text-lg font-cormorant font-semibold text-[#F3EEE7]">2:17 AM</p>
              </div>
              <span className="text-xs text-[#A3B1C6]/60 font-mono hidden sm:block">OCTOBER 16, 2026</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR (Compact, Proportionate & Sleek)
───────────────────────────────────────────── */
const Navbar = ({ onOpenVideo }: { onOpenVideo: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/90 backdrop-blur-lg border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-3 sm:py-3.5'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          {/* Wordmark */}
          <a
            href="#home"
            className="text-lg sm:text-xl font-cormorant font-bold tracking-[0.3em] text-[#F3EEE7] hover:text-[#C8A25A] transition-colors duration-300 shrink-0"
          >
            NOCTRA
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[11px] font-medium tracking-[0.2em] text-[#A3B1C6]">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="hover:text-[#F3EEE7] transition-colors duration-200 relative group py-1"
              >
                {l.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C8A25A] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right: Social Icons + Listen CTA */}
          <div className="hidden md:flex items-center gap-3.5">
            <a href={SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer" className="text-[#A3B1C6] hover:text-[#1DB954] transition-colors p-1" aria-label="Spotify">
              {Icons.spotify}
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="text-[#A3B1C6] hover:text-[#FF0000] transition-colors p-1" aria-label="YouTube">
              {Icons.youtube}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-[#A3B1C6] hover:text-[#E1306C] transition-colors p-1" aria-label="Instagram">
              {Icons.instagram}
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noreferrer" className="text-[#A3B1C6] hover:text-[#00f2fe] transition-colors p-1" aria-label="TikTok">
              {Icons.tiktok}
            </a>
            <a
              href="#releases"
              className="ml-1 border border-[#1DB954]/50 hover:border-[#1DB954] text-[#F3EEE7] hover:text-[#1DB954] px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-[0.18em] transition-all"
            >
              LISTEN NOW
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#F3EEE7] hover:text-[#C8A25A] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#050505]/98 backdrop-blur-xl flex flex-col justify-between pt-20 pb-8 px-6 transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-2">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-cormorant font-semibold text-[#F3EEE7]/90 hover:text-[#C8A25A] py-2.5 border-b border-white/5 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-center gap-6 py-2">
            <a href={SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer" aria-label="Spotify" className="text-[#A3B1C6] hover:text-[#1DB954]">
              {Icons.spotify}
            </a>
            <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" aria-label="YouTube" className="text-[#A3B1C6] hover:text-[#FF0000]">
              {Icons.youtube}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="text-[#A3B1C6] hover:text-[#E1306C]">
              {Icons.instagram}
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="TikTok" className="text-[#A3B1C6] hover:text-[#00f2fe]">
              {Icons.tiktok}
            </a>
          </div>
          <button
            onClick={() => {
              setMobileOpen(false);
              document.getElementById('releases')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full bg-[#1DB954] text-black font-bold py-3 rounded-full text-xs tracking-[0.2em] uppercase"
          >
            LISTEN TO 2:17 AM
          </button>
        </div>
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────
   HERO SECTION (Balanced & Proportionate)
───────────────────────────────────────────── */
const HeroSection = ({
  onOpenVideo, isReleased
}: {
  onOpenVideo: () => void;
  isReleased: boolean;
}) => {
  return (
    <section id="home" className="relative min-h-[92vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background with video/poster */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay loop muted playsInline
          poster="/noctra_hero_bg.png"
          className="w-full h-full object-cover brightness-[0.28] contrast-110 saturate-[0.6]"
        >
          <source src="/Versao_Video_Oficial.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/60" />
        <div className="absolute inset-0 hero-vignette" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center pt-24 pb-16 sm:py-28">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-[#C8A25A]/30 mb-6 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954] animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-[#C8A25A] uppercase">
            DEBUT SINGLE • OUT NOW
          </span>
        </div>

        {/* Brand Name */}
        <h1 className="font-cormorant font-bold text-[#F3EEE7] hero-title text-glow-hero mb-3">
          NOCTRA
        </h1>

        {/* Tagline - fluid, single natural flow */}
        <p className="font-cormorant italic text-[#F3EEE7]/85 hero-tagline mb-3 max-w-lg mx-auto">
          "Some feelings only exist after midnight."
        </p>

        {/* Atmospheric subtitle */}
        <p className="text-xs sm:text-sm text-[#A3B1C6]/75 font-light tracking-wide max-w-md mx-auto mb-8 leading-relaxed">
          Cinematic Dark Pop for the hours when silence gets too loud.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-6">
          <a
            href="#releases"
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold px-7 py-3 rounded-full text-xs tracking-[0.2em] transition-all hover:scale-105 shadow-[0_8px_30px_rgba(29,185,84,0.35)]"
          >
            {Icons.spotify}
            LISTEN TO 2:17 AM
          </a>
          <button
            onClick={onOpenVideo}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 border border-[#C8A25A]/40 hover:border-[#C8A25A] text-[#F3EEE7] hover:text-[#C8A25A] bg-black/30 hover:bg-[#C8A25A]/10 px-7 py-3 rounded-full text-xs tracking-[0.2em] transition-all hover:scale-105 backdrop-blur-sm"
          >
            <Film className="w-4 h-4" />
            WATCH VIDEO
          </button>
        </div>

        {/* Dual Release Roadmap Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 py-2 rounded-full bg-[#0C0C0F]/80 border border-white/8 text-[10px] font-mono tracking-wider text-[#A3B1C6]/80">
          <span className="flex items-center gap-1.5 text-[#F3EEE7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
            2:17 AM • Out Now
          </span>
          <span className="text-white/20">•</span>
          <span className="flex items-center gap-1.5 text-[#A3B1C6]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B2035]" />
            Two Cups • Nov 13
          </span>
        </div>
      </div>

      {/* Down indicator */}
      <a
        href="#releases"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[#A3B1C6]/40 hover:text-[#C8A25A] transition-colors"
        aria-label="Scroll to releases"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase">DISCOVER</span>
        <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
      </a>
    </section>
  );
};

/* ─────────────────────────────────────────────
   UNIFIED RELEASES & ROADMAP SECTION
   (Compact, Clean, Side-by-Side Spotlight)
───────────────────────────────────────────── */
const ReleasesSection = ({
  onOpenVideo, isReleased,
  notifyEmail, setNotifyEmail, notified, onNotify
}: {
  onOpenVideo: () => void;
  isReleased: boolean;
  notifyEmail: string;
  setNotifyEmail: (s: string) => void;
  notified: boolean;
  onNotify: (e: React.FormEvent) => void;
}) => {
  return (
    <section id="releases" className="bg-[#070709] py-16 sm:py-20 lg:py-24 border-t border-white/5 relative scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 reveal">
          <span className="text-[10px] font-mono tracking-[0.35em] text-[#C8A25A] uppercase block mb-2">
            OFFICIAL CATALOG
          </span>
          <h2 className="font-cormorant font-bold text-[#F3EEE7] text-3xl sm:text-4xl lg:text-5xl tracking-wide">
            RELEASES & ROADMAP
          </h2>
          <p className="text-xs sm:text-sm text-[#A3B1C6]/60 font-light mt-2 max-w-md mx-auto">
            From late night sleepless hours to the cold morning after.
          </p>
        </div>

        {/* 2-Column Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-14">
          
          {/* ────── CARD 1: 2:17 AM (Lead Single) ────── */}
          <div className="reveal bg-[#0C0C10] border border-[#C8A25A]/25 rounded-2xl p-5 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] hover:border-[#C8A25A]/45 transition-all duration-300">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-[#C8A25A] uppercase bg-[#C8A25A]/10 px-2.5 py-1 rounded-full border border-[#C8A25A]/25">
                    SINGLE 01
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.2em] bg-[#1DB954] text-black font-bold px-2 py-0.5 rounded-full">
                    OUT NOW
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#A3B1C6]/50">2026</span>
              </div>

              {/* Artwork */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 border border-white/8 group">
                <img
                  src="/capa_2_17_am.jpg"
                  alt="2:17 AM Single Cover"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90">
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] tracking-wider text-[#C8A25A]">
                    CINEMATIC DARK POP
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-cormorant font-bold text-[#F3EEE7] text-2xl sm:text-3xl mb-1.5 text-glow-gold">
                2:17 AM
              </h3>
              <p className="text-xs sm:text-sm text-[#A3B1C6]/75 font-light leading-relaxed mb-5">
                The debut single capturing the silence and tension of the night when every thought gets louder.
              </p>

              {/* SPOTIFY PLAYER EMBED (Replaces local audio file) */}
              <div className="mb-5 overflow-hidden rounded-xl border border-[#C8A25A]/25 bg-[#050507] shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={SPOTIFY_EMBED_URL}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Player - NOCTRA 2:17 AM"
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={SPOTIFY_TRACK_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-2.5 px-4 rounded-full text-xs tracking-wider transition-all shadow-[0_4px_20px_rgba(29,185,84,0.3)]"
                >
                  {Icons.spotify} OPEN IN SPOTIFY
                </a>
                <button
                  onClick={onOpenVideo}
                  className="flex items-center justify-center gap-2 border border-white/15 hover:border-[#C8A25A] text-[#F3EEE7] hover:text-[#C8A25A] py-2.5 px-4 rounded-full text-xs tracking-wider transition-all"
                >
                  <Film className="w-3.5 h-3.5" /> VIDEO
                </button>
              </div>

              {/* Streaming platform links */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] font-mono text-[#A3B1C6]/60">
                <a href={SPOTIFY_TRACK_URL} target="_blank" rel="noreferrer" className="hover:text-[#1DB954] transition-colors flex items-center gap-1">
                  {Icons.spotify} Track on Spotify
                </a>
                <a href={SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer" className="hover:text-[#1DB954] transition-colors flex items-center gap-1">
                  Artist Profile
                </a>
                <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="hover:text-[#FF0000] transition-colors flex items-center gap-1">
                  {Icons.youtube} YouTube
                </a>
              </div>
            </div>
          </div>

          {/* ────── CARD 2: Two Cups (Second Single) ────── */}
          <div className="reveal bg-[#0C0C10] border border-[#8B2035]/35 rounded-2xl p-5 sm:p-7 flex flex-col justify-between shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] hover:border-[#8B2035]/60 transition-all duration-300">
            <div>
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono tracking-[0.25em] text-[#C8A25A] uppercase bg-[#8B2035]/20 px-2.5 py-1 rounded-full border border-[#8B2035]/40">
                    SINGLE 02
                  </span>
                  <span className="text-[9px] font-mono tracking-[0.2em] border border-[#8B2035] text-[#C8A25A] px-2 py-0.5 rounded-full">
                    NOVEMBER 13
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#A3B1C6]/50">COMING SOON</span>
              </div>

              {/* Artwork */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 border border-white/8 group">
                <img
                  src="/capa_two_cups.jpg"
                  alt="Two Cups Single Cover"
                  className="w-full h-full object-cover brightness-[0.75] saturate-[0.85] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center px-4 py-2 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10">
                    <span className="text-[9px] font-mono tracking-[0.3em] text-[#C8A25A] uppercase block">PRE-SAVE OPEN</span>
                    <span className="font-cormorant font-bold text-lg text-[#F3EEE7]">November 13, 2026</span>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="font-cormorant font-bold text-[#F3EEE7] text-2xl sm:text-3xl mb-1.5">
                Two Cups
              </h3>
              <p className="text-xs sm:text-sm text-[#A3B1C6]/75 font-light leading-relaxed mb-5">
                A colder, darker continuation of the Noctra universe. The tension of unsaid words the morning after.
              </p>

              {/* Notification Box */}
              {notified ? (
                <div className="bg-[#050507] border border-[#C8A25A]/30 rounded-xl p-3.5 mb-5 flex items-center gap-2.5 text-xs text-[#C8A25A]">
                  <Check className="w-4 h-4 shrink-0 text-[#C8A25A]" />
                  <span>You are on the priority alert list for November 13.</span>
                </div>
              ) : (
                <form onSubmit={onNotify} className="bg-[#050507] border border-white/10 focus-within:border-[#C8A25A]/50 rounded-xl p-2.5 mb-5 flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="Enter email for release alert"
                    className="bg-transparent text-xs text-[#F3EEE7] placeholder-[#A3B1C6]/40 flex-1 px-2 py-1 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#C8A25A]/20 hover:bg-[#C8A25A] text-[#F3EEE7] hover:text-black px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider transition-all whitespace-nowrap"
                  >
                    NOTIFY ME
                  </button>
                </form>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={SPOTIFY_PRE_SAVE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1DB954]/15 hover:bg-[#1DB954]/25 border border-[#1DB954]/40 text-[#1DB954] hover:text-white font-semibold py-2.5 px-4 rounded-full text-xs tracking-wider transition-all"
                >
                  {Icons.spotify} PRE-SAVE ON SPOTIFY
                </a>
                <button
                  disabled
                  className="flex items-center justify-center gap-2 border border-white/10 text-[#A3B1C6]/50 py-2.5 px-4 rounded-full text-xs tracking-wider cursor-not-allowed"
                >
                  <BookOpen className="w-3.5 h-3.5" /> LYRICS SOON
                </button>
              </div>

              {/* Status footer */}
              <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[10px] font-mono text-[#A3B1C6]/60">
                <span>Phase II Release</span>
                <span className="text-[#C8A25A]">Official Track 02</span>
                <a href={SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer" className="hover:text-[#C8A25A] transition-colors">
                  Artist Profile →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ────── COMPACT RELEASE ROADMAP ────── */}
        <div className="reveal bg-[#0C0C10]/60 border border-white/8 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-white/5">
            <div>
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#C8A25A] uppercase block">ROADMAP</span>
              <h3 className="font-cormorant font-bold text-xl sm:text-2xl text-[#F3EEE7]">Release Pipeline</h3>
            </div>
            <p className="text-xs text-[#A3B1C6]/50 font-mono">2026 UNIVERSE CHAPTERS</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-[#C8A25A]/30 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono tracking-widest text-[#C8A25A]">PHASE I</span>
                  <span className="text-[8px] font-mono px-2 py-0.5 rounded-full bg-[#1DB954] text-black font-bold">
                    OUT NOW
                  </span>
                </div>
                <h4 className="font-cormorant font-bold text-lg text-[#F3EEE7]">2:17 AM</h4>
                <p className="text-xs text-[#A3B1C6]/60 font-light mt-1">Lead Single & Official Video</p>
              </div>
              <a
                href={SPOTIFY_TRACK_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-[#1DB954] hover:underline flex items-center gap-1"
              >
                Stream on Spotify <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-[#8B2035]/35 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono tracking-widest text-[#C8A25A]">PHASE II</span>
                  <span className="text-[8px] font-mono px-2 py-0.5 rounded-full border border-[#8B2035] text-[#C8A25A]">
                    NOV 13
                  </span>
                </div>
                <h4 className="font-cormorant font-bold text-lg text-[#F3EEE7]">Two Cups</h4>
                <p className="text-xs text-[#A3B1C6]/60 font-light mt-1">Second Single & Lyric Universe</p>
              </div>
              <a
                href={SPOTIFY_PRE_SAVE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-mono text-[#C8A25A] hover:underline flex items-center gap-1"
              >
                Pre-Save Track <ArrowRight className="w-3 h-3" />
              </a>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col justify-between gap-3 opacity-60">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono tracking-widest text-[#A3B1C6]/50">PHASE III</span>
                  <span className="text-[8px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-[#A3B1C6]/40">
                    WINTER 2026
                  </span>
                </div>
                <h4 className="font-cormorant font-bold text-lg text-[#F3EEE7]">The Vault (TBA)</h4>
                <p className="text-xs text-[#A3B1C6]/50 font-light mt-1">Extended Noctra Project</p>
              </div>
              <span className="text-[10px] font-mono text-[#A3B1C6]/40">Stay Tuned</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

/* ─────────────────────────────────────────────
   WATCH SECTION (Compact & Cinematic)
───────────────────────────────────────────── */
const SHORTS = [
  { label: 'TEASER', title: '2:17 AM — Behind the Glass', tag: 'Visual Cut' },
  { label: 'ATMOSPHERE', title: 'After Midnight Sessions', tag: 'Studio Mood' },
  { label: 'LYRIC', title: '"Every thought becomes louder"', tag: 'Teaser' },
];

const WatchSection = ({ onOpenVideo }: { onOpenVideo: () => void }) => (
  <section id="watch" className="bg-[#050507] py-16 sm:py-20 lg:py-24 border-t border-white/5 scroll-mt-16 sm:scroll-mt-20">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12 reveal">
        <span className="text-[10px] font-mono tracking-[0.35em] text-[#C8A25A] uppercase block mb-2">
          OFFICIAL VISUALS
        </span>
        <h2 className="font-cormorant font-bold text-[#F3EEE7] text-3xl sm:text-4xl lg:text-5xl tracking-wide">
          WATCH THE NIGHT
        </h2>
        <p className="text-xs sm:text-sm text-[#A3B1C6]/60 font-light mt-2 max-w-md mx-auto">
          Immerse yourself in the dark cinematic imagery of 2:17 AM.
        </p>
      </div>

      {/* Main Video Spotlight */}
      <div
        className="reveal relative group cursor-pointer rounded-2xl overflow-hidden border border-[#C8A25A]/25 mb-8 shadow-[0_30px_70px_-20px_rgba(0,0,0,1)]"
        onClick={onOpenVideo}
      >
        <div className="aspect-video relative bg-[#0C0C10]">
          <video
            src="/Versao_Video_Oficial.mp4"
            muted loop autoPlay playsInline
            className="w-full h-full object-cover brightness-[0.35] saturate-[0.6] group-hover:brightness-[0.48] transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
          
          {/* Centered Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F3EEE7]/10 border border-[#F3EEE7]/25 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-[#C8A25A] group-hover:text-black text-white shadow-[0_0_30px_rgba(200,162,90,0.25)]">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
            </div>
          </div>

          {/* Bottom Card Bar */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-end justify-between gap-3">
            <div>
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#C8A25A] uppercase block mb-1">
                OFFICIAL MUSIC VIDEO
              </span>
              <h3 className="font-cormorant font-bold text-[#F3EEE7] text-xl sm:text-2xl">
                NOCTRA — 2:17 AM
              </h3>
            </div>
            <button className="hidden sm:flex items-center gap-2 bg-[#F3EEE7] text-black font-semibold text-xs tracking-wider px-4 py-2 rounded-full hover:bg-[#C8A25A] transition-colors">
              WATCH FULLSCREEN
            </button>
          </div>
        </div>
      </div>

      {/* 3 Shorts Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {SHORTS.map((s, i) => (
          <div
            key={i}
            onClick={onOpenVideo}
            className="reveal group relative aspect-[16/10] sm:aspect-[4/5] rounded-xl overflow-hidden border border-white/8 bg-[#0C0C10] cursor-pointer hover:border-[#C8A25A]/35 transition-all duration-300"
          >
            <img
              src={i === 0 ? '/noctra_portrait.png' : i === 1 ? '/noctra_hero_bg.png' : '/capa_2_17_am.jpg'}
              alt={s.title}
              className="w-full h-full object-cover brightness-[0.38] saturate-[0.7] group-hover:scale-105 group-hover:brightness-[0.5] transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-current ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-3.5 left-3.5 right-3.5">
              <span className="text-[8px] font-mono tracking-[0.25em] text-[#C8A25A] uppercase block mb-1">
                {s.label} • {s.tag}
              </span>
              <p className="font-cormorant italic text-[#F3EEE7]/90 text-sm leading-snug truncate">
                {s.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* YouTube Subscribe Button */}
      <div className="flex justify-center reveal">
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 border border-[#FF0000]/40 hover:border-[#FF0000] text-[#F3EEE7] bg-[#FF0000]/15 hover:bg-[#FF0000]/25 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all hover:scale-105 shadow-[0_8px_25px_-10px_rgba(255,0,0,0.3)]"
        >
          {Icons.youtube}
          SUBSCRIBE ON YOUTUBE
        </a>
      </div>

    </div>
  </section>
);

/* ─────────────────────────────────────────────
   ABOUT SECTION (Proportionate, Studio Portrait)
───────────────────────────────────────────── */
const AboutSection = () => (
  <section id="about" className="bg-[#070709] py-16 sm:py-20 lg:py-24 border-t border-white/5 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Studio Portrait (5 cols) */}
        <div className="lg:col-span-5 reveal flex justify-center">
          <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl overflow-hidden border border-[#C8A25A]/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,1)]">
            <img
              src="/noctra_portrait_studio.png"
              alt="NOCTRA in the studio"
              className="w-full h-auto object-cover brightness-90 saturate-[0.85] hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 text-center">
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#C8A25A] uppercase bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                NOCTRA • IN THE STUDIO
              </span>
            </div>
          </div>
        </div>

        {/* Bio & Details (7 cols) */}
        <div className="lg:col-span-7 reveal flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-[0.35em] text-[#C8A25A] uppercase block mb-2">
              THE ARTIST & UNIVERSE
            </span>
            <h2 className="font-cormorant font-bold text-[#F3EEE7] text-3xl sm:text-4xl lg:text-5xl tracking-wide leading-tight mb-4">
              INSIDE THE NOCTRA WORLD
            </h2>
            <div className="w-10 h-px bg-[#C8A25A]/50 mb-4" />
            <p className="font-cormorant italic text-[#F3EEE7]/80 text-lg sm:text-xl leading-relaxed">
              "NOCTRA lives in the hours after midnight — where heartbreak becomes atmosphere, silence becomes tension, and every song feels like a scene from a sleepless night."
            </p>
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'GENRE', value: 'Cinematic Dark Pop' },
              { label: 'ENERGY', value: 'Midnight Noir' },
              { label: 'LEAD SINGLE', value: '2:17 AM (Oct 16)' },
              { label: 'NEXT RELEASE', value: 'Two Cups (Nov 13)' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#0C0C10] border border-white/8 rounded-xl p-3.5">
                <span className="text-[8px] font-mono tracking-[0.3em] text-[#C8A25A] uppercase block mb-1">
                  {stat.label}
                </span>
                <span className="font-cormorant font-semibold text-[#F3EEE7] text-sm sm:text-base">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {/* Social Platforms */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-xs font-mono text-[#A3B1C6]/60">Follow Noctra:</span>
            <div className="flex items-center gap-3">
              <a href={SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer" aria-label="Spotify" className="p-2 rounded-full bg-white/5 hover:bg-[#1DB954]/20 text-[#A3B1C6] hover:text-[#1DB954] transition-all">
                {Icons.spotify}
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" aria-label="YouTube" className="p-2 rounded-full bg-white/5 hover:bg-[#FF0000]/20 text-[#A3B1C6] hover:text-[#FF0000] transition-all">
                {Icons.youtube}
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-white/5 hover:bg-[#E1306C]/20 text-[#A3B1C6] hover:text-[#E1306C] transition-all">
                {Icons.instagram}
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="TikTok" className="p-2 rounded-full bg-white/5 hover:bg-[#00f2fe]/20 text-[#A3B1C6] hover:text-[#00f2fe] transition-all">
                {Icons.tiktok}
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   COMMUNITY SECTION (Clean & Intimate)
───────────────────────────────────────────── */
const CommunitySection = ({
  email, setEmail, joined, onSubmit
}: {
  email: string;
  setEmail: (s: string) => void;
  joined: boolean;
  onSubmit: (e: React.FormEvent) => void;
}) => (
  <section id="community" className="bg-[#050507] py-16 sm:py-20 lg:py-24 border-t border-white/5 relative overflow-hidden scroll-mt-16 sm:scroll-mt-20">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C8A25A]/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
    
    <div className="max-w-xl mx-auto px-4 sm:px-6 text-center relative z-10 reveal">
      <span className="text-[10px] font-mono tracking-[0.35em] text-[#C8A25A] uppercase block mb-2">
        INTIMATE CIRCLE
      </span>
      <h2 className="font-cormorant font-bold text-[#F3EEE7] text-3xl sm:text-4xl lg:text-5xl tracking-wide text-glow-gold mb-3">
        THE 2:17 CLUB
      </h2>
      <p className="font-cormorant italic text-[#F3EEE7]/70 text-lg sm:text-xl mb-6">
        "For the ones still awake when the world goes quiet."
      </p>

      {joined ? (
        <div className="flex items-center justify-center gap-2.5 bg-[#0C0C10] border border-[#C8A25A]/40 text-[#C8A25A] font-cormorant italic text-base sm:text-lg px-6 py-3.5 rounded-full">
          <Check className="w-5 h-5 shrink-0" />
          You are in the circle. Welcome to 2:17 AM.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto mb-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 bg-[#0C0C10] border border-white/15 focus:border-[#C8A25A] text-[#F3EEE7] placeholder-[#A3B1C6]/40 text-xs px-4 py-3 rounded-full focus:outline-none transition-colors text-center sm:text-left"
          />
          <button
            type="submit"
            className="bg-[#C8A25A] hover:bg-[#F3EEE7] text-black font-bold px-6 py-3 rounded-full text-xs tracking-wider uppercase transition-all shadow-[0_8px_25px_-5px_rgba(200,162,90,0.35)] whitespace-nowrap"
          >
            JOIN CLUB
          </button>
        </form>
      )}

      <p className="text-[11px] text-[#A3B1C6]/45 font-light tracking-wide max-w-sm mx-auto">
        Receive private music previews, visual drops, and release announcements. No spam.
      </p>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   SITE FOOTER (Compact, Clean & Responsive)
───────────────────────────────────────────── */
const SiteFooter = () => (
  <footer id="contact" className="bg-[#030304] border-t border-white/5 py-12 sm:py-16 safe-pb">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-6 text-center">
      
      {/* Wordmark */}
      <a href="#home" className="font-cormorant font-bold text-xl sm:text-2xl tracking-[0.35em] text-[#F3EEE7] hover:text-[#C8A25A] transition-colors">
        NOCTRA
      </a>

      {/* Social Platforms */}
      <div className="flex flex-wrap justify-center gap-4 text-[#A3B1C6]/60">
        <a href={SPOTIFY_ARTIST_URL} target="_blank" rel="noreferrer" aria-label="Spotify" className="hover:text-[#1DB954] transition-colors p-1">
          {Icons.spotify}
        </a>
        <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[#FF0000] transition-colors p-1">
          {Icons.youtube}
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#E1306C] transition-colors p-1">
          {Icons.instagram}
        </a>
        <a href={TIKTOK_URL} target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-[#00f2fe] transition-colors p-1">
          {Icons.tiktok}
        </a>
        <a href="https://music.apple.com" target="_blank" rel="noreferrer" aria-label="Apple Music" className="hover:text-white transition-colors p-1">
          {Icons.apple}
        </a>
      </div>

      {/* Internal Navigation Links */}
      <nav className="flex flex-wrap justify-center gap-5 text-[10px] font-mono tracking-[0.18em] text-[#A3B1C6]/50">
        <a href="#home" className="hover:text-[#F3EEE7] transition-colors">HOME</a>
        <a href="#releases" className="hover:text-[#F3EEE7] transition-colors">RELEASES</a>
        <a href="#watch" className="hover:text-[#F3EEE7] transition-colors">WATCH</a>
        <a href="#about" className="hover:text-[#F3EEE7] transition-colors">ABOUT</a>
        <a href="#community" className="hover:text-[#F3EEE7] transition-colors">COMMUNITY</a>
        <a href="mailto:press@noctraofficial.com" className="hover:text-[#C8A25A] transition-colors">CONTACT</a>
      </nav>

      {/* Copyright */}
      <p className="font-cormorant italic text-[#F3EEE7]/30 text-xs sm:text-sm tracking-wider">
        © 2026 NOCTRA. All rights reserved. Cinematic Dark Pop.
      </p>
    </div>
  </footer>
);
