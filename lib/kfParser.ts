import { CharStreams, CommonTokenStream } from "antlr4"
import KuneiformLexer from "./ANTLR/KuneiformLexer"
import KuneiformParser from "./ANTLR/KuneiformParser"
import KuneiformErrorListener from "./kfErrors"
import { editor } from "monaco-editor"
import * as monaco from "monaco-editor"
import { Monaco } from "@monaco-editor/react"

function parse(code: string) {
    const inputStream = CharStreams.fromString(code)
    const lexer = new KuneiformLexer(inputStream)
    lexer.removeErrorListeners()
    const kuneiformErrorListener = new KuneiformErrorListener()
    lexer.addErrorListener(kuneiformErrorListener)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new KuneiformParser(tokenStream)
    parser.removeErrorListeners()
    parser.addErrorListener(kuneiformErrorListener)

    // get ast and errors
    const ast = parser.source_unit()
    const errors = kuneiformErrorListener.getErrors()

    return { ast, errors }
}

export function parseAndGetAstRoot(code:string ) {
    const { ast } = parse(code)
    return ast
}

export function handleEditorChange(value: string | undefined, editor: editor.IStandaloneCodeEditor | undefined, monacoInstance: Monaco | null) {
    if (!editor || !value) return;

    const position = editor.getPosition();
    if (!position ) return;
    const offset = editor.getModel()?.getOffsetAt(position);
    const model = editor.getModel();
    if (!offset || !model) return;

    const { errors } = parse(value);

    if(!monacoInstance) return;

    monacoInstance.editor.setModelMarkers(model, "kuneiformLang", errors);
}