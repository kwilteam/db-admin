import { CompiledKuneiform } from "@kwilteam/kwil-js/dist/core/payload";

export type IParseKuneiform = (schema: string) => Promise<IParseRes>

export interface IWasmExec {
    json: string;
}

export interface IParseRes {
    schema?: CompiledKuneiform;
    parse_errs?: IKuneiformError[];
    schema_info?: ISchemaInfo;
}

export interface IKuneiformError {
    parser_name: string;
    error: ParserErrorType;
    message: string;
    position: IPositionInfo;
}

enum ParserErrorType {
    SYNTAX_ERROR = "syntax",
    TYPE_ERROR = "type",
    SEMANTINC_ERROR = "semantic",
    UNKNOWN_ERROR = "unknown"
}

interface IPositionInfo {
    start_line: number;
    start_col: number;
    end_line: number;
    end_col: number;
}

export interface ISchemaInfo {
    blocks: BlockInfo;
}

interface BlockInfo {
    [key: string]: IPositionInfo & {
        abs_start: number;
        abs_end: number;
    }
}