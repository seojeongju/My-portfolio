import { handlers } from "@/auth";

export const runtime = "edge";

export const GET = async (...args: any[]) => {
  try {
    const handler = (handlers as any).GET;
    return await handler(...args);
  } catch (e: any) {
    console.error("Auth GET Error:", e);
    return new Response(JSON.stringify({ error: e.message || "Unknown Auth Error", stack: e.stack }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export const POST = async (...args: any[]) => {
  try {
    const handler = (handlers as any).POST;
    return await handler(...args);
  } catch (e: any) {
    console.error("Auth POST Error:", e);
    return new Response(JSON.stringify({ error: e.message || "Unknown Auth Error", stack: e.stack }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
