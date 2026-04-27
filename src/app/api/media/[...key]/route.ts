import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string[] }> } // Promise 타입으로 수정
) {
  try {
    const { env } = getRequestContext();
    const resolvedParams = await params; // params를 기다림(await)
    const key = resolvedParams.key.join('/');
    
    // R2에서 파일 가져오기
    const object = await env.BUCKET.get(key);

    if (!object) {
      return new Response('파일을 찾을 수 없습니다.', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000');

    return new Response(object.body, {
      headers,
    });
  } catch (error) {
    console.error('미디어 서빙 오류:', error);
    return new Response('서버 오류 발생', { status: 500 });
  }
}
