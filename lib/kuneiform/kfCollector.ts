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
        this.errors = compiled?.parse_errs;
    }

    getTables() {
        if(!this.schema || !this.schema.tables) return []

        return this.schema.tables?.map(t => t.name as string);
    }

    getActions() {
        if(!this.schema || !this.schema.actions) return []
        return this.schema.actions?.map(a => a.name as string);
    }

    getProcedures() {
        if(!this.schema || !this.schema.procedures) return []
        return this.schema.procedures?.map(p => p.name as string);
    }

    getActionLocations(): IActionLocations[] {
        if(!this.schema?.actions || !this.schema_info) return []

        let actionLocations: IActionLocations[] = [];

        for(const action of this.schema.actions) {
            if(!action.name) continue;
            const cleanedParams = action.parameters as Array<string> || []
            const location = this.schema_info.blocks[action.name];

            const statement = action.body || '';

            cleanedParams.push(...this.extractExtensionParameter(statement, cleanedParams));

            // filter duplicates from cleanedParams
            const uniqueParams = Array.from(new Set(cleanedParams));

            actionLocations.push({
                name: action.name,
                start: location.abs_start,
                end: location.abs_end,
                parameters: uniqueParams
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
  
        if(!this.schema?.procedures || !this.schema_info) return []

        let procedureLocations: IProcedureLocations[] = [];

        for(const procedure of this.schema.procedures) {
            if(!procedure.name) continue;
            const rawParams = procedure.parameters || [];
    
            const cleanedParams = rawParams.map(p => p?.name) as string[];
            const location = this.schema_info.blocks[procedure.name];

            const statement = procedure.body || '';

            cleanedParams.push(...this.extractExtensionParameter(statement, cleanedParams));

            // filter duplicates from cleanedParams
            const uniqueParams = Array.from(new Set(cleanedParams));

            procedureLocations.push({
                name: procedure.name,
                start: location.abs_start,
                end: location.abs_end,
                parameters: uniqueParams
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
                    e.position.start_line === error.position.start_line && 
                    e.position.start_col === error.position.start_col && 
                    e.position.end_line === error.position.end_line && 
                    e.position.end_col === error.position.end_col
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