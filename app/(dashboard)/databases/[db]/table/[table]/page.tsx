import DataTable from "@/components/DataExplorer"

interface IProps {
  params: {
    db: string
    table: string
  }
}

// TODO: Verify that the table exists on the database before rendering form
export default async function DatabaseTablePage({ params }: IProps) {
  const { db, table } = params

  return <DataTable database={db} type="table" name={table} />
}
