export const runtime = "edge";

export const GET = async () => {
  return new Response("OK - System is live", { status: 200 });
};
