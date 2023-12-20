import { NextResponse } from "next/server"
import { IApiResponse } from "@/utils/api"
import { deployDatabase } from "@/utils/kwil/database"
import { KwilTypes } from "@/utils/database-types"

interface IDeployProps {
  dbDefinition: string
}

export const POST = async (
  request: Request,
): Promise<NextResponse<IApiResponse<KwilTypes.TxReceipt | string>>> => {
  const { dbDefinition } = (await request.json()) as IDeployProps

  console.log("dbDefinition", dbDefinition)
  try {
    const txResponse = await deployDatabase(dbDefinition)

    if (txResponse instanceof Error) {
      throw txResponse
    } else {
      return NextResponse.json(
        {
          outcome: txResponse.outcome,
          data: txResponse.message,
        } as IApiResponse<string>,
        {
          status: 200,
        },
      )
    }
  } catch (error) {
    console.error(error)
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred"

    return NextResponse.json(
      {
        outcome: "error",
        data: errorMessage,
      } as IApiResponse<string>,
      {
        status: 400,
      },
    )
  }
}
