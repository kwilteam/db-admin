"use client"

import { initIdb } from "@/utils/idb/init"
import { IDBPDatabase } from "idb"

import React, { createContext, useState, useEffect } from "react"

export const IdbContext = createContext<IDBPDatabase<unknown> | undefined>(
  undefined,
)

export const IdbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [idb, setIdb] = useState<IDBPDatabase<unknown> | undefined>(undefined)

  useEffect(() => {
    const initializeIdb = async () => {
      const db = await initIdb()
      setIdb(db)
    }

    initializeIdb()
  }, [])

  return <IdbContext.Provider value={idb}>{children}</IdbContext.Provider>
}
