import { selectNewDeployment, setNewDeployment } from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { NumberOfNodesStepIcon, StepIcon } from "@/utils/icons"
import { Step } from "../Step"
import { ModalEnum, setModal } from "@/store/global"

const nodeCountOptions = ["", "1", "2", "3", "4", "5"]

export function NumberOfNodesStep() {
  const dispatch = useAppDispatch()
  const newDeploymentObject = useAppSelector(selectNewDeployment)

  const handleChange = (value: string) => {
    const nodeCount = Number(value)

    if (nodeCount > 1) {
      dispatch(setModal(ModalEnum.TALK_WITH_TEAM))
    }

    dispatch(
      setNewDeployment({
        key: "nodeCount",
        value: nodeCount,
      }),
    )
  }

  return (
    <Step
      step={3}
      icon={<StepIcon color='red' />}
      title="Number of Nodes"
      description="The number of nodes you want to deploy."
    >
      <div className="flex flex-col gap-2">
        <div className="mt-2 flex rounded-md shadow-sm">
          <span className="inline-flex items-center rounded-l-md border border-r-0 border-slate-100 bg-slate-50 px-3 text-gray-500 sm:text-sm">
            <NumberOfNodesStepIcon className="h-4 w-4" />
          </span>
          <select
            data-testid="node-count"
            id="nodeCount"
            name="nodeCount"
            required
            className="block w-full rounded-none rounded-r-md border-0 py-1.5 text-sm leading-6 ring-1 ring-inset ring-slate-100 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-slate-100"
            value={newDeploymentObject?.nodeCount}
            onChange={(e) => handleChange(e.target.value)}
          >
            {nodeCountOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Step>
  )
}
