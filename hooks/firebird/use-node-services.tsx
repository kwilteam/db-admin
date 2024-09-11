import { useEffect, useState } from "react"
import { getNodeServices } from "@/utils/firebird/api"
import { IFirebirdApiService } from "@/utils/firebird/types"

export default function useNodeServices(nodeId: string) {
  const [services, setServices] = useState<IFirebirdApiService[] | undefined>(
    undefined,
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true)
      const { status, data } = await getNodeServices(nodeId)
      if (status === 200 && data) {
        setServices(data)
      }
      setLoading(false)
    }

    fetchServices()
  }, [nodeId])

  return { services, loading }
}
