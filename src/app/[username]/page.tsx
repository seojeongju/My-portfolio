export const runtime = 'edge';

import PortfolioClient from './PortfolioClient';

export default async function UserPortfolioPage(props: any) {
  const params = await props.params;
  const username = params?.username || "";
  
  return <PortfolioClient username={username} />;
}
