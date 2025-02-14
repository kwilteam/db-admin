import { useMemo } from "react"
import { v4 } from "uuid"

function useCodeSnippets(providerEndpoint: string, chainId: string) {
  return useMemo(
    () => ({
      nodeSetup: `
  const { Wallet } = require('ethers');
const kwiljs = require('@kwilteam/kwil-js');
  
const wallet = new Wallet("MY_PRIVATE_KEY");

const kwilSigner = new kwiljs.KwilSigner(
      wallet,
      wallet.address
)
  
const kwil = new kwiljs.NodeKwil({
  kwilProvider: "${providerEndpoint}",
  chainId: "${chainId}"
});
      `.trim(),
      webSetup: `
  import { BrowserProvider } from 'ethers';
import { WebKwil, KwilSigner } from '@kwilteam/kwil-js';
  
// to be used for funding and signing transactions
const provider = new BrowserProvider(window.ethereum)
const ethersSigner = await provider.getSigner();
const address = await ethersSigner.getAddress();

const kwilSigner = new KwilSigner(provider, address);
  
const kwil = new WebKwil({
    kwilProvider: "${providerEndpoint}",
    chainId: "${chainId}"
});
      `.trim(),
      ping: `
await kwil.ping();
      `.trim(),
      createTable: `
  await kwil.execSql({
    query: 'CREATE TABLE users (id UUID PRIMARY KEY, name TEXT NOT NULL);',
    params: {},
    signer: kwilSigner,
    sync: true
})
      `.trim(),
      insert: `
await kwil.execSql({
    query: "INSERT INTO users (id, name) VALUES ($id, $name);",
    params: {
      $id: '${v4()}',
      $name: "Alice"
    },
    signer: kwilSigner,
    sync: true
})
      `.trim(),
    }),
    [providerEndpoint, chainId],
  )
}

export default useCodeSnippets
