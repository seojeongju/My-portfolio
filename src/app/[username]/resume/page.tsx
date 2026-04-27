"use client";

import { User, Briefcase, GraduationCap, Award, Mail, Globe, Github, Linkedin, Download, MapPin, ExternalLink, Code } from 'lucide-react';
import { motion } from 'framer-motion';

export const runtime = 'edge';

// 데모용 데이터 (추후 DB 연결)
const mockUser = {
  displayName: "홍길동",
  username: "gildong",
  title: "Senior Full-stack & Hardware Engineer",
  bio: "하드웨어의 정밀함과 소프트웨어의 유연함을 동시에 추구하는 8년차 엔지니어입니다. IoT 생태계 구축과 고가용성 시스템 설계에 강점이 있습니다.",
  email: "contact@gildong.dev",
  github: "github.com/gildong",
  linkedin: "linkedin.com/in/gildong",
  website: "gildong.dev",
  location: "Seoul, South Korea",
};

const mockExperience = [
  { 
    company: "테크 이노베이션", 
    role: "Senior Hardware Engineer", 
    period: "2022.03 - 현재", 
    desc: "IoT 기반 스마트 홈 허브 및 센서 네트워크 통합 솔루션 설계",
    achievements: [
      "차세대 지그비(Zigbee) 게이트웨이 전력 효율 30% 개선",
      "임베디드 리눅스 부팅 속도 최적화 (15초 -> 4초)",
      "팀 내 하드웨어-소프트웨어 협업 가이드라인 수립"
    ]
  },
  { 
    company: "코드 팩토리", 
    role: "Full-stack Developer", 
    period: "2020.01 - 2022.02", 
    desc: "고성능 실시간 데이터 대시보드 및 API 서버 구축",
    achievements: [
      "React 기반 실시간 모니터링 UI 개발 (초당 1,000개 데이터 처리)",
      "Node.js 마이크로서비스 아키텍처 도입으로 서버 가용성 99.9% 달성",
      "AWS 인프라 자동화 도입으로 배포 시간 50% 단축"
    ]
  },
];

const mockEducation = [
  { school: "한국과학기술대학교", major: "컴퓨터공학 학사", period: "2014.03 - 2020.02" },
];

const mockSkillGroups = [
  {
    category: "Software",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"]
  },
  {
    category: "Hardware",
    skills: ["C/C++", "RTOS", "PCB Design", "ARM Cortex", "Firmware", "FPGA"]
  }
];

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 상단 프로필 헤더 (세련된 레이아웃) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative pt-12 pb-16"
        >
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-end">
            <div className="relative">
              <div className="w-40 h-40 rounded-[2.5rem] bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center text-5xl font-black text-black shadow-2xl shadow-mint/20 rotate-3">
                {mockUser.displayName[0]}
              </div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg border border-slate-100">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-mint/10 text-mint text-xs font-bold uppercase tracking-wider mb-4">
                Available for projects
              </div>
              <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-2">
                {mockUser.displayName}
              </h1>
              <p className="text-xl font-medium text-slate-500 mb-6">{mockUser.title}</p>
              
              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <a href={`mailto:${mockUser.email}`} className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-mint transition-colors">
                  <Mail size={18} /> {mockUser.email}
                </a>
                <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  <MapPin size={18} /> {mockUser.location}
                </span>
                <div className="flex gap-4">
                  <a href="#" className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-mint transition-all">
                    <Github size={18} className="text-slate-600" />
                  </a>
                  <a href="#" className="p-2 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-mint transition-all">
                    <Linkedin size={18} className="text-slate-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 사이드바 (왼쪽 4칸) */}
          <aside className="lg:col-span-4 space-y-10">
            
            {/* About Me */}
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-mint" /> Summary
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {mockUser.bio}
              </p>
            </section>

            {/* 기술 스택 (배지 시스템) */}
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Code size={20} className="text-mint" /> Expertises
              </h3>
              <div className="space-y-6">
                {mockSkillGroups.map((group, i) => (
                  <div key={i}>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, j) => (
                        <span key={j} className="px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-bold rounded-lg border border-slate-100 hover:border-mint transition-colors cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 교육 */}
            <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <GraduationCap size={20} className="text-mint" /> Education
              </h3>
              <div className="space-y-6">
                {mockEducation.map((edu, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-slate-900">{edu.school}</h4>
                    <p className="text-sm text-slate-500">{edu.major}</p>
                    <p className="text-xs font-bold text-mint mt-1">{edu.period}</p>
                  </div>
                ))}
              </div>
            </section>
          </aside>

          {/* 메인 컨텐츠 (오른쪽 8칸) */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* 경력 사항 (타임라인 레이아웃) */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <Briefcase size={28} className="text-mint" /> Work Experience
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-mint hover:text-black transition-all">
                  <Download size={16} /> CV 다운로드
                </button>
              </div>

              <div className="space-y-12">
                {mockExperience.map((exp, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l-2 border-slate-100"
                  >
                    {/* 타임라인 노드 */}
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-mint" />
                    
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-mint/5 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-black text-slate-900">{exp.company}</h4>
                          <p className="text-mint font-bold">{exp.role}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-400 mt-2 md:mt-0">{exp.period}</span>
                      </div>
                      
                      <p className="text-slate-600 mb-6 text-sm font-medium">
                        {exp.desc}
                      </p>

                      <ul className="space-y-3">
                        {exp.achievements.map((ach, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-slate-500">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-mint flex-shrink-0" />
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 수상 및 기타 활동 */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-[2.5rem] text-white">
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Award size={24} className="text-mint" /> Honors & Awards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <Award className="text-mint" />
                  </div>
                  <div>
                    <h4 className="font-bold">임베디드 경진대회 금상</h4>
                    <p className="text-sm text-white/60">전국 대학생 임베디드 제어 부문</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                    <ExternalLink className="text-mint" />
                  </div>
                  <div>
                    <h4 className="font-bold">정보처리기사</h4>
                    <p className="text-sm text-white/60">한국산업인력공단</p>
                  </div>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}
