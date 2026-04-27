"use server";

import { getDb } from '@/lib/db-util';
import { portfolios } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export async function createPortfolio(formData: FormData, userId: string) {
  try {
    const db = getDb();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const categoryId = parseInt(formData.get('categoryId') as string);
    const content = formData.get('content') as string;
    const thumbnailUrl = formData.get('thumbnailUrl') as string;

    const result = await db.insert(portfolios).values({
      userId,
      categoryId,
      title,
      description,
      content,
      thumbnailUrl,
      createdAt: new Date(),
    }).returning();

    revalidatePath(`/@${userId}`);
    revalidatePath('/dashboard');
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('포트폴리오 생성 오류:', error);
    return { success: false, error: '데이터 저장 중 오류가 발생했습니다.' };
  }
}
