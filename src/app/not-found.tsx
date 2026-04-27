export const runtime = 'edge';

import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full text-center space-y-8 glass p-12 rounded-[2.5rem] border border-white/20 shadow-2xl">
        <div className="relative inline-block">
          <div className="w-24 h-24 bg-mint/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle size={48} className="text-mint animate-pulse" />
          </div>
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-4 border-white" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-6xl font-black tracking-tighter text-slate-900">404</h1>
          <h2 className="text-2xl font-bold text-slate-800">페이지를 찾을 수 없습니다</h2>
          <p className="text-slate-500 font-medium leading-relaxed">
            요청하신 페이지가 삭제되었거나 <br />
            잘못된 경로로 접근하신 것 같습니다.
          </p>
        </div>

        <div className="pt-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-mint text-black font-black rounded-2xl hover:bg-mint/80 transition-all shadow-[0_10px_20px_-5px_rgba(0,255,204,0.3)] hover:scale-105 active:scale-95"
          >
            <Home size={20} />
            홈으로 돌아가기
          </Link>
        </div>

        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pt-8">
          System Error Code: 0x404_NOT_FOUND
        </p>
      </div>
    </div>
  );
}
