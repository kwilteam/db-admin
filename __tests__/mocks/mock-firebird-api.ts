import { DeploymentStatus } from "@/utils/firebird/types"

export const mockDeployment = {
  id: "test-id",
  status: DeploymentStatus.ACTIVE,
  config: {
    chain: {
      chain_id: "test-chain",
      version: "0.10.0",
    },
    node_count: 1,
    machines: {
      instance_name: "kwil-node",
      provider: "aws",
      region: "us-east-2",
      type: "mini",
    },
  },
  service_endpoints: {
    kwil_rpc_provider: "http://test-endpoint",
  },
  created_at: 1234567890,
  updated_at: 1234567890,
}

export const mockNodes = [
  {
    id: "test-node-id",
    status: "active",
    provider: "aws",
    region: "us-east-2",
    type: "mini",
  },
]
