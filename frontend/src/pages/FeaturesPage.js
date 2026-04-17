import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavbarWave } from '../components/NavbarWave';
import {
  MessageSquare, FileText, Calendar, Bell, Shield,
  BarChart, Users, Clock, Siren, Fingerprint, Phone,
  Scale, ArrowRight, CheckCircle,
} from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const TEXT = {
  en: {
    heroTitle1: 'Platform Features',
    cap_desc: 'A complete legal operating system — for individuals, lawyers, and firms.',
    cta_title: 'Ready to Get Started?',
    cta_sub: "Join thousands of clients and lawyers already using LxwyerUp to navigate India's legal system with confidence.",
    cta_consult: 'Consult Now',
    cta_contact: 'Contact Us',
  },
  hi: {
    heroTitle1: 'प्लेटफ़ॉर्म की विशेषताएं',
    cap_desc: 'एक संपूर्ण कानूनी ऑपरेटिंग सिस्टम — व्यक्तियों, वकीलों और फर्मों के लिए।',
    cta_title: 'क्या आप शुरू करने के लिए तैयार हैं?',
    cta_sub: 'LxwyerUp का उपयोग कर रहे हजारों ग्राहकों और वकीलों से जुड़ें।',
    cta_consult: 'अभी परामर्श लें',
    cta_contact: 'संपर्क करें',
  }
};

const FEATURES = [
  {
    icon: Siren,
    title: 'Emergency Legal Support',
    description: 'Provides immediate access to verified lawyers during urgent legal situations. With one click, connect quickly, receive timely guidance, and understand your next steps — reducing panic and helping you respond confidently.',
    tag: 'Clients', color: 'red', badge: 'Live Now',
  },
  {
    icon: Fingerprint,
    title: 'APEX Verification',
    description: 'Our proprietary, multi-stage verification framework. Every lawyer is subjected to rigorous credential checks, peer reviews, conduct audits, and AI-driven performance scoring before appearing in your results. It ensures trusted, high-quality legal consultation for complex or high-stakes matters with more details of their verified expertise.',
    tag: 'Both', color: 'green', badge: 'Verified',
  },
  {
    icon: MessageSquare,
    title: 'AI Legal Chatbot',
    description: 'Get instant, structured answers to your legal questions in plain language. Powered by Gemini — available 24/7.',
    tag: 'Both', color: 'blue',
  },
  {
    icon: Calendar,
    title: 'Consultation Booking',
    description: 'Book video or in-person consultations with verified lawyers in seconds. Manage all appointments in one calendar.',
    tag: 'Clients', color: 'blue',
  },
  {
    icon: FileText,
    title: 'Case Tracking',
    description: 'Monitor your case status, stages, and key deadlines in real-time. Never miss an update or hearing.',
    tag: 'Clients', color: 'blue',
  },
  {
    icon: Shield,
    title: 'Document Management',
    description: 'Securely upload, organise, and share legal documents. Everything encrypted and accessible from any device.',
    tag: 'Both', color: 'blue',
  },
  {
    icon: Users,
    title: 'Client Management',
    description: 'Lawyers can manage multiple clients, track case progress, and maintain professional communication — all in one place.',
    tag: 'Lawyers', color: 'blue',
  },
  {
    icon: Bell,
    title: 'Smart Notifications',
    description: 'Automated alerts for case updates, upcoming hearings, document requests, and important deadlines.',
    tag: 'Both', color: 'blue',
  },
  {
    icon: BarChart,
    title: 'Case Analytics',
    description: 'Insights into case progress, success patterns, and AI-powered recommendations for your next step.',
    tag: 'Both', color: 'blue',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Your dashboard, documents, and AI assistant are always on — from any device, at any hour.',
    tag: 'Both', color: 'blue',
  },
];

const FEATURES_HI = [
  { icon: Siren, title: 'आपातकालीन कानूनी सहायता', description: 'तत्काल कानूनी स्थितियों के दौरान सत्यापित वकीलों तक तत्काल पहुंच प्रदान करता है। एक क्लिक के साथ, जल्दी से जुड़ें, समय पर मार्गदर्शन प्राप्त करें, और अपने अगले कदम को समझें।', tag: 'Clients', color: 'red', badge: 'अभी लाइव' },
  { icon: Fingerprint, title: 'APEX वेरिफिकेशन', description: 'हमारा मालिकाना बहु-चरणीय सत्यापन ढांचा। हर वकील की क्रेडेंशियल जांच, सहकर्मी समीक्षा और एआई-संचालित प्रदर्शन स्कोरिंग से गुज़रना पड़ता है।', tag: 'Both', color: 'green', badge: 'सत्यापित' },
  { icon: MessageSquare, title: 'AI कानूनी चैटबॉट', description: 'साधारण भाषा में अपने कानूनी सवालों के तुरंत, संरचित उत्तर पाएं। जेमिनी द्वारा संचालित — 24/7 उपलब्ध।', tag: 'Both', color: 'blue' },
  { icon: Calendar, title: 'परामर्श बुकिंग', description: 'सेकंडों में सत्यापित वकीलों के साथ वीडियो या व्यक्तिगत परामर्श बुक करें। सभी नियुक्तियों को एक कैलेंडर में प्रबंधित करें।', tag: 'Clients', color: 'blue' },
  { icon: FileText, title: 'केस ट्रैकिंग', description: 'रीयल-टाइम में अपने केस की स्थिति, चरणों और महत्वपूर्ण समय सीमाओं की निगरानी करें।', tag: 'Clients', color: 'blue' },
  { icon: Shield, title: 'दस्तावेज़ प्रबंधन', description: 'कानूनी दस्तावेज़ सुरक्षित रूप से अपलोड करें, व्यवस्थित करें और साझा करें।', tag: 'Both', color: 'blue' },
  { icon: Users, title: 'क्लाइंट प्रबंधन', description: 'वकील एक ही स्थान पर कई ग्राहकों को प्रबंधित कर सकते हैं, केस की प्रगति को ट्रैक कर सकते हैं।', tag: 'Lawyers', color: 'blue' },
  { icon: Bell, title: 'स्मार्ट सूचनाएं', description: 'केस अपडेट, आगामी सुनवाई, दस्तावेज़ अनुरोध और महत्वपूर्ण समय सीमाओं के लिए स्वचालित अलर्ट।', tag: 'Both', color: 'blue' },
  { icon: BarChart, title: 'केस एनालिटिक्स', description: 'केस की प्रगति, सफलता पैटर्न और AI-संचालित सिफारिशों में अंतर्दृष्टि।', tag: 'Both', color: 'blue' },
  { icon: Clock, title: '24/7 उपलब्धता', description: 'आपका डैशबोर्ड, दस्तावेज़ और AI सहायक हमेशा चालू रहते हैं — किसी भी डिवाइस से।', tag: 'Both', color: 'blue' },
];

/* ─────────────────────────────────────────────
   ExpandableText — ONLY the text area grows.
   Icon / title above stay completely untouched.
───────────────────────────────────────────── */
function ExpandableText({ text, maxLength = 100, fontSize = 12 }) {
  const [expanded, setExpanded] = React.useState(false);
  if (!text) return null;
  if (text.length <= maxLength) return <span style={{ fontSize }}>{text}</span>;

  return (
    <span style={{ fontSize }}>
      {expanded ? text : text.slice(0, maxLength) + '…'}
      {' '}
      <span
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setExpanded(v => !v); }}
        style={{ color: '#60a5fa', cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap', fontSize }}
      >
        {expanded ? 'Show less' : 'Read more'}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────────
   CSS injected once
───────────────────────────────────────────── */
const BENTO_CSS = `
@keyframes bentoFade  { 0%{opacity:0;transform:translateY(12px)} 100%{opacity:1;transform:translateY(0)} }
@keyframes bentoFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes bentoPulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
@keyframes sosRing    { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.2);opacity:0} }
@keyframes apexScan   { 0%{transform:translateY(-100%) scaleY(0.5);opacity:0} 50%{opacity:1} 100%{transform:translateY(200%) scaleY(0.5);opacity:0} }
@keyframes chartLine  { from{stroke-dashoffset:400} to{stroke-dashoffset:0} }

.bento-card { animation: bentoFade .5s ease both; }
.bento-card:nth-child(1){animation-delay:.04s} .bento-card:nth-child(2){animation-delay:.10s}
.bento-card:nth-child(3){animation-delay:.16s} .bento-card:nth-child(4){animation-delay:.22s}
.bento-card:nth-child(5){animation-delay:.26s} .bento-card:nth-child(6){animation-delay:.30s}
.bento-card:nth-child(7){animation-delay:.34s} .bento-card:nth-child(8){animation-delay:.38s}
.bento-card:nth-child(9){animation-delay:.42s} .bento-card:nth-child(10){animation-delay:.46s}

/* ── bento grid layout ──
   Mobile  (< 640 px) : 1 column
   Tablet  (640–1023) : 2 columns
   Desktop (≥ 1024px) : custom 6-col grid
*/
.bento-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
  align-items: start;
}
.bento-sos, .bento-apex {
  grid-column: span 2;
}
@media (min-width: 640px) {
  .bento-grid { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 1024px) {
  .bento-grid { grid-template-columns: repeat(6, 1fr); gap: 20px; }

  /* Row 1 */
  .bento-sos        { grid-column: span 2; }
  .bento-apex       { grid-column: span 2; }
  .bento-ai         { grid-column: span 2; }

  /* Row 2 */
  .bento-booking    { grid-column: span 3; }
  .bento-casetrack  { grid-column: span 3; }

  /* Row 3 */
  .bento-docs       { grid-column: span 2; }
  .bento-clients    { grid-column: span 2; }
  .bento-notifs     { grid-column: span 2; }

  /* Row 4 */
  .bento-analytics  { grid-column: span 3; }
  .bento-allday     { grid-column: span 3; }
}

/* On tablet, give the first 3 cards full width each */
@media (min-width: 640px) and (max-width: 1023px) {
  .bento-sos,
  .bento-apex,
  .bento-ai { grid-column: span 2; }
}
`;

if (typeof document !== 'undefined' && !document.getElementById('bento-css-v2')) {
  const s = document.createElement('style');
  s.id = 'bento-css-v2';
  s.textContent = BENTO_CSS;
  document.head.appendChild(s);
}

/* ─────────────────────────────────────────────
   BentoFeaturePage
───────────────────────────────────────────── */
function BentoFeaturePage() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const d = TEXT[lang] || TEXT.en;
  const featuresList = lang === 'hi' ? FEATURES_HI : FEATURES;
  const [sos, apex, ai, booking, caseTrack, docs, clients, notifs, analytics, allDay] = featuresList;

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', fontFamily: "'Outfit', sans-serif", overflowX: 'hidden' }}>
      <NavbarWave />

      {/* Hero */}
      <section style={{ paddingTop: 112, paddingBottom: 24, paddingLeft: 24, paddingRight: 24, textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3.5rem)', fontWeight: 900, color: '#fff', marginBottom: 8, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {d.heroTitle1}
        </h1>
        <p style={{ color: '#6b7280', fontSize: 14, maxWidth: 480, margin: '0 auto' }}>{d.cap_desc}</p>
      </section>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 16px 96px', position: 'relative' }}>
        <div className="bento-grid">

          {/* ── SOS ── */}
          <div
            className="bento-card bento-sos"
            style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(239,68,68,0.3)', background: '#000', cursor: 'pointer', minHeight: 300 }}
            onClick={() => navigate('/emergency')}
          >
            {/* Ping rings */}
            <div style={{ position: 'absolute', top: 50, right: 30, width: 72, height: 72, pointerEvents: 'none', zIndex: 0 }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(239,68,68,0.5)', animation: 'sosRing 2.5s ease-out infinite' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(239,68,68,0.3)', animation: 'sosRing 2.5s ease-out .6s infinite' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '1.5px solid rgba(239,68,68,0.1)', animation: 'sosRing 2.5s ease-out 1.2s infinite' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 28, height: 28, borderRadius: '50%', background: 'rgba(239,68,68,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(239,68,68,0.5)' }}>
                <Phone style={{ width: 13, height: 13, color: '#fff' }} />
              </div>
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 40%, rgba(239,68,68,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />

            {/* Content — flex column, static header, expandable description at bottom */}
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(16px, 4vw, 28px)', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 300, boxSizing: 'border-box' }}>
              {/* Static top area */}
              <div style={{ flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fca5a5', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)', padding: '3px 10px', borderRadius: 100, display: 'inline-block', marginBottom: 16, animation: 'bentoPulse 2s ease-in-out infinite' }}>
                  {sos.badge || 'LIVE NOW'}
                </span>
                <p style={{ fontSize: 42, fontWeight: 900, color: '#ef4444', margin: '0 0 4px 0', lineHeight: 1 }}>₹300</p>
                <p style={{ fontSize: 10, color: '#6b7280', margin: '0 0 16px 0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>per Emergency session</p>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 8px 0' }}>{sos.title}</h2>
              </div>
              {/* Expandable text — only this area grows */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: '0 0 16px 0', paddingRight: 40 }}>
                  <ExpandableText text={sos.description} maxLength={100} fontSize={12} />
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate('/emergency'); }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 18px', borderRadius: 10, background: '#dc2626', color: '#fff', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}
                >
                  Access Emergency <ArrowRight style={{ width: 11, height: 11 }} />
                </button>
              </div>
            </div>
          </div>

          {/* ── APEX ── */}
          <div className="bento-card bento-apex" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(45,212,191,0.2)', background: '#000', minHeight: 300 }}>
            {/* Fingerprint bg */}
            <div style={{ position: 'absolute', top: 100, right: -15, width: 140, height: 140, opacity: 0.08, pointerEvents: 'none', zIndex: 0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
                <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12z"/>
                <path d="M12 5a7 7 0 0 0-7 7m14 0a7 7 0 0 0-7-7m-5 7a5 5 0 0 1 10 0m-8 0a3 3 0 0 1 6 0m-4 0a1 1 0 0 1 2 0"/>
                <path d="M12 22v-3" />
              </svg>
            </div>
            {/* Scan line */}
            <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
              <div style={{ position: 'absolute', left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.8), transparent)', boxShadow: '0 0 10px rgba(45,212,191,0.5)', animation: 'apexScan 3s linear infinite' }} />
            </div>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 100% 100%, rgba(45,212,191,0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(16px, 4vw, 28px)', display: 'flex', flexDirection: 'column', minHeight: 300, boxSizing: 'border-box' }}>
              {/* Static top */}
              <div style={{ flexShrink: 0 }}>
                <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5eead4', background: 'rgba(45,212,191,0.1)', border: '1px solid rgba(45,212,191,0.2)', padding: '3px 10px', borderRadius: 100, display: 'inline-block', marginBottom: 14 }}>
                  {apex.badge || 'APEX'}
                </span>
                <p style={{ fontSize: 38, fontWeight: 900, color: '#2dd4bf', margin: '0 0 4px 0', lineHeight: 1 }}>100%</p>
                <p style={{ fontSize: 10, color: '#6b7280', margin: '0 0 16px 0', letterSpacing: '0.05em', textTransform: 'uppercase' }}>verified lawyers only</p>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 8px 0' }}>{apex.title}</h2>
              </div>
              {/* Expandable only */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: 0, paddingRight: 20 }}>
                  <ExpandableText text={apex.description} maxLength={100} fontSize={12} />
                </p>
              </div>
            </div>
          </div>

          {/* ── AI Chatbot ── */}
          <div className="bento-card bento-ai" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: '#000', minHeight: 300 }}>
            {/* Chat bubbles bg */}
            <div style={{ position: 'absolute', top: 30, right: 16, display: 'flex', flexDirection: 'column', gap: 8, opacity: 0.12, pointerEvents: 'none', zIndex: 0, transform: 'scale(0.85)', transformOrigin: 'top right' }}>
              <div style={{ padding: '6px 10px', borderRadius: '12px 12px 0 12px', background: 'rgba(59,130,246,0.3)', border: '1px solid rgba(59,130,246,0.4)', fontSize: 9, color: '#fff', whiteSpace: 'nowrap', animation: 'bentoFloat 4s ease-in-out infinite', alignSelf: 'flex-end' }}>FIR Procedure</div>
              <div style={{ padding: '6px 10px', borderRadius: '12px 12px 12px 0', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 9, color: '#fff', whiteSpace: 'nowrap', marginLeft: -20, animation: 'bentoFloat 4.5s ease-in-out .5s infinite', alignSelf: 'flex-start' }}>Generating drafted response</div>
              <div style={{ padding: '6px 10px', borderRadius: '12px 12px 0 12px', background: 'rgba(59,130,246,0.5)', border: '1px solid rgba(59,130,246,0.6)', fontSize: 9, color: '#fff', whiteSpace: 'nowrap', animation: 'bentoFloat 5s ease-in-out 1s infinite', alignSelf: 'flex-end', display: 'flex', gap: 4 }}>
                <span style={{width:4,height:4,borderRadius:'50%',background:'#fff',animation:'bentoPulse 1s infinite'}}/>
                <span style={{width:4,height:4,borderRadius:'50%',background:'#fff',animation:'bentoPulse 1s .2s infinite'}}/>
                <span style={{width:4,height:4,borderRadius:'50%',background:'#fff',animation:'bentoPulse 1s .4s infinite'}}/>
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(16px, 4vw, 28px)', display: 'flex', flexDirection: 'column', minHeight: 300, boxSizing: 'border-box' }}>
              {/* Static top */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa', background: 'rgba(59,130,246,0.1)', letterSpacing: '0.05em' }}>24/7 AI</span>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(59,130,246,0.3)', color: '#60a5fa', background: 'rgba(59,130,246,0.1)', letterSpacing: '0.05em' }}>Lxwyer AI</span>
                </div>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(30,58,138,0.2))', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <MessageSquare style={{ width: 16, height: 16, color: '#60a5fa' }} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#fff', margin: '0 0 8px 0' }}>{ai.title}</h2>
              </div>
              {/* Expandable only */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>
                  <ExpandableText text={ai.description} maxLength={100} fontSize={12} />
                </p>
              </div>
            </div>
          </div>

          {/* ── Booking ── */}
          <div className="bento-card bento-booking" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', background: '#000', minHeight: 200 }}>
            {/* Calendar mini visual */}
            <div style={{ position: 'absolute', top: 90, right: 12, width: '40%', height: 40, opacity: 0.12, pointerEvents: 'none', zIndex: 0 }}>
              <svg viewBox="0 0 100 40" style={{ width: '100%', height: '100%' }}>
                <rect x="0" y="5" width="20" height="25" rx="3" fill="rgba(255,255,255,0.3)"/>
                <rect x="25" y="5" width="20" height="25" rx="3" fill="rgba(255,255,255,0.3)"/>
                <rect x="50" y="5" width="20" height="25" rx="3" fill="#3b82f6"/>
                <rect x="75" y="5" width="20" height="25" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)"/>
              </svg>
            </div>
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(16px, 4vw, 24px)', display: 'flex', flexDirection: 'column', minHeight: 200, boxSizing: 'border-box' }}>
              {/* Static */}
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <Calendar style={{ width: 14, height: 14, color: '#94a3b8' }} />
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 6px 0' }}>{booking.title}</h2>
              </div>
              {/* Expandable */}
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: 0, paddingRight: 36 }}>
                  <ExpandableText text={booking.description} maxLength={80} fontSize={12} />
                </p>
              </div>
            </div>
          </div>

          {/* ── Case Tracking ── */}
          <div className="bento-card bento-casetrack" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', background: '#000', minHeight: 200 }}>
            {/* Status dots visual */}
            <div style={{ position: 'absolute', top: 90, right: 16, display: 'flex', flexDirection: 'column', gap: 6, opacity: 0.12, pointerEvents: 'none', zIndex: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} /><div style={{ height: 4, width: 30, background: 'rgba(255,255,255,0.4)', borderRadius: 2 }}/></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'bentoPulse 1.5s infinite' }} /><div style={{ height: 4, width: 45, background: 'linear-gradient(90deg, #3b82f6, rgba(59,130,246,0.3))', borderRadius: 2 }}/></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><div style={{ width: 6, height: 6, borderRadius: '50%', border: '1px solid #475569' }} /><div style={{ height: 4, width: 25, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}/></div>
            </div>
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(16px, 4vw, 24px)', display: 'flex', flexDirection: 'column', minHeight: 200, boxSizing: 'border-box' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <FileText style={{ width: 14, height: 14, color: '#94a3b8' }} />
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 6px 0' }}>{caseTrack.title}</h2>
              </div>
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: 0, paddingRight: 36 }}>
                  <ExpandableText text={caseTrack.description} maxLength={80} fontSize={12} />
                </p>
              </div>
            </div>
          </div>

          {/* ── Docs ── */}
          <div className="bento-card bento-docs" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', background: '#000', minHeight: 180 }}>
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(14px, 4vw, 20px)', display: 'flex', flexDirection: 'column', minHeight: 180, boxSizing: 'border-box' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Shield style={{ width: 13, height: 13, color: '#94a3b8' }} />
                </div>
                <h2 style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '0 0 5px 0' }}>{docs.title}</h2>
              </div>
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.55, margin: 0 }}>
                  <ExpandableText text={docs.description} maxLength={75} fontSize={11} />
                </p>
              </div>
            </div>
          </div>

          {/* ── Clients ── */}
          <div className="bento-card bento-clients" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', background: '#000', minHeight: 180 }}>
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(14px, 4vw, 20px)', display: 'flex', flexDirection: 'column', minHeight: 180, boxSizing: 'border-box' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Users style={{ width: 13, height: 13, color: '#94a3b8' }} />
                </div>
                <h2 style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '0 0 5px 0' }}>{clients.title}</h2>
              </div>
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.55, margin: 0 }}>
                  <ExpandableText text={clients.description} maxLength={75} fontSize={11} />
                </p>
              </div>
            </div>
          </div>

          {/* ── Notifications ── */}
          <div className="bento-card bento-notifs" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', background: '#000', minHeight: 180 }}>
            <div style={{ position: 'relative', zIndex: 1, padding: 20, display: 'flex', flexDirection: 'column', minHeight: 180, boxSizing: 'border-box' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Bell style={{ width: 13, height: 13, color: '#94a3b8' }} />
                </div>
                <h2 style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: '0 0 5px 0' }}>{notifs.title}</h2>
              </div>
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.55, margin: 0 }}>
                  <ExpandableText text={notifs.description} maxLength={75} fontSize={11} />
                </p>
              </div>
            </div>
          </div>

          {/* ── Analytics ── */}
          <div className="bento-card bento-analytics" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', background: '#000', minHeight: 200 }}>
            {/* Chart visual */}
            <div style={{ position: 'absolute', top: 110, right: 10, left: 10, height: 70, opacity: 0.08, pointerEvents: 'none', zIndex: 0 }}>
              <svg viewBox="0 0 300 70" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
                <polyline points="0,60 40,45 80,50 120,30 160,38 200,15 240,25 300,5" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="400" style={{ animation: 'chartLine 3s ease-out forwards' }} />
                <polyline points="0,60 40,45 80,50 120,30 160,38 200,15 240,25 300,5 300,70 0,70" fill="rgba(59,130,246,0.1)" />
              </svg>
            </div>
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(16px, 4vw, 24px)', display: 'flex', flexDirection: 'column', minHeight: 200, boxSizing: 'border-box' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                  <BarChart style={{ width: 14, height: 14, color: '#94a3b8' }} />
                </div>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: '#fff', margin: '0 0 6px 0' }}>{analytics.title}</h2>
              </div>
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, margin: 0, paddingRight: 36 }}>
                  <ExpandableText text={analytics.description} maxLength={80} fontSize={12} />
                </p>
              </div>
            </div>
          </div>

          {/* ── 24/7 ── */}
          <div className="bento-card bento-allday" style={{ position: 'relative', overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', background: '#000', minHeight: 200 }}>
            {/* Uptime dots */}
            <div style={{ position: 'absolute', top: 110, right: 16, display: 'flex', gap: 4, flexWrap: 'wrap', width: 95, opacity: 0.12, pointerEvents: 'none', zIndex: 0 }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: 2, background: i > 15 ? '#374151' : '#22c55e', animation: i <= 15 ? `bentoPulse ${2 + (i % 3) * 0.5}s ease-in-out ${i * 0.1}s infinite` : 'none', opacity: i > 15 ? 0.3 : 1 }} />
              ))}
            </div>
            <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(16px, 4vw, 24px)', display: 'flex', flexDirection: 'column', minHeight: 200, boxSizing: 'border-box' }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                  <Clock style={{ width: 14, height: 14, color: '#94a3b8' }} />
                </div>
                <p style={{ fontSize: 32, fontWeight: 900, color: '#fff', margin: '0 0 2px 0', letterSpacing: '-0.02em' }}>99.9%</p>
                <h2 style={{ fontSize: 15, fontWeight: 800, color: '#fff', margin: '0 0 6px 0' }}>{allDay.title}</h2>
              </div>
              <div style={{ flexShrink: 0 }}>
                <p style={{ fontSize: 11.5, color: '#6b7280', lineHeight: 1.55, margin: 0 }}>
                  <ExpandableText text={allDay.description} maxLength={100} fontSize={11.5} />
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="bento-card" style={{ marginTop: 40, borderRadius: 24, border: '1px solid rgba(37,99,235,0.3)', background: 'linear-gradient(135deg, #03060f 0%, #060d1e 50%, #030609 100%)', padding: 'clamp(28px,6vw,48px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -50, left: '50%', transform: 'translateX(-50%)', width: 300, height: 100, background: 'radial-gradient(ellipse,rgba(37,99,235,0.2),transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', position: 'relative', zIndex: 1 }}>
            <Scale style={{ width: 22, height: 22, color: '#60a5fa' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(1.3rem,4vw,2rem)', fontWeight: 900, color: '#fff', marginBottom: 12, letterSpacing: '-0.01em', position: 'relative', zIndex: 1 }}>{d.cta_title}</h2>
          <p style={{ color: '#94a3b8', fontSize: 'clamp(13px,2vw,16px)', marginBottom: 28, maxWidth: 480, margin: '0 auto 28px', position: 'relative', zIndex: 1 }}>{d.cta_sub}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
            <button onClick={() => navigate('/user-get-started')} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 12, background: '#2563eb', color: '#fff', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(37,99,235,0.4)' }}>
              {d.cta_consult} <ArrowRight style={{ width: 14, height: 14 }} />
            </button>
            <button onClick={() => navigate('/contact')} style={{ padding: '10px 24px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', color: '#94a3b8', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}>
              {d.cta_contact}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesPage() {
  return <BentoFeaturePage />;
}