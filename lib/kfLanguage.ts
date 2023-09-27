import { sqlKeywords } from "./sqlKeywords"

export const kfLanguage = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  defaultToken: "",
  keywords: ["table", "action", "use"],
  typeKeywords: ["database"],
  bools: ["true", "false"],
  colType: ["text", "int"],
  modifier: [
    "maxlen",
    "minlen",
    "unique",
    "max",
    "min",
    "notnull",
    "primary",
    "default",
    "@caller",
    "@action",
    "@dataset",
  ],
  indexTypes: ["unique", "index", "primary"],
  action: ["action"],
  privacy: ["public", "private"],
  operators: ["=", ">", "<", "!", "~", "?", ":", "==", "<=", ">=", "!="],
  foreignKey: ["foreign_key", "fk"],
  fkRefs: ["references", "on_update", "on_delete", "ref"],
  fkDo: ["cascade", "restrict", "no_action", "set_null", "set_default"],
  sqlKeywords: sqlKeywords,
  fillMe: ["_table_", "_column_"],
  escapes:
    /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [/@\w+/, "modifier"],
      [/#\w+/, { token: "hashtag", next: "@after_hashtag" }],
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            "@keywords": { token: "keyword", next: "@after_keyword" },
            "@typeKeywords": { token: "type", next: "@after_keyword" },
            "@foreignKey": { token: "foreignKey" },
            "@fillMe": { token: "fillMe" },
            "@fkRefs": { token: "fkRefs" },
            "@fkDo": { token: "fkDo" },
            "@sqlKeywords": { token: "sqlKeyword" },
            "@bools": { token: "boolean" },
            "@colType": { token: "colType" },
            "@modifier": { token: "modifier" },
            "@privacy": { token: "privacy" },
            "@default": "identifier",
          },
        },
      ],
      [
        /[=><!~?:&|+\-*^%]+/,
        {
          cases: {
            "@operators": { token: "operator" },
          },
        },
      ],
      // numbers
      [/\b\d+\b/, "number"],

      //commas
      [/,/, "delimiter.comma"],

      //semi-colons
      [/\;/, "delimiter.semicolon"],

      // whitespace
      { include: "@whitespace" },

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/"/, "string", "@string"],
      [/"([^'\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/'/, "string", "@string"],

      // Add single-line comments()
      [/\/\/.*$/, "comment"],

      // Add styling for parentheses, curly braces, and square brackets
      [
        /\(/,
        {
          token: "delimiter.openParenthesis.level0",
          next: "@nested_parenthesis_1",
        },
      ],
      [
        /\(/,
        {
          token: "delimiter.openParenthesis.level1",
          next: "@nested_parenthesis_0",
        },
      ],
      [
        /\{/,
        { token: "delimiter.openParenthesis.level0", next: "@nested_curly_1" },
      ],
      [
        /\{/,
        { token: "delimiter.openParenthesis.level1", next: "@nested_curly_0" },
      ],
    ],
    whitespace: [[/[ \t\r\n]+/, ""]],
    string: [
      [/[^\\"']+/, "string"],
      [/@escapes/, "string.escape"],
      [/\\./, "string.escape.invalid"],
      [/['"]/, "string", "@pop"],
    ],
    comment: [[/./, "comment.content"]],
    after_keyword: [
      { include: "@whitespace" },
      [/[a-zA-Z_$][\w$]*/, "following.keyword", "@pop"],
      [/./, "", "@pop"],
    ],
    after_hashtag: [
      { include: "@whitespace" },
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            "@indexTypes": { token: "indexType", next: "@pop" },
          },
        },
      ],
    ],
    nested_parenthesis_0: [
      [
        /\(/,
        {
          token: "delimiter.openParenthesis.level0",
          next: "@nested_parenthesis_1",
        },
      ],
      [
        /\{/,
        { token: "delimiter.openParenthesis.level0", next: "@nested_curly_1" },
      ],
      [/\)/, { token: "delimiter.closeParenthesis.level0", next: "@pop" }],
      [/@\w+/, "modifier"],
      [/#\w+/, { token: "hashtag", next: "@after_hashtag" }],
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            "@keywords": { token: "keyword", next: "@after_keyword" },
            "@typeKeywords": { token: "type", next: "@after_keyword" },
            "@foreignKey": { token: "foreignKey" },
            "@fillMe": { token: "fillMe" },
            "@fkRefs": { token: "fkRefs" },
            "@fkDo": { token: "fkDo" },
            "@sqlKeywords": { token: "sqlKeyword" },
            "@bools": { token: "boolean" },
            "@colType": { token: "colType" },
            "@modifier": { token: "modifier" },
            "@privacy": { token: "privacy" },
            "@default": "identifier",
          },
        },
      ],
      [
        /[=><!~?:&|+\-*^%]+/,
        {
          cases: {
            "@operators": { token: "operator" },
          },
        },
      ],
      [/\b\d+\b/, "number"],
      [/,/, "delimiter.comma"],
      [/\;/, "delimiter.semicolon"],
      { include: "@whitespace" },

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/"/, "string", "@string"],
      [/"([^'\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/'/, "string", "@string"],

      // Add single-line comments()
      [/\/\/.*$/, "comment"],
    ],
    nested_curly_0: [
      [
        /\{/,
        { token: "delimiter.openParenthesis.level0", next: "@nested_curly_1" },
      ],
      [
        /\(/,
        {
          token: "delimiter.openParenthesis.level0",
          next: "@nested_parenthesis_1",
        },
      ],
      [/\}/, { token: "delimiter.closeParenthesis.level0", next: "@pop" }],
      [/@\w+/, "modifier"],
      [/#\w+/, { token: "hashtag", next: "@after_hashtag" }],
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            "@keywords": { token: "keyword", next: "@after_keyword" },
            "@typeKeywords": { token: "type", next: "@after_keyword" },
            "@foreignKey": { token: "foreignKey" },
            "@fillMe": { token: "fillMe" },
            "@fkRefs": { token: "fkRefs" },
            "@fkDo": { token: "fkDo" },
            "@sqlKeywords": { token: "sqlKeyword" },
            "@bools": { token: "boolean" },
            "@colType": { token: "colType" },
            "@modifier": { token: "modifier" },
            "@privacy": { token: "privacy" },
            "@default": "identifier",
          },
        },
      ],
      [
        /[=><!~?:&|+\-*^%]+/,
        {
          cases: {
            "@operators": { token: "operator" },
          },
        },
      ],
      [/\b\d+\b/, "number"],
      [/,/, "delimiter.comma"],
      [/\;/, "delimiter.semicolon"],
      { include: "@whitespace" },

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/"/, "string", "@string"],
      [/"([^'\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/'/, "string", "@string"],

      // Add single-line comments()
      [/\/\/.*$/, "comment"],
    ],
    nested_parenthesis_1: [
      [
        /\(/,
        {
          token: "delimiter.openParenthesis.level1",
          next: "@nested_parenthesis_0",
        },
      ],
      [
        /\{/,
        { token: "delimiter.openParenthesis.level1", next: "@nested_curly_0" },
      ],
      [/\)/, { token: "delimiter.closeParenthesis.level1", next: "@pop" }],
      [/@\w+/, "modifier"],
      [/#\w+/, { token: "hashtag", next: "@after_hashtag" }],
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            "@keywords": { token: "keyword", next: "@after_keyword" },
            "@typeKeywords": { token: "type", next: "@after_keyword" },
            "@foreignKey": { token: "foreignKey" },
            "@fillMe": { token: "fillMe" },
            "@fkRefs": { token: "fkRefs" },
            "@fkDo": { token: "fkDo" },
            "@sqlKeywords": { token: "sqlKeyword" },
            "@bools": { token: "boolean" },
            "@colType": { token: "colType" },
            "@modifier": { token: "modifier" },
            "@privacy": { token: "privacy" },
            "@default": "identifier",
          },
        },
      ],
      [
        /[=><!~?:&|+\-*^%]+/,
        {
          cases: {
            "@operators": { token: "operator" },
          },
        },
      ],
      [/\b\d+\b/, "number"],
      [/,/, "delimiter.comma"],
      [/\;/, "delimiter.semicolon"],
      { include: "@whitespace" },

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/"/, "string", "@string"],
      [/"([^'\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/'/, "string", "@string"],

      // Add single-line comments()
      [/\/\/.*$/, "comment"],
    ],
    nested_curly_1: [
      [
        /\{/,
        { token: "delimiter.openParenthesis.level1", next: "@nested_curly_0" },
      ],
      [
        /\(/,
        {
          token: "delimiter.openParenthesis.level1",
          next: "@nested_parenthesis_0",
        },
      ],
      [/\}/, { token: "delimiter.closeParenthesis.level1", next: "@pop" }],
      [/@\w+/, "modifier"],
      [/#\w+/, { token: "hashtag", next: "@after_hashtag" }],
      [
        /[a-zA-Z_$][\w$]*/,
        {
          cases: {
            "@keywords": { token: "keyword", next: "@after_keyword" },
            "@typeKeywords": { token: "type", next: "@after_keyword" },
            "@foreignKey": { token: "foreignKey" },
            "@fillMe": { token: "fillMe" },
            "@fkRefs": { token: "fkRefs" },
            "@fkDo": { token: "fkDo" },
            "@sqlKeywords": { token: "sqlKeyword" },
            "@bools": { token: "boolean" },
            "@colType": { token: "colType" },
            "@modifier": { token: "modifier" },
            "@privacy": { token: "privacy" },
            "@default": "identifier",
          },
        },
      ],
      [
        /[=><!~?:&|+\-*^%]+/,
        {
          cases: {
            "@operators": { token: "operator" },
          },
        },
      ],
      [/\b\d+\b/, "number"],
      [/,/, "delimiter.comma"],
      [/\;/, "delimiter.semicolon"],
      { include: "@whitespace" },

      // strings
      [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/"/, "string", "@string"],
      [/"([^'\\]|\\.)*$/, "string.invalid"], // non-teminated string
      [/'/, "string", "@string"],

      // Add single-line comments()
      [/\/\/.*$/, "comment"],
    ],
  },
}

export const customTheme = {
  base: "vs", // Base theme: 'vs', 'vs-dark', or 'hc-bla{(ck'
  inherit: true, // Inherit existing styles from the base theme
  rules: [
    { token: "", foreground: "AADAFA" },
    { token: "keyword", foreground: "679AD1" }, // Custom token style for keywords
    { token: "string", foreground: "CE9178" }, // Custom token style for strings
    { token: "number", foreground: "B5CEA8" }, // Custom token style for integers (and other numbers)
    { token: "boolean", foreground: "BC89BD" },
    { token: "colType", foreground: "63AF9D" },
    { token: "following.keyword", foreground: "DCDCAF" },
    { token: "modifier", foreground: "FCB3FE" },
    { token: "sqlKeyword", foreground: "4C91D0" },
    { token: "delimiter.openParenthesis.level0", foreground: "1791F8" },
    { token: "delimiter.closeParenthesis.level1", foreground: "1791F8" },
    { token: "delimiter.openParenthesis.level1", foreground: "E2BA04" },
    { token: "delimiter.closeParenthesis.level0", foreground: "E2BA04" },
    { token: "privacy", foreground: "BC89BD" },
    { token: "operator", foreground: "ffffff" },
    { token: "hashtag", foreground: "A399CC" },
    { token: "foreignKey", foreground: "58A9F3" },
    { token: "fkRefs", foreground: "BEBDFF" },
    { token: "fkDo", foreground: "BEBDFF" },
    { token: "fillMe", foreground: "F57A7A" },
    { token: "indexType", foreground: "63AF9D" },
    // More custom token styles...
  ],
  colors: {
    "editor.background": "#ffffff", // Custom background color
    // More custom editor colors...
  },
}
