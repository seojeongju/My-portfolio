export const runtime = "edge";

export const GET = async (...args: any[]) => {
  try {
    const { handlers } = await import("@/auth");
    const handler = (handlers as any).GET;
    const response = await handler(...args);
    if (response && response.status === 500) {
      const text = await response.text();
      return new Response(JSON.stringify({ error: "NextAuth 500", text }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    return response;
  } catch (e: any) {
    return new Response(JSON.stringify({ error: "Module Evaluation Error", message: e.message, stack: e.stack }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
};

export const POST = async (...args: any[]) => {
  try {
    const { handlers } = await import("@/auth");
    const handler = (handlers as any).POST;
    return await handler(...args);
  } catch (e: any) {
    return new Response(JSON.stringify({ error: "Module Evaluation Error", message: e.message, stack: e.stack }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
};
