'use client';

import {PrivyProvider} from '@privy-io/react-auth';

export default function PrivyAuth({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#418E9D',
          logo: '/images/kwil.png',
          walletChainType: "ethereum-only",
          walletList: ['metamask', 'coinbase_wallet', 'detected_ethereum_wallets']
        },
        embeddedWallets: {
          createOnLogin: "users-without-wallets"
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}