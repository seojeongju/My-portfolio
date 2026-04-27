import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import type { AdapterAccount } from '@auth/core/adapters';

// --- Auth.js 호환 사용자 테이블 (기존 users 이름 유지) ---

export const users = sqliteTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
  image: text('image'),
  username: text('username').unique(), // 개별 고유 URL 아이디
  bio: text('bio'),
  profileImageUrl: text('profile_image_url'), // 기존 필드 유지
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()), // 기존 필드 유지
});

export const accounts = sqliteTable(
  'accounts',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = sqliteTable('sessions', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
});

export const verificationTokens = sqliteTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

// --- 포트폴리오 비즈니스 로직 테이블 (기존 이름 유지) ---

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  orderIndex: integer('order_index').notNull().default(0),
});

export const portfolios = sqliteTable('portfolios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => users.id),
  categoryId: integer('category_id').references(() => categories.id),
  title: text('title').notNull(),
  description: text('description'),
  content: text('content'),
  thumbnailUrl: text('thumbnail_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

export const media = sqliteTable('media', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  portfolioId: integer('portfolio_id').notNull().references(() => portfolios.id),
  fileType: text('file_type').notNull(),
  r2Key: text('r2_key').notNull(),
  url: text('url').notNull(),
});

export const resumeSections = sqliteTable('resume_sections', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => users.id),
  type: text('type').notNull(),
  title: text('title').notNull(),
  subtitle: text('subtitle'),
  description: text('description'),
  startDate: text('start_date'),
  endDate: text('end_date'),
  orderIndex: integer('order_index').notNull().default(0),
});
