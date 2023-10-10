interface IProps {
  params: {
    tab: string[]
  }
}

export default function SettingsPage({ params }: IProps) {
  const tab = params.tab?.[0]
  return <div className="flex min-h-screen">Settings: {tab}</div>
}
