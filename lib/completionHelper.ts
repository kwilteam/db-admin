import { CharStreams, CommonTokenStream } from "antlr4"
import { KuneiformCollector } from "./kfCollector"
import KuneiformErrorListener, { IKfError } from "./kfErrors"
import { dbDeclaration, kuneiformActionSuggestions, kuneiformDefaults, kuneiformTableSuggestions } from "./kfSuggestions"
import KuneiformLexer from "./ANTLR/KuneiformLexer"
import KuneiformParser from "./ANTLR/KuneiformParser"
import * as monaco from "monaco-editor"

export interface ICompletionItem {
    label: string;
    kind: monaco.languages.CompletionItemKind;
    insertText: string;
    insertTextRules?: monaco.languages.CompletionItemInsertTextRule;
    detail: string;
  }

interface IActionLocations {
    start: number;
    end: number;
    actionName: string;
}

interface ITableLocations {
    start: number;
    end: number;
}

export class CompletionHelper {
    private tables: string[]
    private actions: string[]
    private paramList: Map<string, string[]>
    private actionLocations: IActionLocations[]
    private tableLocations: ITableLocations[] 
    private actionStatements: string[][] 
    private extensionList: string[]
    private isDbDefined: boolean
    public errors: IKfError[]

    constructor(code: string) {
        const { ast, errors } = CompletionHelper.parse(code);
        const collector = new KuneiformCollector();
        collector.visitChildren(ast);

        this.tables = collector.getTables();
        this.actions = collector.getActions();
        this.paramList = CompletionHelper.buildParamMap(collector);
        this.actionLocations = collector.getActionLocations();
        this.tableLocations = collector.getTableLocations();
        this.actionStatements = collector.getActionStmtList();
        this.extensionList = collector.getExtensionList();
        this.isDbDefined = CompletionHelper.isDbDefined(code);

        this.errors = errors;
    }

    public getTables(): ICompletionItem[] {
        const tables = this.tables.map(t => {
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

    public getActions(): ICompletionItem[] {
        const actionsObj = this.actions;
        const map = actionsObj.map(t => {
            return {
                label: t,
                kind: 1,
                insertText: `${t}()`,
                insertTextRules: 4,
                detail: "Action",
            }
        });

        return map;
    }

    public getExtensions(): ICompletionItem[] {
        const extensions = this.extensionList;
        const map = extensions.map(t => {
            return {
                label: t,
                kind: 1,
                insertText: `${t}`,
                insertTextRules: 4,
                detail: "Extension",
            }
        });

        return map;
    }

    public getParams(offset: number): ICompletionItem[] {
        const params = this.paramList;
        const actionLocations = this.actionLocations;
        const actionStatements = this.actionStatements;

        const cleanActionLocations = actionLocations.map((act, i) => {
            const stmt = actionStatements[i] ? this.spliceParams(actionStatements[i]) : [];
            return {
                act,
                stmt
            }
        })

        let currentAction = '';
        let extParams: any[] = []

        cleanActionLocations.length > 0 && cleanActionLocations.forEach((action) => {
            if(action.act.start <= offset && action.act.end >= offset) {
                currentAction = action.act.actionName;
                extParams = action.stmt
            }
        })
    
        let map: ICompletionItem[] = [];
    
        if(currentAction !== '') {
            const paramList = params.get(currentAction);
            if (paramList && paramList.length > 0) {
                map = paramList.map(t => {
                    return {
                        label: t,
                        kind: 4,
                        insertText: t,
                        detail: "Parameter",
                    }
                });
            }
        }
    
        if(currentAction !== '') {
            extParams.forEach((param) => {
                param && map.push({
                    label: param,
                    kind: 4,
                    insertText: param,
                    detail: "Extension Parameter",
                })
            })
        }
        return map;
    }

    public getKfDefault(offset: number): ICompletionItem[] {
        const isInAction = this.isWithinAction(offset);
        const isInTable = this.isWithinTable(offset);
        const isDbDefined = this.isDbDefined;

        return !isInAction && !isInTable && isDbDefined ? kuneiformDefaults : [];
    }

    public getTableDefault(offset: number): ICompletionItem[] {
        const isInTable = this.isWithinTable(offset);

        return isInTable ? kuneiformTableSuggestions : [];
    }

    public getActionDefault(offset: number): ICompletionItem[] {
        const isInAction = this.isWithinAction(offset);

        return isInAction ? kuneiformActionSuggestions : [];
    }

    public getDbDeclaration(offset: number): ICompletionItem[] {
        const isDbDefined = this.isDbDefined;

        return !isDbDefined ? dbDeclaration : [];
    }

    private isWithinAction(locationIndex: number): boolean {
        const actionLocations = this.actionLocations;
        let isWithinAction = false;
    
        actionLocations.length > 0 && actionLocations.forEach((action) => {
            if(action.start <= locationIndex && action.end >= locationIndex) {
                isWithinAction = true;
            }
        })
    
        return isWithinAction;
    }

    private isWithinTable(locationIndex: number): boolean {
        const tableLocations = this.tableLocations;
        let isWithinTable = false;
    
        tableLocations.length > 0 && tableLocations.forEach((table) => {
            if(table.start <= locationIndex && table.end >= locationIndex) {
                isWithinTable = true;
            }
        })
    
        return isWithinTable;
    }

    private spliceParams(arr: string[]) {
        let paramList: (string | null)[] = [];
    
        if (arr && arr.length > 0) {
            arr.forEach((str) => {
                if(str[0] === "$") {
                    const params = str.split("=")
                    const vars = params[0].match(/[$]\w+/g)
                    paramList = paramList.concat(vars)
                } 
            })
        }
        return paramList
    }

    private static parse(code: string) {
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

    private static buildParamMap<R>(collector: KuneiformCollector<R>): Map<any, any> {
        const paramMap = new Map();
        collector.paramList.length > 0 && collector.paramList.forEach((param, index) => {
            paramMap.set(collector.actions[index], param);
        });

        return paramMap;
    }

    private static isDbDefined(code: string) {
        const dbDirective = code.startsWith('database');
        const regex = /database\s+\w+\s*;/;
        const semicolon = regex.test(code);
    
        return dbDirective && semicolon;
    }
}