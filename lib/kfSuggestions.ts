import * as monaco from "monaco-editor";

export const dbDeclaration = [
    {
        label: 'database ;',
        kind: monaco.languages.CompletionItemKind.Class,
        insertText: 'database ${1:};',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'New Database',
    },
]

export const kuneiformDefaults = [
    
    {
        label: 'table {}',
        kind: monaco.languages.CompletionItemKind.Class,
        insertText: 'table ${1:} {}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'New Table',
    },
    {
        label: 'action () {}',
        kind: monaco.languages.CompletionItemKind.Class,
        insertText: 'action ${1:} () ${2:} {}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'New Action',
    }
]

export const kuneiformTableSuggestions = [
    {
        label: 'text',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'text',
        detail: 'Text',
    },
    {
        label: 'int',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'int',
        detail: 'Integer',
    },
    {
        label: 'maxlen()',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'maxlen(${1:})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Max Length',
    },
    {
        label: 'minlen()',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'minlen(${1:})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Min Length',
    },
    {
        label: 'max()',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'max(${1:})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Max Integer',
    },
    {
        label: 'min()',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'min(${1:})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Min Integer',
    },
    {
        label: 'unique',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'unique',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Unique',
    },
    {
        label: 'index',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'index',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Index',
    },
    {
        label: 'notnull',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'notnull',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Not Null',
    },
    {
        label: 'primary',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'primary',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Primary',
    },
    {
        label: 'default',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'default',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Default',
    },
    {
        label: 'foreign_key',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'foreign_key (${1:}) references ${2:_table_}(${3:_column_})',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Foreign Key',
    },
    {
        label: 'on_delete',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'on_delete',
        detail: 'On Delete',
    },
    {
        label: 'on_update',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'on_update',
        detail: 'On Update',
    },
    {
        label: 'cascade',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'cascade',
        detail: 'Cascade',
    },
    {
        label: 'restrict',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'restrict',
        detail: 'Restrict',
    },
    {
        label: 'set_null',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'set_null',
        detail: 'Set Null',
    },
    {
        label: 'set_default',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'set_default',
        detail: 'Set Default',
    },
    {
        label: 'no_action',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'no_action',
        detail: 'No Action',
    },
]

export const kuneiformActionSuggestions = [
    {
        label: 'public',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'public',
        detail: 'Public',
    },
    {
        label: 'private',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'private',
        detail: 'Private',
    },
    {
        label: '@caller',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: '@caller',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Caller',
    },
    {
        label: '@action',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: '@action',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Action',
    },
    {
        label: '@dataset',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: '@dataset',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        detail: 'Dataset',
    }
]