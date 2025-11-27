import React from 'react';
import { ArrowRight } from 'lucide-react';
import { IMAGES, HERO_TEXTS } from '../constants';

interface ProfileHeroProps {
  onNavigate: (page: string) => void;
}

const ProfileHero: React.FC<ProfileHeroProps> = ({ onNavigate }) => {
  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${IMAGES.HERO_BG})` }}
      ></div>
      <div className="absolute inset-0 bg-slate-900/80 z-0"></div>
      
      {/* Decorative Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px] z-0 pointer-events-none"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Status Badge */}
        <div className="mb-8 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-900/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-teal-400 text-xs font-bold tracking-widest font-mono">
              {HERO_TEXTS.badge}
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in-up whitespace-pre-wrap">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-teal-500">
            {HERO_TEXTS.title}
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-3xl whitespace-pre-wrap animate-fade-in-up delay-100">
          {HERO_TEXTS.desc}
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 animate-fade-in-up delay-200">
          <button 
            onClick={() => onNavigate('lab')}
            className="group px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(20,184,166,0.5)] flex items-center gap-2"
          >
            START RESEARCH
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 bg-transparent border border-slate-600 hover:border-teal-500 text-slate-300 hover:text-white font-medium rounded-lg transition-all duration-300 hover:bg-slate-800/50"
          >
            CONNECT NODE
          </button>
        </div>
      </div>
      
      {/* Bottom Scroll Indicator (Optional) */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;