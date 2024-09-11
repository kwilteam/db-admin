import { useState, useEffect } from "react"
import { IFirebirdNewDeployment } from "@/store/firebird"

export default function useDeploymentState(
  newDeployment: IFirebirdNewDeployment | undefined,
) {
  const [readyToDeploy, setReadyToDeploy] = useState(false)
  const [deploying, setDeploying] = useState(false)
  const [talkWithTeam, setTalkWithTeam] = useState(false)

  useEffect(() => {
    const accessCode = newDeployment?.finalOptions?.accessCode
    const hexRegex = /^[0-9a-fA-F]{32}$/
    if (!accessCode || !hexRegex.test(accessCode)) {
      setReadyToDeploy(false)
      return
    }

    if (newDeployment?.network.length === 0) {
      setReadyToDeploy(false)
      return
    }

    if (!newDeployment?.nodeCount || newDeployment?.nodeCount === 0) {
      setReadyToDeploy(false)
      return
    }

    if (newDeployment?.machines.length === 0) {
      setReadyToDeploy(false)
      return
    }

    if (
      newDeployment?.services?.daemon === false &&
      newDeployment?.services?.gateway === false &&
      newDeployment?.services?.indexer === false &&
      newDeployment?.services?.customBinary === false
    ) {
      setReadyToDeploy(false)
      return
    }

    setReadyToDeploy(true)
  }, [newDeployment])

  useEffect(() => {
    if (newDeployment?.network === "mainnet") {
      setTalkWithTeam(true)
      return
    }

    if (newDeployment?.nodeCount && newDeployment?.nodeCount > 1) {
      setTalkWithTeam(true)
      return
    }

    if (newDeployment?.machines !== "mini") {
      setTalkWithTeam(true)
      return
    }

    const services = newDeployment?.services

    if (
      services?.gateway === true ||
      services?.indexer === true ||
      services?.customBinary === true
    ) {
      setTalkWithTeam(true)
      return
    }

    setTalkWithTeam(false)
  }, [newDeployment])

  return { readyToDeploy, setDeploying, deploying, talkWithTeam }
}
