import { useEffect } from "react"

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMount = (mount: () => void) => useEffect(mount, [])

export default useMount
