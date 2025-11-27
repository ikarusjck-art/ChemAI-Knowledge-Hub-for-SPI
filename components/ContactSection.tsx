import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { ChatMessage, ChatRole } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const ContactSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'chat'>('form');
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "안녕하세요! IKARUS AI 어시스턴트입니다. 무엇을 도와드릴까요?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTab]);

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

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-24 pt-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Get in Touch</h2>
        <p className="text-gray-600">문의사항이 있거나 AI의 도움이 필요하신가요?</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="glass-panel p-1 rounded-full flex space-x-2">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'form' ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-white/50'
            }`}
          >
            <span className="flex items-center gap-2"><Mail size={16}/> Contact Us</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === 'chat' ? 'bg-secondary text-white shadow-md' : 'text-gray-600 hover:bg-white/50'
            }`}
          >
             <span className="flex items-center gap-2"><Bot size={16}/> Ask IKARUS AI</span>
          </button>
        </div>
      </div>

      <div className="glass-card rounded-3xl overflow-hidden min-h-[550px] flex flex-col relative shadow-xl">
        {activeTab === 'form' ? (
          <div className="flex flex-col md:flex-row h-full">
            {/* Left Column: Contact Info */}
            <div className="p-8 md:p-10 bg-gradient-to-br from-white/60 to-white/30 md:w-5/12 border-b md:border-b-0 md:border-r border-white/40 flex flex-col justify-center">
               <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Info</h3>
               <p className="text-sm text-gray-600 mb-8 leading-relaxed font-medium">
                 연구하시다가 막히는 부분이 있거나,<br/>
                 새로운 아이디어에 대해 가볍게 이야기 나누고 싶다면 언제든 연락주세요.
               </p>
               
               <div className="space-y-8">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                       <Mail size={20} />
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-700 text-sm mb-1">Email</h4>
                       <p className="text-sm text-gray-600">ikarusjck@gmail.com</p>
                       <p className="text-sm text-gray-600">ckjang@samhwa.com (사내)</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                       <Phone size={20} />
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-700 text-sm mb-1">Phone</h4>
                       <p className="text-sm text-gray-600 font-medium">010-5618-1345</p>
                       <p className="text-xs text-gray-500 mt-1 leading-snug">평일 09:00 - 18:00<br/>(회의 중에는 통화가 어렵습니다)</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                       <MapPin size={20} />
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-700 text-sm mb-1">Office</h4>
                       <p className="text-sm text-gray-600 break-keep leading-snug">경기도 안산시 단원구 별망로 178 (성곡동)</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Column: Form */}
            <div className="p-8 md:p-12 md:w-7/12 flex flex-col justify-center bg-white/20">
               <form className="space-y-5 w-full" onSubmit={(e) => e.preventDefault()}>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1.5">이름</label>
                   <input type="text" className="w-full px-4 py-3 rounded-xl border border-white/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white/60 shadow-sm transition-all text-gray-700 placeholder-gray-400" placeholder="홍길동 연구원" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1.5">이메일</label>
                   <input type="email" className="w-full px-4 py-3 rounded-xl border border-white/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white/60 shadow-sm transition-all text-gray-700 placeholder-gray-400" placeholder="example@samhwa.com" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold text-gray-700 mb-1.5">메시지</label>
                   <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-white/60 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white/60 resize-none shadow-sm transition-all text-gray-700 placeholder-gray-400" placeholder="문의 내용을 입력해주세요." />
                 </div>
                 <button className="w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all shadow-md mt-2">
                   보내기
                 </button>
               </form>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-[600px] md:h-[550px]">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/30">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start max-w-[80%] gap-2 ${msg.role === ChatRole.USER ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === ChatRole.USER ? 'bg-gray-200' : 'bg-gradient-to-tr from-primary to-secondary'}`}>
                      {msg.role === ChatRole.USER ? <UserIcon size={16} className="text-gray-600"/> : <Bot size={16} className="text-white"/>}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === ChatRole.USER 
                        ? 'bg-white text-gray-800 shadow-sm rounded-tr-none' 
                        : 'bg-primary text-white shadow-md rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="flex items-center gap-2 ml-10 bg-white/50 px-4 py-2 rounded-full">
                      <Loader2 size={16} className="animate-spin text-primary" />
                      <span className="text-xs text-gray-500">IKARUS is thinking...</span>
                    </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/60 border-t border-white/40">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="AI 도입이나 프롬프트에 대해 물어보세요..."
                  className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary bg-white shadow-inner"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center hover:bg-blue-400 disabled:opacity-50 disabled:hover:bg-secondary transition-colors shadow-lg"
                >
                  <Send size={20} className={isLoading ? 'opacity-0' : 'opacity-100'} />
                  {isLoading && <span className="absolute"><Loader2 size={20} className="animate-spin"/></span>}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactSection;