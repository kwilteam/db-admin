import { useKwilProvider } from "@/providers/WebKwilProvider";
import { useAppDispatch } from "@/store/hooks";
import { useCallback } from "react";
import { useKwilSigner } from "../use-kwil-signer";
import { setAlert } from "@/store/global";

export default function useExecuteTx(namespace: string) {
    const dispatch = useAppDispatch()
    const kwilProvider = useKwilProvider()
    const signer = useKwilSigner();

    const executeTx = useCallback(
        async (s: string) => {
            if (!namespace || !s || !kwilProvider) return

            if (!signer) {
                dispatch(
                    setAlert({
                        type: "error",
                        text: "Please connect your wallet!",
                    }),
                )
                return
            }

            try {
                const txResponse = await kwilProvider.execSql(
                    `{${namespace}}${s}`,
                    {},
                    signer,
                    true
                )

                dispatch(
                    setAlert({
                        type: "success",
                        text: "Transaction executed successfully",
                    })
                )
            } catch (error) {
                dispatch(
                    setAlert({
                        type: "error",
                        text: "An error occurred",
                    }),
                )
            }
        },
        [kwilProvider, namespace, dispatch, signer],
    )

    return executeTx
}