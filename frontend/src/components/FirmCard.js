import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Award, Sparkles, Check, Users } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const LOCAL_TEXT_FIRM = {
  en: {
    lawFirm: 'Law Firm',
    lawyers: 'lawyers',
    details: 'Details',
    bookNow: 'Book Now'
  },
  hi: {
    lawFirm: 'लॉ फर्म',
    lawyers: 'वकील',
    details: 'विवरण',
    bookNow: 'अभी बुक करें'
  }
};

export default function FirmCard({ firm, onBook, onDetails, index = 0, dm = true }) {
  const { lang } = useLang();
  const d = LOCAL_TEXT_FIRM[lang] || LOCAL_TEXT_FIRM.en;
  // Safe defaults
  const name = firm.name || firm.firm_name || d.lawFirm;
  const city = firm.city || '';
  const state = firm.state || '';
  const lawyersCount = firm.lawyersCount || firm.total_lawyers || firm.team_size || 0;
  const practiceAreas = firm.practiceAreas || firm.practice_areas || firm.specializations || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`rounded-3xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full
        ${dm ? 'border-slate-800 bg-[#121212]' : 'border-slate-200 bg-white'}`}
      onClick={(e) => { e.stopPropagation(); onDetails && onDetails(firm); }}
    >
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent z-10" />
        <img
          src={firm.image || firm.logo || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1 shadow-sm leading-tight">{name}</h3>
            <div className="flex items-center gap-1.5 text-slate-200 text-xs sm:text-sm">
              <MapPin className="w-3.5 h-3.5" />
              {city}{state ? `, ${state}` : ''}
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-4">
          {practiceAreas.slice(0, 3).map((area, idx) => (
            <span key={idx} className={`px-2.5 py-1 text-[10px] sm:text-xs font-semibold rounded-md
              ${dm ? 'bg-blue-900/30 text-blue-300 border border-blue-800/40' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
              {area}
            </span>
          ))}
          {practiceAreas.length > 3 && (
            <span className={`px-2 py-1 text-[10px] sm:text-xs font-medium rounded-md
              ${dm ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
              +{practiceAreas.length - 3}
            </span>
          )}
        </div>

        <p className={`text-sm line-clamp-2 mb-4 flex-1 ${dm ? 'text-slate-300' : 'text-slate-600'}`}>
          {firm.description || firm.bio || 'Professional firm providing legal services.'}
        </p>
        
        {firm.platform_metrics && (
          <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-[11px] sm:text-xs font-bold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
            <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-yellow-500" /> {firm.platform_metrics.cases_resolved}+ Cases</span>
            <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-blue-500" /> {firm.platform_metrics.csat}/5.0 CSAT</span>
            {firm.average_response_time_mins && (
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> &lt; {firm.average_response_time_mins}m resp</span>
            )}
          </div>
        )}

        <div className={`flex items-center justify-between pt-4 border-t mt-auto ${dm ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className={`flex items-center gap-1.5 text-sm font-semibold ${dm ? 'text-slate-400' : 'text-slate-500'}`}>
             <Users className="w-4 h-4" />
             <span>{lawyersCount} {d.lawyers}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={(e) => { e.stopPropagation(); onDetails && onDetails(firm); }}
            className={`py-2 rounded-xl border text-xs font-semibold transition-colors 
              ${dm ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-300 text-slate-600 hover:bg-slate-100'}`}
          >
            {d.details}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onBook && onBook(firm); }}
            className="py-2 mb-0 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-md shadow-blue-600/20"
          >
            {d.bookNow} <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
