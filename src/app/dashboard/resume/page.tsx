"use client";

import { useState } from 'react';
import { Plus, Trash2, Edit2, Briefcase, GraduationCap, Award, Save } from 'lucide-react';

export default function ResumeManagementPage() {
  const [sections, setSections] = useState([
    { id: 1, type: 'EXPERIENCE', title: '테크 이노베이션', subtitle: '시니어 하드웨어 엔지니어', date: '2022.03 - 현재' },
    { id: 2, type: 'EDUCATION', title: '한국과학기술대학교', subtitle: '컴퓨터공학 학사', date: '2014.03 - 2020.02' },
  ]);

  return (
    <div className="space-y-10">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">이력서 관리</h1>
          <p className="text-foreground/60 text-sm">자신의 커리어와 학력을 세련된 사이버틱 레이아웃으로 관리하세요.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-mint text-black font-bold rounded-xl hover:bg-mint/80 transition-all shadow-[0_0_15px_rgba(0,255,204,0.3)]">
          <Save size={20} /> 변경사항 저장
        </button>
      </header>

      {/* 섹션 추가 버튼 그룹 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { name: '경력 추가', type: 'EXPERIENCE', icon: <Briefcase size={18} /> },
          { name: '학력 추가', type: 'EDUCATION', icon: <GraduationCap size={18} /> },
          { name: '기술 추가', type: 'SKILL', icon: <Award size={18} /> },
          { name: '수상 추가', type: 'AWARD', icon: <Plus size={18} /> },
        ].map((btn) => (
          <button key={btn.type} className="flex items-center justify-center gap-2 p-4 glass rounded-2xl border border-mint/10 hover:border-mint/50 hover:bg-mint/5 transition-all text-sm font-bold">
            {btn.icon}
            {btn.name}
          </button>
        ))}
      </div>

      {/* 관리 리스트 */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="glass p-6 rounded-2xl border border-white/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-mint/30 transition-all">
            <div className="flex gap-4 items-center">
              <div className="p-3 bg-mint/5 rounded-xl text-mint">
                {section.type === 'EXPERIENCE' ? <Briefcase size={24} /> : <GraduationCap size={24} />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-mint/10 text-mint rounded uppercase">{section.type}</span>
                  <span className="text-xs text-foreground/40 font-bold">{section.date}</span>
                </div>
                <h3 className="text-lg font-bold">{section.title}</h3>
                <p className="text-sm text-foreground/60">{section.subtitle}</p>
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none p-3 glass rounded-xl hover:bg-mint/10 transition-colors text-foreground/60 hover:text-mint">
                <Edit2 size={18} />
              </button>
              <button className="flex-1 md:flex-none p-3 glass rounded-xl hover:bg-red-500/10 transition-colors text-foreground/60 hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 도움말 가이드 */}
      <div className="p-6 rounded-2xl bg-mint/5 border border-mint/20 border-dashed text-center">
        <p className="text-sm text-foreground/50">
          Tip: 이력서 섹션의 순서는 드래그 앤 드롭으로 변경할 수 있도록 곧 업데이트될 예정입니다.
        </p>
      </div>
    </div>
  );
}
