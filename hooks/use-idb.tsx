import { useContext } from "react"
import { IdbContext } from "@/providers/IdbProvider"

export default function useIdb() {
  const idb = useContext(IdbContext)
  return idb
}
