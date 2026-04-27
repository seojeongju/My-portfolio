import { handlers } from "@/auth";

export const runtime = "edge";

export const GET = (...args: any[]) => (handlers.GET as any)(...args);
export const POST = (...args: any[]) => (handlers.POST as any)(...args);
