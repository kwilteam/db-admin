import { ITxResponse } from "../api"
import {
  broadcastTx,
  getDatabaseId,
  getKwilInstance,
  getAddress,
  getSigner,
} from "./core"
import { Utils } from "@kwilteam/kwil-js"

export const executeAction = async (
  database: string,
  action: string,
  inputs: Record<string, string>,
): Promise<Object[] | ITxResponse> => {
  try {
    const kwil = getKwilInstance()
    const dbId = await getDatabaseId(database)
    const schema = await kwil.getSchema(dbId)
    const actionSchema = schema.data?.actions?.find((a) => a.name === action)
    if (!actionSchema) throw new Error("Action not found")

    const actionInputs = new Utils.ActionInput()

    for (const [key, value] of Object.entries(inputs)) {
      actionInputs.put(key, value as string)
    }

    const signer = getSigner()
    const publicKey = await getAddress()

    const actionBuilder = kwil
      .actionBuilder()
      .dbid(dbId)
      .name(action)
      .concat([actionInputs])
      .publicKey(publicKey)
      // .signer(signer)

    if (actionSchema.mutability === "view") {
      const msg = await actionBuilder.buildMsg()
      const result = await kwil.call(msg)

      // @ts-ignore - result.data?.result is an Object[] but the type is set as a string
      return result.data?.result as unknown as Object[]
    } else {
      const tx = await actionBuilder.buildTx()
      return await broadcastTx(kwil, tx)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
