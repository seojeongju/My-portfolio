import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

export interface Env {
  DB: D1Database;
  BUCKET: R2Bucket;
}

export const getDb = (d1: D1Database) => {
  return drizzle(d1, { schema });
};
