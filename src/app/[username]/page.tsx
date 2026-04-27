"use client";

export const runtime = 'edge';

import { useState } from 'react';
import { Cpu, Code, Palette, ExternalLink, Calendar } from 'lucide-react';

const mockUser = {
  displayName: "홍길동",
  username: "gildong",
};

const mockPortfolios = [
  { id: 1, title: "스마트 홈 자동화 허브", category: "하드웨어", categoryId: 1, thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800", desc: "ESP32와 Zigbee를 이용한 저전력 스마트 홈 제어 장치입니다." },
  { id: 2, title: "AI 기반 코드 리뷰어", category: "소프트웨어", categoryId: 2, thumb: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800", desc: "OpenAI API를 활용한 GitHub PR 자동 리뷰 도구입니다." },
  { id: 3, title: "사이버 펑크 UI 키트", category: "디자인", categoryId: 3, thumb: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800", desc: "Figma로 제작된 미래지향적인 웹 인터페이스 컴포넌트 세트입니다." },
  { id: 4, title: "실시간 대기질 측정기", category: "하드웨어", categoryId: 1, thumb: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800", desc: "미세먼지 센서와 LCD를 결합한 휴대용 측정기입니다." },
];

const categories = [
  { id: 0, name: "전체", icon: null },
  { id: 1, name: "하드웨어", icon: <Cpu size={18} /> },
  { id: 2, name: "소프트웨어", icon: <Code size={18} /> },
  { id: 3, name: "디자인", icon: <Palette size={18} /> },
];

export default function UserPortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  // Next.js 15에서는 params를 await 해야 합니다. (현재는 mock 데이터 사용 중이라 선언만 해둡니다)
  const [selectedCategory, setSelectedCategory] = useState(0);

  const filteredPortfolios = selectedCategory === 0 
    ? mockPortfolios 
    : mockPortfolios.filter(p => p.categoryId === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* 사용자 타이틀 */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
          {mockUser.displayName}님의 <span className="text-mint">포트폴리오</span>
        </h1>
        <p className="text-foreground/60 text-lg">
          상상력을 현실로 구현한 작업물들을 소개합니다.
        </p>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${
              selectedCategory === cat.id 
                ? 'bg-mint text-black cyber-border scale-105 shadow-[0_0_15px_rgba(0,255,204,0.4)]' 
                : 'glass hover:bg-mint/10 text-foreground/70'
            }`}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>

      {/* 포트폴리오 그리드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPortfolios.map((item) => (
          <div 
            key={item.id} 
            className="group glass rounded-2xl overflow-hidden border border-white/20 hover:border-mint/50 transition-all hover:-translate-y-2"
          >
            {/* 이미지 컨테이너 */}
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={item.thumb} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/70 text-mint text-xs font-bold rounded-lg backdrop-blur-md border border-mint/30">
                  {item.category}
                </span>
              </div>
            </div>

            {/* 정보 컨테이너 */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-foreground/40 mb-3">
                <Calendar size={14} /> 2024.04.27
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-mint transition-colors">
                {item.title}
              </h3>
              <p className="text-foreground/60 text-sm leading-relaxed mb-6 line-clamp-2">
                {item.desc}
              </p>
              <div className="flex justify-between items-center">
                <button className="text-sm font-bold flex items-center gap-2 text-mint hover:underline">
                  자세히 보기 <ExternalLink size={16} />
                </button>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-mint/10 flex items-center justify-center text-[10px] font-bold">HW</div>
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-mint/10 flex items-center justify-center text-[10px] font-bold">SW</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPortfolios.length === 0 && (
        <div className="text-center py-40 glass rounded-3xl border border-dashed border-mint/30">
          <p className="text-foreground/40">해당 카테고리에 등록된 작업물이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
