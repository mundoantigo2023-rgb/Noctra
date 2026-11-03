import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Play, Pause, Menu, X, Disc3, AudioLines } from 'lucide-react';
import './experience.css';

type Release = { id: string; title: string; type: string; date: string; coverUrl: string; audioUrl?: string; spotifyUrl?: string };
type Video = { id: string; title: string; thumbnailUrl: string; published: boolean };
type Props = { data: any; leadSingle: Release; playingId?: string; isPlaying: boolean; onPlay: (track: any) => void; onVideo: (video: any) => void };

export default function Experience({ data, leadSingle, playingId, isPlaying, onPlay, onVideo }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const videos = data.videos.filter((v: Video) => v.published);
  const leadPlaying = isPlaying && playingId === leadSingle?.id;
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    root.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  }, []);
  const links = [['music', 'Music'], ['era', 'The era'], ['visuals', 'Visuals'], ['about', 'About']];
  return <div className="experience" ref={root}>
    <a className="skip-link" href="#music">Skip to music</a>
    <header className="nx-header">
      <a href="#home" className="wordmark" aria-label="Noctra home">N<span>O</span>CTRA<span className="brand-star">✦</span></a>
      <nav className={menuOpen ? 'nx-nav open' : 'nx-nav'} aria-label="Main navigation">
        {links.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-mobile-listen" href="#music" onClick={() => setMenuOpen(false)}>Listen now ↗</a>
      </nav>
      <a className="nav-listen" href="#music">Listen now <ArrowUpRight size={15}/></a>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="nx-hero" id="home">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-shade" />
        <div className="orbital orbital-one" aria-hidden="true"/><div className="orbital orbital-two" aria-hidden="true"/>
        <div className="hero-coordinates" aria-hidden="true">N / 001<br/>SOUND WITHOUT LIMITS</div>
        <div className="hero-copy">
          <p className="eyebrow"><span className="live-dot"/> A NEW VOICE. A NEW FREQUENCY.</p>
          <h1>BEYOND<br/>THE <span className="outline-type">HUMAN.</span></h1>
          <p className="hero-description">Born from imagination. Made to be felt.<br/>Enter the world of NOCTRA.</p>
          <div className="hero-actions">
            {leadSingle && <button className="nx-button primary" onClick={() => onPlay(leadSingle)}>{leadPlaying ? <Pause size={16}/> : <Play size={16} fill="currentColor"/>}{leadPlaying ? 'Pause' : 'Listen to'} {leadSingle.title}</button>}
            <a href="#era" className="text-link">Explore the era <ArrowUpRight size={18}/></a>
          </div>
        </div>
        <div className="hero-bottom"><a href="#music"><ArrowDown size={15}/> SCROLL TO DISCOVER</a><span>ARTIFICIAL ORIGIN. REAL EMOTION.</span><span className="hero-index">01 — ∞</span></div>
        <span className="image-caption">NOCTRA / AFTER THE SILENCE</span>
      </section>

      <div className="signal-strip" aria-hidden="true"><span>NOCTRA UNIVERSE</span><span>✦</span><span>ARTIFICIAL ORIGIN</span><span>✦</span><span>REAL EMOTION</span><span>✦</span><span>AFTER THE SILENCE</span><span>✦</span><span>A NEW FREQUENCY</span></div>

      <section className="nx-section music-section" id="music">
        <div className="section-heading reveal"><div><p className="eyebrow">01 / THE SOUND</p><h2>Feel it. <span>Play it.</span></h2></div><span className="section-aside">A world that sounds like no other.</span></div>
        <div className="release-grid">
          {data.releases.map((release: Release, i: number) => {
            const playing = isPlaying && playingId === release.id;
            const available = Boolean(release.audioUrl);
            return <article className="release-card reveal" key={release.id}>
              <div className="release-art"><img src={release.coverUrl} alt={`${release.title} cover artwork`} loading="lazy"/><span className="release-tag">{i === 0 ? 'FEATURED RELEASE' : release.type}</span>
                {available && <button className="round-play" onClick={() => onPlay(release)} aria-label={`${playing ? 'Pause' : 'Play'} ${release.title}`}>{playing ? <Pause size={22}/> : <Play size={22} fill="currentColor"/>}</button>}
              </div>
              <div className="release-info"><div><p>{release.type} <span> / </span> {release.date}</p><h3>{release.title}</h3></div>{available ? <AudioLines className={playing ? 'track-active' : ''}/> : <span className="coming-label">PREVIEW SOON</span>}</div>
            </article>;
          })}
        </div>
        <div className="listening-note"><Disc3 size={17}/><span>Press play. Let the outside world disappear.</span><span>NOCTRA / ON REPEAT</span></div>
      </section>

      <section className="era-section" id="era"><div className="era-grid" aria-hidden="true"/><div className="era-orbit" aria-hidden="true">✦</div><div className="era-content reveal"><p className="eyebrow">02 / {data.era.subtitle}</p><h2>After the<br/><em>Silence.</em></h2><p>{data.era.text}</p><div className="era-chapters">{data.era.arcs.map((arc: string, i: number) => <span key={arc}><small>0{i + 1}</small>{arc}</span>)}</div><a href="#music" className="text-link">Enter the first chapter <ArrowUpRight size={18}/></a></div></section>

      <section className="nx-section" id="visuals"><div className="section-heading reveal"><div><p className="eyebrow">03 / THE VISION</p><h2>Sound. <span>In sight.</span></h2></div><span className="section-aside">Step inside the story.</span></div>
        {videos.map((video: Video) => <button className="video-feature reveal" key={video.id} onClick={() => onVideo(video)} aria-label={`Watch ${video.title}`}><img src={video.thumbnailUrl} alt="" loading="lazy"/><span className="video-gradient"/><span className="video-label">NOCTRA — VISUAL ARCHIVE</span><span className="video-play"><Play fill="currentColor" size={28}/></span><span className="video-bottom"><span><small>OFFICIAL MUSIC VIDEO</small><strong>{video.title}</strong></span><ArrowUpRight size={28}/></span></button>)}
      </section>

      <section className="nx-section about-section" id="about"><div className="about-art reveal"><img src="/hero_portrait.png" alt="NOCTRA performing with a microphone in a cinematic stage setting" loading="lazy"/><span>IMAGINED. CREATED. HEARD.</span></div><div className="about-copy reveal"><p className="eyebrow">04 / THE ARTIST</p><h2>A digital soul.<br/><span>A real connection.</span></h2><p>NOCTRA is an AI-created music artist, shaped by human imagination. A voice for the feelings that are hard to put into words.</p><p>{data.about.bioParagraph2}</p><span className="artist-signature">Noctra <span>✦</span></span></div></section>

      <section className="connect-section" id="contact"><p className="eyebrow">STAY IN THE FREQUENCY</p><h2>This is only<br/><span>the beginning.</span></h2><a className="nx-button primary" href={`mailto:${data.contact.businessEmail}`}>Get in touch <ArrowUpRight size={18}/></a><span className="connect-subtitle">COLLABORATIONS / PRESS / OTHER WORLDS</span></section>
    </main>
    <footer className="nx-footer"><a href="#home" className="wordmark">NOCTRA<span className="brand-star">✦</span></a><span>© {new Date().getFullYear()} NOCTRA</span><a href="#home">Back to the surface ↑</a></footer>
  </div>;
}
