import { Column, ProcedureReturn, Table } from "@kwilteam/kwil-js/dist/core/database";

export interface IColumn {
    name: string
    type?: string
}

export function getColumnsFromProcedure(columnNames: string[], returnTypes?: ProcedureReturn): IColumn[] {
    const map = new Map<string, string>()

    if(returnTypes) {
        for (const returnType of returnTypes.fields) {
            map.set(returnType.name, returnType.type.name)
        }
    }
    
    return columnNames.map((column) => ({
        name: column,
        type: map.get(column) || undefined
    }));
}

export function getColumnsFromSchema(columnNames: string[] | undefined, currentTable: string, tables?: readonly Table[]): IColumn[] | undefined {
    const map = new Map<string, Column>()

    if(tables) {
        for (const table of tables) {
            if(table.name === currentTable) {
                for (const column of table.columns) {
                    map.set(column.name, column)
                }
            }
        }
    }
    
    return columnNames?.map((column) => ({
        name: column,
        type: map.get(column)?.type.name || undefined
    }));
}