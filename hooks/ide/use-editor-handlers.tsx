import { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MutableRefObject } from "react";
import { IAutoComplete } from "./use-editor-mount";
import { CompletionHelper } from "@/lib/completionHelper";

export default function useEditorHandlers() {
    function handleEditorFeatures(code: string = "", editorRef: MutableRefObject<editor.IStandaloneCodeEditor> | MutableRefObject<undefined>, monacoInstance: Monaco | null, autoComplete: MutableRefObject<IAutoComplete>) {
        if (!editorRef.current || !monacoInstance) return;

        const editor = editorRef.current;
        const position = editor.getPosition();
        if (!position) return;

        const offset = editor.getModel()?.getOffsetAt(position);
        const model = editor.getModel();
        if (!offset || !model) return;

        const completionHelper = new CompletionHelper(code);

        monacoInstance.editor.setModelMarkers(model, "kuneiformLang", completionHelper.errors);

        autoComplete.current = {
            tables: completionHelper.getTables(),
            actions: completionHelper.getActions(),
            params: completionHelper.getParams(offset),
            kfDefault: completionHelper.getKfDefault(offset),
            tableDefault: completionHelper.getTableDefault(offset),
            actionDefault: completionHelper.getActionDefault(offset),
            dbDeclaration: completionHelper.getDbDeclaration(offset),
            extensionList: completionHelper.getExtensions(),
        }

    }

    return { handleEditorFeatures }
}