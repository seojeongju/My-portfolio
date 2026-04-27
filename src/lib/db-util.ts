import { getRequestContext } from '@cloudflare/next-on-pages';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/db/schema';

export function getDb() {
  // Cloudflare Pages 환경에서 바인딩된 DB 가져오기
  const { env } = getRequestContext();
  return drizzle(env.DB, { schema });
}

export function getBucket() {
  const { env } = getRequestContext();
  return env.BUCKET;
}
