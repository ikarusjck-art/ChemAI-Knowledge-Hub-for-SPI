import React, { useState } from 'react';
import { USE_CASES, downloadAsFile, ADMIN_USER } from '../constants';
import { Microscope, ArrowRight, Download, Upload } from 'lucide-react';
import AdminUploadModal from './AdminUploadModal';

const GallerySection: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleDownloadNote = (item: any) => {
    const content = `STUDY NOTE: ${item.title}
Category: ${item.category}
Date: ${new Date().toLocaleDateString()}

Description:
${item.desc}

Data Summary:
${item.chartData.map((d: any) => `- ${d.label}: ${d.value}`).join('\n')}

---
ChemAI Knowledge Hub
Research Use Case Document`;
    
    downloadAsFile(`${item.noteId}_${item.title.replace(/\s+/g, '_')}.txt`, content);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-24 pt-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Research Use Cases</h2>
          <p className="text-gray-600">실제 연구 현장에서의 생성형 AI 활용 사례를 공유합니다.</p>
        </div>
        
        {ADMIN_USER.isAdmin && (
          <button 
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors shadow-md"
          >
            <Upload size={16} />
            Upload Case
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Case Studies */}
        <div className="lg:col-span-2 space-y-8">
          {USE_CASES.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:border-teal-200 transition-all">
              {/* Header Badges */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full uppercase tracking-wide">
                    {item.noteId}
                  </span>
                  <span className="text-gray-500 text-sm font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {item.desc}
              </p>

              {/* Chart Visualization */}
              <div className="space-y-4 mb-8">
                {item.chartData.map((data, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="w-24 text-right text-sm font-bold text-gray-500 truncate">
                      {data.label}
                    </span>
                    <div className="flex-1 h-8 bg-gray-100 rounded-r-lg overflow-hidden relative group">
                      <div 
                        className={`h-full ${data.color} rounded-r-lg transition-all duration-1000 ease-out`}
                        style={{ width: `${data.value}%` }}
                      >
                         <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                           {data.value}
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="pt-6 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={() => handleDownloadNote(item)}
                  className="flex items-center gap-2 text-sm font-bold text-teal-600 hover:text-teal-500 transition-colors"
                >
                  <Download size={16} />
                  PDF 다운로드
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sidebar */}
        <div className="lg:col-span-1 sticky top-24">
          <div className="bg-[#005e54] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
             {/* Decorative Icon */}
             <div className="absolute top-4 right-4 opacity-10">
               <Microscope size={120} />
             </div>

             <div className="relative z-10 flex flex-col items-center text-center">
               <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
                 <Microscope size={32} className="text-teal-200" />
               </div>
               
               <h3 className="text-xl font-bold mb-3">함께 연구해요</h3>
               <p className="text-teal-100 text-sm leading-relaxed mb-6">
                 혼자서는 데이터 확보가 어렵습니다.<br/>
                 관심 있는 주제가 있다면 함께 스터디 그룹을 만들어 연구해보면 좋겠습니다.
               </p>

               <button className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg">
                 스터디 제안하기
                 <ArrowRight size={16} />
               </button>
             </div>
          </div>

          {/* Additional Info Card */}
          <div className="mt-6 bg-white rounded-2xl p-6 shadow-md border border-gray-100">
             <h4 className="font-bold text-gray-800 mb-2 text-sm">참여 방법</h4>
             <ul className="text-sm text-gray-600 space-y-2">
               <li className="flex items-start gap-2">
                 <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5"></span>
                 관심 있는 분야의 데이터를 준비해주세요.
               </li>
               <li className="flex items-start gap-2">
                 <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5"></span>
                 매주 수요일 점심시간에 미팅이 있습니다.
               </li>
             </ul>
          </div>
        </div>
      </div>
      
      <AdminUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        title="연구 사례 등록" 
        category="Research Case" 
      />
    </div>
  );
};

export default GallerySection;