export const runtime = "edge";

export const GET = async () => {
  return new Response(JSON.stringify({ 
    message: "Route system is working!", 
    time: new Date().toISOString() 
  }), { 
    status: 200, 
    headers: { 'Content-Type': 'application/json' } 
  });
};
