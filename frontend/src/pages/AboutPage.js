import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Scale, Shield, Users, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';
import { NavbarWave } from '../components/NavbarWave';
import { GradientOrbs } from '../components/GradientOrbs';
import { Footer } from '../components/Footer';
import { useLang } from '../context/LanguageContext';

const TEXT = {
  en: {
    heroBadge: 'The New Standard',
    heroLine1: 'Justice Should Be',
    heroLine2: 'Transparent.',
    heroSub1: 'The legal system was built to deliver justice. But somewhere along the way, ',
    heroSub2: 'clarity was lost.',
    scroll: 'Scroll',
    
    statClients: 'Clients Empowered',
    statLawyers: 'Verified Legal Minds',
    statSupport: 'Continuous Support',
    
    manifestoStory: 'Our Story',
    manifestoTitle1: 'Why Lxwyer Up',
    manifestoTitle2: 'Had to Exist',
    manifestoImage1: 'India\'s Legal System',
    manifestoImage2: 'We are rebuilding confidence in it.',
    
    prLabel1: 'The Problem',
    prText1: 'Millions step into legal processes feeling powerless — unsure of their rights, unaware of their case progress, and dependent on complex systems they cannot decode.',
    prLabel2: 'The Other Side',
    prText2: 'At the same time, ethical lawyers work tirelessly within outdated structures, juggling scattered tools, repetitive communication, and overwhelming workflows.',
    prLabel3: 'Our Belief',
    prText3: 'We believe this can change. Lxwyer Up was born from a simple but radical idea: Law should be empowering. Technology should make the system more human — not more complex.',
    prLabel4: 'The Promise',
    prText4: 'We are building more than a platform. We are building the digital backbone of legal clarity — where trust replaces confusion and transparency replaces asymmetry.',

    probReality: 'The Reality',
    probTitle: 'The System is Broken',
    probSub: 'The traditional legal framework creates unnecessary barriers for both those who seek justice and those who deliver it.',
    prob1Title: 'Millions Feel Powerless', prob1Desc: 'Ordinary citizens enter legal processes unaware of their rights, with no clarity on what to expect or how to navigate the system.',
    prob2Title: 'No Transparency', prob2Desc: 'Hidden fees, unclear timelines, and opaque proceedings create fear and distrust — the system that was meant to protect becomes an obstacle.',
    prob3Title: 'Complex by Design', prob3Desc: 'Legal jargon and archaic processes were never designed for common people. The gap between the law and the layperson is vast.',
    prob4Title: 'Lawyers Need Structure', prob4Desc: 'Ethical lawyers manage scattered workflows — missed follow-ups, repetitive paperwork, and no digital infrastructure to work efficiently.',

    pilSolution: 'The Solution',
    pilTitle1: 'The Digital Backbone',
    pilTitle2: 'of Legal Clarity',
    pil1Title: 'A Clear Journey', pil1Desc: 'From first query to final verdict — users know exactly where their case stands, what comes next, and what their rights are at every step.',
    pil2Title: 'Structured Practice', pil2Desc: 'Verified professionals get powerful tools — case management, client communication, and digital workflows that remove friction and amplify impact.',
    pil3Title: 'Radical Honesty', pil3Desc: 'Every interaction is transparent. Fees are declared. Timelines are communicated. No hidden layers. No power asymmetry.',

    visLabel: 'Our Vision',
    visQuote: 'We envision a future where accessing legal support feels as seamless as ordering a product online — structured, reliable, and empowering.',
    visBuilding: 'Building confidence in the legal system',
    visDesc1: 'Lxwyer Up exists to make justice not only accessible — but ',
    visDesc2: 'understandable',
    visDesc3: '. This is not just legal tech. ',
    visDesc4: 'This is a movement.'
  },
  hi: {
    heroBadge: 'नया मानक',
    heroLine1: 'न्याय होना चाहिए',
    heroLine2: 'पारदर्शी।',
    heroSub1: 'कानूनी व्यवस्था न्याय दिलाने के लिए बनाई गई थी। लेकिन इसमें कहीं न कहीं, ',
    heroSub2: 'स्पष्टता खो गई।',
    scroll: 'नीचे स्क्रॉल करें',
    
    statClients: 'सशक्त मुवक्किल',
    statLawyers: 'सत्यापित वकील',
    statSupport: 'निरंतर सहायता',
    
    manifestoStory: 'हमारी कहानी',
    manifestoTitle1: 'Lxwyer Up क्यों',
    manifestoTitle2: 'अस्तित्व में आया',
    manifestoImage1: 'भारत की कानूनी व्यवस्था',
    manifestoImage2: 'हम इसमें विश्वास फिर से बना रहे हैं।',
    
    prLabel1: 'समस्या',
    prText1: 'लाखों लोग अधिकारों से अनजान, मामले की प्रगति से बेखबर और जटिल प्रणालियों पर निर्भर होकर कानूनी प्रक्रियाओं में कदम रखते हैं।',
    prLabel2: 'दूसरा पहलू',
    prText2: 'वहीं दूसरी ओर, नैतिक वकील असंगठित साधनों और अत्यधिक काम के बीच पुराने ढांचे में अथक प्रयास करते हैं।',
    prLabel3: 'हमारा विश्वास',
    prText3: 'हमारा मानना है कि यह बदल सकता है। कानून को सशक्त बनाना चाहिए। तकनीक को व्यवस्था को और अधिक मानवीय बनाना चाहिए — जटिल नहीं।',
    prLabel4: 'वादा',
    prText4: 'हम स्पष्टता और पारदर्शिता की नींव तैयार कर रहे हैं — जहां विश्वास भ्रम की जगह लेता है।',

    probReality: 'वास्तविकता',
    probTitle: 'सिस्टम टूट चुका है',
    probSub: 'पारंपरिक कानूनी ढांचा न्याय चाहने वालों और न्याय देने वालों दोनों के लिए अनावश्यक बाधाएं पैदा करता है।',
    prob1Title: 'लाखों लोग शक्तिहीन महसूस करते हैं', prob1Desc: 'आम नागरिक अपने अधिकारों से अनजान कानूनी प्रक्रियाओं में प्रवेश करते हैं, उन्हें स्पष्टता नहीं होती कि आगे क्या होगा।',
    prob2Title: 'पारदर्शिता का अभाव', prob2Desc: 'छिपी हुई फीस, अस्पष्ट समयसीमा और अपारदर्शी कार्यवाही भय पैदा करती है — सुरक्षा के लिए बनी व्यवस्था ही बाधा बन जाती है।',
    prob3Title: 'जटिलता', prob3Desc: 'कानूनी जार्गन और पुरानी प्रक्रियाएं आम लोगों के लिए कभी डिज़ाइन नहीं की गईं। ऍप और आम आदमी के बीच की दूरी बहुत बड़ी है।',
    prob4Title: 'वकीलों को संरचना चाहिए', prob4Desc: 'नैतिक वकील असंगठित काम, बार-बार कागजी कार्रवाई और बिना डिजिटल बुनियादी ढांचे के काम करते हैं।',

    pilSolution: 'समाधान',
    pilTitle1: 'कानूनी स्पष्टता की',
    pilTitle2: 'डिजिटल रीढ़',
    pil1Title: 'एक स्पष्ट यात्रा', pil1Desc: 'पहले प्रश्न से अंतिम फैसले तक — उपयोगकर्ताओं को पता होता है कि उनका मामला कहां है और उनके अधिकार क्या हैं।',
    pil2Title: 'संरचित अभ्यास', pil2Desc: 'सत्यापित पेशेवरों को शक्तिशाली टूल मिलते हैं — केस प्रबंधन, क्लाइंट संचार और डिजिटल वर्कफ़्लो।',
    pil3Title: 'ईमानदारी', pil3Desc: 'हर बातचीत पारदर्शी है। फीस घोषित की जाती है। समयसीमा बताई जाती है। कोई छिपी हुई परतें नहीं।',

    visLabel: 'हमारा नज़रिया',
    visQuote: 'हम एक ऐसे भविष्य की कल्पना करते हैं जहां कानूनी सहायता प्राप्त करना ऑनलाइन उत्पाद ऑर्डर करने जितना आसान हो — संरचित, विश्वसनीय और सशक्त।',
    visBuilding: 'कानूनी व्यवस्था में विश्वास बनाना',
    visDesc1: 'Lxwyer Up का उद्देश्य न्याय को न केवल सुलभ बनाना है — बल्कि ',
    visDesc2: 'समझने योग्य भी',
    visDesc3: '। यह केवल कानूनी तकनीक नहीं है। ',
    visDesc4: 'यह एक क्रांति है।'
  }
};

// ─── STANDARD ANIMATION VARIANTS ───
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ─── UTILITIES ───
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 2000;
    const step = Math.max(1, Math.floor(end / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const Stat = ({ target, suffix, label, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={{ hidden: { opacity: 0, scale: 0.9, y: 30 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] } } }}
      className="text-center relative group">
      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 blur-2xl rounded-full transition-all duration-500" />
      <p className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 tracking-tighter drop-shadow-md">
        <AnimatedCounter target={target} suffix={suffix} />
      </p>
      <p className="text-sm md:text-base text-blue-200 font-semibold uppercase tracking-widest">{label}</p>
    </motion.div>
  );
};

// ─── 3D TILT CARD ───
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const multiplier = 20;
    const xPct = (x / rect.width - 0.5) * multiplier;
    const yPct = (y / rect.height - 0.5) * -multiplier;
    setRotation({ x: yPct, y: xPct });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotation.x, rotateY: rotation.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ transformPerspective: 1000 }}
      className={`relative ${className}`}
    >
      {/* Dynamic hover glow based on mouse pos could go here */}
      {children}
    </motion.div>
  );
};


// ─── PAGE COMPONENT ───
export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const { lang } = useLang();
  const d = TEXT[lang] || TEXT.en;

  return (
    <div className="min-h-screen bg-black text-white font-['Outfit'] overflow-x-hidden selection:bg-blue-500/30">
      <GradientOrbs />
      <NavbarWave />

      {/* ─── LIVE HERO SECTION ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-[0.15]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(99,102,241,0.15) 2px, transparent 0)', backgroundSize: '48px 48px' }} />

        {/* Floating/Breathing Core Glows */}
        <motion.div
          animate={{
            scale: [1, 1.1, 0.9, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 30, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [0.9, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, 50, -50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[600px] bg-indigo-500/20 rounded-full blur-[140px] pointer-events-none"
        />

        {/* Content with Scroll Parallax */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto pt-20">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 dark:bg-blue-600/10 border border-slate-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-bold mb-8 uppercase tracking-[0.2em] shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4" /> {d.heroBadge}
          </motion.div>

          <motion.h1 initial="hidden" animate="visible" variants={stagger}
            className="text-5xl sm:text-6xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-8">
            <motion.span variants={fadeUp} className="block">{d.heroLine1}</motion.span>
            <motion.span variants={fadeUp} className="relative inline-block mt-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-300">
                {d.heroLine2}
              </span>
              {/* Animated underline */}
              <motion.span
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full origin-left"
              />
            </motion.span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl sm:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light mb-14">
            {d.heroSub1} <em className="text-slate-800 dark:text-slate-200 font-medium not-italic">{d.heroSub2}</em>
          </motion.p>
        </motion.div>

        {/* Scroll hint breathing */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.3em]">
          <span>{d.scroll}</span>
          <motion.div animate={{ y: [0, 8, 0], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── MANIFESTO (With Parallax Image) ─── */}
      <ManifestoSection />

      {/* ─── STATS BAR ─── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 dark:bg-[#030712]" />
        {/* Dynamic mesh gradient background */}
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(at 40% 20%, hsla(228,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%)', backgroundSize: '200% 200%' }}
        />
        <div className="absolute inset-0 pointer-events-none opacity-[0.2]"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10 border-y border-white/10 py-16">
          <Stat target="10000" suffix="+" label={d.statClients} delay={0} />
          <div className="hidden md:block absolute left-1/3 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <Stat target="1000" suffix="+" label={d.statLawyers} delay={0.2} />
          <div className="hidden md:block absolute right-1/3 top-1/2 -translate-y-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <Stat target="24" suffix="/7" label={d.statSupport} delay={0.4} />
        </div>
      </section>

      {/* ─── WHY WE EXIST (3D Hover Cards) ─── */}
      <ProblemSection />

      {/* ─── PILLARS (Floating geometric) ─── */}
      <PillarsSection />

      {/* ─── VISION STATEMENT (Cinematic Particles) ─── */}
      <VisionStatement />

      <Footer />
    </div>
  );
}

// ─── MANIFESTO COMPONENT ───
function ManifestoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const { lang } = useLang();
  const d = TEXT[lang] || TEXT.en;

  const paragraphs = [
    { label: d.prLabel1, text: d.prText1 },
    { label: d.prLabel2, text: d.prText2 },
    { label: d.prLabel3, text: d.prText3 },
    { label: d.prLabel4, text: d.prText4 },
  ];

  return (
    <section ref={ref} className="py-32 px-6 relative bg-white dark:bg-[#060b14] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Parallax Image Left */}
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px] lg:h-[700px] bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-white/5">
            <motion.img
              style={{ y: imgY, scale: 1.1 }}
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80"
              alt="Justice" className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-10 left-10 right-10"
            >
              <div className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                <p className="text-white font-black text-2xl tracking-tight mb-1">{d.manifestoImage1}</p>
                <p className="text-blue-200 font-medium">{d.manifestoImage2}</p>
              </div>
            </motion.div>
          </div>

          {/* Staggered Text Right */}
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className="space-y-12">
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-bold mb-4 bg-blue-50 dark:bg-blue-500/10 px-4 py-1.5 rounded-full">
                {d.manifestoStory}
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                {d.manifestoTitle1}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                  {d.manifestoTitle2}
                </span>
              </h2>
            </motion.div>

            <div className="space-y-8 relative">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-blue-600 via-indigo-400 to-transparent opacity-20" />
              {paragraphs.map((p, i) => (
                <motion.div key={i} variants={fadeUp} className="relative pl-8 group">
                  <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)] group-hover:scale-150 transition-transform duration-300" />
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2 block">{p.label}</span>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">{p.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── PROBLEM SECTION ───
function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { lang } = useLang();
  const d = TEXT[lang] || TEXT.en;

  const problems = [
    { icon: Users, title: d.prob1Title, desc: d.prob1Desc },
    { icon: Shield, title: d.prob2Title, desc: d.prob2Desc },
    { icon: Scale, title: d.prob3Title, desc: d.prob3Desc },
    { icon: Users, title: d.prob4Title, desc: d.prob4Desc },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-slate-50/50 dark:bg-slate-900/30 relative border-y border-slate-200 dark:border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className="text-center mb-20">
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-bold mb-4">{d.probReality}</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{d.probTitle}</motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {d.probSub}
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <TiltCard key={i}>
              <motion.div variants={fadeUp}
                className="group h-full bg-white dark:bg-[#0a0f1a] border border-slate-200 dark:border-white/[0.08] rounded-3xl p-8 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors duration-300 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden relative">

                {/* Hover gradient sweep */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-transparent transition-all duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center bg-slate-100 dark:bg-white/5 group-hover:bg-blue-600 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-500">
                    <p.icon className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{p.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── PILLARS SECTION ───
function PillarsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { lang } = useLang();
  const d = TEXT[lang] || TEXT.en;

  const pillars = [
    { num: '01', title: d.pil1Title, body: d.pil1Desc },
    { num: '02', title: d.pil2Title, body: d.pil2Desc },
    { num: '03', title: d.pil3Title, body: d.pil3Desc },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-white dark:bg-[#060b14] overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className="text-center mb-24">
          <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 font-bold mb-4">{d.pilSolution}</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            {d.pilTitle1}<br />{d.pilTitle2}
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((p, i) => (
            <motion.div key={i} variants={fadeUp}
              className="relative group pt-12">
              {/* Massive animated background number */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.2 + i * 0.2, ease: "easeOut" }}
                className="absolute top-0 left-0 text-[140px] font-black text-slate-100 dark:text-white/[0.03] leading-none select-none pointer-events-none group-hover:text-blue-50 dark:group-hover:text-white/[0.05] transition-colors duration-500"
              >
                {p.num}
              </motion.div>

              <div className="relative z-10 px-6">
                <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mb-8 group-hover:w-24 transition-all duration-500" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{p.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CINEMATIC VISION STATEMENT ───
function VisionStatement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { lang } = useLang();
  const d = TEXT[lang] || TEXT.en;

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 40;
    const y = (clientY / window.innerHeight - 0.5) * 40;
    setMousePos({ x, y });
  };

  const quote = d.visQuote;
  const words = quote.split(' ');

  // Enhanced dynamic particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 4,
    dur: 3 + Math.random() * 5,
    delay: Math.random() * 2,
    blur: Math.random() * 3,
  }));

  return (
    <section ref={ref} onMouseMove={handleMouseMove} className="py-40 px-6 bg-[#020408] relative overflow-hidden border-t border-white/5">
      {/* Deep grid perspective */}
      <motion.div
        animate={{ x: mousePos.x * -0.5, y: mousePos.y * -0.5 }}
        transition={{ type: "spring", stiffness: 50, damping: 30 }}
        className="absolute inset-[-10%] pointer-events-none opacity-[0.06]"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 2px, transparent 0)', backgroundSize: '60px 60px' }}
      />

      {/* Reactive Ambient glows */}
      <motion.div
        animate={{ x: mousePos.x * 2, y: mousePos.y * 2, scale: [1, 1.1, 1] }}
        transition={{ scale: { duration: 8, repeat: Infinity, repeatType: "reverse" }, x: { type: "spring", stiffness: 40 }, y: { type: "spring", stiffness: 40 } }}
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={{ x: mousePos.x * -2, y: mousePos.y * -2, scale: [1, 1.2, 1] }}
        transition={{ scale: { duration: 10, repeat: Infinity, repeatType: "reverse" }, x: { type: "spring", stiffness: 40 }, y: { type: "spring", stiffness: 40 } }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none"
      />

      {/* Cinematic Floating particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-400 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, filter: `blur(${p.blur}px)` }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs uppercase tracking-[0.5em] text-blue-400 font-bold mb-10"
        >
          {d.visLabel}
        </motion.p>

        {/* Liquid line */}
        <motion.div
          initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto mb-14 origin-center"
        />

        <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] tracking-tight mb-16 flex flex-wrap justify-center gap-x-3 gap-y-2">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)', rotate: -2 }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)', rotate: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={
                ['seamless', 'structured,', 'reliable,', 'empowering.'].includes(word)
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]'
                  : 'text-white'
              }
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="p-[1px] rounded-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent inline-block mx-auto mb-4">
            <div className="bg-black/50 backdrop-blur-md rounded-full px-6 py-2">
              <Sparkles className="w-5 h-5 text-blue-400 inline-block mr-2" />
              <span className="text-white font-medium text-sm">{d.visBuilding}</span>
            </div>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
            {d.visDesc1}<strong className="text-white font-medium">{d.visDesc2}</strong>
            {d.visDesc3}<strong className="text-white font-medium">{d.visDesc4}</strong>
          </p>
        </motion.div>

        {/* Floor grid fade out */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 2.2 }}
          className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-gradient-to-t from-blue-600/10 to-transparent"
        />
      </div>
    </section>
  );
}
