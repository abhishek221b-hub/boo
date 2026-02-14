import React, { useState, useEffect, useRef, useCallback } from "react";
import { EIRA_FACE, BG_PHOTO, PHOTO_WEDDING, PHOTO_CHRISTMAS, PHOTO_CONCERT } from "../assets/gameAssets";
import "./Game.css";

// ── DATA ─────────────────────────────────────────────────────────────────────
const COUPLE_PHOTOS = [
    { src: PHOTO_WEDDING, caption: "You dressed me for this. Forcefully. 👗😅", pos: "center top" },
    { src: PHOTO_CHRISTMAS, caption: "Our first Christmas with Eira 🎄🐾", pos: "center top" },
    { src: PHOTO_CONCERT, caption: "Every concert better with you 🎶", pos: "center top" },
];

const SWEET_MESSAGES = [
    "You make every ordinary day feel like an adventure 🌍",
    "Your laugh is genuinely my favourite sound in the world 🎶",
    "You're the best thing I never planned for ✨",
    "Watching you be kind to strangers makes me fall for you all over again 💛",
    "You are home, wherever we are 🏡",
    "I love who I am when I'm with you 🌸",
    "You make Eira feel safe — that says everything about you 🐾",
    "I'd choose you in every version of my life 💫",
    "You are more than enough, always 🌷",
    "This whole world looks better because you're in it ❤️",
    "I love the little things you do that you don't even notice 🌻",
    "You are my favourite person to do nothing with 🛋️",
    "The way you care for things — plants, animals, people — it's one of my favourite things about you 🌿",
    "You make even the hard days feel manageable 💪",
    "I fall asleep grateful every single night that you're mine 🌙",
    "You are braver than you know and softer than you show 🦋",
    "Every trip is better with you next to me on the plane ✈️",
    "You notice things other people miss — that's a superpower 🔍",
    "Eira wags her tail harder for you than anyone. She knows. 🐶",
    "You make me want to be a better version of myself 🌱",
    "Your hugs are genuinely the best in the world 🤗",
    "I love that you always know when I need tea and when I need space ☕",
    "You have the kindest heart of anyone I've ever met 💗",
    "The way your eyes light up when you're excited — I live for that ✨",
    "You remember the details that matter. That's so rare 🎀",
    "Our life together is my favourite story 📖",
    "Eira chose you first. She's always been the smarter one 🐾",
    "You turn ordinary evenings into something I look forward to 🕯️",
    "I'm so glad we found each other in this enormous world 🌍",
    "Happy Valentine's Day, my love. Today and every day 💕",
    "You've made Manchester feel like home and that's entirely because of you 🏙️",
    "I love how you laugh at your own jokes before you even finish them 😂",
    "You always make room for people — in your plans, your heart, everywhere 🫶",
    "The way you get excited about small things makes everything feel bigger and better 🌟",
    "I love that you take Eira's opinions seriously. She is very opinionated. 🐾",
    "You've seen me at my worst and somehow love me more for it 💙",
    "You're the first person I want to tell everything to 📱",
    "Watching you with Eira is one of my absolute favourite things in the world 🥰",
    "You make our little flat feel like the most special place on earth 🏠",
    "I love how you always find something good in everyone 🌻",
    "You never let me take myself too seriously. Thank you for that 😄",
    "The life we're building together is everything I ever wanted 🌈",
    "Your kindness is genuinely one of the most beautiful things about you 💝",
    "I love that you're my person in every city, every country, every timezone ✈️",
    "You make patience look effortless even when it absolutely isn't 🌸",
    "I love how fully you commit to things once you care about them 🔥",
    "Every version of our future I imagine has you right at the centre of it 💫",
    "You make ordinary Sundays feel like the best days of the week 🌄",
    "I am so lucky. Every single day, I am so lucky. 🍀",
    "Eira and I are a team, but you're the captain 👑",
];

const QUIRKY_MESSAGES = [
    "I love how you yell at me… and then show up two minutes later to say sorry yourself 🥺",
    "I love how you cook for me and then stand there waiting for me to say it's delicious 👨‍🍳✨",
    "I love how you force my meds on me like a tiny, very bossy nurse 💊👩‍⚕️",
    "I love how you dressed me for that wedding and had stronger opinions about my outfit than I did 👗😅",
    "I love how you narrate everything Eira is thinking in a tiny voice 🐾🗣️",
    "I love how you claim you're not hungry and then eat half my plate 🍽️😏",
];

const LEVELS = [
    { label: "Happy Eira", duration: 40, burstInterval: 2600, heartSpeed: 0.9, bounceSpeed: 1.8, burstCount: 2, bg: ["#fff5f8", "#fde8f0", "#f9d4e4"] },
    { label: "Excited Eira", duration: 40, burstInterval: 1800, heartSpeed: 1.3, bounceSpeed: 2.6, burstCount: 3, bg: ["#fff0fb", "#fbd8f5", "#f5c6ed"] },
    { label: "ZOOMIES! 🐾", duration: 40, burstInterval: 1100, heartSpeed: 1.8, bounceSpeed: 3.8, burstCount: 4, bg: ["#ffe8f8", "#fcc8ee", "#f7b3e5"] },
];

const GAME_DURATION = LEVELS.reduce((s, l) => s + l.duration, 0);
const MAX_MISSED = 7;

// ── COMPONENTS ───────────────────────────────────────────────────────────────

const DachshundSVG: React.FC<{ flipped: boolean; wagging: boolean }> = ({ flipped, wagging }) => (
    <svg width="110" height="56" viewBox="0 0 110 56"
        style={{ transform: flipped ? "scaleX(-1)" : "none", display: "block", overflow: "visible" }}
        fill="none">
        <ellipse cx="55" cy="54" rx="38" ry="4" fill="rgba(0,0,0,0.08)" />
        <ellipse cx="52" cy="34" rx="36" ry="14" fill="#D4A96A" />
        <ellipse cx="52" cy="38" rx="22" ry="8" fill="#E8C98A" />
        <ellipse cx="80" cy="29" rx="10" ry="9" fill="#D4A96A" />
        <ellipse cx="89" cy="22" rx="16" ry="14" fill="#D4A96A" />
        <ellipse cx="98" cy="26" rx="5" ry="3" fill="#d4845a" opacity="0.5" />
        <ellipse cx="103" cy="26" rx="7" ry="6" fill="#C8A060" />
        <ellipse cx="109" cy="24" rx="3" ry="2.5" fill="#2a1005" />
        <circle cx="95" cy="19" r="4" fill="white" />
        <circle cx="96" cy="19.5" r="2.8" fill="#1a0800" />
        <circle cx="97" cy="18.2" r="1" fill="white" />
        <ellipse cx="83" cy="12" rx="8" ry="12" fill="#C09060" transform="rotate(-15 83 12)" />
        <ellipse cx="83" cy="13" rx="5" ry="8" fill="#D4A870" opacity="0.5" transform="rotate(-15 83 13)" />
        <rect x="78" y="33" width="16" height="6" rx="3" fill="#e05c8a" />
        <circle cx="86" cy="39" r="2.5" fill="#f9d423" />
        <circle cx="86" cy="39" r="1" fill="#e6c000" />
        <path d="M17 30 Q6 14 12 5" stroke="#D4A96A" strokeWidth="5" strokeLinecap="round" fill="none"
            style={wagging ? { transformOrigin: "17px 30px", animation: "tailWag 0.3s ease-in-out infinite alternate" } : {}} />
        <circle cx="12" cy="5" r="3.5" fill="#D4A96A" />
        <rect x="72" y="43" width="8" height="13" rx="4" fill="#C09060" />
        <rect x="82" y="44" width="8" height="12" rx="4" fill="#C09060" />
        <ellipse cx="76" cy="56" rx="5" ry="3" fill="#C09060" />
        <ellipse cx="86" cy="56" rx="5" ry="3" fill="#C09060" />
        <rect x="32" y="43" width="8" height="13" rx="4" fill="#C09060" />
        <rect x="44" y="44" width="8" height="12" rx="4" fill="#C09060" />
        <ellipse cx="36" cy="56" rx="5" ry="3" fill="#C09060" />
        <ellipse cx="48" cy="56" rx="5" ry="3" fill="#C09060" />
    </svg>
);

const HeartSVG: React.FC<{ size?: number; color?: string }> = ({ size = 36, color = "#ff6b8a" }) => (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <path d="M18 32S4 22 4 13a7 7 0 0 1 14-1.5A7 7 0 0 1 32 13c0 9-14 19-14 19z" fill={color} />
        <path d="M10 12 Q12 8 16 11" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
);

const Cloud: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
    <div className="cloud" style={style}>
        <svg width="90" height="44" viewBox="0 0 90 44" fill="white">
            <ellipse cx="45" cy="32" rx="40" ry="18" />
            <ellipse cx="28" cy="26" rx="22" ry="18" />
            <ellipse cx="60" cy="24" rx="20" ry="16" />
            <ellipse cx="42" cy="20" rx="18" ry="16" />
        </svg>
    </div>
);

const Sparkle: React.FC<{ x: number; y: number; id: number }> = ({ x, y }) => (
    <div style={{
        position: "absolute", left: x - 10, top: y - 10, width: 20, height: 20,
        pointerEvents: "none", zIndex: 50,
        animation: "sparklePop 0.5s ease-out forwards",
    }}>
        {["0deg", "45deg", "90deg", "135deg"].map((rot, i) => (
            <div key={i} style={{
                position: "absolute", top: "50%", left: "50%",
                width: 2, height: 8,
                background: ["#ff6b8a", "#ffb3c6", "#ffd700", "#ff4d7a"][i],
                borderRadius: 2,
                transform: `rotate(${rot}) translateY(-8px) translate(-50%,-50%)`,
            }} />
        ))}
    </div>
);

const PhotoSlideshow = () => {
    const [idx, setIdx] = useState(0);
    const [fading, setFading] = useState(false);

    const goTo = (next: number) => {
        setFading(true);
        setTimeout(() => {
            setIdx(next);
            setFading(false);
        }, 280);
    };

    const prev = () => goTo((idx - 1 + COUPLE_PHOTOS.length) % COUPLE_PHOTOS.length);
    const next = () => goTo((idx + 1) % COUPLE_PHOTOS.length);

    useEffect(() => {
        const id = setInterval(() => goTo((idx + 1) % COUPLE_PHOTOS.length), 3500);
        return () => clearInterval(id);
    }, [idx]);

    const photo = COUPLE_PHOTOS[idx];

    return (
        <div className="slideshow">
            <p className="slideshow__label">Happy Valentine's Day Boo</p>
            <div className="slideshow__wrap">
                <img
                    src={photo.src}
                    alt="us"
                    className="slideshow__img"
                    style={{
                        objectPosition: photo.pos || "center top",
                        opacity: fading ? 0 : 1,
                    }}
                />
                <button onClick={prev} className="slideshow__arrow slideshow__arrow--left">‹</button>
                <button onClick={next} className="slideshow__arrow slideshow__arrow--right">›</button>
            </div>
            <p className="slideshow__caption" style={{ opacity: fading ? 0 : 1 }}>
                {photo.caption}
            </p>
            <div className="slideshow__dots">
                {COUPLE_PHOTOS.map((_, i) => (
                    <div key={i} onClick={() => goTo(i)}
                        className={`slideshow__dot ${i === idx ? "slideshow__dot--active" : "slideshow__dot--inactive"}`} />
                ))}
            </div>
        </div>
    );
};

// ── MAIN GAME ────────────────────────────────────────────────────────────────

export default function Game() {
    const [gameState, setGameState] = useState<"intro" | "playing" | "end">("intro");
    const [hearts, setHearts] = useState<any[]>([]);
    const [caught, setCaught] = useState<any[]>([]);
    const [missed, setMissed] = useState(0);
    const [msgKey, setMsgKey] = useState(0);
    const [lastMessage, setLastMessage] = useState<{ text: string, isQuirky: boolean } | null>(null);
    const [eira, setEira] = useState({ x: 100, y: 200, vx: 3, vy: -2 });
    const [showMessage, setShowMessage] = useState(false);
    const [particles, setParticles] = useState<any[]>([]);
    const [sparkles, setSparkles] = useState<any[]>([]);
    const [score, setScore] = useState(0);
    const [totalTime, setTotalTime] = useState(GAME_DURATION);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [, setLevelTimeLeft] = useState(LEVELS[0].duration);
    const [showLevelBanner, setShowLevelBanner] = useState(false);
    const [eiraWagging, setEiraWagging] = useState(false);
    const [clouds] = useState(() =>
        Array.from({ length: 5 }, (_, i) => ({ x: i * 22, speed: 0.15 + i * 0.07, y: 6 + i * 7, id: i }))
    );
    const [cloudPositions, setCloudPositions] = useState([0, 22, 44, 66, 88]);

    const heartIdRef = useRef(0);
    const particleIdRef = useRef(0);
    const sparkleIdRef = useRef(0);
    const gameAreaRef = useRef<HTMLDivElement>(null);
    const eiraRef = useRef({ x: 100, y: 200, vx: 3, vy: -2 });
    const usedMessagesRef = useRef<string[]>([]);
    const levelRef = useRef(0);

    // ── Body scroll lock during gameplay ──
    useEffect(() => {
        if (gameState === "playing") {
            document.body.classList.add("game-playing");
        } else {
            document.body.classList.remove("game-playing");
        }
        return () => document.body.classList.remove("game-playing");
    }, [gameState]);

    useEffect(() => {
        if (gameState !== "playing") return;
        const id = setInterval(() => {
            setCloudPositions(prev => prev.map((x, i) => {
                const nx = x + clouds[i].speed;
                return nx > 115 ? -20 : nx;
            }));
        }, 50);
        return () => clearInterval(id);
    }, [gameState]);

    useEffect(() => {
        if (gameState !== "playing") return;
        const id = setInterval(() => {
            setEira(prev => {
                const w = gameAreaRef.current?.offsetWidth || 600;
                const h = gameAreaRef.current?.offsetHeight || 500;
                const spd = LEVELS[levelRef.current]?.bounceSpeed ?? 3;
                const mag = Math.sqrt(prev.vx * prev.vx + prev.vy * prev.vy) || 1;
                let vx = (prev.vx / mag) * spd;
                let vy = (prev.vy / mag) * spd;
                let nx = prev.x + vx;
                let ny = prev.y + vy;
                // Responsive margins based on game area size
                const MARGIN_X = Math.max(40, w * 0.08);
                const MARGIN_TOP = Math.max(40, h * 0.08);
                const MARGIN_BOTTOM = Math.max(60, h * 0.12);
                if (nx < MARGIN_X) { nx = MARGIN_X; vx = Math.abs(vx) + (Math.random() - 0.5) * 0.5; }
                if (nx > w - MARGIN_X) { nx = w - MARGIN_X; vx = -(Math.abs(vx) + (Math.random() - 0.5) * 0.5); }
                if (ny < MARGIN_TOP) { ny = MARGIN_TOP; vy = Math.abs(vy) + (Math.random() - 0.5) * 0.5; }
                if (ny > h - MARGIN_BOTTOM) { ny = h - MARGIN_BOTTOM; vy = -(Math.abs(vy) + (Math.random() - 0.5) * 0.5); }
                const next = { x: nx, y: ny, vx, vy };
                eiraRef.current = next;
                return next;
            });
        }, 30);
        return () => clearInterval(id);
    }, [gameState]);

    useEffect(() => {
        if (gameState !== "playing") return;
        const lvl = LEVELS[levelRef.current] ?? LEVELS[0];
        const id = setInterval(() => {
            const { x: ex, y: ey } = eiraRef.current ?? { x: 100, y: 200 };
            const colors = ["#ff6b8a", "#ff9eb5", "#ffb3c6", "#ff4d7a", "#ffd6e0", "#ff8fab", "#ffccd5"];
            const count = lvl.burstCount;
            const newHearts = Array.from({ length: count }).map(() => {
                const isQuirky = Math.random() < 0.12;
                const angle = (Math.random() * Math.PI * 2);
                const launchSpd = 1.8 + Math.random() * 1.4;
                return {
                    id: heartIdRef.current++,
                    x: ex + 55 + (Math.random() - 0.5) * 20,
                    y: ey + 20,
                    vx: Math.cos(angle) * launchSpd,
                    vy: Math.sin(angle) * launchSpd - 1.5,
                    color: isQuirky ? "#ffd700" : colors[Math.floor(Math.random() * colors.length)],
                    speed: LEVELS[levelRef.current]?.heartSpeed ?? 1.3,
                    wobble: Math.random() * Math.PI * 2,
                    size: isQuirky ? 40 : 26 + Math.random() * 16,
                    isQuirky,
                    gravity: 0.06,
                };
            });
            setHearts(prev => [...prev, ...newHearts]);
        }, lvl.burstInterval);
        return () => clearInterval(id);
    }, [gameState, currentLevel]);

    useEffect(() => {
        if (gameState !== "playing") return;
        const id = setInterval(() => {
            const w = gameAreaRef.current?.offsetWidth || 600;
            const h = gameAreaRef.current?.offsetHeight || 500;
            setHearts(prev => {
                const still: any[] = [], gone: any[] = [];
                prev.forEach(heart => {
                    const nvx = heart.vx * 0.995;
                    const nvy = heart.vy + (heart.gravity ?? 0.06);
                    const nx = heart.x + nvx;
                    const ny = heart.y + nvy;
                    if (ny > h + 60 || nx < -60 || nx > w + 60) {
                        gone.push(heart);
                    } else {
                        still.push({ ...heart, x: nx, y: ny, vx: nvx, vy: nvy });
                    }
                });
                if (gone.length > 0) {
                    setMissed(m => {
                        const next = m + gone.length;
                        if (next >= MAX_MISSED) setTimeout(() => setGameState("end"), 80);
                        return next;
                    });
                }
                return still;
            });
        }, 25);
        return () => clearInterval(id);
    }, [gameState]);

    useEffect(() => {
        if (gameState !== "playing") return;
        const id = setInterval(() => {
            setTotalTime(t => {
                if (t <= 1) { setGameState("end"); return 0; }
                return t - 1;
            });
            setLevelTimeLeft(lt => {
                if (lt <= 1) {
                    const cur = levelRef.current;
                    const nextLvl = cur + 1;
                    if (nextLvl < LEVELS.length) {
                        levelRef.current = nextLvl;
                        setCurrentLevel(nextLvl);
                        setShowLevelBanner(true);
                        setTimeout(() => setShowLevelBanner(false), 2500);
                        return LEVELS[nextLvl].duration;
                    }
                    return 0;
                }
                return lt - 1;
            });
        }, 1000);
        return () => clearInterval(id);
    }, [gameState]);

    const catchHeart = useCallback((heartId: number, x: number, y: number, isQuirky = false) => {
        setHearts(prev => prev.filter(h => h.id !== heartId));
        setScore(s => s + 1);
        setEiraWagging(true);
        setTimeout(() => setEiraWagging(false), 600);

        const pool = isQuirky ? QUIRKY_MESSAGES : SWEET_MESSAGES;
        let available = pool.filter(m => !usedMessagesRef.current.includes(m));
        if (available.length === 0) {
            usedMessagesRef.current = usedMessagesRef.current.filter(m => !pool.includes(m));
            available = pool;
        }
        const msg = available[Math.floor(Math.random() * available.length)];
        usedMessagesRef.current.push(msg);
        setCaught(prev => [...prev, { text: msg, isQuirky }]);
        setLastMessage({ text: msg, isQuirky });
        setMsgKey(k => k + 1);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), isQuirky ? 3200 : 2400);

        const newP = Array.from({ length: 14 }).map((_, i) => ({
            id: particleIdRef.current++, x, y,
            angle: (i / 14) * Math.PI * 2,
            speed: 2.5 + Math.random() * 3.5,
            color: ["#ff6b8a", "#ffb3c6", "#ff4d7a", "#fff", "#ffd6e0", "#ffd700"][Math.floor(Math.random() * 6)],
        }));
        setParticles(prev => [...prev, ...newP]);
        setTimeout(() => setParticles(prev => prev.filter(p => !newP.find(np => np.id === p.id))), 700);

        const newS = Array.from({ length: 4 }).map(() => ({
            id: sparkleIdRef.current++,
            x: x + (Math.random() - 0.5) * 50,
            y: y + (Math.random() - 0.5) * 50,
        }));
        setSparkles(prev => [...prev, ...newS]);
        setTimeout(() => setSparkles(prev => prev.filter(s => !newS.find(ns => ns.id === s.id))), 600);
    }, []);

    const startGame = () => {
        setGameState("playing");
        setHearts([]); setCaught([]); setMissed(0); setScore(0);
        setTotalTime(GAME_DURATION); setLevelTimeLeft(LEVELS[0].duration);
        setCurrentLevel(0); levelRef.current = 0;
        usedMessagesRef.current = [];
        eiraRef.current = { x: 100, y: 200, vx: 3, vy: -2 };
        setEira({ x: 100, y: 200, vx: 3, vy: -2 });
    };

    const lvl = LEVELS[currentLevel] ?? LEVELS[LEVELS.length - 1];

    // ── INTRO ─────────────────────────────────────────────────────────────────
    if (gameState === "intro") {
        return (
            <div className="game-wrapper">
                <div className="wrapper-bg" style={{ backgroundImage: `url(${BG_PHOTO})` }} />
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="float-heart" style={{
                        left: `${8 + i * 12}%`, top: `${12 + (i % 3) * 28}%`,
                        animation: `floatBob ${2 + i * 0.4}s ease-in-out ${i * 0.3}s infinite alternate`,
                    }}>
                        <HeartSVG size={32 + i * 5} color="#ff4d7a" />
                    </div>
                ))}
                <div className="intro-card">
                    <div className="paw-row">🐾 🐾 🐾</div>
                    <h1 className="game-title">Catch Eira's Hearts</h1>
                    <p className="game-subtitle">
                        Eira has been hiding little love notes<br />for you all day long.
                        <br /><br />
                        <span className="game-subtitle-highlight">Tap the hearts that burst out of her! 💕</span>
                    </p>
                    <div className="eira-preview">
                        <div className="eira-float">
                            <DachshundSVG flipped={false} wagging={true} />
                        </div>
                    </div>
                    <div className="level-preview">
                        {LEVELS.map((l, i) => (
                            <div key={i} className="level-pill">
                                <span className="level-num">Level {i + 1}</span>
                                <span className="level-name">{l.label}</span>
                                <span className="level-secs">{l.duration}s</span>
                            </div>
                        ))}
                    </div>
                    <div className="rules-box">
                        <div className="rule-item">💖 Eira bounces around bursting hearts</div>
                        <div className="rule-item">💌 Tap them to catch a love note</div>
                        <div className="rule-item">⏱️ 3 levels · {GAME_DURATION} seconds total</div>
                        <div className="rule-item">❗ Don't miss more than {MAX_MISSED}!</div>
                    </div>
                    <button className="start-btn" onClick={startGame}>
                        Start Playing 🐾
                    </button>
                    <p className="made-with">Made with love (and Eira's paw prints) 💛</p>
                </div>
            </div>
        );
    }

    // ── END ───────────────────────────────────────────────────────────────────
    if (gameState === "end") {
        const pct = Math.round((score / Math.max(score + missed, 1)) * 100);
        const grade = score >= 20 ? "💎 Legendary Catcher!" : score >= 14 ? "🌟 Heart Magnet!" : score >= 8 ? "💕 Love Expert!" : "🐾 Eira Loves You Anyway!";
        return (
            <div className="game-wrapper game-wrapper--end">
                <div className="wrapper-bg" style={{ backgroundImage: `url(${BG_PHOTO})` }} />
                {[...Array(18)].map((_, i) => (
                    <div key={i} className="confetti" style={{
                        left: `${5 + i * 5.5}%`, top: "-5%",
                        borderRadius: i % 3 === 0 ? "50%" : "2px",
                        background: ["#ff6b8a", "#ffd700", "#ffb3c6", "#7bc8f6", "#c8f6b3"][i % 5],
                        animation: `confettiFall ${2 + (i % 5) * 0.4}s ease-in ${(i % 8) * 0.2}s forwards`,
                    }} />
                ))}
                <div className="end-card">
                    <div className="end-eira">
                        <div className="eira-float">
                            <img src={EIRA_FACE} alt="Eira" className="end-eira__img" />
                        </div>
                    </div>
                    <h1 className="end-title">{grade}</h1>
                    <div className="stats-row">
                        <div className="stat-box">
                            <span className="stat-num">{score}</span>
                            <span className="stat-label">Caught 💖</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-num">{missed}</span>
                            <span className="stat-label">Missed 💨</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-num">{pct}%</span>
                            <span className="stat-label">Accuracy ✨</span>
                        </div>
                    </div>
                    <PhotoSlideshow />
                    <div className="valentine-note">
                        <div style={{ fontSize: 20, marginBottom: 6 }}>💌</div>
                        <p className="note-text">Happy Valentine's Day, my love.</p>
                        <p className="note-text note-text--small">
                            Eira and I think you are the most wonderful thing in our world.
                            Every single day with you is a gift. Thank you for being exactly who you are.
                        </p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 8 }}>
                            <span style={{ fontSize: 18 }}>💕</span>
                            <img src={EIRA_FACE} alt="Eira" className="end-eira-small" />
                            <span style={{ fontSize: 18 }}>💕</span>
                        </div>
                    </div>
                    <div className="scroll-wrap">
                        <p className="scroll-title">💌 Your love notes from Eira ({caught.length})</p>
                        {caught.length === 0 && <p style={{ color: "#bbb", fontStyle: "italic", fontSize: 14 }}>No messages caught — try again! 🐾</p>}
                        {caught.map((item, i) => (
                            <div key={i} className={`scroll-item ${item.isQuirky ? "scroll-item--quirky" : ""}`}>
                                <span className="scroll-item__icon">
                                    {item.isQuirky ? "⭐" : <HeartSVG size={15} color="#ff6b8a" />}
                                </span>
                                <span className={item.isQuirky ? "scroll-item__text--quirky" : ""} style={{ color: item.isQuirky ? "#9a6e00" : "#555" }}>
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                    <button className="start-btn" onClick={startGame}>
                        Play Again 🐾
                    </button>
                </div>
            </div>
        );
    }

    // ── PLAYING ───────────────────────────────────────────────────────────────
    const livesLeft = MAX_MISSED - missed;
    // Minimum tap zone size (48px for WCAG AA touch targets)
    const MIN_TAP_ZONE = 48;

    return (
        <div className="game-wrapper" style={{ padding: 0 }}>
            <div className="game-hud">
                <div className="hud-item">
                    <span className="hud-label">Hearts</span>
                    <span className="hud-val">{score}</span>
                </div>
                <div className="hud-center">
                    <div className={`hud-val ${totalTime <= 10 ? "hud-timer--warning" : ""}`}
                        style={{ fontSize: totalTime <= 10 ? "clamp(22px, 5.5vw, 26px)" : "clamp(18px, 4.5vw, 22px)" }}>
                        {totalTime}s
                    </div>
                    <div className="hud-level-dots">
                        {LEVELS.map((_, i) => (
                            <div key={i} className={`hud-dot ${i < currentLevel ? "hud-dot--done" : i === currentLevel ? "hud-dot--active" : "hud-dot--future"}`} />
                        ))}
                    </div>
                    <div className="hud-level-label">{lvl.label}</div>
                </div>
                <div className="hud-item">
                    <span className="hud-label">Lives</span>
                    <div className="lives-row">
                        {Array.from({ length: MAX_MISSED }).map((_, i) => (
                            <span key={i} className="life-heart" style={{ opacity: i < livesLeft ? 1 : 0.15 }}>💖</span>
                        ))}
                    </div>
                </div>
            </div>

            {showLevelBanner && (
                <div key={`banner-${currentLevel}`} className="level-banner">
                    <span>✨</span>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                        <span className="level-banner__sub">Level {currentLevel + 1} of {LEVELS.length}</span>
                        <span>{lvl.label}!</span>
                    </div>
                    <span>✨</span>
                </div>
            )}

            <div ref={gameAreaRef} className="game-area"
                style={{ background: `linear-gradient(180deg, ${lvl.bg[0]} 0%, ${lvl.bg[1]} 55%, ${lvl.bg[2]} 100%)` }}>
                {clouds.map((c, i) => (
                    <Cloud key={c.id} style={{ left: `${cloudPositions[i]}%`, top: `${c.y}%`, transform: `scale(${0.7 + i * 0.15})` }} />
                ))}

                <div className="eira-game" style={{ left: eira.x - 55, top: eira.y - 28 }}>
                    <DachshundSVG flipped={eira.vx < 0} wagging={eiraWagging} />
                </div>

                {hearts.map(h => {
                    const tapSize = Math.max(MIN_TAP_ZONE, h.size + 28);
                    return (
                        <div key={h.id}
                            onClick={() => catchHeart(h.id, h.x, h.y, h.isQuirky)}
                            className={`heart-target ${h.isQuirky ? "heart-target--quirky" : "heart-target--normal"}`}
                            style={{
                                left: h.x - tapSize / 2,
                                top: h.y - tapSize / 2,
                                width: tapSize,
                                height: tapSize,
                            }}>
                            <div className={`heart-ring ${h.isQuirky ? "heart-ring--quirky" : "heart-ring--normal"}`} />
                            <div className={h.isQuirky ? "heart-glow--quirky" : "heart-glow--normal"}>
                                <HeartSVG size={h.size} color={h.color} />
                            </div>
                            {h.isQuirky && <div className="quirky-star">⭐</div>}
                        </div>
                    );
                })}

                {particles.map(p => (
                    <div key={p.id} className="particle" style={{
                        left: p.x + Math.cos(p.angle) * p.speed * 14,
                        top: p.y + Math.sin(p.angle) * p.speed * 14,
                        background: p.color,
                    }} />
                ))}

                {sparkles.map(s => <Sparkle key={s.id} {...s} />)}
            </div>

            {showMessage && lastMessage && (
                <div key={msgKey} className={`msg-popup ${lastMessage.isQuirky ? "msg-popup--quirky" : ""}`}>
                    <span className="msg-popup__icon">
                        {lastMessage.isQuirky ? "⭐" : "💖"}
                    </span>
                    <span className="msg-popup__text">
                        {lastMessage.text}
                    </span>
                </div>
            )}
        </div>
    );
}
