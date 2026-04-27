export const runtime = 'edge';

import Link from 'next/link';
import { ArrowRight, Cpu, Code, Palette } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* 히어로 섹션 */}
      <section className="relative w-full max-w-5xl pt-20 pb-32 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-mint/5 rounded-full blur-3xl -z-10" />
        
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-widest text-mint uppercase border border-mint/30 rounded-full glass animate-glow">
          Next-Generation Developer Platform
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60 leading-tight">
          당신의 전문성을 <br />
          <span className="text-mint">디지털 공간</span>에 조각하세요
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-foreground/60 mb-12 leading-relaxed">
          하드웨어 설계부터 소프트웨어 개발, 디자인까지. <br />
          화이트 & 민트 사이버 테마의 세련된 포트폴리오와 이력서를 통해 <br />
          당신의 가치를 전 세계에 증명하세요.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/signup" className="flex items-center justify-center gap-2 px-8 py-4 bg-mint text-black font-bold rounded-xl hover:bg-mint/80 transition-all transform hover:scale-105 cyber-border">
            지금 시작하기 <ArrowRight size={20} />
          </Link>
          <Link href="/@demo" className="flex items-center justify-center gap-2 px-8 py-4 glass text-foreground font-bold rounded-xl hover:bg-white/50 transition-all border border-white/20">
            데모 보기
          </Link>
        </div>
      </section>

      {/* 카테고리 카드 섹션 */}
      <section className="w-full max-w-6xl pb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: '하드웨어', icon: <Cpu className="text-mint" size={32} />, desc: '회로 설계, 임베디드 시스템 및 물리적 장치 결과물' },
          { title: '소프트웨어', icon: <Code className="text-mint" size={32} />, desc: '웹, 앱, 시스템 프로그래밍 및 알고리즘 구현' },
          { title: '디자인', icon: <Palette className="text-mint" size={32} />, desc: 'UI/UX, 3D 모델링 및 창의적인 비주얼 작업' },
        ].map((item, i) => (
          <div key={i} className="glass p-8 rounded-2xl border border-white/20 hover:border-mint/50 transition-all group">
            <div className="mb-6 p-3 bg-mint/5 inline-block rounded-xl group-hover:bg-mint/10 transition-colors">
              {item.icon}
            </div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-foreground/60 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
