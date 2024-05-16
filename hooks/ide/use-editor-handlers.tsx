import { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MutableRefObject } from "react";
import { IAutoComplete } from "./use-editor-mount";
import { CompletionHelper } from "@/lib/kuneiform/completionHelper";
import { IParseKuneiform } from "@/lib/kuneiform/types";

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
            // done
            tables: completionHelper.getTables(),
            // done
            actions: completionHelper.getActions(),
            procedures: completionHelper.getProcedures(),
            // done
            params: completionHelper.getParams(offset),
            // done
            kfDefault: completionHelper.getKfDefault(offset),
            // done
            tableDefault: completionHelper.getTableDefault(offset),
            // done
            actionDefault: completionHelper.getMethodDefault(offset),
            // done
            dbDeclaration: completionHelper.getDbDeclaration(),
            //done
            extensionList: completionHelper.getExtensions(),
        }
    }

    return { handleEditorFeatures }
}