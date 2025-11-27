import React, { useState } from 'react';
import { SMART_WORK_CARDS, AI_TOOLS, downloadAsFile } from '../constants';
import { Sparkles, Bot, ArrowRight, Copy, Check, Save } from 'lucide-react';
import { generateSmartWorkContent } from '../services/geminiService';

const SmartWorkSection: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState(AI_TOOLS[0].id);
  const [inputText, setInputText] = useState('');
  const [resultText, setResultText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeTool = AI_TOOLS.find(t => t.id === activeToolId) || AI_TOOLS[0];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsGenerating(true);
    setResultText('');
    
    // Construct prompt
    const response = await generateSmartWorkContent(inputText, activeTool.systemPrompt);
    
    setResultText(response);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadResult = () => {
    if (!resultText) return;
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `SmartWork_${activeTool.label}_${timestamp}.txt`;
    downloadAsFile(filename, resultText);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-24 pt-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">스마트 워크 솔루션</h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          연구원뿐만 아니라 경영지원, 영업, 마케팅, 생산 등<br className="hidden md:block"/>
          모든 부서의 동료들이 반복 업무를 줄이고 더 중요한 일에 집중할 수 있도록 돕습니다.
        </p>
      </div>

      {/* Top Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {SMART_WORK_CARDS.map((card) => (
          <div key={card.id} className="glass-card p-6 rounded-2xl hover:bg-white/70 transition-colors">
            <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4`}>
              {card.icon}
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-4">{card.title}</h3>
            <ul className="space-y-2">
              {card.items.map((item, idx) => (
                <li key={idx} className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Interactive Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch min-h-[500px]">
        
        {/* Left: Input Panel */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-[#005e54] p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Bot size={24} />
              <h3 className="text-xl font-bold">AI 업무 비서</h3>
            </div>
            <p className="text-teal-100 text-sm opacity-90">
              해결하고 싶은 업무를 선택하고 내용을 입력해보세요. (사용 시 경험치 +5)
            </p>
          </div>
          
          <div className="p-6 flex-1 flex flex-col">
            {/* Tool Selection Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {AI_TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => { setActiveToolId(tool.id); setInputText(''); setResultText(''); }}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeToolId === tool.id
                      ? 'bg-teal-100 text-teal-800 border border-teal-200'
                      : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'
                  }`}
                >
                  {tool.icon}
                  {tool.label}
                </button>
              ))}
            </div>

            <label className="block text-sm font-bold text-gray-700 mb-2">
              누구에게 어떤 용건으로 보내시나요?
            </label>
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={activeTool.placeholder}
                className="w-full h-full min-h-[200px] p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 resize-none text-gray-700"
              />
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !inputText.trim()}
                className="flex items-center gap-2 bg-[#005e54] text-white px-6 py-3 rounded-xl font-bold hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="animate-spin" size={18} />
                    생성 중...
                  </>
                ) : (
                  <>
                    생성하기
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Output Panel */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
          <div className="bg-white border-b border-gray-100 p-5 flex justify-between items-center">
             <h3 className="font-bold text-gray-800 text-lg">생성 결과</h3>
             {resultText && (
               <div className="flex items-center gap-3">
                 <button 
                   onClick={handleDownloadResult}
                   className="flex items-center gap-1 text-xs text-gray-500 hover:text-teal-600 transition-colors"
                   title="텍스트 파일로 저장"
                 >
                   <Save size={14} />
                   TXT 저장
                 </button>
                 <button 
                   onClick={handleCopy}
                   className="flex items-center gap-1 text-xs text-gray-500 hover:text-teal-600 transition-colors"
                 >
                   {copied ? <Check size={14} /> : <Copy size={14} />}
                   {copied ? '복사됨' : '복사하기'}
                 </button>
               </div>
             )}
          </div>
          
          <div className="flex-1 p-6 bg-gray-50/50">
            {resultText ? (
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap animate-fade-in">
                {resultText}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-50">
                <Bot size={64} strokeWidth={1} className="mb-4 text-gray-300" />
                <p>내용을 입력하고 생성을 눌러주세요</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SmartWorkSection;