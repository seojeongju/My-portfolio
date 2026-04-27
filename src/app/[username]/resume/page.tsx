import { User, Briefcase, GraduationCap, Award, Mail, Globe } from 'lucide-react';

// 데모용 데이터
const mockUser = {
  displayName: "홍길동",
  username: "gildong",
  bio: "하드웨어와 소프트웨어의 경계를 허무는 풀스택 엔지니어입니다.",
  email: "contact@gildong.dev",
  github: "github.com/gildong",
  website: "gildong.dev",
};

const mockExperience = [
  { title: "테크 이노베이션", subtitle: "시니어 하드웨어 엔지니어", date: "2022.03 - 현재", desc: "IoT 기반 스마트 홈 허브 설계 및 임베디드 리눅스 커널 최적화." },
  { title: "코드 팩토리", subtitle: "소프트웨어 개발자", date: "2020.01 - 2022.02", desc: "고가용성 마이크로서비스 아키텍처 설계 및 React 기반 대시보드 개발." },
];

const mockEducation = [
  { title: "한국과학기술대학교", subtitle: "컴퓨터공학 학사", date: "2014.03 - 2020.02", desc: "임베디드 시스템 및 로보틱스 전공" },
];

const mockSkills = [
  { name: "C/C++", level: "Expert" },
  { name: "React / Next.js", level: "Expert" },
  { name: "TypeScript", level: "Advanced" },
  { name: "PCB Design", level: "Advanced" },
  { name: "Python", level: "Intermediate" },
];

export default function ResumePage({ params }: { params: Promise<{ username: string }> }) {
  // Next.js 15 대응: params는 비동기로 처리해야 합니다.
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      {/* 헤더 섹션 */}
      <header className="glass p-10 rounded-3xl mb-12 border border-white/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-mint/10 rounded-full blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-mint to-mint-dark flex items-center justify-center text-4xl font-bold text-black cyber-border animate-glow">
            {mockUser.displayName[0]}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-4">{mockUser.displayName}</h1>
            <p className="text-lg text-foreground/60 mb-6">{mockUser.bio}</p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <span className="flex items-center gap-2 text-sm text-foreground/70 glass px-3 py-1.5 rounded-full">
                <Mail size={16} className="text-mint" /> {mockUser.email}
              </span>
              <span className="flex items-center gap-2 text-sm text-foreground/70 glass px-3 py-1.5 rounded-full">
                <Globe size={16} className="text-mint" /> {mockUser.github}
              </span>
              <span className="flex items-center gap-2 text-sm text-foreground/70 glass px-3 py-1.5 rounded-full">
                <Globe size={16} className="text-mint" /> {mockUser.website}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 이력서 본문 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* 왼쪽 섹션 (Experience, Education) */}
        <div className="md:col-span-2 space-y-12">
          {/* 경력 */}
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Briefcase className="text-mint" /> 경력 사항
            </h2>
            <div className="space-y-8 border-l-2 border-mint/20 ml-3 pl-8">
              {mockExperience.map((exp, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-mint cyber-border" />
                  <div className="mb-1 text-sm font-bold text-mint">{exp.date}</div>
                  <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                  <div className="text-foreground/70 font-medium mb-3">{exp.subtitle}</div>
                  <p className="text-foreground/60 leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 학력 */}
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-mint" /> 학력 사항
            </h2>
            <div className="space-y-8 border-l-2 border-mint/20 ml-3 pl-8">
              {mockEducation.map((edu, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-mint cyber-border" />
                  <div className="mb-1 text-sm font-bold text-mint">{edu.date}</div>
                  <h3 className="text-xl font-bold mb-2">{edu.title}</h3>
                  <div className="text-foreground/70 font-medium mb-2">{edu.subtitle}</div>
                  <p className="text-foreground/60">{edu.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 오른쪽 섹션 (Skills, Awards) */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <User className="text-mint" /> 기술 스택
            </h2>
            <div className="space-y-4">
              {mockSkills.map((skill, i) => (
                <div key={i} className="glass p-4 rounded-xl border border-white/20">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-sm">{skill.name}</span>
                    <span className="text-xs text-mint font-bold">{skill.level}</span>
                  </div>
                  <div className="w-full h-1 bg-foreground/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-mint shadow-[0_0_10px_rgba(0,255,204,0.5)]" 
                      style={{ width: skill.level === 'Expert' ? '100%' : skill.level === 'Advanced' ? '80%' : '60%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass p-6 rounded-2xl border border-mint/30 bg-mint/5">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award size={20} className="text-mint" /> 자격 및 수상
            </h3>
            <ul className="text-sm space-y-3 text-foreground/70">
              <li>• 정보처리기사 (2019)</li>
              <li>• 전국 대학생 임베디드 경진대회 금상 (2018)</li>
              <li>• 오픈소스 컨트리뷰션 아카데미 수료 (2021)</li>
            </ul>
          </section>
        </div>
      </div>
      
      {/* PDF 인쇄 버튼 (플로팅) */}
      <button className="fixed bottom-8 right-8 p-4 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-mint/50">
        <Globe size={24} className="text-mint" />
      </button>
    </div>
  );
}
