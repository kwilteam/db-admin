import { KwilTypes } from "@/utils/database-types"
import { getDatabaseId, getKwilInstance, getSigner } from "./core"
import { Utils } from "@kwilteam/kwil-js"

export const executeAction = async (
  database: string,
  action: string,
  inputs: Record<string, string>,
): Promise<KwilTypes.GenericResponse<KwilTypes.TxReceipt> | undefined> => {
  try {
    const kwil = getKwilInstance()
    const dbId = await getDatabaseId(database)

    const actionInputs = new Utils.ActionInput()

    for (const [key, value] of Object.entries(inputs)) {
      actionInputs.put(key, value as string)
    }

    const signer = getSigner()

    const tx = await kwil
      .actionBuilder()
      .dbid(dbId)
      .name(action)
      .concat(actionInputs)
      .signer(signer)
      .buildTx()

    const result = await kwil.broadcast(tx)

    if (result.status !== 200) throw new Error("Failed to fetch table data")

    return result
  } catch (error) {
    console.error(error)
  }
}
