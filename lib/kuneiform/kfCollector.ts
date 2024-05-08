import { CompiledKuneiform } from "@kwilteam/kwil-js/dist/core/payload";
import { IKuneiformError, IParseRes, ISchemaInfo } from "./types";
import { IActionLocations, IProcedureLocations, ITableLocations } from "./completionHelper";

export class KuneiformCollector {
    private schema?: CompiledKuneiform;
    private schema_info?: ISchemaInfo;
    private errors?: IKuneiformError[];

    constructor(compiled: IParseRes) {
        this.schema = compiled?.schema;
        this.schema_info = compiled?.schema_info;
        this.errors = compiled?.errors;
    }

    getTables() {
        if(!this.schema || !this.schema.tables) return []

        return this.schema.tables?.map(t => t.name as string);
    }

    getActions() {
        if(!this.schema || !this.schema.actions) return []
        return this.schema.actions?.map(a => a.name as string);
    }

    getActionLocations(): IActionLocations[] {
        if(!this.schema?.actions || !this.schema_info) return []

        let actionLocations: IActionLocations[] = [];

        for(const action of this.schema.actions) {
            if(!action.name) continue;
            // @ts-ignore  - action.parameters will exist once kwil-js is updated for v0.8
            const cleanedParams = action.parameters || [];
            const location = this.schema_info.blocks[action.name];

            // @ts-ignore - action.body will exist once kwil-js is updated for v0.8
            const statement = action.body || '';

            cleanedParams.push(...this.extractExtensionParameter(statement, cleanedParams));

            actionLocations.push({
                name: action.name,
                start: location.abs_start,
                end: location.abs_end,
                parameters: cleanedParams
            });
        }

        return actionLocations;
    }

    getTableLocations(): ITableLocations[] {
        if(!this.schema?.tables || !this.schema_info) return []

        let tableLocations: ITableLocations[] = [];

        for(const table of this.schema.tables) {
            if(!table.name) continue;

            const location = this.schema_info.blocks[table.name];

            tableLocations.push({
                start: location.abs_start,
                end: location.abs_end
            });
        }

        return tableLocations;
    }

    getProcedureLocations(): IProcedureLocations[] {
        // @ts-ignore - schema_info will exist once kwil-js is updated for v0.8
        if(!this.schema?.procedures || !this.schema_info) return []

        let procedureLocations: IProcedureLocations[] = [];

        // @ts-ignore - schema_info will exist once kwil-js is updated for v0.8
        for(const procedure of this.schema.procedures) {
            if(!procedure.name) continue;
            const rawParams = procedure.parameters || [];
            // @ts-ignore - procedure.parameters will exist once kwil-js is updated for v0.8
            const cleanedParams = rawParams.map(p => p.name);
            const location = this.schema_info.blocks[procedure.name];

            const statement = procedure.body || '';

            cleanedParams.push(...this.extractExtensionParameter(statement, cleanedParams));

            procedureLocations.push({
                name: procedure.name,
                start: location.abs_start,
                end: location.abs_end,
                parameters: cleanedParams
            });
        }

        return procedureLocations;
    }

    getDatabaseName() {
        if(!this.schema) return '';

        return this.schema.name;
    }

    // getActionStmtList() {
    //     // return this.actionStmtList;
    // }

    getExtensionList() {
        if (!this.schema || !this.schema.extensions) return [];

        return this.schema.extensions.map(e => e.name as string);
    }

    getErrors() {
        // filter out errors with the same position
        let uniqueErrors: IKuneiformError[] = [];

        if(!this.errors) return uniqueErrors;

        for(const error of this.errors) {
            if(!uniqueErrors.find(
                e => 
                    e.node.start_line === error.node.start_line && 
                    e.node.start_col === error.node.start_col && 
                    e.node.end_line === error.node.end_line && 
                    e.node.end_col === error.node.end_col
                )) {
                uniqueErrors.push(error);
            }
        }

        return uniqueErrors;
    }

    // within the body of a statement, there may be an extension parameter that is not part of the action parameters. We want to retrieve this parameter so it can be used in the completion list.
    private extractExtensionParameter(stmt: string, actionParameters: string[]) {
        const allParams = stmt.match(/\$\w+\b/g)
        let extensionParams: string[] = [];
        if(allParams) {
            for(const param of allParams) {
                if(!actionParameters.includes(param)) {
                    extensionParams.push(param);
                }
            }
        }
        

        return extensionParams;
    }
}