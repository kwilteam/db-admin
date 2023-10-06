// clipboardy.d.ts
declare module "clipboardy" {
  export function write(content: string): Promise<void>
  export function read(): Promise<string>
}
