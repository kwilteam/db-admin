import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setAlert } from "@/store/global"
import {
  deleteProviderFromStores,
  selectActiveProvider,
} from "@/store/providers"

export default function useDeleteProvider() {
  const dispatch = useAppDispatch()
  const activeProvider = useAppSelector(selectActiveProvider)

  const confirmDeleteProvider = async (name: string) => {
    if (name === activeProvider) {
      dispatch(
        setAlert({
          type: "error",
          text: "You cannot delete the active provider.",
          position: "top",
        }),
      )
      return
    }

    const confirmed = confirm("Are you sure you want to delete this provider?")

    if (!confirmed) return

    try {
      await dispatch(deleteProviderFromStores(name))

      dispatch(
        setAlert({
          type: "success",
          text: "Provider has been successfully deleted.",
          position: "top",
        }),
      )
    } catch (error) {
      console.error("An error occurred while deleting the provider:", error)
      dispatch(
        setAlert({
          type: "error",
          text: "There was an error deleting the account.",
          position: "top",
        }),
      )
    }
  }

  return confirmDeleteProvider
}
