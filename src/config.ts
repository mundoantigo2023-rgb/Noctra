/* ─────────────────────────────────────────────────────────────
   NOCTRA OFFICIAL WEBSITE — CONFIGURATION
   Paste your real streaming links, social URLs, and YouTube IDs here.
───────────────────────────────────────────────────────────── */

export interface SingleConfig {
  id: string;
  title: string;
  tag: string;
  badge: string;
  isReleased: boolean;
  releaseDateText: string;
  preSaveUrl?: string;
  subtitle: string;
  description: string;
  coverImage: string;
  spotifyUrl: string;
  spotifyEmbedUrl?: string;
  appleMusicUrl: string;
  youtubeUrl: string;
  youtubeVisualizerId: string;
}

export interface AlbumTrackConfig {
  number: string;
  id: string;
  title: string;
  description: string;
  lyricQuote: string;
  coverImage: string;
  hasOfficialArtwork: boolean;
  visualDirection: string;
  mood: string;
  phase: 'midnight' | 'cold-darkness' | 'dawn';
  phaseLabel: string;
  timecode: string;
  status: 'OUT NOW' | 'PRE-SAVE' | 'COMING SOON';
  isReleased: boolean;
  duration: string;
  audioUrl?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
  youtubeUrl?: string;
  preSaveUrl?: string;
  accentColor: string;
  borderColor: string;
  bgGlowClass: string;
}

export interface AlbumConfig {
  title: string;
  subtitle: string;
  supportingCopy: string;
  tagline: string;
  coverImage: string;
  releaseYear: string;
  timelineStart: string;
  timelineEnd: string;
  tracks: AlbumTrackConfig[];
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

  // Singles (Hero & Visualizer compatibility)
  singles: SingleConfig[];

  // Album: THE FIRST NIGHT (10 Tracks)
  album: AlbumConfig;
}

export const LINKS_CONFIG: LinksConfig = {
  artistName: "NOCTRA",
  tagline: "The official soundtrack for late-night overthinking.",
  genreBadges: ["Cinematic Dark Pop", "Alternative Pop", "Sad Pop Noir"],
  websiteUrl: "https://noctra-neon.vercel.app/",

  // 1. STREAMING & SOCIAL PROFILES (Easily editable)
  spotifyArtistUrl: "https://open.spotify.com/intl-es/artist/4501dvruPQPwODUjWkWpz4",
  appleMusicArtistUrl: "https://music.apple.com/es/artist/noctra/1841512361",
  youtubeChannelUrl: "https://youtube.com/@noctra_artist?si=us4X75Agv3icDT-Y",
  youtubeFeaturedVideoId: "TMnZQHayL2k",
  youtubeFeaturedVideoUrl: "https://youtu.be/TMnZQHayL2k",
  instagramUrl: "https://www.instagram.com/noctra.artist",
  tiktokUrl: "https://www.tiktok.com/@noctramusic",
  contactEmail: "noctra.artist@gmail.com",

  // 2. OFFICIAL BIOGRAPHY
  officialBio:
    "Noctra is an independent cinematic dark pop project born in the quiet isolation of late-night overthinking. Blending dark feminine aesthetics with raw, melancholic storytelling, her sound creates a sanctuary for those who feel the weight of unspoken words after midnight. With atmospheric production and intimate vocals, Noctra turns the silence of 2 AM into an immersive sonic experience.",

  // 3. OFFICIAL SINGLES DISCOGRAPHY
  singles: [
    {
      id: "two-cups",
      title: "Two Cups",
      tag: "PRE-SAVE",
      badge: "RELEASING NOV 13",
      isReleased: false,
      releaseDateText: "Coming November 13, 2026",
      preSaveUrl: "https://ffm.to/twocups",
      subtitle:
        "The hardest part of someone leaving is the habits they leave behind. Pouring a second cup for a ghost.",
      description:
        "A colder, darker continuation of the Noctra universe. Intimate production, heavy sub-bass and the suffocating tension of words left unsaid the morning after.",
      coverImage: "/capa_two_cups.jpg",
      spotifyUrl: "https://ffm.to/twocups",
      appleMusicUrl: "https://ffm.to/twocups",
      youtubeUrl: "https://youtu.be/TMnZQHayL2k",
      youtubeVisualizerId: "TMnZQHayL2k",
    },
    {
      id: "217-am",
      title: "2:17 AM",
      tag: "DEBUT SINGLE",
      badge: "OUT NOW",
      isReleased: true,
      releaseDateText: "Out Now",
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

  // 4. ALBUM: THE FIRST NIGHT (10 Tracks)
  album: {
    title: "THE FIRST NIGHT",
    subtitle: "Ten songs. One sleepless night. From 2:17 AM until the first light.",
    supportingCopy: "An emotional nocturnal voyage through insomnia, heartbreak, and quiet liberation.",
    tagline: "Ten songs. One sleepless night. From 2:17 AM until the first light.",
    coverImage: "/album_cover.png",
    releaseYear: "2026",
    timelineStart: "2:17 AM",
    timelineEnd: "5:47 AM",
    tracks: [
      {
        number: "01",
        id: "217-am",
        title: "2:17 AM",
        description: "The moment insomnia turns into memory, and every thought becomes louder because there is no one left to distract you from the truth.",
        lyricQuote: "I thought your name would always hurt.",
        coverImage: "/capa_2_17_am.jpg",
        hasOfficialArtwork: true,
        visualDirection: "NOCTRA alone in a dark bedroom at 2:17 AM, sitting on the floor, scattered photographs nearby, cold blue moonlight through a rainy window, dim amber lamp, vulnerable direct gaze, deep cinematic shadows.",
        mood: "insomnia, heartbreak, loneliness, beginning of the night",
        phase: "midnight",
        phaseLabel: "PHASE I • MIDNIGHT ISOLATION",
        timecode: "2:17 AM",
        status: "OUT NOW",
        isReleased: true,
        duration: "3:24",
        audioUrl: "/2_17_AM.wav",
        spotifyUrl: "https://open.spotify.com/intl-es/track/7ob3AKsKCbB1UpK2JJLbzx?si=2eb69c02317f4049",
        appleMusicUrl: "https://music.apple.com/es/album/2-17-am/6817391478?i=6817391482",
        youtubeUrl: "https://youtu.be/TMnZQHayL2k",
        accentColor: "#3b82f6",
        borderColor: "rgba(59, 130, 246, 0.35)",
        bgGlowClass: "from-[#1e3a8a]/20 via-[#050508]/80 to-[#050508]",
      },
      {
        number: "02",
        id: "two-cups",
        title: "Two Cups",
        description: "The quiet cruelty of still making space for someone who is no longer there.",
        lyricQuote: "The hardest part of someone leaving is the habits they leave behind. Pouring a second cup for a ghost.",
        coverImage: "/capa_two_cups.jpg",
        hasOfficialArtwork: true,
        visualDirection: "A dark kitchen or bedroom table at night with two cups but only NOCTRA sitting there. One untouched cup across from her. Soft blue night light mixed with warm practical light. Intimate and painfully empty.",
        mood: "absence, routine, memory, physical emptiness",
        phase: "midnight",
        phaseLabel: "PHASE I • MIDNIGHT ISOLATION",
        timecode: "2:48 AM",
        status: "PRE-SAVE",
        isReleased: false,
        duration: "3:12",
        preSaveUrl: "https://ffm.to/twocups",
        spotifyUrl: "https://ffm.to/twocups",
        appleMusicUrl: "https://ffm.to/twocups",
        youtubeUrl: "https://youtu.be/TMnZQHayL2k",
        accentColor: "#d97706",
        borderColor: "rgba(217, 119, 6, 0.35)",
        bgGlowClass: "from-[#d97706]/15 via-[#050508]/80 to-[#050508]",
      },
      {
        number: "03",
        id: "unread-messages",
        title: "Unread Messages",
        description: "Everything she wants to say remains trapped between typing, deleting and silence.",
        lyricQuote: "Every word I never gave you won't let me forget.",
        coverImage: "",
        hasOfficialArtwork: false,
        visualDirection: "NOCTRA illuminated only by the cold blue glow of a phone in a dark room, direct but exhausted gaze, unread messages implied on screen without readable interface text, deep shadows and subtle red reflections.",
        mood: "obsession, digital silence, temptation, unresolved emotion",
        phase: "midnight",
        phaseLabel: "PHASE I • MIDNIGHT ISOLATION",
        timecode: "3:14 AM",
        status: "COMING SOON",
        isReleased: false,
        duration: "3:08",
        accentColor: "#2563eb",
        borderColor: "rgba(37, 99, 235, 0.35)",
        bgGlowClass: "from-[#1d4ed8]/20 via-[#050508]/80 to-[#050508]",
      },
      {
        number: "04",
        id: "your-side-of-the-bed",
        title: "Your Side of the Bed",
        description: "Sometimes absence occupies more space than the person who left.",
        lyricQuote: "Your side of the bed still feels like a wound.",
        coverImage: "",
        hasOfficialArtwork: false,
        visualDirection: "NOCTRA sitting on one side of a large dark bed while the opposite side remains visibly empty. Blue moonlight through blinds, wrinkled sheets, distant warm lamp and deep cinematic shadows.",
        mood: "intimacy, absence, loneliness, memory",
        phase: "midnight",
        phaseLabel: "PHASE I • MIDNIGHT ISOLATION",
        timecode: "3:49 AM",
        status: "COMING SOON",
        isReleased: false,
        duration: "3:35",
        accentColor: "#38bdf8",
        borderColor: "rgba(56, 189, 248, 0.35)",
        bgGlowClass: "from-[#0284c7]/20 via-[#050508]/80 to-[#050508]",
      },
      {
        number: "05",
        id: "cold-rage",
        title: "Cold Rage",
        description: "The heartbreak has stopped burning. What remains is colder, quieter and much harder to reach.",
        lyricQuote: "Cold rage. Ice in my veins. You came back too late.",
        coverImage: "",
        hasOfficialArtwork: false,
        visualDirection: "Close cinematic portrait of NOCTRA with controlled expression, cold blue-white lighting, dark background, subtle crimson edge light and reflections resembling cracked glass or frozen condensation.",
        mood: "restrained anger, emotional control, detachment, ice",
        phase: "cold-darkness",
        phaseLabel: "PHASE II • COLD DETACHMENT",
        timecode: "4:11 AM",
        status: "COMING SOON",
        isReleased: false,
        duration: "2:58",
        accentColor: "#9f1239",
        borderColor: "rgba(159, 18, 57, 0.45)",
        bgGlowClass: "from-[#881337]/25 via-[#050508]/80 to-[#050508]",
      },
      {
        number: "06",
        id: "deleted-scene",
        title: "Deleted Scene",
        description: "A relationship that once felt like the whole story now feels like footage that never belonged in the final cut.",
        lyricQuote: "You were everything, now you're just a frame I left behind.",
        coverImage: "",
        hasOfficialArtwork: false,
        visualDirection: "NOCTRA surrounded by blurred projections, old film frames or faded photographs. One half of her face illuminated by projector light while the rest disappears into darkness.",
        mood: "memory fading, distance, nostalgia, letting go",
        phase: "cold-darkness",
        phaseLabel: "PHASE II • COLD DETACHMENT",
        timecode: "4:32 AM",
        status: "COMING SOON",
        isReleased: false,
        duration: "3:19",
        accentColor: "#701a75",
        borderColor: "rgba(112, 26, 117, 0.45)",
        bgGlowClass: "from-[#701a75]/20 via-[#050508]/80 to-[#050508]",
      },
      {
        number: "07",
        id: "dead-to-me",
        title: "Dead to Me",
        description: "The frightening moment when love does not become hate—it simply becomes nothing.",
        lyricQuote: "Not because I hate you. I just don't feel you.",
        coverImage: "",
        hasOfficialArtwork: false,
        visualDirection: "NOCTRA in an almost empty dark room, calm expression, direct eye contact, a distant phone glowing behind her but completely ignored. Cold neutral lighting with almost no warm tones.",
        mood: "indifference, emotional death, silence, detachment",
        phase: "cold-darkness",
        phaseLabel: "PHASE II • COLD DETACHMENT",
        timecode: "4:55 AM",
        status: "COMING SOON",
        isReleased: false,
        duration: "3:04",
        accentColor: "#4c0519",
        borderColor: "rgba(76, 5, 25, 0.45)",
        bgGlowClass: "from-[#4c0519]/25 via-[#050508]/80 to-[#050508]",
      },
      {
        number: "08",
        id: "nothing-left-to-say",
        title: "Nothing Left to Say",
        description: "After every explanation, argument and apology, silence becomes the final answer.",
        lyricQuote: "You want one last conversation? Too late.",
        coverImage: "",
        hasOfficialArtwork: false,
        visualDirection: "NOCTRA standing beside an old telephone or phone lying face down, dark room, intense but controlled expression, mouth closed, cinematic negative space around her.",
        mood: "closure, silence, exhaustion, finality",
        phase: "cold-darkness",
        phaseLabel: "PHASE II • COLD DETACHMENT",
        timecode: "5:12 AM",
        status: "COMING SOON",
        isReleased: false,
        duration: "3:41",
        accentColor: "#64748b",
        borderColor: "rgba(100, 116, 139, 0.4)",
        bgGlowClass: "from-[#334155]/20 via-[#050508]/80 to-[#050508]",
      },
      {
        number: "09",
        id: "before-the-morning",
        title: "Before the Morning",
        description: "The last emotional hour before she finally chooses herself.",
        lyricQuote: "The night kept you. The morning gets me.",
        coverImage: "",
        hasOfficialArtwork: false,
        visualDirection: "NOCTRA beside a window just before sunrise. The room is still dark blue but a very faint warm horizon begins appearing outside. She looks toward the window instead of backward into the room.",
        mood: "release, transition, vulnerability, first hope",
        phase: "dawn",
        phaseLabel: "PHASE III • THE FIRST LIGHT",
        timecode: "5:31 AM",
        status: "COMING SOON",
        isReleased: false,
        duration: "3:29",
        accentColor: "#c27803",
        borderColor: "rgba(194, 120, 3, 0.4)",
        bgGlowClass: "from-[#b45309]/20 via-[#050508]/80 to-[#050508]",
      },
      {
        number: "10",
        id: "547-am",
        title: "5:47 AM",
        description: "The night is ending. The memories still exist, but they no longer control who wakes up in the morning.",
        lyricQuote: "2:17 felt like forever. 5:47 felt like freedom.",
        coverImage: "",
        hasOfficialArtwork: false,
        visualDirection: "NOCTRA standing near a large window at 5:47 AM. Early dawn light enters the room, mixing pale blue with soft muted gold. The visual remains melancholic and cinematic rather than bright or happy.",
        mood: "sunrise, survival, acceptance, freedom",
        phase: "dawn",
        phaseLabel: "PHASE III • THE FIRST LIGHT",
        timecode: "5:47 AM",
        status: "COMING SOON",
        isReleased: false,
        duration: "4:02",
        accentColor: "#d97706",
        borderColor: "rgba(217, 119, 6, 0.45)",
        bgGlowClass: "from-[#d97706]/20 via-[#050508]/80 to-[#050508]",
      },
    ],
  },
};

