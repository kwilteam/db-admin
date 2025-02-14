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
    if (typeof i === "string") {
        i = i.trim()
    }

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

    if (!Number.isNaN(Number(i))) {
        return Number(i)
    }

    // handle array
    if (i.startsWith("[") && i.endsWith("]")) {
        return JSON.parse(i).map(cleanInputs)
    }

    return i
} 
