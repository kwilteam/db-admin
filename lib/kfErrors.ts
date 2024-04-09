export interface IKfError {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    message: string;
    severity: number;
    code: string;
}

export default class KuneiformErrorListener {
    errors: IKfError[] = [];

    syntaxError(recognizer: any, offendingSymbol: any, line: number, column: number, msg: string, e: any) {
        this.errors.push({
            startLineNumber: line,
            startColumn: column,
            endLineNumber: line,
            endColumn: column + 1,
            message: msg,
            severity: 3,
            code: 'SYNTAX_ERROR'
        })
    }

    getErrors() {
        return this.errors;
    }
}