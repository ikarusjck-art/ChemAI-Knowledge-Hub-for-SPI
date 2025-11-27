import React, { useState, useEffect } from 'react';
import { FlaskConical, Bell, Megaphone, LogIn, MessageCircle } from 'lucide-react';
import Navigation from './components/Navigation';
import ProfileHero from './components/ProfileHero';
import AboutSection from './components/AboutSection';
import TimelineSection from './components/TimelineSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import LabSection from './components/LabSection';
import SmartWorkSection from './components/SmartWorkSection';
import { HERO_TEXTS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = (tabId: string) => {
    if (tabId === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsTransitioning(false);
    }, 200);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <ProfileHero onNavigate={handleNavigate} />;
      case 'about': return <AboutSection />;
      case 'journey': return <TimelineSection />;
      case 'lab': return <LabSection />;
      case 'solution': return <SmartWorkSection />;
      case 'life': return <GallerySection />;
      case 'contact': return <ContactSection />;
      default: return <ProfileHero onNavigate={handleNavigate} />;
    }
  };

  const navLinks = [
    { id: 'home', label: '홈' },
    { id: 'life', label: '연구 활용 사례' }, // Mapping 'Life' to Use Cases
    { id: 'lab', label: 'AI 연구실' },
    { id: 'solution', label: '스마트 워크' },
    { id: 'journey', label: '커뮤니티' }, // Mapping 'Journey' to Community for now
    { id: 'about', label: '인사이트' },   // Mapping 'About' to Insights
    { id: 'contact', label: '문의/제안' },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans">
      
      {/* Top Header & Notification Area */}
      <div className="fixed top-0 left-0 w-full z-50 flex flex-col">
        
        {/* Main Header */}
        <header className="w-full bg-[#004d40] text-white px-6 h-16 flex items-center justify-between shadow-md">
          {/* Logo Area */}
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => handleNavigate('home')}
          >
            <FlaskConical className="text-teal-400" size={24} strokeWidth={2.5} />
            <span className="font-bold text-lg tracking-tight">ChemAI <span className="font-light text-teal-100">Knowledge Hub</span></span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`text-sm font-medium transition-colors hover:text-teal-300 ${
                  activeTab === link.id ? 'text-teal-400' : 'text-gray-200'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Login Button */}
          <button className="flex items-center gap-2 px-4 py-1.5 rounded border border-teal-600 bg-teal-800/50 hover:bg-teal-700 transition-colors text-xs font-medium">
            <LogIn size={14} />
            로그인
          </button>
        </header>

        {/* Notification Bar */}
        <div className="w-full bg-[#00695c] text-teal-50 px-6 py-2 flex items-center gap-3 text-xs md:text-sm shadow-inner">
          <Megaphone size={16} className="text-teal-300 animate-pulse" />
          <span className="font-medium truncate">{HERO_TEXTS.notification}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className={`transition-opacity duration-300 ease-in-out ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} pt-24`}>
        {renderContent()}
      </main>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => handleNavigate('contact')}
          className="w-14 h-14 bg-teal-500 hover:bg-teal-400 text-white rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 hover:rotate-3"
        >
          <MessageCircle size={28} />
        </button>
      </div>

      {/* Mobile Bottom Navigation (Hidden on Desktop) */}
      <div className="md:hidden">
        <Navigation activeTab={activeTab} setActiveTab={handleNavigate} />
      </div>
      
      {/* Footer */}
      <footer className="w-full text-center py-6 text-gray-400 text-xs mb-20 md:mb-0 bg-slate-50 border-t border-slate-200">
        © 2024 Samhwa Paint IKARUS Team. All rights reserved.
      </footer>
    </div>
  );
};

export default App;