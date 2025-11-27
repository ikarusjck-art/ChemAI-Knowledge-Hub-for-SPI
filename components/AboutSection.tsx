import React, { useState } from 'react';
import { INSIGHT_STEPS, INSIGHT_TREND_DATA, INSIGHT_STARTUP_DATA, downloadAsFile, ADMIN_USER } from '../constants';
import { ArrowRight, Download, Upload } from 'lucide-react';
import AdminUploadModal from './AdminUploadModal';

const AboutSection: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleDownloadTrendReport = () => {
    const content = `GLOBAL CHEMICAL AI TRENDS REPORT 2024
    
Overview:
${INSIGHT_TREND_DATA.desc}

Key Topics:
${INSIGHT_TREND_DATA.items.map(item => `- ${item}`).join('\n')}

---
Prepared by IKARUS Strategy Team
Confidential - Internal Use Only`;

    downloadAsFile('Global_Chemical_AI_Trends_2024.txt', content);
  };

  const handleDownloadStartupInfo = (sectionTitle: string) => {
    const content = `OPEN INNOVATION: ${sectionTitle}

Description:
${INSIGHT_STARTUP_DATA.desc}

Section Focus:
${sectionTitle}

---
ChemAI Knowledge Hub`;
    downloadAsFile(`Startup_Briefing_${sectionTitle}.txt`, content);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-24 pt-8">
      {/* Header */}
      <div className="text-center mb-16 relative">
        <h2 className="text-3xl font-bold text-white mb-3">인사이트 & 트렌드</h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          화학 산업의 최신 AI 기술 동향과 우리 연구소가 나아가야 할 방향에 대해<br className="hidden md:block"/>
          수집한 정보들을 공유하는 공간입니다.
        </p>

        {ADMIN_USER.isAdmin && (
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="absolute right-0 top-0 hidden md:flex items-center gap-2 px-4 py-2 bg-teal-900/50 text-teal-200 border border-teal-500/30 rounded-lg text-sm font-bold hover:bg-teal-900 transition-colors"
          >
            <Upload size={16} />
            Upload Report
          </button>
        )}
      </div>

      {/* Process Section */}
      <div className="mb-16">
        <h3 className="text-xl font-bold text-white mb-8 text-center">신사업 발굴 아이데이션 프로세스</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSIGHT_STEPS.map((step) => (
            <div key={step.id} className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h4>
              <p className="text-sm text-gray-500 leading-snug">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Card: Global Trends */}
        <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 shadow-lg border border-teal-100 flex flex-col">
          <h3 className="text-2xl font-bold text-[#005e54] mb-4">{INSIGHT_TREND_DATA.title}</h3>
          <p className="text-gray-600 mb-8 leading-relaxed flex-1">
            {INSIGHT_TREND_DATA.desc}
          </p>
          
          <ul className="space-y-3 mb-8">
            {INSIGHT_TREND_DATA.items.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                {item}
              </li>
            ))}
          </ul>

          <button 
            onClick={handleDownloadTrendReport}
            className="w-full py-3 bg-white border border-teal-200 text-teal-700 font-bold rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Download size={18} />
            트렌드 리포트 다운로드
          </button>
        </div>

        {/* Right Card: Innovation & Startups */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{INSIGHT_STARTUP_DATA.title}</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {INSIGHT_STARTUP_DATA.desc}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-auto">
            {INSIGHT_STARTUP_DATA.sections.map((section, idx) => (
              <div 
                key={idx} 
                onClick={() => handleDownloadStartupInfo(section.title)}
                className="bg-gray-50 rounded-xl p-5 text-center hover:bg-teal-50 transition-colors border border-gray-100 cursor-pointer group"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-teal-700">{section.title}</h4>
                <p className="text-xs text-gray-500 group-hover:text-teal-600 mb-2">{section.desc}</p>
                <div className="flex justify-center text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <AdminUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        title="트렌드 리포트 등록" 
        category="Trend Report" 
      />
    </div>
  );
};

export default AboutSection;