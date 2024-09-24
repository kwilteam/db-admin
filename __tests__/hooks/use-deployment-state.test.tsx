import { describe, expect, it } from "vitest"
import { renderHook } from "@testing-library/react"
import "@testing-library/jest-dom"
import useDeploymentState from "@/hooks/firebird/use-deployment-state"
import {
  IFirebirdNewDeployment,
  Network,
  MachineType,
} from "@/utils/firebird/types"

describe("useDeploymentState", () => {
  const mockDeployment: IFirebirdNewDeployment = {
    network: Network.testnet,
    networkSettings: {
      chainId: "test-chain",
      kwilVersion: "0.8.4",
      companyName: "Test Company",
    },
    nodeCount: 1,
    machines: MachineType.mini,
    services: {
      daemon: true,
      gateway: false,
      indexer: false,
      customBinary: false,
    },
    finalOptions: {
      accessCode: "1234567890abcdef1234567890abcdef",
    },
    talkWithTeam: false,
  }

  it("sets readyToDeploy to true when all conditions are met", () => {
    const { result } = renderHook(() => useDeploymentState(mockDeployment))
    expect(result.current.readyToDeploy).toBe(true)
  })

  it("sets readyToDeploy to false when accessCode is invalid", () => {
    const invalidDeployment = {
      ...mockDeployment,
      finalOptions: { accessCode: "invalid" },
    }
    const { result } = renderHook(() => useDeploymentState(invalidDeployment))
    expect(result.current.readyToDeploy).toBe(false)
  })

  it("sets talkWithTeam to true for mainnet deployment", () => {
    const mainnetDeployment = { ...mockDeployment, network: Network.mainnet }
    const { result } = renderHook(() => useDeploymentState(mainnetDeployment))
    expect(result.current.talkWithTeam).toBe(true)
  })
})
