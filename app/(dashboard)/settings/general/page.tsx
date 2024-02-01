import Alert from "@/components/Alert"
import Header from "@/components/Settings/General/Header"

const getSettings = async () => {
  try {
    return {
      adminAccount: "Bla",
      kwilProvider: "http://localhost:8080",
    }
  } catch (err) {
    console.error(err)
    return undefined
  }
}

export default async function GeneralPage() {
  const settings = await getSettings()

  return (
    <div className="flex max-h-mobile min-h-mobile flex-col lg:min-h-screen">
      <Header />

      <div className="flex-1 overflow-scroll bg-slate-50 p-2">
        <div className="flex flex-col gap-2 border border-slate-200 bg-white p-2 text-sm">
          {!settings && (
            <Alert
              type="error"
              text="An error occurred while loading settings."
            />
          )}
          {settings && (
            <>
              <SettingsElement
                name="Admin Account"
                value={settings.adminAccount}
                editable={false}
              />
              <SettingsElement
                name="Kwil Provider"
                value={settings.kwilProvider}
                editable={false}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

interface ISettingsElementProps {
  name: string
  value: string
  editable: boolean
}

const SettingsElement = ({ name, value, editable }: ISettingsElementProps) => {
  return (
    <div className="m-1 flex flex-col gap-1">
      <div className="font-medium">{name}</div>
      <div>
        <input
          className="w-full rounded border border-slate-200 p-1 md:w-1/3"
          value={value}
          disabled={!editable}
        />
      </div>
    </div>
  )
}
