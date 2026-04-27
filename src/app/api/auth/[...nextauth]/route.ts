export const runtime = "edge";

export const GET = async (...args: any[]) => {
  return new Response(JSON.stringify({ message: "Hello from Auth GET route!" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const POST = async (...args: any[]) => {
  return new Response(JSON.stringify({ message: "Hello from Auth POST route!" }), { status: 200, headers: { 'Content-Type': 'application/json' } });
};
