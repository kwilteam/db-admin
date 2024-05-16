export const dbDeclaration = [
    {
        label: 'database ;',
        kind: 5,
        insertText: 'database ${1:};',
        insertTextRules: 4,
        detail: 'New Database',
    },
]

export const kuneiformDefaults = [
    
    {
        label: 'table {}',
        kind: 5,
        insertText: 'table ${1:} {}',
        insertTextRules: 4,
        detail: 'New Table',
    },
    {
        label: 'action () {}',
        kind: 5,
        insertText: 'action ${1:} () {}',
        insertTextRules: 4,
        detail: 'New Action',
    },
    {
        label: 'procedure () returns () {}',
        kind: 5,
        insertText: 'procedure ${1:} () returns () {}',
        insertTextRules: 4,
        detail: 'New Procedure',
    },
    // TODO: Remove once https://github.com/kwilteam/kwil-db/issues/752 is resolved
    ...dbDeclaration
]

export const kuneiformTableSuggestions = [
    {
        label: 'text',
        kind: 17,
        insertText: 'text',
        detail: 'Text',
    },
    {
        label: 'int',
        kind: 17,
        insertText: 'int',
        detail: 'Integer',
    },
    {
        label: 'maxlen()',
        kind: 1,
        insertText: 'maxlen(${1:})',
        insertTextRules: 4,
        detail: 'Max Length',
    },
    {
        label: 'minlen()',
        kind: 1,
        insertText: 'minlen(${1:})',
        insertTextRules: 4,
        detail: 'Min Length',
    },
    {
        label: 'max()',
        kind: 1,
        insertText: 'max(${1:})',
        insertTextRules: 4,
        detail: 'Max Integer',
    },
    {
        label: 'min()',
        kind: 1,
        insertText: 'min(${1:})',
        insertTextRules: 4,
        detail: 'Min Integer',
    },
    {
        label: 'unique',
        kind: 1,
        insertText: 'unique',
        insertTextRules: 4,
        detail: 'Unique',
    },
    {
        label: 'index',
        kind: 1,
        insertText: 'index',
        insertTextRules: 4,
        detail: 'Index',
    },
    {
        label: 'notnull',
        kind: 1,
        insertText: 'notnull',
        insertTextRules: 4,
        detail: 'Not Null',
    },
    {
        label: 'primary',
        kind: 1,
        insertText: 'primary',
        insertTextRules: 4,
        detail: 'Primary',
    },
    {
        label: 'default',
        kind: 1,
        insertText: 'default',
        insertTextRules: 4,
        detail: 'Default',
    },
    {
        label: 'foreign_key',
        kind: 1,
        insertText: 'foreign_key (${1:}) references ${2:_table_}(${3:_column_})',
        insertTextRules: 4,
        detail: 'Foreign Key',
    },
    {
        label: 'on_delete',
        kind: 17,
        insertText: 'on_delete',
        detail: 'On Delete',
    },
    {
        label: 'on_update',
        kind: 17,
        insertText: 'on_update',
        detail: 'On Update',
    },
    {
        label: 'cascade',
        kind: 17,
        insertText: 'cascade',
        detail: 'Cascade',
    },
    {
        label: 'restrict',
        kind: 17,
        insertText: 'restrict',
        detail: 'Restrict',
    },
    {
        label: 'set_null',
        kind: 17,
        insertText: 'set_null',
        detail: 'Set Null',
    },
    {
        label: 'set_default',
        kind: 17,
        insertText: 'set_default',
        detail: 'Set Default',
    },
    {
        label: 'no_action',
        kind: 17,
        insertText: 'no_action',
        detail: 'No Action',
    },
]

export const kuneiformMethodSuggestions = [
    {
        label: 'public',
        kind: 17,
        insertText: 'public',
        detail: 'Public',
    },
    {
        label: 'private',
        kind: 17,
        insertText: 'private',
        detail: 'Private',
    },
    {
        label: '@caller',
        kind: 1,
        insertText: '@caller',
        insertTextRules: 4,
        detail: 'Caller',
    },
    {
        label: '@action',
        kind: 1,
        insertText: '@action',
        insertTextRules: 4,
        detail: 'Action',
    },
    {
        label: '@dataset',
        kind: 1,
        insertText: '@dataset',
        insertTextRules: 4,
        detail: 'Dataset',
    }
]