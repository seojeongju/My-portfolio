export const runtime = 'edge';

import PortfolioClient from './PortfolioClient';

export default async function UserPortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  
  return <PortfolioClient username={username} />;
}
