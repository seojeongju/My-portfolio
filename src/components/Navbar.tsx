"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, User, Settings, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: '홈', href: '/', icon: <Home size={20} /> },
    { name: '포트폴리오', href: '/portfolio', icon: <Briefcase size={20} /> },
    { name: '이력서', href: '/resume', icon: <User size={20} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
              <span className="text-mint animate-pulse">●</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-mint-dark">
                MY-PORTFOLIO
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition-all hover:text-mint ${
                  pathname === item.href ? 'text-mint border-b-2 border-mint' : 'text-foreground/70'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <Link href="/dashboard" className="p-2 rounded-full hover:bg-mint/10 transition-colors" title="대시보드">
              <Settings size={20} className="text-foreground/70" />
            </Link>
            <a href="/api/auth/signin" className="px-4 py-2 text-sm font-bold text-white bg-mint rounded-lg hover:bg-mint-dark transition-colors">
              로그인
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-foreground">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 px-2 pt-2 pb-3 space-y-1 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-4 text-base font-medium text-foreground hover:bg-mint/10 rounded-lg"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          <a
            href="/api/auth/signin"
            className="flex items-center gap-3 px-3 py-4 text-base font-bold text-mint hover:bg-mint/10 rounded-lg"
          >
            로그인
          </a>
        </div>
      )}
    </nav>
  );
}
