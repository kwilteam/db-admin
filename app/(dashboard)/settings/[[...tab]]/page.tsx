interface Props {
  params: {
    tab: string[]
  }
}

export default function SettingsPage({ params }: Props) {
  const tab = params.tab?.[0]
  return <div className="flex min-h-screen">Settings: {tab}</div>
}
