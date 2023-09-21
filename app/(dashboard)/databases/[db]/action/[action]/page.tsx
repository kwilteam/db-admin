import DataTable from "@/components/DataView"
interface IProps {
  params: {
    db: string
    action: string
  }
}

// TODO: Verify that the table exists on the database before rendering form
export default async function DatabaseActionPage({ params }: IProps) {
  const { db, action } = params

  return <DataTable database={db} type="action" name={action} />
}
