// Generated from KuneiformParser.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import KuneiformParserVisitor from "./KuneiformParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class KuneiformParser extends Parser {
	public static readonly COL = 1;
	public static readonly SCOL = 2;
	public static readonly L_PAREN = 3;
	public static readonly L_BRACE = 4;
	public static readonly R_PAREN = 5;
	public static readonly R_BRACE = 6;
	public static readonly COMMA = 7;
	public static readonly DOLLAR = 8;
	public static readonly HASH = 9;
	public static readonly AT = 10;
	public static readonly PERIOD = 11;
	public static readonly ASSIGN = 12;
	public static readonly PLUS = 13;
	public static readonly MINUS = 14;
	public static readonly STAR = 15;
	public static readonly DIV = 16;
	public static readonly MOD = 17;
	public static readonly TILDE = 18;
	public static readonly PIPE2 = 19;
	public static readonly LT2 = 20;
	public static readonly GT2 = 21;
	public static readonly AMP = 22;
	public static readonly PIPE = 23;
	public static readonly EQ = 24;
	public static readonly LT = 25;
	public static readonly LT_EQ = 26;
	public static readonly GT = 27;
	public static readonly GT_EQ = 28;
	public static readonly SQL_NOT_EQ1 = 29;
	public static readonly SQL_NOT_EQ2 = 30;
	public static readonly DATABASE_ = 31;
	public static readonly USE_ = 32;
	public static readonly AS_ = 33;
	public static readonly TABLE_ = 34;
	public static readonly ACTION_ = 35;
	public static readonly INIT_ = 36;
	public static readonly PUBLIC_ = 37;
	public static readonly PRIVATE_ = 38;
	public static readonly VIEW_ = 39;
	public static readonly OWNER_ = 40;
	public static readonly INT_ = 41;
	public static readonly TEXT_ = 42;
	public static readonly BLOB_ = 43;
	public static readonly MIN_ = 44;
	public static readonly MAX_ = 45;
	public static readonly MIN_LEN_ = 46;
	public static readonly MAX_LEN_ = 47;
	public static readonly NOT_NULL_ = 48;
	public static readonly PRIMARY_ = 49;
	public static readonly DEFAULT_ = 50;
	public static readonly UNIQUE_ = 51;
	public static readonly INDEX_ = 52;
	public static readonly FOREIGN_KEY_ = 53;
	public static readonly FOREIGN_KEY_ABBR_ = 54;
	public static readonly REFERENCES_ = 55;
	public static readonly REFERENCES_ABBR_ = 56;
	public static readonly ACTION_ON_UPDATE_ = 57;
	public static readonly ACTION_ON_DELETE_ = 58;
	public static readonly ACTION_DO_ = 59;
	public static readonly ACTION_DO_NO_ACTION_ = 60;
	public static readonly ACTION_DO_CASCADE_ = 61;
	public static readonly ACTION_DO_SET_NULL_ = 62;
	public static readonly ACTION_DO_SET_DEFAULT_ = 63;
	public static readonly ACTION_DO_RESTRICT_ = 64;
	public static readonly SELECT_ = 65;
	public static readonly INSERT_ = 66;
	public static readonly UPDATE_ = 67;
	public static readonly DELETE_ = 68;
	public static readonly WITH_ = 69;
	public static readonly NOT_ = 70;
	public static readonly AND_ = 71;
	public static readonly OR_ = 72;
	public static readonly IDENTIFIER = 73;
	public static readonly INDEX_NAME = 74;
	public static readonly PARAM_OR_VAR = 75;
	public static readonly BLOCK_VAR_OR_ANNOTATION = 76;
	public static readonly UNSIGNED_NUMBER_LITERAL = 77;
	public static readonly STRING_LITERAL = 78;
	public static readonly SQL_KEYWORDS = 79;
	public static readonly SQL_STMT = 80;
	public static readonly WS = 81;
	public static readonly TERMINATOR = 82;
	public static readonly BLOCK_COMMENT = 83;
	public static readonly LINE_COMMENT = 84;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_source_unit = 0;
	public static readonly RULE_database_directive = 1;
	public static readonly RULE_extension_directive = 2;
	public static readonly RULE_ext_config_list = 3;
	public static readonly RULE_ext_config = 4;
	public static readonly RULE_annotation_decl = 5;
	public static readonly RULE_annotation_attr_list = 6;
	public static readonly RULE_annotation_attr = 7;
	public static readonly RULE_table_decl = 8;
	public static readonly RULE_column_def = 9;
	public static readonly RULE_column_def_list = 10;
	public static readonly RULE_column_type = 11;
	public static readonly RULE_column_constraint = 12;
	public static readonly RULE_literal_value = 13;
	public static readonly RULE_number_value = 14;
	public static readonly RULE_index_def = 15;
	public static readonly RULE_foreign_key_action = 16;
	public static readonly RULE_foreign_key_def = 17;
	public static readonly RULE_action_visibility = 18;
	public static readonly RULE_action_mutability = 19;
	public static readonly RULE_action_auxiliary = 20;
	public static readonly RULE_action_attr_list = 21;
	public static readonly RULE_action_decl = 22;
	public static readonly RULE_param_list = 23;
	public static readonly RULE_parameter = 24;
	public static readonly RULE_database_name = 25;
	public static readonly RULE_extension_name = 26;
	public static readonly RULE_ext_config_name = 27;
	public static readonly RULE_table_name = 28;
	public static readonly RULE_action_name = 29;
	public static readonly RULE_column_name = 30;
	public static readonly RULE_column_name_list = 31;
	public static readonly RULE_index_name = 32;
	public static readonly RULE_annotation_target_name = 33;
	public static readonly RULE_annotation_attr_name = 34;
	public static readonly RULE_annotation_attr_value = 35;
	public static readonly RULE_ext_config_value = 36;
	public static readonly RULE_init_decl = 37;
	public static readonly RULE_action_stmt_list = 38;
	public static readonly RULE_action_stmt = 39;
	public static readonly RULE_sql_stmt = 40;
	public static readonly RULE_call_stmt = 41;
	public static readonly RULE_call_receivers = 42;
	public static readonly RULE_call_body = 43;
	public static readonly RULE_variable = 44;
	public static readonly RULE_block_var = 45;
	public static readonly RULE_extension_call_name = 46;
	public static readonly RULE_fn_name = 47;
	public static readonly RULE_sfn_name = 48;
	public static readonly RULE_fn_arg_list = 49;
	public static readonly RULE_fn_arg_expr = 50;
	public static readonly literalNames: (string | null)[] = [ null, "':'", 
                                                            "';'", "'('", 
                                                            "'{'", "')'", 
                                                            "'}'", "','", 
                                                            "'$'", "'#'", 
                                                            "'@'", "'.'", 
                                                            "'='", "'+'", 
                                                            "'-'", "'*'", 
                                                            "'/'", "'%'", 
                                                            "'~'", "'||'", 
                                                            "'<<'", "'>>'", 
                                                            "'&'", "'|'", 
                                                            "'=='", "'<'", 
                                                            "'<='", "'>'", 
                                                            "'>='", "'!='", 
                                                            "'<>'", "'database'", 
                                                            "'use'", "'as'", 
                                                            "'table'", "'action'", 
                                                            "'init'", "'public'", 
                                                            "'private'", 
                                                            "'view'", "'owner'", 
                                                            "'int'", "'text'", 
                                                            "'blob'", "'min'", 
                                                            "'max'", "'minlen'", 
                                                            "'maxlen'", 
                                                            "'notnull'", 
                                                            "'primary'", 
                                                            "'default'", 
                                                            "'unique'", 
                                                            "'index'", "'foreign_key'", 
                                                            "'fk'", "'references'", 
                                                            "'ref'", "'on_update'", 
                                                            "'on_delete'", 
                                                            "'do'", "'no_action'", 
                                                            "'cascade'", 
                                                            "'set_null'", 
                                                            "'set_default'", 
                                                            "'restrict'", 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'not'", 
                                                            "'and'", "'or'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "COL", 
                                                             "SCOL", "L_PAREN", 
                                                             "L_BRACE", 
                                                             "R_PAREN", 
                                                             "R_BRACE", 
                                                             "COMMA", "DOLLAR", 
                                                             "HASH", "AT", 
                                                             "PERIOD", "ASSIGN", 
                                                             "PLUS", "MINUS", 
                                                             "STAR", "DIV", 
                                                             "MOD", "TILDE", 
                                                             "PIPE2", "LT2", 
                                                             "GT2", "AMP", 
                                                             "PIPE", "EQ", 
                                                             "LT", "LT_EQ", 
                                                             "GT", "GT_EQ", 
                                                             "SQL_NOT_EQ1", 
                                                             "SQL_NOT_EQ2", 
                                                             "DATABASE_", 
                                                             "USE_", "AS_", 
                                                             "TABLE_", "ACTION_", 
                                                             "INIT_", "PUBLIC_", 
                                                             "PRIVATE_", 
                                                             "VIEW_", "OWNER_", 
                                                             "INT_", "TEXT_", 
                                                             "BLOB_", "MIN_", 
                                                             "MAX_", "MIN_LEN_", 
                                                             "MAX_LEN_", 
                                                             "NOT_NULL_", 
                                                             "PRIMARY_", 
                                                             "DEFAULT_", 
                                                             "UNIQUE_", 
                                                             "INDEX_", "FOREIGN_KEY_", 
                                                             "FOREIGN_KEY_ABBR_", 
                                                             "REFERENCES_", 
                                                             "REFERENCES_ABBR_", 
                                                             "ACTION_ON_UPDATE_", 
                                                             "ACTION_ON_DELETE_", 
                                                             "ACTION_DO_", 
                                                             "ACTION_DO_NO_ACTION_", 
                                                             "ACTION_DO_CASCADE_", 
                                                             "ACTION_DO_SET_NULL_", 
                                                             "ACTION_DO_SET_DEFAULT_", 
                                                             "ACTION_DO_RESTRICT_", 
                                                             "SELECT_", 
                                                             "INSERT_", 
                                                             "UPDATE_", 
                                                             "DELETE_", 
                                                             "WITH_", "NOT_", 
                                                             "AND_", "OR_", 
                                                             "IDENTIFIER", 
                                                             "INDEX_NAME", 
                                                             "PARAM_OR_VAR", 
                                                             "BLOCK_VAR_OR_ANNOTATION", 
                                                             "UNSIGNED_NUMBER_LITERAL", 
                                                             "STRING_LITERAL", 
                                                             "SQL_KEYWORDS", 
                                                             "SQL_STMT", 
                                                             "WS", "TERMINATOR", 
                                                             "BLOCK_COMMENT", 
                                                             "LINE_COMMENT" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"source_unit", "database_directive", "extension_directive", "ext_config_list", 
		"ext_config", "annotation_decl", "annotation_attr_list", "annotation_attr", 
		"table_decl", "column_def", "column_def_list", "column_type", "column_constraint", 
		"literal_value", "number_value", "index_def", "foreign_key_action", "foreign_key_def", 
		"action_visibility", "action_mutability", "action_auxiliary", "action_attr_list", 
		"action_decl", "param_list", "parameter", "database_name", "extension_name", 
		"ext_config_name", "table_name", "action_name", "column_name", "column_name_list", 
		"index_name", "annotation_target_name", "annotation_attr_name", "annotation_attr_value", 
		"ext_config_value", "init_decl", "action_stmt_list", "action_stmt", "sql_stmt", 
		"call_stmt", "call_receivers", "call_body", "variable", "block_var", "extension_call_name", 
		"fn_name", "sfn_name", "fn_arg_list", "fn_arg_expr",
	];
	public get grammarFileName(): string { return "KuneiformParser.g4"; }
	public get literalNames(): (string | null)[] { return KuneiformParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return KuneiformParser.symbolicNames; }
	public get ruleNames(): string[] { return KuneiformParser.ruleNames; }
	public get serializedATN(): number[] { return KuneiformParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, KuneiformParser._ATN, KuneiformParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public source_unit(): Source_unitContext {
		let localctx: Source_unitContext = new Source_unitContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, KuneiformParser.RULE_source_unit);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 102;
			this.database_directive();
			this.state = 103;
			this.match(KuneiformParser.SCOL);
			this.state = 107;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===32) {
				{
				{
				this.state = 104;
				this.extension_directive();
				}
				}
				this.state = 109;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 115;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & 7) !== 0) || _la===76) {
				{
				this.state = 113;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 34:
					{
					this.state = 110;
					this.table_decl();
					}
					break;
				case 35:
				case 76:
					{
					this.state = 111;
					this.action_decl();
					}
					break;
				case 36:
					{
					this.state = 112;
					this.init_decl();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 117;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 118;
			this.match(KuneiformParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public database_directive(): Database_directiveContext {
		let localctx: Database_directiveContext = new Database_directiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, KuneiformParser.RULE_database_directive);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 120;
			this.match(KuneiformParser.DATABASE_);
			this.state = 121;
			this.database_name();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public extension_directive(): Extension_directiveContext {
		let localctx: Extension_directiveContext = new Extension_directiveContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, KuneiformParser.RULE_extension_directive);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 123;
			this.match(KuneiformParser.USE_);
			this.state = 124;
			this.extension_name();
			this.state = 129;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===4) {
				{
				this.state = 125;
				this.match(KuneiformParser.L_BRACE);
				this.state = 126;
				this.ext_config_list();
				this.state = 127;
				this.match(KuneiformParser.R_BRACE);
				}
			}

			this.state = 131;
			this.match(KuneiformParser.AS_);
			this.state = 132;
			this.extension_name();
			this.state = 133;
			this.match(KuneiformParser.SCOL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ext_config_list(): Ext_config_listContext {
		let localctx: Ext_config_listContext = new Ext_config_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, KuneiformParser.RULE_ext_config_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 135;
			this.ext_config();
			this.state = 140;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===7) {
				{
				{
				this.state = 136;
				this.match(KuneiformParser.COMMA);
				this.state = 137;
				this.ext_config();
				}
				}
				this.state = 142;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ext_config(): Ext_configContext {
		let localctx: Ext_configContext = new Ext_configContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, KuneiformParser.RULE_ext_config);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 143;
			this.ext_config_name();
			this.state = 144;
			this.match(KuneiformParser.COL);
			this.state = 145;
			this.ext_config_value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public annotation_decl(): Annotation_declContext {
		let localctx: Annotation_declContext = new Annotation_declContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, KuneiformParser.RULE_annotation_decl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 147;
			this.annotation_target_name();
			this.state = 148;
			this.match(KuneiformParser.L_PAREN);
			this.state = 149;
			this.annotation_attr_list();
			this.state = 150;
			this.match(KuneiformParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public annotation_attr_list(): Annotation_attr_listContext {
		let localctx: Annotation_attr_listContext = new Annotation_attr_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, KuneiformParser.RULE_annotation_attr_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 152;
			this.annotation_attr();
			this.state = 157;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===7) {
				{
				{
				this.state = 153;
				this.match(KuneiformParser.COMMA);
				this.state = 154;
				this.annotation_attr();
				}
				}
				this.state = 159;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public annotation_attr(): Annotation_attrContext {
		let localctx: Annotation_attrContext = new Annotation_attrContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, KuneiformParser.RULE_annotation_attr);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 160;
			this.annotation_attr_name();
			this.state = 161;
			this.match(KuneiformParser.ASSIGN);
			this.state = 162;
			this.annotation_attr_value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public table_decl(): Table_declContext {
		let localctx: Table_declContext = new Table_declContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, KuneiformParser.RULE_table_decl);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 164;
			this.match(KuneiformParser.TABLE_);
			this.state = 165;
			this.table_name();
			this.state = 166;
			this.match(KuneiformParser.L_BRACE);
			this.state = 167;
			this.column_def_list();
			this.state = 175;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 168;
					this.match(KuneiformParser.COMMA);
					this.state = 171;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case 74:
						{
						this.state = 169;
						this.index_def();
						}
						break;
					case 53:
					case 54:
						{
						this.state = 170;
						this.foreign_key_def();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 177;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 7, this._ctx);
			}
			this.state = 179;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===7) {
				{
				this.state = 178;
				this.match(KuneiformParser.COMMA);
				}
			}

			this.state = 181;
			this.match(KuneiformParser.R_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public column_def(): Column_defContext {
		let localctx: Column_defContext = new Column_defContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, KuneiformParser.RULE_column_def);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 183;
			this.column_name();
			this.state = 184;
			this.column_type();
			this.state = 188;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 44)) & ~0x1F) === 0 && ((1 << (_la - 44)) & 255) !== 0)) {
				{
				{
				this.state = 185;
				this.column_constraint();
				}
				}
				this.state = 190;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public column_def_list(): Column_def_listContext {
		let localctx: Column_def_listContext = new Column_def_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, KuneiformParser.RULE_column_def_list);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 191;
			this.column_def();
			this.state = 196;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 192;
					this.match(KuneiformParser.COMMA);
					this.state = 193;
					this.column_def();
					}
					}
				}
				this.state = 198;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public column_type(): Column_typeContext {
		let localctx: Column_typeContext = new Column_typeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, KuneiformParser.RULE_column_type);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 199;
			_la = this._input.LA(1);
			if(!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 7) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public column_constraint(): Column_constraintContext {
		let localctx: Column_constraintContext = new Column_constraintContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, KuneiformParser.RULE_column_constraint);
		try {
			this.state = 229;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 49:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 201;
				this.match(KuneiformParser.PRIMARY_);
				}
				break;
			case 48:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 202;
				this.match(KuneiformParser.NOT_NULL_);
				}
				break;
			case 51:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 203;
				this.match(KuneiformParser.UNIQUE_);
				}
				break;
			case 50:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 204;
				this.match(KuneiformParser.DEFAULT_);
				this.state = 205;
				this.match(KuneiformParser.L_PAREN);
				this.state = 206;
				this.literal_value();
				this.state = 207;
				this.match(KuneiformParser.R_PAREN);
				}
				break;
			case 44:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 209;
				this.match(KuneiformParser.MIN_);
				this.state = 210;
				this.match(KuneiformParser.L_PAREN);
				this.state = 211;
				this.number_value();
				this.state = 212;
				this.match(KuneiformParser.R_PAREN);
				}
				break;
			case 45:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 214;
				this.match(KuneiformParser.MAX_);
				this.state = 215;
				this.match(KuneiformParser.L_PAREN);
				this.state = 216;
				this.number_value();
				this.state = 217;
				this.match(KuneiformParser.R_PAREN);
				}
				break;
			case 46:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 219;
				this.match(KuneiformParser.MIN_LEN_);
				this.state = 220;
				this.match(KuneiformParser.L_PAREN);
				this.state = 221;
				this.number_value();
				this.state = 222;
				this.match(KuneiformParser.R_PAREN);
				}
				break;
			case 47:
				this.enterOuterAlt(localctx, 8);
				{
				this.state = 224;
				this.match(KuneiformParser.MAX_LEN_);
				this.state = 225;
				this.match(KuneiformParser.L_PAREN);
				this.state = 226;
				this.number_value();
				this.state = 227;
				this.match(KuneiformParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public literal_value(): Literal_valueContext {
		let localctx: Literal_valueContext = new Literal_valueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, KuneiformParser.RULE_literal_value);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 231;
			_la = this._input.LA(1);
			if(!(_la===77 || _la===78)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public number_value(): Number_valueContext {
		let localctx: Number_valueContext = new Number_valueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, KuneiformParser.RULE_number_value);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 233;
			this.match(KuneiformParser.UNSIGNED_NUMBER_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public index_def(): Index_defContext {
		let localctx: Index_defContext = new Index_defContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, KuneiformParser.RULE_index_def);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 235;
			this.index_name();
			this.state = 236;
			_la = this._input.LA(1);
			if(!(((((_la - 49)) & ~0x1F) === 0 && ((1 << (_la - 49)) & 13) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 237;
			this.match(KuneiformParser.L_PAREN);
			this.state = 238;
			this.column_name_list();
			this.state = 239;
			this.match(KuneiformParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public foreign_key_action(): Foreign_key_actionContext {
		let localctx: Foreign_key_actionContext = new Foreign_key_actionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, KuneiformParser.RULE_foreign_key_action);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 241;
			_la = this._input.LA(1);
			if(!(_la===57 || _la===58)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 243;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===59) {
				{
				this.state = 242;
				this.match(KuneiformParser.ACTION_DO_);
				}
			}

			this.state = 245;
			_la = this._input.LA(1);
			if(!(((((_la - 60)) & ~0x1F) === 0 && ((1 << (_la - 60)) & 31) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public foreign_key_def(): Foreign_key_defContext {
		let localctx: Foreign_key_defContext = new Foreign_key_defContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, KuneiformParser.RULE_foreign_key_def);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 247;
			_la = this._input.LA(1);
			if(!(_la===53 || _la===54)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 248;
			this.match(KuneiformParser.L_PAREN);
			this.state = 249;
			this.column_name_list();
			this.state = 250;
			this.match(KuneiformParser.R_PAREN);
			this.state = 251;
			_la = this._input.LA(1);
			if(!(_la===55 || _la===56)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 252;
			this.table_name();
			this.state = 253;
			this.match(KuneiformParser.L_PAREN);
			this.state = 254;
			this.column_name_list();
			this.state = 255;
			this.match(KuneiformParser.R_PAREN);
			this.state = 259;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===57 || _la===58) {
				{
				{
				this.state = 256;
				this.foreign_key_action();
				}
				}
				this.state = 261;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public action_visibility(): Action_visibilityContext {
		let localctx: Action_visibilityContext = new Action_visibilityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, KuneiformParser.RULE_action_visibility);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 262;
			_la = this._input.LA(1);
			if(!(_la===37 || _la===38)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public action_mutability(): Action_mutabilityContext {
		let localctx: Action_mutabilityContext = new Action_mutabilityContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, KuneiformParser.RULE_action_mutability);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 264;
			this.match(KuneiformParser.VIEW_);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public action_auxiliary(): Action_auxiliaryContext {
		let localctx: Action_auxiliaryContext = new Action_auxiliaryContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, KuneiformParser.RULE_action_auxiliary);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 266;
			this.match(KuneiformParser.OWNER_);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public action_attr_list(): Action_attr_listContext {
		let localctx: Action_attr_listContext = new Action_attr_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, KuneiformParser.RULE_action_attr_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 273;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 15) !== 0)) {
				{
				this.state = 271;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 37:
				case 38:
					{
					this.state = 268;
					this.action_visibility();
					}
					break;
				case 39:
					{
					this.state = 269;
					this.action_mutability();
					}
					break;
				case 40:
					{
					this.state = 270;
					this.action_auxiliary();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				this.state = 275;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public action_decl(): Action_declContext {
		let localctx: Action_declContext = new Action_declContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, KuneiformParser.RULE_action_decl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 279;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===76) {
				{
				{
				this.state = 276;
				this.annotation_decl();
				}
				}
				this.state = 281;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 282;
			this.match(KuneiformParser.ACTION_);
			this.state = 283;
			this.action_name();
			this.state = 284;
			this.match(KuneiformParser.L_PAREN);
			this.state = 285;
			this.param_list();
			this.state = 286;
			this.match(KuneiformParser.R_PAREN);
			this.state = 287;
			this.action_attr_list();
			this.state = 288;
			this.match(KuneiformParser.L_BRACE);
			this.state = 289;
			this.action_stmt_list();
			this.state = 290;
			this.match(KuneiformParser.R_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public param_list(): Param_listContext {
		let localctx: Param_listContext = new Param_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, KuneiformParser.RULE_param_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 293;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===75) {
				{
				this.state = 292;
				this.parameter();
				}
			}

			this.state = 299;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===7) {
				{
				{
				this.state = 295;
				this.match(KuneiformParser.COMMA);
				this.state = 296;
				this.parameter();
				}
				}
				this.state = 301;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parameter(): ParameterContext {
		let localctx: ParameterContext = new ParameterContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, KuneiformParser.RULE_parameter);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 302;
			this.match(KuneiformParser.PARAM_OR_VAR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public database_name(): Database_nameContext {
		let localctx: Database_nameContext = new Database_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, KuneiformParser.RULE_database_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 304;
			this.match(KuneiformParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public extension_name(): Extension_nameContext {
		let localctx: Extension_nameContext = new Extension_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, KuneiformParser.RULE_extension_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 306;
			this.match(KuneiformParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ext_config_name(): Ext_config_nameContext {
		let localctx: Ext_config_nameContext = new Ext_config_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, KuneiformParser.RULE_ext_config_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 308;
			this.match(KuneiformParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public table_name(): Table_nameContext {
		let localctx: Table_nameContext = new Table_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, KuneiformParser.RULE_table_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 310;
			this.match(KuneiformParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public action_name(): Action_nameContext {
		let localctx: Action_nameContext = new Action_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, KuneiformParser.RULE_action_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 312;
			this.match(KuneiformParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public column_name(): Column_nameContext {
		let localctx: Column_nameContext = new Column_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, KuneiformParser.RULE_column_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 314;
			this.match(KuneiformParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public column_name_list(): Column_name_listContext {
		let localctx: Column_name_listContext = new Column_name_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, KuneiformParser.RULE_column_name_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 316;
			this.column_name();
			this.state = 321;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===7) {
				{
				{
				this.state = 317;
				this.match(KuneiformParser.COMMA);
				this.state = 318;
				this.column_name();
				}
				}
				this.state = 323;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public index_name(): Index_nameContext {
		let localctx: Index_nameContext = new Index_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, KuneiformParser.RULE_index_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 324;
			this.match(KuneiformParser.INDEX_NAME);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public annotation_target_name(): Annotation_target_nameContext {
		let localctx: Annotation_target_nameContext = new Annotation_target_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, KuneiformParser.RULE_annotation_target_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 326;
			this.match(KuneiformParser.BLOCK_VAR_OR_ANNOTATION);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public annotation_attr_name(): Annotation_attr_nameContext {
		let localctx: Annotation_attr_nameContext = new Annotation_attr_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, KuneiformParser.RULE_annotation_attr_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 328;
			this.match(KuneiformParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public annotation_attr_value(): Annotation_attr_valueContext {
		let localctx: Annotation_attr_valueContext = new Annotation_attr_valueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, KuneiformParser.RULE_annotation_attr_value);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 330;
			this.literal_value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ext_config_value(): Ext_config_valueContext {
		let localctx: Ext_config_valueContext = new Ext_config_valueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, KuneiformParser.RULE_ext_config_value);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 332;
			this.literal_value();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public init_decl(): Init_declContext {
		let localctx: Init_declContext = new Init_declContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, KuneiformParser.RULE_init_decl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 334;
			this.match(KuneiformParser.INIT_);
			this.state = 335;
			this.match(KuneiformParser.L_PAREN);
			this.state = 336;
			this.match(KuneiformParser.R_PAREN);
			this.state = 337;
			this.match(KuneiformParser.L_BRACE);
			this.state = 338;
			this.action_stmt_list();
			this.state = 339;
			this.match(KuneiformParser.R_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public action_stmt_list(): Action_stmt_listContext {
		let localctx: Action_stmt_listContext = new Action_stmt_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, KuneiformParser.RULE_action_stmt_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 342;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 341;
				this.action_stmt();
				}
				}
				this.state = 344;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & 133) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public action_stmt(): Action_stmtContext {
		let localctx: Action_stmtContext = new Action_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, KuneiformParser.RULE_action_stmt);
		try {
			this.state = 348;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 80:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 346;
				this.sql_stmt();
				}
				break;
			case 73:
			case 75:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 347;
				this.call_stmt();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sql_stmt(): Sql_stmtContext {
		let localctx: Sql_stmtContext = new Sql_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, KuneiformParser.RULE_sql_stmt);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 350;
			this.match(KuneiformParser.SQL_STMT);
			this.state = 351;
			this.match(KuneiformParser.SCOL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public call_stmt(): Call_stmtContext {
		let localctx: Call_stmtContext = new Call_stmtContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, KuneiformParser.RULE_call_stmt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 356;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===75) {
				{
				this.state = 353;
				this.call_receivers();
				this.state = 354;
				this.match(KuneiformParser.ASSIGN);
				}
			}

			this.state = 358;
			this.call_body();
			this.state = 359;
			this.match(KuneiformParser.SCOL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public call_receivers(): Call_receiversContext {
		let localctx: Call_receiversContext = new Call_receiversContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, KuneiformParser.RULE_call_receivers);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 361;
			this.variable();
			this.state = 366;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===7) {
				{
				{
				this.state = 362;
				this.match(KuneiformParser.COMMA);
				this.state = 363;
				this.variable();
				}
				}
				this.state = 368;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public call_body(): Call_bodyContext {
		let localctx: Call_bodyContext = new Call_bodyContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, KuneiformParser.RULE_call_body);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 369;
			this.fn_name();
			this.state = 370;
			this.match(KuneiformParser.L_PAREN);
			this.state = 371;
			this.fn_arg_list();
			this.state = 372;
			this.match(KuneiformParser.R_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public variable(): VariableContext {
		let localctx: VariableContext = new VariableContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, KuneiformParser.RULE_variable);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 374;
			this.match(KuneiformParser.PARAM_OR_VAR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public block_var(): Block_varContext {
		let localctx: Block_varContext = new Block_varContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, KuneiformParser.RULE_block_var);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 376;
			this.match(KuneiformParser.BLOCK_VAR_OR_ANNOTATION);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public extension_call_name(): Extension_call_nameContext {
		let localctx: Extension_call_nameContext = new Extension_call_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, KuneiformParser.RULE_extension_call_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 378;
			this.match(KuneiformParser.IDENTIFIER);
			this.state = 379;
			this.match(KuneiformParser.PERIOD);
			this.state = 380;
			this.match(KuneiformParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public fn_name(): Fn_nameContext {
		let localctx: Fn_nameContext = new Fn_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, KuneiformParser.RULE_fn_name);
		try {
			this.state = 384;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 382;
				this.extension_call_name();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 383;
				this.action_name();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public sfn_name(): Sfn_nameContext {
		let localctx: Sfn_nameContext = new Sfn_nameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, KuneiformParser.RULE_sfn_name);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 386;
			this.match(KuneiformParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public fn_arg_list(): Fn_arg_listContext {
		let localctx: Fn_arg_listContext = new Fn_arg_listContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, KuneiformParser.RULE_fn_arg_list);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 389;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 286728) !== 0) || ((((_la - 70)) & ~0x1F) === 0 && ((1 << (_la - 70)) & 489) !== 0)) {
				{
				this.state = 388;
				this.fn_arg_expr(0);
				}
			}

			this.state = 395;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===7) {
				{
				{
				this.state = 391;
				this.match(KuneiformParser.COMMA);
				this.state = 392;
				this.fn_arg_expr(0);
				}
				}
				this.state = 397;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public fn_arg_expr(): Fn_arg_exprContext;
	public fn_arg_expr(_p: number): Fn_arg_exprContext;
	// @RuleVersion(0)
	public fn_arg_expr(_p?: number): Fn_arg_exprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: Fn_arg_exprContext = new Fn_arg_exprContext(this, this._ctx, _parentState);
		let _prevctx: Fn_arg_exprContext = localctx;
		let _startState: number = 100;
		this.enterRecursionRule(localctx, 100, KuneiformParser.RULE_fn_arg_expr, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 425;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 77:
			case 78:
				{
				this.state = 399;
				this.literal_value();
				}
				break;
			case 75:
				{
				this.state = 400;
				this.variable();
				}
				break;
			case 76:
				{
				this.state = 401;
				this.block_var();
				}
				break;
			case 3:
				{
				this.state = 402;
				this.match(KuneiformParser.L_PAREN);
				this.state = 403;
				localctx._elevate_expr = this.fn_arg_expr(0);
				this.state = 404;
				this.match(KuneiformParser.R_PAREN);
				}
				break;
			case 13:
			case 14:
			case 18:
				{
				this.state = 406;
				_la = this._input.LA(1);
				if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 286720) !== 0))) {
				this._errHandler.recoverInline(this);
				}
				else {
					this._errHandler.reportMatch(this);
				    this.consume();
				}
				this.state = 407;
				localctx._unary_expr = this.fn_arg_expr(11);
				}
				break;
			case 70:
				{
				this.state = 408;
				this.match(KuneiformParser.NOT_);
				this.state = 409;
				localctx._unary_expr = this.fn_arg_expr(4);
				}
				break;
			case 73:
				{
				this.state = 410;
				this.sfn_name();
				this.state = 411;
				this.match(KuneiformParser.L_PAREN);
				this.state = 421;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 3:
				case 13:
				case 14:
				case 18:
				case 70:
				case 73:
				case 75:
				case 76:
				case 77:
				case 78:
					{
					{
					this.state = 412;
					this.fn_arg_expr(0);
					this.state = 417;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la===7) {
						{
						{
						this.state = 413;
						this.match(KuneiformParser.COMMA);
						this.state = 414;
						this.fn_arg_expr(0);
						}
						}
						this.state = 419;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					}
					}
					break;
				case 15:
					{
					this.state = 420;
					this.match(KuneiformParser.STAR);
					}
					break;
				case 5:
					break;
				default:
					break;
				}
				this.state = 423;
				this.match(KuneiformParser.R_PAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 453;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 451;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 30, this._ctx) ) {
					case 1:
						{
						localctx = new Fn_arg_exprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, KuneiformParser.RULE_fn_arg_expr);
						this.state = 427;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 428;
						this.match(KuneiformParser.PIPE2);
						this.state = 429;
						this.fn_arg_expr(11);
						}
						break;
					case 2:
						{
						localctx = new Fn_arg_exprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, KuneiformParser.RULE_fn_arg_expr);
						this.state = 430;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 431;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 229376) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 432;
						this.fn_arg_expr(10);
						}
						break;
					case 3:
						{
						localctx = new Fn_arg_exprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, KuneiformParser.RULE_fn_arg_expr);
						this.state = 433;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 434;
						_la = this._input.LA(1);
						if(!(_la===13 || _la===14)) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 435;
						this.fn_arg_expr(9);
						}
						break;
					case 4:
						{
						localctx = new Fn_arg_exprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, KuneiformParser.RULE_fn_arg_expr);
						this.state = 436;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 437;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 15728640) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 438;
						this.fn_arg_expr(8);
						}
						break;
					case 5:
						{
						localctx = new Fn_arg_exprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, KuneiformParser.RULE_fn_arg_expr);
						this.state = 439;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 440;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 503316480) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 441;
						this.fn_arg_expr(7);
						}
						break;
					case 6:
						{
						localctx = new Fn_arg_exprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, KuneiformParser.RULE_fn_arg_expr);
						this.state = 442;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 443;
						_la = this._input.LA(1);
						if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 1627394048) !== 0))) {
						this._errHandler.recoverInline(this);
						}
						else {
							this._errHandler.reportMatch(this);
						    this.consume();
						}
						this.state = 444;
						this.fn_arg_expr(6);
						}
						break;
					case 7:
						{
						localctx = new Fn_arg_exprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, KuneiformParser.RULE_fn_arg_expr);
						this.state = 445;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 446;
						this.match(KuneiformParser.AND_);
						this.state = 447;
						this.fn_arg_expr(4);
						}
						break;
					case 8:
						{
						localctx = new Fn_arg_exprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, KuneiformParser.RULE_fn_arg_expr);
						this.state = 448;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 449;
						this.match(KuneiformParser.OR_);
						this.state = 450;
						this.fn_arg_expr(3);
						}
						break;
					}
					}
				}
				this.state = 455;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 31, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 50:
			return this.fn_arg_expr_sempred(localctx as Fn_arg_exprContext, predIndex);
		}
		return true;
	}
	private fn_arg_expr_sempred(localctx: Fn_arg_exprContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 10);
		case 1:
			return this.precpred(this._ctx, 9);
		case 2:
			return this.precpred(this._ctx, 8);
		case 3:
			return this.precpred(this._ctx, 7);
		case 4:
			return this.precpred(this._ctx, 6);
		case 5:
			return this.precpred(this._ctx, 5);
		case 6:
			return this.precpred(this._ctx, 3);
		case 7:
			return this.precpred(this._ctx, 2);
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,84,457,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,
	39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
	7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,1,0,1,0,1,0,5,0,106,8,0,10,
	0,12,0,109,9,0,1,0,1,0,1,0,5,0,114,8,0,10,0,12,0,117,9,0,1,0,1,0,1,1,1,
	1,1,1,1,2,1,2,1,2,1,2,1,2,1,2,3,2,130,8,2,1,2,1,2,1,2,1,2,1,3,1,3,1,3,5,
	3,139,8,3,10,3,12,3,142,9,3,1,4,1,4,1,4,1,4,1,5,1,5,1,5,1,5,1,5,1,6,1,6,
	1,6,5,6,156,8,6,10,6,12,6,159,9,6,1,7,1,7,1,7,1,7,1,8,1,8,1,8,1,8,1,8,1,
	8,1,8,3,8,172,8,8,5,8,174,8,8,10,8,12,8,177,9,8,1,8,3,8,180,8,8,1,8,1,8,
	1,9,1,9,1,9,5,9,187,8,9,10,9,12,9,190,9,9,1,10,1,10,1,10,5,10,195,8,10,
	10,10,12,10,198,9,10,1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
	1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,
	12,1,12,1,12,1,12,1,12,1,12,3,12,230,8,12,1,13,1,13,1,14,1,14,1,15,1,15,
	1,15,1,15,1,15,1,15,1,16,1,16,3,16,244,8,16,1,16,1,16,1,17,1,17,1,17,1,
	17,1,17,1,17,1,17,1,17,1,17,1,17,5,17,258,8,17,10,17,12,17,261,9,17,1,18,
	1,18,1,19,1,19,1,20,1,20,1,21,1,21,1,21,5,21,272,8,21,10,21,12,21,275,9,
	21,1,22,5,22,278,8,22,10,22,12,22,281,9,22,1,22,1,22,1,22,1,22,1,22,1,22,
	1,22,1,22,1,22,1,22,1,23,3,23,294,8,23,1,23,1,23,5,23,298,8,23,10,23,12,
	23,301,9,23,1,24,1,24,1,25,1,25,1,26,1,26,1,27,1,27,1,28,1,28,1,29,1,29,
	1,30,1,30,1,31,1,31,1,31,5,31,320,8,31,10,31,12,31,323,9,31,1,32,1,32,1,
	33,1,33,1,34,1,34,1,35,1,35,1,36,1,36,1,37,1,37,1,37,1,37,1,37,1,37,1,37,
	1,38,4,38,343,8,38,11,38,12,38,344,1,39,1,39,3,39,349,8,39,1,40,1,40,1,
	40,1,41,1,41,1,41,3,41,357,8,41,1,41,1,41,1,41,1,42,1,42,1,42,5,42,365,
	8,42,10,42,12,42,368,9,42,1,43,1,43,1,43,1,43,1,43,1,44,1,44,1,45,1,45,
	1,46,1,46,1,46,1,46,1,47,1,47,3,47,385,8,47,1,48,1,48,1,49,3,49,390,8,49,
	1,49,1,49,5,49,394,8,49,10,49,12,49,397,9,49,1,50,1,50,1,50,1,50,1,50,1,
	50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,5,50,416,8,50,
	10,50,12,50,419,9,50,1,50,3,50,422,8,50,1,50,1,50,3,50,426,8,50,1,50,1,
	50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,
	1,50,1,50,1,50,1,50,1,50,1,50,1,50,1,50,5,50,452,8,50,10,50,12,50,455,9,
	50,1,50,0,1,100,51,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,
	38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,
	86,88,90,92,94,96,98,100,0,14,1,0,41,43,1,0,77,78,2,0,49,49,51,52,1,0,57,
	58,1,0,60,64,1,0,53,54,1,0,55,56,1,0,37,38,2,0,13,14,18,18,1,0,15,17,1,
	0,13,14,1,0,20,23,1,0,25,28,3,0,12,12,24,24,29,30,457,0,102,1,0,0,0,2,120,
	1,0,0,0,4,123,1,0,0,0,6,135,1,0,0,0,8,143,1,0,0,0,10,147,1,0,0,0,12,152,
	1,0,0,0,14,160,1,0,0,0,16,164,1,0,0,0,18,183,1,0,0,0,20,191,1,0,0,0,22,
	199,1,0,0,0,24,229,1,0,0,0,26,231,1,0,0,0,28,233,1,0,0,0,30,235,1,0,0,0,
	32,241,1,0,0,0,34,247,1,0,0,0,36,262,1,0,0,0,38,264,1,0,0,0,40,266,1,0,
	0,0,42,273,1,0,0,0,44,279,1,0,0,0,46,293,1,0,0,0,48,302,1,0,0,0,50,304,
	1,0,0,0,52,306,1,0,0,0,54,308,1,0,0,0,56,310,1,0,0,0,58,312,1,0,0,0,60,
	314,1,0,0,0,62,316,1,0,0,0,64,324,1,0,0,0,66,326,1,0,0,0,68,328,1,0,0,0,
	70,330,1,0,0,0,72,332,1,0,0,0,74,334,1,0,0,0,76,342,1,0,0,0,78,348,1,0,
	0,0,80,350,1,0,0,0,82,356,1,0,0,0,84,361,1,0,0,0,86,369,1,0,0,0,88,374,
	1,0,0,0,90,376,1,0,0,0,92,378,1,0,0,0,94,384,1,0,0,0,96,386,1,0,0,0,98,
	389,1,0,0,0,100,425,1,0,0,0,102,103,3,2,1,0,103,107,5,2,0,0,104,106,3,4,
	2,0,105,104,1,0,0,0,106,109,1,0,0,0,107,105,1,0,0,0,107,108,1,0,0,0,108,
	115,1,0,0,0,109,107,1,0,0,0,110,114,3,16,8,0,111,114,3,44,22,0,112,114,
	3,74,37,0,113,110,1,0,0,0,113,111,1,0,0,0,113,112,1,0,0,0,114,117,1,0,0,
	0,115,113,1,0,0,0,115,116,1,0,0,0,116,118,1,0,0,0,117,115,1,0,0,0,118,119,
	5,0,0,1,119,1,1,0,0,0,120,121,5,31,0,0,121,122,3,50,25,0,122,3,1,0,0,0,
	123,124,5,32,0,0,124,129,3,52,26,0,125,126,5,4,0,0,126,127,3,6,3,0,127,
	128,5,6,0,0,128,130,1,0,0,0,129,125,1,0,0,0,129,130,1,0,0,0,130,131,1,0,
	0,0,131,132,5,33,0,0,132,133,3,52,26,0,133,134,5,2,0,0,134,5,1,0,0,0,135,
	140,3,8,4,0,136,137,5,7,0,0,137,139,3,8,4,0,138,136,1,0,0,0,139,142,1,0,
	0,0,140,138,1,0,0,0,140,141,1,0,0,0,141,7,1,0,0,0,142,140,1,0,0,0,143,144,
	3,54,27,0,144,145,5,1,0,0,145,146,3,72,36,0,146,9,1,0,0,0,147,148,3,66,
	33,0,148,149,5,3,0,0,149,150,3,12,6,0,150,151,5,5,0,0,151,11,1,0,0,0,152,
	157,3,14,7,0,153,154,5,7,0,0,154,156,3,14,7,0,155,153,1,0,0,0,156,159,1,
	0,0,0,157,155,1,0,0,0,157,158,1,0,0,0,158,13,1,0,0,0,159,157,1,0,0,0,160,
	161,3,68,34,0,161,162,5,12,0,0,162,163,3,70,35,0,163,15,1,0,0,0,164,165,
	5,34,0,0,165,166,3,56,28,0,166,167,5,4,0,0,167,175,3,20,10,0,168,171,5,
	7,0,0,169,172,3,30,15,0,170,172,3,34,17,0,171,169,1,0,0,0,171,170,1,0,0,
	0,172,174,1,0,0,0,173,168,1,0,0,0,174,177,1,0,0,0,175,173,1,0,0,0,175,176,
	1,0,0,0,176,179,1,0,0,0,177,175,1,0,0,0,178,180,5,7,0,0,179,178,1,0,0,0,
	179,180,1,0,0,0,180,181,1,0,0,0,181,182,5,6,0,0,182,17,1,0,0,0,183,184,
	3,60,30,0,184,188,3,22,11,0,185,187,3,24,12,0,186,185,1,0,0,0,187,190,1,
	0,0,0,188,186,1,0,0,0,188,189,1,0,0,0,189,19,1,0,0,0,190,188,1,0,0,0,191,
	196,3,18,9,0,192,193,5,7,0,0,193,195,3,18,9,0,194,192,1,0,0,0,195,198,1,
	0,0,0,196,194,1,0,0,0,196,197,1,0,0,0,197,21,1,0,0,0,198,196,1,0,0,0,199,
	200,7,0,0,0,200,23,1,0,0,0,201,230,5,49,0,0,202,230,5,48,0,0,203,230,5,
	51,0,0,204,205,5,50,0,0,205,206,5,3,0,0,206,207,3,26,13,0,207,208,5,5,0,
	0,208,230,1,0,0,0,209,210,5,44,0,0,210,211,5,3,0,0,211,212,3,28,14,0,212,
	213,5,5,0,0,213,230,1,0,0,0,214,215,5,45,0,0,215,216,5,3,0,0,216,217,3,
	28,14,0,217,218,5,5,0,0,218,230,1,0,0,0,219,220,5,46,0,0,220,221,5,3,0,
	0,221,222,3,28,14,0,222,223,5,5,0,0,223,230,1,0,0,0,224,225,5,47,0,0,225,
	226,5,3,0,0,226,227,3,28,14,0,227,228,5,5,0,0,228,230,1,0,0,0,229,201,1,
	0,0,0,229,202,1,0,0,0,229,203,1,0,0,0,229,204,1,0,0,0,229,209,1,0,0,0,229,
	214,1,0,0,0,229,219,1,0,0,0,229,224,1,0,0,0,230,25,1,0,0,0,231,232,7,1,
	0,0,232,27,1,0,0,0,233,234,5,77,0,0,234,29,1,0,0,0,235,236,3,64,32,0,236,
	237,7,2,0,0,237,238,5,3,0,0,238,239,3,62,31,0,239,240,5,5,0,0,240,31,1,
	0,0,0,241,243,7,3,0,0,242,244,5,59,0,0,243,242,1,0,0,0,243,244,1,0,0,0,
	244,245,1,0,0,0,245,246,7,4,0,0,246,33,1,0,0,0,247,248,7,5,0,0,248,249,
	5,3,0,0,249,250,3,62,31,0,250,251,5,5,0,0,251,252,7,6,0,0,252,253,3,56,
	28,0,253,254,5,3,0,0,254,255,3,62,31,0,255,259,5,5,0,0,256,258,3,32,16,
	0,257,256,1,0,0,0,258,261,1,0,0,0,259,257,1,0,0,0,259,260,1,0,0,0,260,35,
	1,0,0,0,261,259,1,0,0,0,262,263,7,7,0,0,263,37,1,0,0,0,264,265,5,39,0,0,
	265,39,1,0,0,0,266,267,5,40,0,0,267,41,1,0,0,0,268,272,3,36,18,0,269,272,
	3,38,19,0,270,272,3,40,20,0,271,268,1,0,0,0,271,269,1,0,0,0,271,270,1,0,
	0,0,272,275,1,0,0,0,273,271,1,0,0,0,273,274,1,0,0,0,274,43,1,0,0,0,275,
	273,1,0,0,0,276,278,3,10,5,0,277,276,1,0,0,0,278,281,1,0,0,0,279,277,1,
	0,0,0,279,280,1,0,0,0,280,282,1,0,0,0,281,279,1,0,0,0,282,283,5,35,0,0,
	283,284,3,58,29,0,284,285,5,3,0,0,285,286,3,46,23,0,286,287,5,5,0,0,287,
	288,3,42,21,0,288,289,5,4,0,0,289,290,3,76,38,0,290,291,5,6,0,0,291,45,
	1,0,0,0,292,294,3,48,24,0,293,292,1,0,0,0,293,294,1,0,0,0,294,299,1,0,0,
	0,295,296,5,7,0,0,296,298,3,48,24,0,297,295,1,0,0,0,298,301,1,0,0,0,299,
	297,1,0,0,0,299,300,1,0,0,0,300,47,1,0,0,0,301,299,1,0,0,0,302,303,5,75,
	0,0,303,49,1,0,0,0,304,305,5,73,0,0,305,51,1,0,0,0,306,307,5,73,0,0,307,
	53,1,0,0,0,308,309,5,73,0,0,309,55,1,0,0,0,310,311,5,73,0,0,311,57,1,0,
	0,0,312,313,5,73,0,0,313,59,1,0,0,0,314,315,5,73,0,0,315,61,1,0,0,0,316,
	321,3,60,30,0,317,318,5,7,0,0,318,320,3,60,30,0,319,317,1,0,0,0,320,323,
	1,0,0,0,321,319,1,0,0,0,321,322,1,0,0,0,322,63,1,0,0,0,323,321,1,0,0,0,
	324,325,5,74,0,0,325,65,1,0,0,0,326,327,5,76,0,0,327,67,1,0,0,0,328,329,
	5,73,0,0,329,69,1,0,0,0,330,331,3,26,13,0,331,71,1,0,0,0,332,333,3,26,13,
	0,333,73,1,0,0,0,334,335,5,36,0,0,335,336,5,3,0,0,336,337,5,5,0,0,337,338,
	5,4,0,0,338,339,3,76,38,0,339,340,5,6,0,0,340,75,1,0,0,0,341,343,3,78,39,
	0,342,341,1,0,0,0,343,344,1,0,0,0,344,342,1,0,0,0,344,345,1,0,0,0,345,77,
	1,0,0,0,346,349,3,80,40,0,347,349,3,82,41,0,348,346,1,0,0,0,348,347,1,0,
	0,0,349,79,1,0,0,0,350,351,5,80,0,0,351,352,5,2,0,0,352,81,1,0,0,0,353,
	354,3,84,42,0,354,355,5,12,0,0,355,357,1,0,0,0,356,353,1,0,0,0,356,357,
	1,0,0,0,357,358,1,0,0,0,358,359,3,86,43,0,359,360,5,2,0,0,360,83,1,0,0,
	0,361,366,3,88,44,0,362,363,5,7,0,0,363,365,3,88,44,0,364,362,1,0,0,0,365,
	368,1,0,0,0,366,364,1,0,0,0,366,367,1,0,0,0,367,85,1,0,0,0,368,366,1,0,
	0,0,369,370,3,94,47,0,370,371,5,3,0,0,371,372,3,98,49,0,372,373,5,5,0,0,
	373,87,1,0,0,0,374,375,5,75,0,0,375,89,1,0,0,0,376,377,5,76,0,0,377,91,
	1,0,0,0,378,379,5,73,0,0,379,380,5,11,0,0,380,381,5,73,0,0,381,93,1,0,0,
	0,382,385,3,92,46,0,383,385,3,58,29,0,384,382,1,0,0,0,384,383,1,0,0,0,385,
	95,1,0,0,0,386,387,5,73,0,0,387,97,1,0,0,0,388,390,3,100,50,0,389,388,1,
	0,0,0,389,390,1,0,0,0,390,395,1,0,0,0,391,392,5,7,0,0,392,394,3,100,50,
	0,393,391,1,0,0,0,394,397,1,0,0,0,395,393,1,0,0,0,395,396,1,0,0,0,396,99,
	1,0,0,0,397,395,1,0,0,0,398,399,6,50,-1,0,399,426,3,26,13,0,400,426,3,88,
	44,0,401,426,3,90,45,0,402,403,5,3,0,0,403,404,3,100,50,0,404,405,5,5,0,
	0,405,426,1,0,0,0,406,407,7,8,0,0,407,426,3,100,50,11,408,409,5,70,0,0,
	409,426,3,100,50,4,410,411,3,96,48,0,411,421,5,3,0,0,412,417,3,100,50,0,
	413,414,5,7,0,0,414,416,3,100,50,0,415,413,1,0,0,0,416,419,1,0,0,0,417,
	415,1,0,0,0,417,418,1,0,0,0,418,422,1,0,0,0,419,417,1,0,0,0,420,422,5,15,
	0,0,421,412,1,0,0,0,421,420,1,0,0,0,421,422,1,0,0,0,422,423,1,0,0,0,423,
	424,5,5,0,0,424,426,1,0,0,0,425,398,1,0,0,0,425,400,1,0,0,0,425,401,1,0,
	0,0,425,402,1,0,0,0,425,406,1,0,0,0,425,408,1,0,0,0,425,410,1,0,0,0,426,
	453,1,0,0,0,427,428,10,10,0,0,428,429,5,19,0,0,429,452,3,100,50,11,430,
	431,10,9,0,0,431,432,7,9,0,0,432,452,3,100,50,10,433,434,10,8,0,0,434,435,
	7,10,0,0,435,452,3,100,50,9,436,437,10,7,0,0,437,438,7,11,0,0,438,452,3,
	100,50,8,439,440,10,6,0,0,440,441,7,12,0,0,441,452,3,100,50,7,442,443,10,
	5,0,0,443,444,7,13,0,0,444,452,3,100,50,6,445,446,10,3,0,0,446,447,5,71,
	0,0,447,452,3,100,50,4,448,449,10,2,0,0,449,450,5,72,0,0,450,452,3,100,
	50,3,451,427,1,0,0,0,451,430,1,0,0,0,451,433,1,0,0,0,451,436,1,0,0,0,451,
	439,1,0,0,0,451,442,1,0,0,0,451,445,1,0,0,0,451,448,1,0,0,0,452,455,1,0,
	0,0,453,451,1,0,0,0,453,454,1,0,0,0,454,101,1,0,0,0,455,453,1,0,0,0,32,
	107,113,115,129,140,157,171,175,179,188,196,229,243,259,271,273,279,293,
	299,321,344,348,356,366,384,389,395,417,421,425,451,453];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!KuneiformParser.__ATN) {
			KuneiformParser.__ATN = new ATNDeserializer().deserialize(KuneiformParser._serializedATN);
		}

		return KuneiformParser.__ATN;
	}


	static DecisionsToDFA = KuneiformParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class Source_unitContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public database_directive(): Database_directiveContext {
		return this.getTypedRuleContext(Database_directiveContext, 0) as Database_directiveContext;
	}
	public SCOL(): TerminalNode {
		return this.getToken(KuneiformParser.SCOL, 0);
	}
	public EOF(): TerminalNode {
		return this.getToken(KuneiformParser.EOF, 0);
	}
	public extension_directive_list(): Extension_directiveContext[] {
		return this.getTypedRuleContexts(Extension_directiveContext) as Extension_directiveContext[];
	}
	public extension_directive(i: number): Extension_directiveContext {
		return this.getTypedRuleContext(Extension_directiveContext, i) as Extension_directiveContext;
	}
	public table_decl_list(): Table_declContext[] {
		return this.getTypedRuleContexts(Table_declContext) as Table_declContext[];
	}
	public table_decl(i: number): Table_declContext {
		return this.getTypedRuleContext(Table_declContext, i) as Table_declContext;
	}
	public action_decl_list(): Action_declContext[] {
		return this.getTypedRuleContexts(Action_declContext) as Action_declContext[];
	}
	public action_decl(i: number): Action_declContext {
		return this.getTypedRuleContext(Action_declContext, i) as Action_declContext;
	}
	public init_decl_list(): Init_declContext[] {
		return this.getTypedRuleContexts(Init_declContext) as Init_declContext[];
	}
	public init_decl(i: number): Init_declContext {
		return this.getTypedRuleContext(Init_declContext, i) as Init_declContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_source_unit;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitSource_unit) {
			return visitor.visitSource_unit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Database_directiveContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DATABASE_(): TerminalNode {
		return this.getToken(KuneiformParser.DATABASE_, 0);
	}
	public database_name(): Database_nameContext {
		return this.getTypedRuleContext(Database_nameContext, 0) as Database_nameContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_database_directive;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitDatabase_directive) {
			return visitor.visitDatabase_directive(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Extension_directiveContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public USE_(): TerminalNode {
		return this.getToken(KuneiformParser.USE_, 0);
	}
	public extension_name_list(): Extension_nameContext[] {
		return this.getTypedRuleContexts(Extension_nameContext) as Extension_nameContext[];
	}
	public extension_name(i: number): Extension_nameContext {
		return this.getTypedRuleContext(Extension_nameContext, i) as Extension_nameContext;
	}
	public AS_(): TerminalNode {
		return this.getToken(KuneiformParser.AS_, 0);
	}
	public SCOL(): TerminalNode {
		return this.getToken(KuneiformParser.SCOL, 0);
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(KuneiformParser.L_BRACE, 0);
	}
	public ext_config_list(): Ext_config_listContext {
		return this.getTypedRuleContext(Ext_config_listContext, 0) as Ext_config_listContext;
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(KuneiformParser.R_BRACE, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_extension_directive;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitExtension_directive) {
			return visitor.visitExtension_directive(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Ext_config_listContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ext_config_list(): Ext_configContext[] {
		return this.getTypedRuleContexts(Ext_configContext) as Ext_configContext[];
	}
	public ext_config(i: number): Ext_configContext {
		return this.getTypedRuleContext(Ext_configContext, i) as Ext_configContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(KuneiformParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_ext_config_list;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitExt_config_list) {
			return visitor.visitExt_config_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Ext_configContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ext_config_name(): Ext_config_nameContext {
		return this.getTypedRuleContext(Ext_config_nameContext, 0) as Ext_config_nameContext;
	}
	public COL(): TerminalNode {
		return this.getToken(KuneiformParser.COL, 0);
	}
	public ext_config_value(): Ext_config_valueContext {
		return this.getTypedRuleContext(Ext_config_valueContext, 0) as Ext_config_valueContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_ext_config;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitExt_config) {
			return visitor.visitExt_config(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_declContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public annotation_target_name(): Annotation_target_nameContext {
		return this.getTypedRuleContext(Annotation_target_nameContext, 0) as Annotation_target_nameContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.L_PAREN, 0);
	}
	public annotation_attr_list(): Annotation_attr_listContext {
		return this.getTypedRuleContext(Annotation_attr_listContext, 0) as Annotation_attr_listContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_annotation_decl;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAnnotation_decl) {
			return visitor.visitAnnotation_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_attr_listContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public annotation_attr_list(): Annotation_attrContext[] {
		return this.getTypedRuleContexts(Annotation_attrContext) as Annotation_attrContext[];
	}
	public annotation_attr(i: number): Annotation_attrContext {
		return this.getTypedRuleContext(Annotation_attrContext, i) as Annotation_attrContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(KuneiformParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_annotation_attr_list;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAnnotation_attr_list) {
			return visitor.visitAnnotation_attr_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_attrContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public annotation_attr_name(): Annotation_attr_nameContext {
		return this.getTypedRuleContext(Annotation_attr_nameContext, 0) as Annotation_attr_nameContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(KuneiformParser.ASSIGN, 0);
	}
	public annotation_attr_value(): Annotation_attr_valueContext {
		return this.getTypedRuleContext(Annotation_attr_valueContext, 0) as Annotation_attr_valueContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_annotation_attr;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAnnotation_attr) {
			return visitor.visitAnnotation_attr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Table_declContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TABLE_(): TerminalNode {
		return this.getToken(KuneiformParser.TABLE_, 0);
	}
	public table_name(): Table_nameContext {
		return this.getTypedRuleContext(Table_nameContext, 0) as Table_nameContext;
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(KuneiformParser.L_BRACE, 0);
	}
	public column_def_list(): Column_def_listContext {
		return this.getTypedRuleContext(Column_def_listContext, 0) as Column_def_listContext;
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(KuneiformParser.R_BRACE, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(KuneiformParser.COMMA, i);
	}
	public index_def_list(): Index_defContext[] {
		return this.getTypedRuleContexts(Index_defContext) as Index_defContext[];
	}
	public index_def(i: number): Index_defContext {
		return this.getTypedRuleContext(Index_defContext, i) as Index_defContext;
	}
	public foreign_key_def_list(): Foreign_key_defContext[] {
		return this.getTypedRuleContexts(Foreign_key_defContext) as Foreign_key_defContext[];
	}
	public foreign_key_def(i: number): Foreign_key_defContext {
		return this.getTypedRuleContext(Foreign_key_defContext, i) as Foreign_key_defContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_table_decl;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitTable_decl) {
			return visitor.visitTable_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Column_defContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public column_name(): Column_nameContext {
		return this.getTypedRuleContext(Column_nameContext, 0) as Column_nameContext;
	}
	public column_type(): Column_typeContext {
		return this.getTypedRuleContext(Column_typeContext, 0) as Column_typeContext;
	}
	public column_constraint_list(): Column_constraintContext[] {
		return this.getTypedRuleContexts(Column_constraintContext) as Column_constraintContext[];
	}
	public column_constraint(i: number): Column_constraintContext {
		return this.getTypedRuleContext(Column_constraintContext, i) as Column_constraintContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_column_def;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitColumn_def) {
			return visitor.visitColumn_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Column_def_listContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public column_def_list(): Column_defContext[] {
		return this.getTypedRuleContexts(Column_defContext) as Column_defContext[];
	}
	public column_def(i: number): Column_defContext {
		return this.getTypedRuleContext(Column_defContext, i) as Column_defContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(KuneiformParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_column_def_list;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitColumn_def_list) {
			return visitor.visitColumn_def_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Column_typeContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INT_(): TerminalNode {
		return this.getToken(KuneiformParser.INT_, 0);
	}
	public TEXT_(): TerminalNode {
		return this.getToken(KuneiformParser.TEXT_, 0);
	}
	public BLOB_(): TerminalNode {
		return this.getToken(KuneiformParser.BLOB_, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_column_type;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitColumn_type) {
			return visitor.visitColumn_type(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Column_constraintContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PRIMARY_(): TerminalNode {
		return this.getToken(KuneiformParser.PRIMARY_, 0);
	}
	public NOT_NULL_(): TerminalNode {
		return this.getToken(KuneiformParser.NOT_NULL_, 0);
	}
	public UNIQUE_(): TerminalNode {
		return this.getToken(KuneiformParser.UNIQUE_, 0);
	}
	public DEFAULT_(): TerminalNode {
		return this.getToken(KuneiformParser.DEFAULT_, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.L_PAREN, 0);
	}
	public literal_value(): Literal_valueContext {
		return this.getTypedRuleContext(Literal_valueContext, 0) as Literal_valueContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.R_PAREN, 0);
	}
	public MIN_(): TerminalNode {
		return this.getToken(KuneiformParser.MIN_, 0);
	}
	public number_value(): Number_valueContext {
		return this.getTypedRuleContext(Number_valueContext, 0) as Number_valueContext;
	}
	public MAX_(): TerminalNode {
		return this.getToken(KuneiformParser.MAX_, 0);
	}
	public MIN_LEN_(): TerminalNode {
		return this.getToken(KuneiformParser.MIN_LEN_, 0);
	}
	public MAX_LEN_(): TerminalNode {
		return this.getToken(KuneiformParser.MAX_LEN_, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_column_constraint;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitColumn_constraint) {
			return visitor.visitColumn_constraint(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Literal_valueContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(KuneiformParser.STRING_LITERAL, 0);
	}
	public UNSIGNED_NUMBER_LITERAL(): TerminalNode {
		return this.getToken(KuneiformParser.UNSIGNED_NUMBER_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_literal_value;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitLiteral_value) {
			return visitor.visitLiteral_value(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Number_valueContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public UNSIGNED_NUMBER_LITERAL(): TerminalNode {
		return this.getToken(KuneiformParser.UNSIGNED_NUMBER_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_number_value;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitNumber_value) {
			return visitor.visitNumber_value(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Index_defContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public index_name(): Index_nameContext {
		return this.getTypedRuleContext(Index_nameContext, 0) as Index_nameContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.L_PAREN, 0);
	}
	public column_name_list(): Column_name_listContext {
		return this.getTypedRuleContext(Column_name_listContext, 0) as Column_name_listContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.R_PAREN, 0);
	}
	public UNIQUE_(): TerminalNode {
		return this.getToken(KuneiformParser.UNIQUE_, 0);
	}
	public INDEX_(): TerminalNode {
		return this.getToken(KuneiformParser.INDEX_, 0);
	}
	public PRIMARY_(): TerminalNode {
		return this.getToken(KuneiformParser.PRIMARY_, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_index_def;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitIndex_def) {
			return visitor.visitIndex_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Foreign_key_actionContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ACTION_ON_UPDATE_(): TerminalNode {
		return this.getToken(KuneiformParser.ACTION_ON_UPDATE_, 0);
	}
	public ACTION_ON_DELETE_(): TerminalNode {
		return this.getToken(KuneiformParser.ACTION_ON_DELETE_, 0);
	}
	public ACTION_DO_NO_ACTION_(): TerminalNode {
		return this.getToken(KuneiformParser.ACTION_DO_NO_ACTION_, 0);
	}
	public ACTION_DO_RESTRICT_(): TerminalNode {
		return this.getToken(KuneiformParser.ACTION_DO_RESTRICT_, 0);
	}
	public ACTION_DO_SET_NULL_(): TerminalNode {
		return this.getToken(KuneiformParser.ACTION_DO_SET_NULL_, 0);
	}
	public ACTION_DO_SET_DEFAULT_(): TerminalNode {
		return this.getToken(KuneiformParser.ACTION_DO_SET_DEFAULT_, 0);
	}
	public ACTION_DO_CASCADE_(): TerminalNode {
		return this.getToken(KuneiformParser.ACTION_DO_CASCADE_, 0);
	}
	public ACTION_DO_(): TerminalNode {
		return this.getToken(KuneiformParser.ACTION_DO_, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_foreign_key_action;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitForeign_key_action) {
			return visitor.visitForeign_key_action(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Foreign_key_defContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public L_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.L_PAREN);
	}
	public L_PAREN(i: number): TerminalNode {
		return this.getToken(KuneiformParser.L_PAREN, i);
	}
	public column_name_list_list(): Column_name_listContext[] {
		return this.getTypedRuleContexts(Column_name_listContext) as Column_name_listContext[];
	}
	public column_name_list(i: number): Column_name_listContext {
		return this.getTypedRuleContext(Column_name_listContext, i) as Column_name_listContext;
	}
	public R_PAREN_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.R_PAREN);
	}
	public R_PAREN(i: number): TerminalNode {
		return this.getToken(KuneiformParser.R_PAREN, i);
	}
	public table_name(): Table_nameContext {
		return this.getTypedRuleContext(Table_nameContext, 0) as Table_nameContext;
	}
	public FOREIGN_KEY_(): TerminalNode {
		return this.getToken(KuneiformParser.FOREIGN_KEY_, 0);
	}
	public FOREIGN_KEY_ABBR_(): TerminalNode {
		return this.getToken(KuneiformParser.FOREIGN_KEY_ABBR_, 0);
	}
	public REFERENCES_(): TerminalNode {
		return this.getToken(KuneiformParser.REFERENCES_, 0);
	}
	public REFERENCES_ABBR_(): TerminalNode {
		return this.getToken(KuneiformParser.REFERENCES_ABBR_, 0);
	}
	public foreign_key_action_list(): Foreign_key_actionContext[] {
		return this.getTypedRuleContexts(Foreign_key_actionContext) as Foreign_key_actionContext[];
	}
	public foreign_key_action(i: number): Foreign_key_actionContext {
		return this.getTypedRuleContext(Foreign_key_actionContext, i) as Foreign_key_actionContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_foreign_key_def;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitForeign_key_def) {
			return visitor.visitForeign_key_def(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_visibilityContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PUBLIC_(): TerminalNode {
		return this.getToken(KuneiformParser.PUBLIC_, 0);
	}
	public PRIVATE_(): TerminalNode {
		return this.getToken(KuneiformParser.PRIVATE_, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_action_visibility;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAction_visibility) {
			return visitor.visitAction_visibility(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_mutabilityContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public VIEW_(): TerminalNode {
		return this.getToken(KuneiformParser.VIEW_, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_action_mutability;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAction_mutability) {
			return visitor.visitAction_mutability(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_auxiliaryContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OWNER_(): TerminalNode {
		return this.getToken(KuneiformParser.OWNER_, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_action_auxiliary;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAction_auxiliary) {
			return visitor.visitAction_auxiliary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_attr_listContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public action_visibility_list(): Action_visibilityContext[] {
		return this.getTypedRuleContexts(Action_visibilityContext) as Action_visibilityContext[];
	}
	public action_visibility(i: number): Action_visibilityContext {
		return this.getTypedRuleContext(Action_visibilityContext, i) as Action_visibilityContext;
	}
	public action_mutability_list(): Action_mutabilityContext[] {
		return this.getTypedRuleContexts(Action_mutabilityContext) as Action_mutabilityContext[];
	}
	public action_mutability(i: number): Action_mutabilityContext {
		return this.getTypedRuleContext(Action_mutabilityContext, i) as Action_mutabilityContext;
	}
	public action_auxiliary_list(): Action_auxiliaryContext[] {
		return this.getTypedRuleContexts(Action_auxiliaryContext) as Action_auxiliaryContext[];
	}
	public action_auxiliary(i: number): Action_auxiliaryContext {
		return this.getTypedRuleContext(Action_auxiliaryContext, i) as Action_auxiliaryContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_action_attr_list;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAction_attr_list) {
			return visitor.visitAction_attr_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_declContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ACTION_(): TerminalNode {
		return this.getToken(KuneiformParser.ACTION_, 0);
	}
	public action_name(): Action_nameContext {
		return this.getTypedRuleContext(Action_nameContext, 0) as Action_nameContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.L_PAREN, 0);
	}
	public param_list(): Param_listContext {
		return this.getTypedRuleContext(Param_listContext, 0) as Param_listContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.R_PAREN, 0);
	}
	public action_attr_list(): Action_attr_listContext {
		return this.getTypedRuleContext(Action_attr_listContext, 0) as Action_attr_listContext;
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(KuneiformParser.L_BRACE, 0);
	}
	public action_stmt_list(): Action_stmt_listContext {
		return this.getTypedRuleContext(Action_stmt_listContext, 0) as Action_stmt_listContext;
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(KuneiformParser.R_BRACE, 0);
	}
	public annotation_decl_list(): Annotation_declContext[] {
		return this.getTypedRuleContexts(Annotation_declContext) as Annotation_declContext[];
	}
	public annotation_decl(i: number): Annotation_declContext {
		return this.getTypedRuleContext(Annotation_declContext, i) as Annotation_declContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_action_decl;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAction_decl) {
			return visitor.visitAction_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Param_listContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parameter_list(): ParameterContext[] {
		return this.getTypedRuleContexts(ParameterContext) as ParameterContext[];
	}
	public parameter(i: number): ParameterContext {
		return this.getTypedRuleContext(ParameterContext, i) as ParameterContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(KuneiformParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_param_list;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitParam_list) {
			return visitor.visitParam_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParameterContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PARAM_OR_VAR(): TerminalNode {
		return this.getToken(KuneiformParser.PARAM_OR_VAR, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_parameter;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitParameter) {
			return visitor.visitParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Database_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(KuneiformParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_database_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitDatabase_name) {
			return visitor.visitDatabase_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Extension_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(KuneiformParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_extension_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitExtension_name) {
			return visitor.visitExtension_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Ext_config_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(KuneiformParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_ext_config_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitExt_config_name) {
			return visitor.visitExt_config_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Table_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(KuneiformParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_table_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitTable_name) {
			return visitor.visitTable_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(KuneiformParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_action_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAction_name) {
			return visitor.visitAction_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Column_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(KuneiformParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_column_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitColumn_name) {
			return visitor.visitColumn_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Column_name_listContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public column_name_list(): Column_nameContext[] {
		return this.getTypedRuleContexts(Column_nameContext) as Column_nameContext[];
	}
	public column_name(i: number): Column_nameContext {
		return this.getTypedRuleContext(Column_nameContext, i) as Column_nameContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(KuneiformParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_column_name_list;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitColumn_name_list) {
			return visitor.visitColumn_name_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Index_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INDEX_NAME(): TerminalNode {
		return this.getToken(KuneiformParser.INDEX_NAME, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_index_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitIndex_name) {
			return visitor.visitIndex_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_target_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public BLOCK_VAR_OR_ANNOTATION(): TerminalNode {
		return this.getToken(KuneiformParser.BLOCK_VAR_OR_ANNOTATION, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_annotation_target_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAnnotation_target_name) {
			return visitor.visitAnnotation_target_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_attr_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(KuneiformParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_annotation_attr_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAnnotation_attr_name) {
			return visitor.visitAnnotation_attr_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Annotation_attr_valueContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literal_value(): Literal_valueContext {
		return this.getTypedRuleContext(Literal_valueContext, 0) as Literal_valueContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_annotation_attr_value;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAnnotation_attr_value) {
			return visitor.visitAnnotation_attr_value(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Ext_config_valueContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literal_value(): Literal_valueContext {
		return this.getTypedRuleContext(Literal_valueContext, 0) as Literal_valueContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_ext_config_value;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitExt_config_value) {
			return visitor.visitExt_config_value(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Init_declContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INIT_(): TerminalNode {
		return this.getToken(KuneiformParser.INIT_, 0);
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.R_PAREN, 0);
	}
	public L_BRACE(): TerminalNode {
		return this.getToken(KuneiformParser.L_BRACE, 0);
	}
	public action_stmt_list(): Action_stmt_listContext {
		return this.getTypedRuleContext(Action_stmt_listContext, 0) as Action_stmt_listContext;
	}
	public R_BRACE(): TerminalNode {
		return this.getToken(KuneiformParser.R_BRACE, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_init_decl;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitInit_decl) {
			return visitor.visitInit_decl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_stmt_listContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public action_stmt_list(): Action_stmtContext[] {
		return this.getTypedRuleContexts(Action_stmtContext) as Action_stmtContext[];
	}
	public action_stmt(i: number): Action_stmtContext {
		return this.getTypedRuleContext(Action_stmtContext, i) as Action_stmtContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_action_stmt_list;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAction_stmt_list) {
			return visitor.visitAction_stmt_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_stmtContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public sql_stmt(): Sql_stmtContext {
		return this.getTypedRuleContext(Sql_stmtContext, 0) as Sql_stmtContext;
	}
	public call_stmt(): Call_stmtContext {
		return this.getTypedRuleContext(Call_stmtContext, 0) as Call_stmtContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_action_stmt;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitAction_stmt) {
			return visitor.visitAction_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Sql_stmtContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public SQL_STMT(): TerminalNode {
		return this.getToken(KuneiformParser.SQL_STMT, 0);
	}
	public SCOL(): TerminalNode {
		return this.getToken(KuneiformParser.SCOL, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_sql_stmt;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitSql_stmt) {
			return visitor.visitSql_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Call_stmtContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public call_body(): Call_bodyContext {
		return this.getTypedRuleContext(Call_bodyContext, 0) as Call_bodyContext;
	}
	public SCOL(): TerminalNode {
		return this.getToken(KuneiformParser.SCOL, 0);
	}
	public call_receivers(): Call_receiversContext {
		return this.getTypedRuleContext(Call_receiversContext, 0) as Call_receiversContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(KuneiformParser.ASSIGN, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_call_stmt;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitCall_stmt) {
			return visitor.visitCall_stmt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Call_receiversContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public variable_list(): VariableContext[] {
		return this.getTypedRuleContexts(VariableContext) as VariableContext[];
	}
	public variable(i: number): VariableContext {
		return this.getTypedRuleContext(VariableContext, i) as VariableContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(KuneiformParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_call_receivers;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitCall_receivers) {
			return visitor.visitCall_receivers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Call_bodyContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public fn_name(): Fn_nameContext {
		return this.getTypedRuleContext(Fn_nameContext, 0) as Fn_nameContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.L_PAREN, 0);
	}
	public fn_arg_list(): Fn_arg_listContext {
		return this.getTypedRuleContext(Fn_arg_listContext, 0) as Fn_arg_listContext;
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.R_PAREN, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_call_body;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitCall_body) {
			return visitor.visitCall_body(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PARAM_OR_VAR(): TerminalNode {
		return this.getToken(KuneiformParser.PARAM_OR_VAR, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_variable;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitVariable) {
			return visitor.visitVariable(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Block_varContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public BLOCK_VAR_OR_ANNOTATION(): TerminalNode {
		return this.getToken(KuneiformParser.BLOCK_VAR_OR_ANNOTATION, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_block_var;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitBlock_var) {
			return visitor.visitBlock_var(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Extension_call_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.IDENTIFIER);
	}
	public IDENTIFIER(i: number): TerminalNode {
		return this.getToken(KuneiformParser.IDENTIFIER, i);
	}
	public PERIOD(): TerminalNode {
		return this.getToken(KuneiformParser.PERIOD, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_extension_call_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitExtension_call_name) {
			return visitor.visitExtension_call_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Fn_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public extension_call_name(): Extension_call_nameContext {
		return this.getTypedRuleContext(Extension_call_nameContext, 0) as Extension_call_nameContext;
	}
	public action_name(): Action_nameContext {
		return this.getTypedRuleContext(Action_nameContext, 0) as Action_nameContext;
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_fn_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitFn_name) {
			return visitor.visitFn_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Sfn_nameContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IDENTIFIER(): TerminalNode {
		return this.getToken(KuneiformParser.IDENTIFIER, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_sfn_name;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitSfn_name) {
			return visitor.visitSfn_name(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Fn_arg_listContext extends ParserRuleContext {
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public fn_arg_expr_list(): Fn_arg_exprContext[] {
		return this.getTypedRuleContexts(Fn_arg_exprContext) as Fn_arg_exprContext[];
	}
	public fn_arg_expr(i: number): Fn_arg_exprContext {
		return this.getTypedRuleContext(Fn_arg_exprContext, i) as Fn_arg_exprContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(KuneiformParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_fn_arg_list;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitFn_arg_list) {
			return visitor.visitFn_arg_list(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Fn_arg_exprContext extends ParserRuleContext {
	public _elevate_expr!: Fn_arg_exprContext;
	public _unary_expr!: Fn_arg_exprContext;
	constructor(parser?: KuneiformParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public literal_value(): Literal_valueContext {
		return this.getTypedRuleContext(Literal_valueContext, 0) as Literal_valueContext;
	}
	public variable(): VariableContext {
		return this.getTypedRuleContext(VariableContext, 0) as VariableContext;
	}
	public block_var(): Block_varContext {
		return this.getTypedRuleContext(Block_varContext, 0) as Block_varContext;
	}
	public L_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.L_PAREN, 0);
	}
	public R_PAREN(): TerminalNode {
		return this.getToken(KuneiformParser.R_PAREN, 0);
	}
	public fn_arg_expr_list(): Fn_arg_exprContext[] {
		return this.getTypedRuleContexts(Fn_arg_exprContext) as Fn_arg_exprContext[];
	}
	public fn_arg_expr(i: number): Fn_arg_exprContext {
		return this.getTypedRuleContext(Fn_arg_exprContext, i) as Fn_arg_exprContext;
	}
	public MINUS(): TerminalNode {
		return this.getToken(KuneiformParser.MINUS, 0);
	}
	public PLUS(): TerminalNode {
		return this.getToken(KuneiformParser.PLUS, 0);
	}
	public TILDE(): TerminalNode {
		return this.getToken(KuneiformParser.TILDE, 0);
	}
	public NOT_(): TerminalNode {
		return this.getToken(KuneiformParser.NOT_, 0);
	}
	public sfn_name(): Sfn_nameContext {
		return this.getTypedRuleContext(Sfn_nameContext, 0) as Sfn_nameContext;
	}
	public STAR(): TerminalNode {
		return this.getToken(KuneiformParser.STAR, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(KuneiformParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(KuneiformParser.COMMA, i);
	}
	public PIPE2(): TerminalNode {
		return this.getToken(KuneiformParser.PIPE2, 0);
	}
	public DIV(): TerminalNode {
		return this.getToken(KuneiformParser.DIV, 0);
	}
	public MOD(): TerminalNode {
		return this.getToken(KuneiformParser.MOD, 0);
	}
	public LT2(): TerminalNode {
		return this.getToken(KuneiformParser.LT2, 0);
	}
	public GT2(): TerminalNode {
		return this.getToken(KuneiformParser.GT2, 0);
	}
	public AMP(): TerminalNode {
		return this.getToken(KuneiformParser.AMP, 0);
	}
	public PIPE(): TerminalNode {
		return this.getToken(KuneiformParser.PIPE, 0);
	}
	public LT(): TerminalNode {
		return this.getToken(KuneiformParser.LT, 0);
	}
	public LT_EQ(): TerminalNode {
		return this.getToken(KuneiformParser.LT_EQ, 0);
	}
	public GT(): TerminalNode {
		return this.getToken(KuneiformParser.GT, 0);
	}
	public GT_EQ(): TerminalNode {
		return this.getToken(KuneiformParser.GT_EQ, 0);
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(KuneiformParser.ASSIGN, 0);
	}
	public EQ(): TerminalNode {
		return this.getToken(KuneiformParser.EQ, 0);
	}
	public SQL_NOT_EQ1(): TerminalNode {
		return this.getToken(KuneiformParser.SQL_NOT_EQ1, 0);
	}
	public SQL_NOT_EQ2(): TerminalNode {
		return this.getToken(KuneiformParser.SQL_NOT_EQ2, 0);
	}
	public AND_(): TerminalNode {
		return this.getToken(KuneiformParser.AND_, 0);
	}
	public OR_(): TerminalNode {
		return this.getToken(KuneiformParser.OR_, 0);
	}
    public get ruleIndex(): number {
    	return KuneiformParser.RULE_fn_arg_expr;
	}
	// @Override
	public accept<Result>(visitor: KuneiformParserVisitor<Result>): Result {
		if (visitor.visitFn_arg_expr) {
			return visitor.visitFn_arg_expr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
