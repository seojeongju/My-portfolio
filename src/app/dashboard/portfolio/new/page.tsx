"use client";

export const runtime = 'edge';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X, Save, Image as ImageIcon, Film, Loader2 } from 'lucide-react';
import { uploadToR2 } from '@/app/actions/storage';
import { createPortfolio } from '@/app/actions/portfolio';

export default function NewPortfolioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      // 1. 미디어 파일이 있다면 R2에 업로드
      let thumbnailUrl = '';
      if (file) {
        const uploadRes = await uploadToR2(file, 'portfolios');
        if (uploadRes.success && uploadRes.key) {
          // 실제 서비스 환경에서는 R2 커스텀 도메인 또는 Worker URL을 조합해야 합니다.
          thumbnailUrl = `/api/media/${uploadRes.key}`; 
        }
      }

      // 2. 포트폴리오 메타데이터 DB 저장
      formData.append('thumbnailUrl', thumbnailUrl);
      // 임시로 userId를 'gildong'으로 설정 (추후 인증 연동 시 동적 처리)
      const res = await createPortfolio(formData, 'gildong');

      if (res.success) {
        alert('포트폴리오가 성공적으로 등록되었습니다!');
        router.push('/dashboard/portfolio');
      } else {
        alert(res.error);
      }
    } catch (error) {
      console.error(error);
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold mb-2">새 작업물 등록</h1>
        <p className="text-foreground/60">당신의 멋진 프로젝트를 포트폴리오에 추가하세요.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 미디어 업로드 영역 */}
        <section className="glass p-8 rounded-3xl border border-dashed border-mint/40 text-center relative overflow-hidden">
          {preview ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden group">
              {file?.type.startsWith('video') ? (
                <video src={preview} className="w-full h-full object-cover" controls />
              ) : (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              )}
              <button 
                type="button"
                onClick={() => { setFile(null); setPreview(null); }}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center py-10 cursor-pointer group">
              <div className="p-5 bg-mint/5 rounded-full mb-4 group-hover:bg-mint/10 transition-colors">
                <Upload size={32} className="text-mint" />
              </div>
              <p className="font-bold mb-1">클릭하여 이미지 또는 동영상 업로드</p>
              <p className="text-xs text-foreground/40">최대 50MB (JPG, PNG, MP4 지원)</p>
              <input type="file" className="hidden" accept="image/*,video/*" onChange={handleFileChange} />
            </label>
          )}
        </section>

        {/* 텍스트 입력 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70 ml-1">제목</label>
            <input 
              name="title" 
              required 
              placeholder="프로젝트 제목을 입력하세요"
              className="w-full px-5 py-4 glass rounded-2xl border border-white/20 focus:border-mint/50 focus:outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70 ml-1">카테고리</label>
            <select 
              name="categoryId" 
              className="w-full px-5 py-4 glass rounded-2xl border border-white/20 focus:border-mint/50 focus:outline-none transition-all appearance-none"
            >
              <option value="1">하드웨어</option>
              <option value="2">소프트웨어</option>
              <option value="3">디자인</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground/70 ml-1">설명</label>
          <textarea 
            name="description" 
            rows={3}
            placeholder="작업물에 대한 간단한 설명을 적어주세요"
            className="w-full px-5 py-4 glass rounded-2xl border border-white/20 focus:border-mint/50 focus:outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-foreground/70 ml-1">상세 내용 (Markdown)</label>
          <textarea 
            name="content" 
            rows={8}
            placeholder="사용 기술, 개발 과정, 성과 등을 자유롭게 작성하세요"
            className="w-full px-5 py-4 glass rounded-2xl border border-white/20 focus:border-mint/50 focus:outline-none transition-all font-mono text-sm"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-mint text-black font-extrabold rounded-2xl hover:bg-mint/80 transition-all disabled:opacity-50 cyber-border shadow-[0_0_20px_rgba(0,255,204,0.3)]"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            포트폴리오 저장하기
          </button>
          <button 
            type="button"
            onClick={() => router.back()}
            className="px-8 py-4 glass text-foreground font-bold rounded-2xl hover:bg-white/50 transition-all border border-white/20"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
}
