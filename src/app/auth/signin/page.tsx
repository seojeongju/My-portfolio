"use client";

export const runtime = 'edge';

import { signIn } from "next-auth/react";
import { Chrome } from "lucide-react";
import { motion } from "framer-motion";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-slate-50 to-mint/5 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-mint/30 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-mint-dark/20 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-8 relative z-10"
      >
        <div className="glass border border-white/40 p-10 rounded-[2.5rem] shadow-2xl shadow-mint/5 backdrop-blur-xl">
          <div className="text-center mb-10">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block p-4 rounded-3xl bg-mint/10 mb-6"
            >
              <div className="w-12 h-12 text-mint flex items-center justify-center">
                <span className="text-3xl font-bold">●</span>
              </div>
            </motion.div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
              환영합니다
            </h1>
            <p className="text-slate-500 font-medium">
              나만의 사이버틱 포트폴리오를 시작해 보세요.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full group relative flex items-center justify-center gap-4 px-6 py-4 bg-white border border-slate-200 rounded-2xl text-slate-700 font-bold transition-all hover:border-mint hover:shadow-lg hover:shadow-mint/10 active:scale-[0.98]"
            >
              <Chrome className="w-5 h-5 text-slate-400 group-hover:text-mint transition-colors" />
              <span>Google 계정으로 시작하기</span>
              <div className="absolute inset-0 rounded-2xl transition-opacity opacity-0 group-hover:opacity-100 ring-2 ring-mint ring-offset-2 pointer-events-none" />
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100">
            <p className="text-center text-sm text-slate-400">
              계정이 없으신가요? 로그인 시 자동으로 생성됩니다.
            </p>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-slate-400 text-sm font-medium"
        >
          © {new Date().getFullYear()} MY-PORTFOLIO PLATFORM
        </motion.p>
      </motion.div>
    </div>
  );
}
