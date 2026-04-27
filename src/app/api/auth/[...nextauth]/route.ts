import { handlers } from "@/auth";

export const runtime = "edge";

export const GET = (req: any, ctx: any) => handlers.GET(req, ctx);
export const POST = (req: any, ctx: any) => handlers.POST(req, ctx);
