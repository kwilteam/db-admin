import { Column, ProcedureReturn, Table } from "@kwilteam/kwil-js/dist/core/database";
import { ITableInfo } from "./database-types";
import { ValueType } from "@kwilteam/kwil-js/dist/utils/types";

export interface IColumn {
    name: string
    type?: string
}

export function getColumnsFromProcedure(columnNames: string[]): IColumn[] {
    const map = new Map<string, string>()
    
    return columnNames.map((column) => ({
        name: column,
        type: map.get(column) || undefined
    }));
}

export function cleanInputs(i: string): ValueType {
    i = i.trim()
    console.log(!Number.isNaN(i))
    
    if (i === "true") {
        return true
    }

    if (i === "false") {
        return false
    }

    if (i === "null") {
        return null
    }

    if (i === "undefined") {
        return undefined
    }

    if (!Number.isNaN(i)) {
        return Number(i)
    }

    // handle array
    if (i.startsWith("[") && i.endsWith("]")) {
        return cleanInputs(JSON.parse(i))
    }

    return i
} 

// export function getColumnsFromSchema(columnNames: string[] | undefined, currentTable: string, tables?: ITableInfo[]): IColumn[] | undefined {
//     const map = new Map<string, Column>()

//     if(tables) {
//         for (const table of tables) {
//             if(table.name === currentTable) {
//                 for (const column of table.columns) {
//                     map.set(column.name, column)
//                 }
//             }
//         }
//     }
    
//     return columnNames?.map((column) => ({
//         name: column,
//         type: map.get(column)?.type.name || undefined
//     }));
// }