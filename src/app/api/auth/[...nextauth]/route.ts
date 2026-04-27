import { handlers } from "@/auth";

export const runtime = "edge";

export const GET = async (...args: any[]) => {
  try {
    const handler = (handlers as any).GET;
    const response = await handler(...args);
    if (response && response.status === 500) {
      const text = await response.text();
      return new Response(JSON.stringify({ error: "NextAuth returned 500", text }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    return response;
  } catch (e: any) {
    console.error("Auth GET Error:", e);
    // Cloudflare Pages가 500 에러를 가로채는 것을 막기 위해 200으로 반환하여 에러 메시지를 확인합니다.
    return new Response(JSON.stringify({ error: e.message || "Unknown Auth Error", stack: e.stack }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
};

export const POST = async (...args: any[]) => {
  try {
    const handler = (handlers as any).POST;
    return await handler(...args);
  } catch (e: any) {
    console.error("Auth POST Error:", e);
    return new Response(JSON.stringify({ error: e.message || "Unknown Auth Error", stack: e.stack }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
};
