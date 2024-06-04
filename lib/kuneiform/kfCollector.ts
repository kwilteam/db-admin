import KuneiformParserVisitor from "../ANTLR/KuneiformParserVisitor";
import { Action_declContext, Action_nameContext, Action_stmt_listContext, Database_directiveContext, Database_nameContext, Extension_nameContext, Param_listContext, Table_declContext, Table_nameContext } from "../ANTLR/KuneiformParser";

export class KuneiformCollector<Result> extends KuneiformParserVisitor<Result> {
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

    // super weird, but for some reason visitAction_name also captures the action body as a name
    // this goes way in kwil v0.8, so I am just going to push the action name from the visitAction_decl below
    // visitAction_name = (ctx: Action_nameContext) => {
    //     console.log(ctx.getChild(0).getText())
    //     const actionName = ctx.getChild(0) ? ctx.getChild(0).getText(): '';
    //     this.actions.push(actionName);
    //     return super.visitChildren(ctx); 
    // }

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
        this.actions.push(actionName);
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
        return this.removeEvenIndices(this.extensionList);
    }

    private removeEvenIndices(arr: string[]) {
        return arr.filter((_, index) => index % 2 !== 0);
      }
}