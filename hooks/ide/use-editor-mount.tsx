import { useEffect, useRef, useState } from "react"
import * as monaco from "monaco-editor"
import { Monaco } from "@monaco-editor/react"
import { kfLanguage, customTheme, autoClosingPairs } from "@/lib/kuneiform/kfLanguage"
import { ICompletionItem } from "@/lib/kuneiform/completionHelper";

export interface IAutoComplete {
  tables: ICompletionItem[];
  actions: ICompletionItem[];
  procedures: ICompletionItem[];  
  params: ICompletionItem[];
  kfDefault: ICompletionItem[];
  tableDefault: ICompletionItem[];
  actionDefault: ICompletionItem[];
  // TODO: This can be uncommented once https://github.com/kwilteam/kwil-db/issues/752 is resolved
  // dbDeclaration: ICompletionItem[];
  extensionList: ICompletionItem[];

  [key: string]: any[];
}

export default function useEditorMount() {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | undefined>(
    undefined,
  )

  const completionProviderRef = useRef<monaco.IDisposable | null>(null)

  // clear completion item provider on unmount
  useEffect(() => {
    return () => {
      if (completionProviderRef.current) {
        completionProviderRef.current.dispose()
      }
    }
  }, []);

  const autoCompleteRef = useRef<IAutoComplete>({
    tables: [],
    actions: [],
    procedures: [],
    params: [],
    kfDefault: [],
    tableDefault: [],
    actionDefault: [],
    // TODO: This can be uncommented once https://github.com/kwilteam/kwil-db/issues/752 is resolved
    // dbDeclaration: [],
    extensionList: [],
  })

  const [monacoInstance, setMonacoInstance] = useState<Monaco | null>(null)

  const handleEditorDidMount = (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: Monaco,
  ) => {
    editorRef.current = editor

    monacoInstance.languages.register({ id: "kuneiformLang" })

    monacoInstance.languages.setMonarchTokensProvider(
      "kuneiformLang",
      kfLanguage as monaco.languages.IMonarchLanguage,
    )

    monacoInstance.editor.defineTheme(
      "kuneiformTheme",
      customTheme as monaco.editor.IStandaloneThemeData,
    )

    monacoInstance.editor.setTheme("kuneiformTheme")

    monacoInstance.languages.setLanguageConfiguration('kuneiformLang', autoClosingPairs);

    // if there is a completion provider already, dispose of it
    if (completionProviderRef.current) {
      completionProviderRef.current.dispose()
    }

    completionProviderRef.current = monacoInstance.languages.registerCompletionItemProvider("kuneiformLang", {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn
        };

        const suggestionKeys = [
          'tables',
          'actions',
          'procedures',
          'params',
          'kfDefault',
          'tableDefault',
          'actionDefault',
          // 'dbDeclaration',
          'extensionList'
        ]

        const suggestions = suggestionKeys.flatMap(key => {
          return (autoCompleteRef.current[key] || []).map(suggestion => ({ ...suggestion, range }));
        })

        return { suggestions }
      },
      triggerCharacters: ["~"]
    });

    setMonacoInstance(monacoInstance)
  }

  return { handleEditorDidMount, editorRef, monacoInstance, autoCompleteRef }
}
