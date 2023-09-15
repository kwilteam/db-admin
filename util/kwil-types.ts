export interface DatabaseDictionary {
  [key: string]: Database<string> | null
}

// export interface ISchema {
//   name: string
//   tables: Table<string>[]
//   actions: ActionSchema[]
// }

// NOTE: This is a copy of the Kwil Schema types with the readonly properties removed
// type ValueType = string | number | null
declare enum DataType {
  NULL = "NULL",
  TEXT = "TEXT",
  INT = "INT",
}
declare enum AttributeType {
  PRIMARY_KEY = "PRIMARY_KEY",
  UNIQUE = "UNIQUE",
  NOT_NULL = "NOT_NULL",
  DEFAULT = "DEFAULT",
  MIN = "MIN",
  MAX = "MAX",
  MIN_LENGTH = "MIN_LENGTH",
  MAX_LENGTH = "MAX_LENGTH",
}
declare enum IndexType {
  BTREE = "BTREE",
  UNIQUE_BTREE = "UNIQUE_BTREE",
}
export interface Database<T> {
  get name(): string
  get owner(): string
  get tables(): Table<T>[] // NOTE: Had to convert this to array to get it to work
  get actions(): ActionSchema[] // NOTE: Had to convert this to array to get it to work
}
export interface Table<T> {
  get name(): string
  get columns(): Column<T>[] // NOTE: Had to convert this to array to get it to work
  get indexes(): Index
}
interface Column<T> {
  get name(): string
  get type(): DataType
  get attributes(): Attribute<T>
}
interface Attribute<T> {
  get type(): AttributeType
  get value(): T
}
interface Index {
  get name(): string
  get columns(): string
  get type(): IndexType
}
export interface ActionSchema {
  get name(): string
  get public(): boolean
  get inputs(): string[] // NOTE: Had to convert this to array to get it to work
  get statements(): string[] // NOTE: Had to convert this to array to get it to work
}
interface SelectQuery {
  get dbid(): string
  get query(): string
}
