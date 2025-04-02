import { setActiveAccount, setModal } from "@/store/global";
import { useAppDispatch } from "@/store/hooks";
import { useLogin, usePrivy, useWallets } from "@privy-io/react-auth"
import { useEffect } from "react";

export const usePrivyAccounts = () => {
    const { ready, authenticated, logout } = usePrivy();
    const { login } = useLogin();
    const { wallets } = useWallets();
    const dispatch = useAppDispatch();

    const connectOrCreateWallet = async () => {
        login({
            loginMethods: ["wallet", "email"],
            walletChainType: "ethereum-only",
            disableSignup: false
        })
    }

    useEffect(() => {
        if (authenticated) {
            const wallet = wallets[0]
            if (wallet) {
                const address = wallet.address
                dispatch(setActiveAccount(address))
                dispatch(setModal(undefined))
            }
        }
    }, [authenticated, wallets, dispatch])

    const disconnectWallet = async () => {
        await logout()
        dispatch(setActiveAccount(undefined))
    }

    return {
        ready,
        connectOrCreateWallet,
        disconnectWallet,
        wallets
    }
}