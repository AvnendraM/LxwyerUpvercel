import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Scale, Briefcase, MapPin, ArrowLeft, Phone, Mail,
  CheckCircle, Building, Users, Star, ArrowRight, ShieldCheck, Check, X
} from 'lucide-react';
import { dummyLawFirms } from '../data/lawFirmsData';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export default function FirmProfile({ firmId, onCloseModal }) {
  const navigate = useNavigate();
  const { id: routeId } = useParams();
  const id = firmId || routeId;
  const isModal = !!firmId;
  const [firm, setFirm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFirm = async () => {
      const dummy = dummyLawFirms.find(f => f.id === id || f.unique_id === id);
      if (dummy) {
        setFirm(dummy);
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${API}/firms`);
        const found = res.data.find(f => f.id === id || f.unique_id === id);
        if (found) {
          setFirm(found);
        }
      } catch(e) {
         console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchFirm();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0a]">
        <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  if (!firm) {
    return (
      <div className={isModal ? "p-8 flex flex-col items-center justify-center bg-white rounded-3xl" : "min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4"}>
        <Building className="w-12 h-12 text-slate-300" />
        <p className="text-xl font-bold text-slate-700 mt-4">Firm not found</p>
        {!isModal && (
          <button onClick={() => navigate('/find-law-firm/manual')}
            className="px-5 py-2.5 mt-4 bg-blue-600 text-white rounded-xl font-semibold text-sm">
            Browse Firms
          </button>
        )}
      </div>
    );
  }

  const innerContent = (
    <div className="relative w-full max-w-4xl bg-white dark:bg-[#121212] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar border border-slate-200 dark:border-slate-800">
      <div className="relative h-64">
        <img
          src={firm.image || firm.logo || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200'}
          alt={firm.name || firm.firm_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <button
          onClick={() => isModal ? onCloseModal() : navigate(-1)}
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-8 right-8 text-white">
          <h2 className="text-3xl font-bold mb-2">{firm.name || firm.firm_name}</h2>
          <div className="flex items-center gap-4 text-slate-200">
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {firm.city || firm.location}{firm.state ? `, ${firm.state}` : ''}</span>
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {firm.lawyersCount || firm.total_lawyers || firm.team_size || '10+'} Lawyers</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 p-5 sm:p-8">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">About the Firm</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{firm.description || firm.bio}</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Practice Areas</h3>
            <div className="flex flex-wrap gap-2">
              {(firm.practiceAreas || firm.practice_areas || firm.specializations || ['Corporate', 'Litigation']).map((area, idx) => (
                <div key={idx} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-100 dark:border-blue-800">
                  {area}
                </div>
              ))}
            </div>
          </div>
          
          {/* Managing Partners */}
          {firm.managing_partners && firm.managing_partners.length > 0 && (
            <div className="pt-6 border-t border-slate-100 dark:border-[#2a2a2a]">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Managing Partners</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {firm.managing_partners.map((partner, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 dark:bg-[#1a1a1a] p-3 rounded-xl border border-slate-100 dark:border-[#2a2a2a]">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {partner.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{partner.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">ID: {partner.bar_council_id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-[#2a2a2a]">
            {firm.languages_spoken && (
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Languages</h4>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{firm.languages_spoken.join(', ')}</p>
              </div>
            )}
            {firm.billing_models && (
              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Billing</h4>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{firm.billing_models.join(' • ')}</p>
              </div>
            )}
            {firm.branch_offices && (
              <div className="col-span-2">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Branch Offices</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {firm.branch_offices.map((office, idx) => (
                    <span key={idx} className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-300">
                      {office}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6 h-fit">
          {firm.platform_metrics && (
            <div className="p-5 bg-slate-50 dark:bg-[#1a1a1a] rounded-2xl border border-slate-100 dark:border-[#2a2a2a]">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4 text-sm tracking-widest uppercase">Firm Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-white dark:bg-[#222] p-3 rounded-xl border border-slate-100 dark:border-[#333]">
                  <span className="text-xs font-semibold text-slate-500">Cases Handled</span>
                  <span className="font-black text-blue-600">{firm.platform_metrics.cases_resolved}+</span>
                </div>
                <div className="flex justify-between items-center bg-white dark:bg-[#222] p-3 rounded-xl border border-slate-100 dark:border-[#333]">
                  <span className="text-xs font-semibold text-slate-500">Client Score</span>
                  <span className="font-black text-yellow-500 flex items-center gap-1">{firm.platform_metrics.csat} <Star className="w-3 h-3 fill-current" /></span>
                </div>
                {firm.average_response_time_mins && (
                  <div className="flex justify-between items-center bg-white dark:bg-[#222] p-3 rounded-xl border border-slate-100 dark:border-[#333]">
                    <span className="text-xs font-semibold text-slate-500">Avg Response</span>
                    <span className="font-black text-emerald-500">&lt; {firm.average_response_time_mins}m</span>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Book Consultation</h3>
            <p className="text-sm text-indigo-700 dark:text-indigo-400 mb-4">Schedule a meeting with senior partners or specialized teams.</p>
            <button
              onClick={() => navigate(`/book-consultation-signup`, {
                state: {
                  lawyer: {
                    ...firm,
                    photo: firm.image,
                    consultation_fee: firm.consultation_fee || firm.feeMin || 5000,
                    fee: firm.feeRange || "₹5,000 - ₹15,000",
                    specialization: firm.practiceAreas?.[0] || "Corporate Law"
                  }
                }
              })}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm shadow-2xl" onClick={onCloseModal}>
        <div onClick={e => e.stopPropagation()} className="w-full max-w-4xl flex justify-center max-h-[90vh]">
          {innerContent}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] py-8 px-4 flex justify-center pb-24">
      {innerContent}
    </div>
  );
}
