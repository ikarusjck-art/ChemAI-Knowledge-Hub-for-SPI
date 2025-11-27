import React, { useState } from 'react';
import { COMMUNITY_CATEGORIES, COMMUNITY_POSTS } from '../constants';
import { Heart, MessageSquare, Plus, Image as ImageIcon, FileText } from 'lucide-react';

const CommunitySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = activeCategory === 'all' 
    ? COMMUNITY_POSTS 
    : COMMUNITY_POSTS.filter(post => post.category === activeCategory);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 pb-24 pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">연구원 커뮤니티</h2>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
            생성형 AI를 활용한 나만의 작품이나 업무 노하우를 공유하고 자랑해보세요.<br className="hidden md:block"/>
            작은 시도들이 모여 큰 혁신이 됩니다.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg hover:shadow-teal-500/20 transform hover:-translate-y-0.5">
          <Plus size={18} />
          게시글 작성하기
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {COMMUNITY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
              activeCategory === cat.id
                ? 'bg-[#005e54] text-white border-[#005e54]'
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {activeCategory === cat.id ? (
               cat.id === 'creative' ? <ImageIcon size={14} className="inline mr-1.5 -mt-0.5" /> : 
               cat.id === 'efficiency' ? <FileText size={14} className="inline mr-1.5 -mt-0.5" /> : null
            ) : null}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:border-teal-300 transition-all group flex flex-col h-full">
            
            {/* Image (Conditional) */}
            {post.image && (
              <div className="h-48 overflow-hidden relative bg-gray-200">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            )}

            <div className="p-6 flex-1 flex flex-col">
              {/* Badge */}
              <div className="mb-3">
                 <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${post.badgeColor}`}>
                   {post.image ? <ImageIcon size={12} className="inline mr-1 -mt-0.5"/> : <FileText size={12} className="inline mr-1 -mt-0.5"/>}
                   {post.catLabel}
                 </span>
              </div>

              {/* Title & Excerpt */}
              <h3 className="font-bold text-lg text-gray-800 mb-2 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                {post.excerpt}
              </p>

              {/* Footer (Author & Stats) */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs">
                    {post.author[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-700">{post.author}</span>
                    <span className="text-[10px] text-gray-500">{post.team}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-400 text-xs">
                  <div className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                    <Heart size={14} />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-teal-600 transition-colors cursor-pointer">
                    <MessageSquare size={14} />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Empty State if needed */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
          <p className="text-gray-400">아직 등록된 게시글이 없습니다.</p>
          <button className="mt-4 text-teal-400 underline hover:text-teal-300">첫 번째 글을 작성해보세요!</button>
        </div>
      )}
    </div>
  );
};

export default CommunitySection;