export const runtime = 'edge';
import Link from 'next/link';
import { LayoutDashboard, FileText, Briefcase, Settings, UserCircle, LogOut } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarItems = [
    { name: '개요', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: '포트폴리오 관리', href: '/dashboard/portfolio', icon: <Briefcase size={20} /> },
    { name: '이력서 관리', href: '/dashboard/resume', icon: <FileText size={20} /> },
    { name: '프로필 설정', href: '/dashboard/profile', icon: <UserCircle size={20} /> },
    { name: '계정 설정', href: '/dashboard/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-cyber-white">
      {/* 사이드바 */}
      <aside className="w-64 glass border-r border-mint/10 fixed h-full z-20 hidden md:block">
        <div className="p-8">
          <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <span className="text-mint animate-pulse">●</span>
            <span>MY-DASHBOARD</span>
          </Link>
        </div>
        
        <nav className="mt-4 px-4 space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground/70 hover:bg-mint/10 hover:text-mint rounded-xl transition-all"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-8 px-8 w-full">
          <button className="flex items-center gap-3 text-sm font-medium text-red-400 hover:text-red-500 transition-colors">
            <LogOut size={20} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 md:ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
