import { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MutableRefObject } from "react";
import { IAutoComplete } from "./use-editor-mount";
import { CompletionHelper } from "@/lib/kuneiform/completionHelper";
import { IParseKuneiform } from "@/lib/kuneiform/types";
import { kfLanguage } from "@/lib/kuneiform/kfLanguage";
import * as monaco from "monaco-editor"

export default function useEditorHandlers(parseKuneiform: IParseKuneiform | null) {
    async function handleEditorFeatures(code: string = "", editorRef: MutableRefObject<editor.IStandaloneCodeEditor> | MutableRefObject<undefined>, monacoInstance: Monaco | null, autoComplete: MutableRefObject<IAutoComplete>) {
        if (!editorRef.current || !monacoInstance || !parseKuneiform) return;

        const editor = editorRef.current;
        const position = editor.getPosition();
        if (!position) return;

        const offset = editor.getModel()?.getOffsetAt(position);
        const model = editor.getModel();
        if (!offset || !model) return;

        const parsed = await parseKuneiform(code);

        const completionHelper = new CompletionHelper(parsed);

        monacoInstance.editor.setModelMarkers(model, "kuneiformLang", completionHelper.getErrors());

        autoComplete.current = {
            tables: completionHelper.getTables(),
            actions: completionHelper.getActions(offset),
            procedures: completionHelper.getProcedures(offset),
            params: completionHelper.getParams(offset),
            kfDefault: completionHelper.getKfDefault(offset),
            tableDefault: completionHelper.getTableDefault(offset),
            actionDefault: completionHelper.getMethodDefault(offset),
            // TODO: This can be uncommented once https://github.com/kwilteam/kwil-db/issues/752 is resolved
            // dbDeclaration: completionHelper.getDbDeclaration(),
            extensionList: completionHelper.getExtensions(),
        }

        const definedActions = autoComplete.current.actions.map(a => a.label);
        const definedProcedures = autoComplete.current.procedures.map(p => p.label);

        kfLanguage.definedActions.push(...definedActions);
        kfLanguage.definedProcedures.push(...definedProcedures);

        monacoInstance.languages.setMonarchTokensProvider(
            "kuneiformLang",
            kfLanguage as monaco.languages.IMonarchLanguage,
        )
    }

    return { handleEditorFeatures }
}