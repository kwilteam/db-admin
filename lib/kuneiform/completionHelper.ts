import { KuneiformCollector } from "./kfCollector"
import { dbDeclaration, kuneiformMethodSuggestions, kuneiformDefaults, kuneiformTableSuggestions } from "./kfSuggestions"
import * as monaco from "monaco-editor"
import { IParseRes } from "./types"

export interface ICompletionItem {
    label: string;
    kind: monaco.languages.CompletionItemKind;
    insertText: string;
    insertTextRules?: monaco.languages.CompletionItemInsertTextRule;
    detail: string;
}

export interface IActionLocations {
    start: number;
    end: number;
    name: string;
    parameters: string[];
}

export interface IProcedureLocations extends IActionLocations { }

export interface ITableLocations {
    start: number;
    end: number;
}

interface IKfError {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    message: string;
    severity: number;
    code: string;
}

export class CompletionHelper {
    private collector: KuneiformCollector;

    constructor(parsedCode: IParseRes) {
        this.collector = new KuneiformCollector(parsedCode);
    }

    public getTables(): ICompletionItem[] {
        const tables = this.collector.getTables().map(t => {
            return {
                label: t,
                kind: 4,
                insertText: `${t}`,
                insertTextRules: 4,
                detail: "Table",
            }
        });

        return tables;
    }

    public getActions(offset: number): ICompletionItem[] {
        const actions = this.collector.getActions().map(t => {
            return {
                label: t,
                kind: 1,
                insertText: `${t}()`,
                insertTextRules: 4,
                detail: "Action",
            }
        });

        // Actions can only be called within other actions
        const isWithinAction = this.isWithinAction(offset);

        return isWithinAction ? actions : [];
    }

    public getProcedures(offset: number): ICompletionItem[] {
        const procedures = this.collector.getProcedures().map(t => {
            return {
                label: t,
                kind: 1,
                insertText: `${t}()`,
                insertTextRules: 4,
                detail: "Procedure",
            }
        });

        // procedures can be called within actions or other procedures
        const isWithinAction = this.isWithinAction(offset);
        const isWithinProcedure = this.isWithinProcedure(offset);

        return isWithinAction || isWithinProcedure ? procedures : [];
    }

    public getExtensions(): ICompletionItem[] {
        const extensions = this.collector.getExtensionList().map(t => {
            return {
                label: t,
                kind: 1,
                insertText: `${t}`,
                insertTextRules: 4,
                detail: "Extension",
            }
        });

        return extensions;
    }

    public getParams(offset: number): ICompletionItem[] {
        // once for actions
        const actionLocations = this.collector.getActionLocations();

        let params: ICompletionItem[] = [];

        for (const action of actionLocations) {
            if (action.start <= offset && action.end >= offset) {
                params.push(...action.parameters.map(t => {
                    return {
                        label: t,
                        kind: 4,
                        insertText: t,
                        detail: "Parameter",
                    }
                }));
            }
        }

        // filter for procedure, remove duplicates
        const procedureLocations = this.collector.getProcedureLocations();

        for (const procedure of procedureLocations) {
            if (procedure.start <= offset && procedure.end >= offset) {
                params.push(...procedure.parameters.map(t => {

                    return {
                        label: t,
                        kind: 4,
                        insertText: t,
                        detail: "Parameter",
                    }
                }));
            }
        }

        return params;
    }

    public getKfDefault(offset: number): ICompletionItem[] {
        const isInAction = this.isWithinAction(offset);
        const isInTable = this.isWithinTable(offset);
        const isInProcedure = this.isWithinProcedure(offset);
        const isDbDefined = this.collector.getDatabaseName() !== '';

        return !isInProcedure && !isInAction && !isInTable && isDbDefined ? kuneiformDefaults : [];
    }

    public getTableDefault(offset: number): ICompletionItem[] {
        const isInTable = this.isWithinTable(offset);

        return isInTable ? kuneiformTableSuggestions : [];
    }

    public getMethodDefault(offset: number): ICompletionItem[] {
        const isInAction = this.isWithinAction(offset);
        const isInProcedure = this.isWithinProcedure(offset);

        return isInAction || isInProcedure ? kuneiformMethodSuggestions : [];
    }

    public getDbDeclaration(): ICompletionItem[] {
        const isDbDefined = this.collector.getDatabaseName() !== '';
        console.log(this.collector.getDatabaseName())
        return !isDbDefined ? dbDeclaration : [];
    }

    public getErrors(): IKfError[] {
        const errors = this.collector.getErrors().map(e => {
            return {
                startLineNumber: e.node.start_line,
                startColumn: e.node.start_col,
                endLineNumber: e.node.end_line,
                endColumn: e.node.end_col,
                message: e.error,
                severity: 8,
                code: e.type
            }


        });

        return errors;
    }

    private isWithinAction(locationIndex: number): boolean {
        const actionLocations = this.collector.getActionLocations();
        let isWithinAction = false;

        actionLocations.length > 0 && actionLocations.forEach((action) => {
            if (action.start <= locationIndex && action.end >= locationIndex) {
                isWithinAction = true;
            }
        })

        return isWithinAction;
    }

    private isWithinTable(locationIndex: number): boolean {
        const tableLocations = this.collector.getTableLocations();
        let isWithinTable = false;

        tableLocations.length > 0 && tableLocations.forEach((table) => {
            if (table.start <= locationIndex && table.end >= locationIndex) {
                isWithinTable = true;
            }
        })

        return isWithinTable;
    }

    private isWithinProcedure(locationIndex: number): boolean {
        const procedureLocations = this.collector.getProcedureLocations();
        let isWithinProcedure = false;

        procedureLocations.length > 0 && procedureLocations.forEach((procedure) => {
            if (procedure.start <= locationIndex && procedure.end >= locationIndex) {
                isWithinProcedure = true;
            }
        })

        return isWithinProcedure;
    }
}