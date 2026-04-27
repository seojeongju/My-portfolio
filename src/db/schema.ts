import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// 사용자 테이블
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').unique().notNull(),
  email: text('email').unique().notNull(),
  displayName: text('display_name').notNull(),
  bio: text('bio'),
  profileImageUrl: text('profile_image_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

// 포트폴리오 카테고리
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  orderIndex: integer('order_index').notNull().default(0),
});

// 포트폴리오 게시물
export const portfolios = sqliteTable('portfolios', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => users.id),
  categoryId: integer('category_id').references(() => categories.id),
  title: text('title').notNull(),
  description: text('description'),
  content: text('content'), // Markdown 지원
  thumbnailUrl: text('thumbnail_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(new Date()),
});

// 미디어 파일 (R2 연동)
export const media = sqliteTable('media', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  portfolioId: integer('portfolio_id').notNull().references(() => portfolios.id),
  fileType: text('file_type').notNull(), // 'image' | 'video'
  r2Key: text('r2_key').notNull(),
  url: text('url').notNull(),
});

// 이력서 섹션
export const resumeSections = sqliteTable('resume_sections', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: text('user_id').notNull().references(() => users.id),
  type: text('type').notNull(), // 'EXPERIENCE' | 'EDUCATION' | 'SKILL' | 'AWARD'
  title: text('title').notNull(), // 회사명 / 학교명 / 기술명
  subtitle: text('subtitle'), // 직무 / 전공 / 상세내용
  description: text('description'), // 활동 상세 설명
  startDate: text('start_date'),
  endDate: text('end_date'), // 현재 진행 중인 경우 NULL 가능
  orderIndex: integer('order_index').notNull().default(0),
});
