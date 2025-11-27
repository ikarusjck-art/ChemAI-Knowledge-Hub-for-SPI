import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, CheckCircle2, Bot, Sparkles, Send, Loader2, Download, Upload } from 'lucide-react';
import { LAB_TOPICS, downloadAsFile, ADMIN_USER } from '../constants';
import { ChatMessage, ChatRole } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import AdminUploadModal from './AdminUploadModal';

const LabSection: React.FC = () => {
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "안녕하세요! 화학 R&D AI 어시스턴트입니다. 연구 프롬프트 작성이나 소재 데이터 분석에 대해 궁금한 점을 물어보세요.", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    
    // Add User Message
    setMessages(prev => [...prev, { role: ChatRole.USER, text: userMsg, timestamp: new Date() }]);
    setIsLoading(true);

    // Call Gemini
    const response = await sendMessageToGemini(userMsg);

    // Add AI Response
    setMessages(prev => [...prev, { role: ChatRole.MODEL, text: response, timestamp: new Date() }]);
    setIsLoading(false);
  };

  const handleDownloadTopic = (topic: any) => {
    const content = `AI LAB MATERIAL
Topic: ${topic.title}
Level: ${topic.badge}

Description:
${topic.desc}

---
ChemAI Knowledge Hub
Educational Resource`;
    downloadAsFile(`Lab_Topic_${topic.id}.txt`, content);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-24 pt-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">AI 연구실</h2>
        <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
          삼화페인트 후배님들과 동료 연구원들을 위해 준비했습니다.<br className="hidden md:block"/>
          어렵게만 느껴지는 생성형 AI, 페인트/화학 연구와 업무에 어떻게 활용할 수 있는지 함께 공부하면서 같이 성장해 봅시다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Topics */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary" size={24} />
              <h3 className="text-xl font-bold text-gray-800">주요 공유 주제</h3>
            </div>
            {ADMIN_USER.isAdmin && (
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                <Upload size={14} />
                Upload Material
              </button>
            )}
          </div>

          <div className="space-y-4">
            {LAB_TOPICS.map((topic) => (
              <div key={topic.id} className="glass-card p-6 rounded-2xl hover:bg-white/70 transition-colors group relative">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="text-primary group-hover:scale-110 transition-transform" size={24} />
                  </div>
                  <div className="flex-1 pr-8">
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{topic.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{topic.desc}</p>
                    <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full">
                      {topic.badge}
                    </span>
                  </div>
                </div>
                
                {/* Download Button */}
                <button 
                  onClick={() => handleDownloadTopic(topic)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-teal-600 transition-colors p-1"
                  title="강의 자료 다운로드"
                >
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: AI Assistant */}
        <div className="relative">
           <div className="mb-4">
              <span className="bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block">LAB ASSISTANT</span>
              <h3 className="text-xl font-bold text-gray-800">AI 연구 도우미 (Beta)</h3>
              <p className="text-sm text-gray-500">구글 Gemini API를 연동해두었습니다. 궁금한 내용을 물어보세요. (아직 테스트 중입니다!)</p>
           </div>

           {/* Chat Card */}
           <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col h-[500px]">
              {/* Chat Header */}
              <div className="bg-teal-700 p-4 flex items-center gap-3">
                 <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Sparkles className="text-yellow-300" size={20} />
                 </div>
                 <div>
                    <h4 className="text-white font-bold">ChemAI Research Assistant</h4>
                    <div className="flex items-center gap-1.5">
                       <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                       <span className="text-teal-100 text-xs">Online</span>
                    </div>
                 </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start max-w-[85%] gap-2 ${msg.role === ChatRole.USER ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === ChatRole.USER ? 'bg-gray-200' : 'bg-teal-100'}`}>
                        {msg.role === ChatRole.USER ? <div className="text-xs font-bold text-gray-500">ME</div> : <Bot size={18} className="text-teal-700"/>}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.role === ChatRole.USER 
                          ? 'bg-white text-gray-800 rounded-tr-none border border-gray-100' 
                          : 'bg-teal-600 text-white rounded-tl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                   <div className="flex justify-start">
                      <div className="flex items-center gap-2 ml-10 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
                        <Loader2 size={16} className="animate-spin text-teal-600" />
                        <span className="text-xs text-gray-400">Assistant is analyzing...</span>
                      </div>
                   </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-white border-t border-gray-100">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="연구 주제나 프롬프트를 입력하세요..."
                    className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50 text-sm"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
           </div>
        </div>
      </div>
      
      <AdminUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
        title="교육 자료 등록" 
        category="Lab Material" 
      />
    </div>
  );
};

export default LabSection;