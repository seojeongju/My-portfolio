export const runtime = "edge";

export const GET = async () => {
  return new Response(JSON.stringify({ 
    message: "Root level route is working!", 
    time: new Date().toISOString() 
  }), { 
    status: 200, 
    headers: { 'Content-Type': 'application/json' } 
  });
};
