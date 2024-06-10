import { sqlKeywords } from "./sqlKeywords"
import type { languages } from "monaco-editor/esm/vs/editor/editor.api.d.ts"

export const kfLanguage = {
    // Set defaultToken to invalid to see what you do not tokenize yet
    defaultToken: '',
    databaseDefinition: ['database'],
    keywords: [
        'table', 'action', 'use', 'procedure', 'foreign'
    ],
    definedActions: [''],
    definedProcedures: [''],
    bools: ['true', 'false'],
    colType: ['text', 'int', 'uuid', 'blob', 'bool', 'uint256', 'decimal'],
    modifier: ['maxlen', 'minlen', 'unique', 'max', 'min', 'notnull', 'primary', 'default', '@caller', '@action', '@dataset'],
    indexTypes: ['unique', 'index', 'primary'],
    action: ['action', 'procedure'],
    privacy: ['public', 'private', 'view', 'owner', 'returns'],
    operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
    ],
    foreignKey: ['foreign_key', 'fk'],
    fkRefs: ['references', 'on_update', 'on_delete', 'ref'],
    fkDo: ['cascade', 'restrict', 'no_action', 'set_null', 'set_default'],
    sqlKeywords: sqlKeywords,
    fillMe: ['_table_', '_column_'],
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            [/@\w+/, 'modifier'],
            [/#\w+/, { token: 'hashtag', next: '@after_hashtag' }],
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@keywords': { token: 'keyword', next: '@after_keyword' },
                    '@databaseDefinition': { token: 'type', next: '@after_keyword' },
                    '@definedActions': { token: 'method' },
                    '@definedProcedures': { token: 'method' },
                    '@foreignKey': { token: 'foreignKey' },
                    '@fillMe': { token: 'fillMe' },
                    '@fkRefs': { token: 'fkRefs' },
                    '@fkDo': { token: 'fkDo' },
                    '@sqlKeywords': { token: 'sqlKeyword' },
                    '@bools': { token: 'boolean' },
                    '@colType': { token: 'colType' },
                    '@modifier': { token: 'modifier' },
                    '@privacy': { token: 'privacy' },
                    '@default': 'identifier',
                }
            }],
            [/[=><!~?:&|+\-*^%]+/, {
                cases: {
                    '@operators': { token: 'operator' },
                }
            }],
            // numbers
            [/\b\d+\b/, 'number'],

            //commas
            [/,/, 'delimiter.comma'],

            //semi-colons
            [/\;/, 'delimiter.semicolon'],

            // whitespace
            { include: '@whitespace' },

            // strings
            [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
            [/'/, 'string', '@string'],

            // Add single-line comments()
            [/\/\/.*$/, 'comment'],

            // Add styling for parentheses, curly braces, and square brackets
            [/\(/, { token: 'delimiter.openParenthesis.level0', next: '@nested_parenthesis_1' }],
            [/\(/, { token: 'delimiter.openParenthesis.level1', next: '@nested_parenthesis_0' }],
            [/\{/, { token: 'delimiter.openParenthesis.level0', next: '@nested_curly_1' }],
            [/\{/, { token: 'delimiter.openParenthesis.level1', next: '@nested_curly_0' }],

        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
        ],
        string: [
            [/[^\']+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/'/, 'string', '@pop']
        ],
        comment: [
            [/./, 'comment.content']
        ],
        after_keyword: [
            { include: '@whitespace' },
            [/[a-zA-Z_$][\w$]*/, 'following.keyword', '@pop'],
            [/./, '', '@pop'],
        ],
        after_hashtag: [
            { include: '@whitespace' },
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@indexTypes': { token: 'indexType', next: '@pop' },
                }
            }]],
        nested_parenthesis_0: [
            [/\(/, { token: 'delimiter.openParenthesis.level0', next: '@nested_parenthesis_1' }],
            [/\{/, { token: 'delimiter.openParenthesis.level0', next: '@nested_curly_1' }],
            [/\)/, { token: 'delimiter.closeParenthesis.level0', next: '@pop' }],
            [/@\w+/, 'modifier'],
            [/#\w+/, { token: 'hashtag', next: '@after_hashtag' }],
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@keywords': { token: 'keyword', next: '@after_keyword' },
                    '@databaseDefinition': { token: 'type', next: '@after_keyword' },
                    '@definedActions': { token: 'method' },
                    '@definedProcedures': { token: 'method' },
                    '@foreignKey': { token: 'foreignKey' },
                    '@fillMe': { token: 'fillMe' },
                    '@fkRefs': { token: 'fkRefs' },
                    '@fkDo': { token: 'fkDo' },
                    '@sqlKeywords': { token: 'sqlKeyword' },
                    '@bools': { token: 'boolean' },
                    '@colType': { token: 'colType' },
                    '@modifier': { token: 'modifier' },
                    '@privacy': { token: 'privacy' },
                    '@default': 'identifier'
                }
            }],
            [/[=><!~?:&|+\-*^%]+/, {
                cases: {
                    '@operators': { token: 'operator' },
                }
            }],
            [/\b\d+\b/, 'number'],
            [/,/, 'delimiter.comma'],
            [/\;/, 'delimiter.semicolon'],
            { include: '@whitespace' },

            // strings
            [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
            [/'/, 'string', '@string'],

            // Add single-line comments()
            [/\/\/.*$/, 'comment'],

        ],
        nested_curly_0: [
            [/\{/, { token: 'delimiter.openParenthesis.level0', next: '@nested_curly_1' }],
            [/\(/, { token: 'delimiter.openParenthesis.level0', next: '@nested_parenthesis_1' }],
            [/\}/, { token: 'delimiter.closeParenthesis.level0', next: '@pop' }],
            [/@\w+/, 'modifier'],
            [/#\w+/, { token: 'hashtag', next: '@after_hashtag' }],
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@keywords': { token: 'keyword', next: '@after_keyword' },
                    '@databaseDefinition': { token: 'type', next: '@after_keyword' },
                    '@definedActions': { token: 'method' },
                    '@definedProcedures': { token: 'method' },
                    '@foreignKey': { token: 'foreignKey' },
                    '@fillMe': { token: 'fillMe' },
                    '@fkRefs': { token: 'fkRefs' },
                    '@fkDo': { token: 'fkDo' },
                    '@sqlKeywords': { token: 'sqlKeyword' },
                    '@bools': { token: 'boolean' },
                    '@colType': { token: 'colType' },
                    '@modifier': { token: 'modifier' },
                    '@privacy': { token: 'privacy' },
                    '@default': 'identifier'
                }
            }],
            [/[=><!~?:&|+\-*^%]+/, {
                cases: {
                    '@operators': { token: 'operator' },
                }
            }],
            [/\b\d+\b/, 'number'],
            [/,/, 'delimiter.comma'],
            [/\;/, 'delimiter.semicolon'],
            { include: '@whitespace' },

            // strings
            [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
            [/'/, 'string', '@string'],

            // Add single-line comments()
            [/\/\/.*$/, 'comment'],

        ],
        nested_parenthesis_1: [
            [/\(/, { token: 'delimiter.openParenthesis.level1', next: '@nested_parenthesis_0' }],
            [/\{/, { token: 'delimiter.openParenthesis.level1', next: '@nested_curly_0' }],
            [/\)/, { token: 'delimiter.closeParenthesis.level1', next: '@pop' }],
            [/@\w+/, 'modifier'],
            [/#\w+/, { token: 'hashtag', next: '@after_hashtag' }],
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@keywords': { token: 'keyword', next: '@after_keyword' },
                    '@databaseDefinition': { token: 'type', next: '@after_keyword' },
                    '@definedActions': { token: 'method' },
                    '@definedProcedures': { token: 'method' },
                    '@foreignKey': { token: 'foreignKey' },
                    '@fillMe': { token: 'fillMe' },
                    '@fkRefs': { token: 'fkRefs' },
                    '@fkDo': { token: 'fkDo' },
                    '@sqlKeywords': { token: 'sqlKeyword' },
                    '@bools': { token: 'boolean' },
                    '@colType': { token: 'colType' },
                    '@modifier': { token: 'modifier' },
                    '@privacy': { token: 'privacy' },
                    '@default': 'identifier'
                }
            }],
            [/[=><!~?:&|+\-*^%]+/, {
                cases: {
                    '@operators': { token: 'operator' },
                }
            }],
            [/\b\d+\b/, 'number'],
            [/,/, 'delimiter.comma'],
            [/\;/, 'delimiter.semicolon'],
            { include: '@whitespace' },

            // strings
            [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
            [/'/, 'string', '@string'],

            // Add single-line comments()
            [/\/\/.*$/, 'comment'],

        ],
        nested_curly_1: [
            [/\{/, { token: 'delimiter.openParenthesis.level1', next: '@nested_curly_0' }],
            [/\(/, { token: 'delimiter.openParenthesis.level1', next: '@nested_parenthesis_0' }],
            [/\}/, { token: 'delimiter.closeParenthesis.level1', next: '@pop' }],
            [/@\w+/, 'modifier'],
            [/#\w+/, { token: 'hashtag', next: '@after_hashtag' }],
            [/[a-zA-Z_$][\w$]*/, {
                cases: {
                    '@keywords': { token: 'keyword', next: '@after_keyword' },
                    '@databaseDefinition': { token: 'type', next: '@after_keyword' },
                    '@definedActions': { token: 'method' },
                    '@definedProcedures': { token: 'method' },
                    '@foreignKey': { token: 'foreignKey' },
                    '@fillMe': { token: 'fillMe' },
                    '@fkRefs': { token: 'fkRefs' },
                    '@fkDo': { token: 'fkDo' },
                    '@sqlKeywords': { token: 'sqlKeyword' },
                    '@bools': { token: 'boolean' },
                    '@colType': { token: 'colType' },
                    '@modifier': { token: 'modifier' },
                    '@privacy': { token: 'privacy' },
                    '@default': 'identifier'
                }
            }],
            [/[=><!~?:&|+\-*^%]+/, {
                cases: {
                    '@operators': { token: 'operator' },
                }
            }],
            [/\b\d+\b/, 'number'],
            [/,/, 'delimiter.comma'],
            [/\;/, 'delimiter.semicolon'],
            { include: '@whitespace' },

            // strings
            [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
            [/'/, 'string', '@string'],

            // Add single-line comments()
            [/\/\/.*$/, 'comment'],

        ],
    },
};

export const customTheme = {
    base: "vs", // Base theme: 'vs', 'vs-dark', or 'hc-black'
    inherit: true, // Inherit existing styles from the base theme
    rules: [
        { token: "", foreground: "000000" }, // Old color: "AADAFA"
        { token: "keyword", foreground: "0000A0" }, // Old color: "679AD1"
        { token: "method", foreground: "808000" }, // Old color: "DCDCAF"
        { token: "string", foreground: "A0522D" }, // Old color: "CE9178"
        { token: "number", foreground: "006400" }, // Old color: "B5CEA8"
        { token: "boolean", foreground: "800080" }, // Old color: "BC89BD"
        { token: "colType", foreground: "008080" }, // Old color: "63AF9D"
        { token: "following.keyword", foreground: "808000" }, // Old color: "DCDCAF"
        { token: "modifier", foreground: "FF00FF" }, // Old color: "FCB3FE"
        { token: "sqlKeyword", foreground: "0000FF" }, // Old color: "4C91D0"
        { token: "delimiter.openParenthesis.level0", foreground: "0000FF" }, // Old color: "1791F8"
        { token: "delimiter.closeParenthesis.level1", foreground: "0000FF" }, // Old color: "1791F8"
        { token: "delimiter.openParenthesis.level1", foreground: "FFD700" }, // Old color: "E2BA04"
        { token: "delimiter.closeParenthesis.level0", foreground: "FFD700" }, // Old color: "E2BA04"
        { token: "privacy", foreground: "800080" }, // Old color: "BC89BD"
        { token: "operator", foreground: "000000" }, // Old color: "ffffff"
        { token: "hashtag", foreground: "800080" }, // Old color: "A399CC"
        { token: "foreignKey", foreground: "0000FF" }, // Old color: "58A9F3"
        { token: "fkRefs", foreground: "800080" }, // Old color: "BEBDFF"
        { token: "fkDo", foreground: "800080" }, // Old color: "BEBDFF"
        { token: "fillMe", foreground: "FF0000" }, // Old color: "F57A7A"
        { token: "indexType", foreground: "008080" }, // Old color: "63AF9D"
    ],
    colors: {
        "editor.background": "#F8FAFC", // Custom background color
    },
}

export const autoClosingPairs: languages.LanguageConfiguration = {
    wordPattern: /[@$]?[a-zA-Z_]\w*/g,
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: "'", close: "'" },
        { open: '"', close: '"' }
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '(', close: ')' },
        { open: '[', close: ']' },
        { open: "'", close: "'", notIn: ['string', 'comment'] },
        { open: '"', close: '"', notIn: ['string', 'comment'] },
    ],
    comments: {
        lineComment: '//',
    },
    brackets: [
        ['{', '}'],
        ['(', ')'],
        ['[', ']'],
    ],
    indentationRules: {
        decreaseIndentPattern: /^\s*\}/,
        increaseIndentPattern: /^\s*[\{\[\(]/,
    },
    colorizedBracketPairs: [
        ['{', 'delimiter.curly'],
        ['}', 'delimiter.curly'],
        ['(', 'delimiter.parenthesis'],
        [')', 'delimiter.parenthesis'],
    ],
};