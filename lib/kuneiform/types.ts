import { CompiledKuneiform } from "@kwilteam/kwil-js/dist/core/payload";

export type IParseKuneiform = (schema: string) => Promise<IParseRes>

export interface IWasmExec {
    json: string;
}

export interface IParseRes {
    schema?: CompiledKuneiform;
    errors?: IKuneiformError[];
    schema_info?: ISchemaInfo;
}

export interface IKuneiformError {
    parser_name: string;
    type: ParserErrorType;
    error: string;
    node: INodeInfo;
}

enum ParserErrorType {
    SYNTAX_ERROR = "syntax",
    TYPE_ERROR = "type",
    SEMANTINC_ERROR = "semantic",
    UNKNOWN_ERROR = "unknown"
}

interface INodeInfo {
    start_line: number;
    start_col: number;
    end_line: number;
    end_col: number;
}

export interface ISchemaInfo {
    blocks: BlockInfo;
}

interface BlockInfo {
    [key: string]: INodeInfo & {
        abs_start: number;
        abs_end: number;
    }
}