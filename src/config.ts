/* ─────────────────────────────────────────────────────────────
   NOCTRA OFFICIAL WEBSITE — CONFIGURATION
   Paste your real streaming links, social URLs, and YouTube IDs here.
───────────────────────────────────────────────────────────── */

export interface SingleConfig {
  id: string;
  title: string;
  tag: string;
  badge: string;
  subtitle: string;
  description: string;
  coverImage: string;
  spotifyUrl: string;
  spotifyEmbedUrl?: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  youtubeVisualizerId: string;
}

export interface LinksConfig {
  artistName: string;
  tagline: string;
  genreBadges: string[];
  websiteUrl: string;
  
  // Streaming & Socials
  spotifyArtistUrl: string;
  appleMusicArtistUrl: string;
  youtubeChannelUrl: string;
  youtubeFeaturedVideoId: string;
  youtubeFeaturedVideoUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  contactEmail: string;

  // Bio
  officialBio: string;

  // Discography
  singles: SingleConfig[];
}

export const LINKS_CONFIG: LinksConfig = {
  artistName: "NOCTRA",
  tagline: "The official soundtrack for late-night overthinking.",
  genreBadges: ["Cinematic Dark Pop", "Alternative Pop", "Sad Pop Noir"],
  websiteUrl: "https://noctra-neon.vercel.app/",

  // 1. STREAMING & SOCIAL PROFILES (Easily editable)
  spotifyArtistUrl: "https://open.spotify.com/intl-es/artist/4501dvruPQPwODUjWkWpz4",
  appleMusicArtistUrl: "https://music.apple.com/es/album/2-17-am/6817391478?i=6817391482",
  youtubeChannelUrl: "https://youtube.com/@noctra_artist?si=us4X75Agv3icDT-Y",
  youtubeFeaturedVideoId: "TMnZQHayL2k",
  youtubeFeaturedVideoUrl: "https://youtu.be/TMnZQHayL2k",
  instagramUrl: "https://www.instagram.com/noctra.artist",
  tiktokUrl: "https://www.tiktok.com/@noctramusic",
  contactEmail: "press@noctraofficial.com",

  // 2. OFFICIAL BIOGRAPHY
  officialBio:
    "Noctra is an independent cinematic dark pop project born in the quiet isolation of late-night overthinking. Blending dark feminine aesthetics with raw, melancholic storytelling, her sound creates a sanctuary for those who feel the weight of unspoken words after midnight. With atmospheric production and intimate vocals, Noctra turns the silence of 2 AM into an immersive sonic experience.",

  // 3. OFFICIAL SINGLES DISCOGRAPHY
  singles: [
    {
      id: "two-cups",
      title: "Two Cups",
      tag: "NEW RELEASE",
      badge: "OUT NOW",
      subtitle:
        "The hardest part of someone leaving is the habits they leave behind. Pouring a second cup for a ghost.",
      description:
        "A colder, darker continuation of the Noctra universe. Intimate production, heavy sub-bass and the suffocating tension of words left unsaid the morning after.",
      coverImage: "/capa_two_cups.jpg",
      spotifyUrl: "https://open.spotify.com/album/2kTTSs1W7InLEuPQ4pRvXn",
      appleMusicUrl: "https://music.apple.com",
      youtubeUrl: "https://youtu.be/TMnZQHayL2k",
      youtubeVisualizerId: "TMnZQHayL2k",
    },
    {
      id: "217-am",
      title: "2:17 AM",
      tag: "DEBUT SINGLE",
      badge: "OUT NOW",
      subtitle:
        "When the world goes completely quiet, and the memories of someone who left become deafening.",
      description:
        "The cinematic dark pop anthem that started it all. Atmospheric synth pads and haunting vulnerability exploring midnight grief and sleepless reflection.",
      coverImage: "/capa_2_17_am.jpg",
      spotifyUrl: "https://open.spotify.com/intl-es/track/7ob3AKsKCbB1UpK2JJLbzx?si=2eb69c02317f4049",
      spotifyEmbedUrl:
        "https://open.spotify.com/embed/track/7ob3AKsKCbB1UpK2JJLbzx?utm_source=generator&theme=0",
      appleMusicUrl: "https://music.apple.com/es/album/2-17-am/6817391478?i=6817391482",
      youtubeUrl: "https://youtu.be/TMnZQHayL2k",
      youtubeVisualizerId: "TMnZQHayL2k",
    },
  ],
};

