import { selectNewDeployment, setNewDeployment } from "@/store/firebird"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { NumberOfNodesStepIcon } from "@/utils/icons"
import { Step } from "../Step"

const nodeCountOptions = ["", "1", "2", "3", "4", "5"]

export function NumberOfNodesStep() {
  const dispatch = useAppDispatch()
  const newDeploymentObject = useAppSelector(selectNewDeployment)

  const handleChange = (value: string) => {
    const nodeCount = Number(value)

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
      icon={<NumberOfNodesStepIcon />}
      title="Number of nodes"
      description="The number of nodes you want to deploy."
    >
      <div className="flex flex-col gap-2">
        <select
          id="nodeCount"
          name="nodeCount"
          required
          className="block w-full rounded-md border-0 py-1.5 text-sm leading-6 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-kwil/80"
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
    </Step>
  )
}
