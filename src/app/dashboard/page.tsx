import { Eye, Briefcase, FileText, Share2, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const stats = [
    { name: '전체 포트폴리오', value: '12', icon: <Briefcase className="text-mint" />, change: '+2 이번 달' },
    { name: '총 조회수', value: '1,284', icon: <Eye className="text-mint" />, change: '+15% 증가' },
    { name: '이력서 업데이트', value: '3일 전', icon: <FileText className="text-mint" />, change: '최근 수정' },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold mb-2">안녕하세요, 홍길동님! 👋</h1>
          <p className="text-foreground/60 text-sm">오늘도 당신의 멋진 작업물을 공유해 보세요.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/portfolio/new" className="flex items-center gap-2 px-5 py-2.5 bg-mint text-black font-bold rounded-xl hover:bg-mint/80 transition-all text-sm cyber-border">
            <PlusCircle size={18} /> 새 작업물 추가
          </Link>
          <button className="flex items-center gap-2 px-5 py-2.5 glass text-foreground/70 font-bold rounded-xl hover:bg-white/50 transition-all text-sm border border-white/20">
            <Share2 size={18} /> 링크 공유
          </button>
        </div>
      </header>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass p-8 rounded-2xl border border-white/20">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-mint/5 rounded-xl">
                {stat.icon}
              </div>
              <span className="text-xs font-bold text-mint">{stat.change}</span>
            </div>
            <div className="text-3xl font-black mb-1">{stat.value}</div>
            <div className="text-sm text-foreground/50 font-medium">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* 최근 작업물 요약 */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">최근 등록한 작업물</h2>
          <Link href="/dashboard/portfolio" className="text-sm text-mint font-bold hover:underline">전체 보기</Link>
        </div>
        <div className="glass rounded-2xl border border-white/20 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-mint/5 text-xs font-bold text-foreground/50 uppercase tracking-wider">
              <tr>
                <th className="px-8 py-4">제목</th>
                <th className="px-8 py-4">카테고리</th>
                <th className="px-8 py-4">상태</th>
                <th className="px-8 py-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mint/5">
              {[
                { title: "스마트 홈 자동화 허브", cat: "하드웨어", status: "공개" },
                { title: "AI 기반 코드 리뷰어", cat: "소프트웨어", status: "공개" },
                { title: "사이버 펑크 UI 키트", cat: "디자인", status: "초안" },
              ].map((item, i) => (
                <tr key={i} className="hover:bg-mint/5 transition-colors">
                  <td className="px-8 py-5 font-bold text-sm">{item.title}</td>
                  <td className="px-8 py-5">
                    <span className="px-2.5 py-1 bg-foreground/5 rounded-lg text-xs font-medium">{item.cat}</span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${item.status === '공개' ? 'text-green-500' : 'text-orange-400'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${item.status === '공개' ? 'bg-green-500 animate-pulse' : 'bg-orange-400'}`} />
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-xs font-bold text-mint hover:underline">수정</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
