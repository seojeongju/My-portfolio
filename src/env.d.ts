interface CloudflareEnv {
  DB: D1Database;
  BUCKET: R2Bucket;
  AUTH_SECRET: string;
  AUTH_GOOGLE_ID: string;
  AUTH_GOOGLE_SECRET: string;
}

declare module '@cloudflare/next-on-pages' {
  export function getRequestContext(): {
    env: CloudflareEnv;
    cf: any;
    ctx: any;
  };
}
