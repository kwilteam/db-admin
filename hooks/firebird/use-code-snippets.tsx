import { useMemo } from "react"

function useCodeSnippets(providerEndpoint: string, chainId: string) {
  return useMemo(
    () => ({
      node: `
  const { Wallet } = require('ethers');
  const kwiljs = require('@kwilteam/kwil-js');
  
  const wallet = new Wallet("MY_PRIVATE_KEY");
  
  const kwil = new kwiljs.NodeKwil({
    kwilProvider: "${providerEndpoint}",
    chainId: "${chainId}"
  });
      `.trim(),
      web: `
  import { BrowserProvider } from 'ethers';
  import { WebKwil } from '@kwilteam/kwil-js';
  
  // to be used for funding and signing transactions
  const provider = new BrowserProvider(window.ethereum)
  
  const kwil = new WebKwil({
      kwilProvider: "${providerEndpoint}",
      chainId: "${chainId}"
  });
      `.trim(),
    }),
    [providerEndpoint, chainId],
  )
}

export default useCodeSnippets
