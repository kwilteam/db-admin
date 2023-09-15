interface IProps {
  params: {
    db: string
    action: string
  }
}

// TODO: Verify that the action exists on the database before rendering form
export default async function DatabaseActionPage({ params }: IProps) {
  const { db, action } = params
  return `Action ${action} in database ${db}`
}
