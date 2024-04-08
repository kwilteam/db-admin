import * as monaco from "monaco-editor";
import KuneiformParserVisitor from "./ANTLR/KuneiformParserVisitor";
import { Action_declContext, Action_nameContext, Action_stmt_listContext, Database_directiveContext, Database_nameContext, Extension_nameContext, Param_listContext, Table_declContext, Table_nameContext } from "./ANTLR/KuneiformParser";
import { parseAndGetAstRoot } from "./kfParser";

function removeEvenIndices(arr: string[]) {
    return arr.filter((_, index) => index % 2 !== 0);
  }

interface IParser {
    visitDatabase_directive(ctx: Database_directiveContext): any;
    visitTable_name(ctx: any): any;
    visitAction_name(ctx: any): any;
    visitParam_list(ctx: any): any;
    visitAction_decl(ctx: any): any;
    visitTable_decl(ctx: any): any;
    visitAction_stmt_list(ctx: any): any;
    visitExtension_name(ctx: any): any;

}

class TableCollector<Result> extends KuneiformParserVisitor<Result> {
    public database: string[];
    public tables: string[];
    public actions: string[];
    public paramList: string[][];
    public actionLocations: { actionName: string, start: number, end: number  }[];
    public tableLocations: { start: number, end: number }[];
    public actionStmtList: string[][];
    public extensionList: string[];

    constructor() {
        super();
        this.database = []
        this.tables = [];
        this.actions = [];
        this.paramList = [];
        this.actionLocations = [];
        this.tableLocations = [];
        this.actionStmtList = [];
        this.extensionList = [];
    }

    visitDatabase_directive = (ctx: Database_directiveContext) => {
        // Assuming database name is the first child
        const databaseName = ctx.getChild(0) ? ctx.getChild(0).getText(): '';
        this.database.push(databaseName);
        return super.visitChildren(ctx);
    }

    visitTable_name = (ctx: Table_nameContext) => {
        const tableName = ctx.getChild(0) ? ctx.getChild(0).getText(): '';
        this.tables.push(tableName);
        return super.visitChildren(ctx);
    }

    visitAction_name = (ctx: Action_nameContext) => {
        const actionName = ctx.getChild(0) ? ctx.getChild(0).getText(): '';
        this.actions.push(actionName);
        return super.visitChildren(ctx); 
    }

    visitParam_list = (ctx: Param_listContext) => {
        let child: string[] = [];
        ctx.children && ctx.children.length > 0 && ctx.children.forEach((c) => {
            if(c.getText() !== ',') {
                child.push(c.getText());
            }
        })
        this.paramList.push(child);
        return super.visitChildren(ctx);
    }

    visitAction_decl = (ctx: Action_declContext) => {
        const actionName = ctx.getChild(1) ? ctx.getChild(1).getText(): '';
        const start = ctx.start.start;
        const end = ctx.stop?.stop ? ctx.stop.stop : 0;
        this.actionLocations.push({ actionName, start, end });

        return super.visitChildren(ctx);
    }

    visitTable_decl = (ctx: Table_declContext) => {
        const start = ctx.start.start;
        const end = ctx.stop?.stop ? ctx.stop.stop : 0;
        this.tableLocations.push({ start, end });

        return super.visitChildren(ctx);
    }

    visitAction_stmt_list = (ctx: Action_stmt_listContext) => {
        const childLength = ctx.children ? ctx.children.length : 0;
        let stmtArray = [];

        for (let i = 0; i < childLength; i++) {
            const stmt = ctx.getChild(i) ? ctx.getChild(i).getText(): '';
            if(stmt) stmtArray.push(stmt);
        }

        this.actionStmtList.push(stmtArray);
        return super.visitChildren(ctx);
    }

    visitExtension_name = (ctx: Extension_nameContext) => {
        const extName = ctx.getChild(0) ? ctx.getChild(0).getText(): '';
        this.extensionList.push(extName);

        return super.visitChildren(ctx);
    }

    getTables() {
        return this.tables;
    }

    getActions() {
        return this.actions;
    }

    getParams() {
        return this.paramList;
    }

    getActionLocations() {
        return this.actionLocations;
    }

    getTableLocations() {
        return this.tableLocations;
    }

    getDatabaseName() {
        return this.database;
    }

    getActionStmtList() {
        return this.actionStmtList;
    }

    getExtensionList() {
        // Every even indice returned by the visitor is the extension name, not the alias, so we want to remove those.
        return removeEvenIndices(this.extensionList);
    }
}

function getCompletions (code: string) {
    const ast = parseAndGetAstRoot(code);
    const collector = new TableCollector();
    collector.visitDatabase_directive(ast.database_directive());

    const paramMap = new Map();
    collector.paramList.length > 0 && collector.paramList.forEach((param, index) => {
        paramMap.set(collector.actions[index], param);
    });


    return {
        tables: collector.getTables(),
        actions: collector.getActions(),
        paramList: paramMap,
        actionLocations: collector.getActionLocations(),
        tableLocations: collector.getTableLocations(),
        databaseName: collector.getDatabaseName(),
        actionStatements: collector.getActionStmtList(),
        extensionList: collector.getExtensionList()
    }
}

export function completeTables(code: string) {
    const tables = getCompletions(code).tables;
    const map = tables.map(t => {
        return {
            label: t,
            kind: monaco.languages.CompletionItemKind.Variable,
            insertText: `${t}`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: "Table",
        }
    })
    return map;
}

export function completeActions(code: string) {
    const actionsObj = getCompletions(code).actions;
    const map = actionsObj.map(t => {
        return {
            label: t,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: `${t}()`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: "Action",
        }
    });
    return map;
}

export function completeExtensions(code: string) {
    const extensions = getCompletions(code).extensionList;
    const map = extensions.map(t => {
        return {
            label: t,
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: `${t}`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            detail: `${t} Extension`
        }
    });
    return map;
}

function spliceParams(arr: string[]) {
    let paramList: any[] = [];

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

export function completeParamList(code: string, locationIndex: number) {
    const params = getCompletions(code).paramList;
    let actionLocations = getCompletions(code).actionLocations;
    const actionStatements = getCompletions(code).actionStatements


    const cleanActionLocations = actionLocations.map((act, i) => {
        const stmt = actionStatements[i] ? spliceParams(actionStatements[i]) : []
        return {
            act,
            stmt
        }
    })

    let currentAction = '';

    let extParams: any[] = []

    cleanActionLocations.length > 0 && cleanActionLocations.forEach((action, index) => {
        if(action.act.start <= locationIndex && action.act.end >= locationIndex) {
            currentAction = action.act.actionName;
            extParams = action.stmt
        }
    })

    let map: any[] = [];

    if(currentAction !== '') {
        const paramList: string[] = params.get(currentAction);
        if (paramList && paramList.length > 0) {
            map = paramList.map(t => {
                return {
                    label: t,
                    kind: monaco.languages.CompletionItemKind.Variable,
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
                kind: monaco.languages.CompletionItemKind.Variable,
                insertText: param,
                detail: "Extension Parameter",
            })
        })
    }
    return map;
}

export function isWithinAction(code: string, locationIndex: number) {
    const actionLocations = getCompletions(code).actionLocations;
    let isWithinAction = false;

    actionLocations.length > 0 && actionLocations.forEach((action, index) => {
        if(action.start <= locationIndex && action.end >= locationIndex) {
            isWithinAction = true;
        }
    })

    return isWithinAction;
}

export function isWithinTable(code: string, locationIndex: number) {
    const tableLocations = getCompletions(code).tableLocations;
    let isWithinTable = false;

    tableLocations.length > 0 && tableLocations.forEach((table, index) => {
        if(table.start <= locationIndex && table.end >= locationIndex) {
            isWithinTable = true;
        }
    })

    return isWithinTable;
}

export function isDbDefined(code: string) {
   const db = getCompletions(code).databaseName;

   if(
        db[1] === "<missing 'database'>" ||
        db[0] === 'database' ||
        db[0].startsWith('database;') ||
        db[0] === 'database<missing undefined>' ||
        db[0] === '~' ||
        db[1] === '' ||
        db[1] === 'action' ||
        db[1] === 'table'
   ) {
        return false;
   }

   return true;
}