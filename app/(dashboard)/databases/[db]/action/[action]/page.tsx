import Action from "@/components/DatabaseItem/Action"
import Title from "@/components/DatabaseItem/Header"
interface IProps {
  params: {
    db: string
    action: string
  }
}

// TODO: Verify that the table exists on the database before rendering form
export default async function DatabaseActionPage({ params }: IProps) {
  const { db: database, action: name } = params
  const type = "action"

  return (
    <div className="flex max-h-screen min-h-screen flex-col bg-white">
      <Title database={database} type={type} name={name} />

      <div className="flex-1 overflow-scroll bg-slate-50 p-2 lg:min-h-full">
        <Action database={database} actionName={name} />
      </div>
    </div>
  )
}
