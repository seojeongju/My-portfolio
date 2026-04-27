"use server";

import { getBucket } from '@/lib/db-util';

export async function uploadToR2(file: File, path: string) {
  try {
    const bucket = getBucket();
    const key = `uploads/${path}/${Date.now()}-${file.name}`;
    
    // 파일을 ArrayBuffer로 변환하여 R2에 저장
    const buffer = await file.arrayBuffer();
    await bucket.put(key, buffer, {
      httpMetadata: {
        contentType: file.type,
      },
    });

    // 업로드된 파일의 키 반환 (서빙 시 커스텀 도메인 또는 Worker 경로 사용 예정)
    return { success: true, key };
  } catch (error) {
    console.error('R2 업로드 오류:', error);
    return { success: false, error: '파일 업로드 중 오류가 발생했습니다.' };
  }
}
