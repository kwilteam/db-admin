import { useKwilProvider } from "@/providers/WebKwilProvider";
import { IDbOwner, setDbOwner } from "@/store/database";
import { selectActiveAccount, setAlert } from "@/store/global";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback, useEffect, useState } from "react";

export default function useFetchOwner() {
    const dispatch = useAppDispatch()
    const kwilProvider = useKwilProvider()
    const activeAccount = useAppSelector(selectActiveAccount)

    const fetchOwner = useCallback(async () => {
        try {
            const ownerRes = await kwilProvider?.selectQuery<IDbOwner>(
                `SELECT user_identifier FROM info.user_roles WHERE role_name = 'owner'`
            )
            const owner = ownerRes?.data

            if (ownerRes === undefined || owner === undefined) {
                dispatch(setDbOwner(""))
                return
            }

            if (owner && owner.length === 0) {
                dispatch(setDbOwner(""))
                return
            }

            dispatch(setDbOwner(owner[0].user_identifier))
        } catch (e) {
            dispatch(setAlert({
                type: "error",
                text: "Failed to load DB owner. Please try again.",
                position: "top",
            }))

            console.error(e)
        }
    }, [dispatch, kwilProvider, activeAccount])

    return { fetchOwner }
}