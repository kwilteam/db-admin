// Generated from KuneiformParser.g4 by ANTLR 4.13.1

import {ParseTreeVisitor} from 'antlr4';


import { Source_unitContext } from "./KuneiformParser";
import { Database_directiveContext } from "./KuneiformParser";
import { Extension_directiveContext } from "./KuneiformParser";
import { Ext_config_listContext } from "./KuneiformParser";
import { Ext_configContext } from "./KuneiformParser";
import { Annotation_declContext } from "./KuneiformParser";
import { Annotation_attr_listContext } from "./KuneiformParser";
import { Annotation_attrContext } from "./KuneiformParser";
import { Table_declContext } from "./KuneiformParser";
import { Column_defContext } from "./KuneiformParser";
import { Column_def_listContext } from "./KuneiformParser";
import { Column_typeContext } from "./KuneiformParser";
import { Column_constraintContext } from "./KuneiformParser";
import { Literal_valueContext } from "./KuneiformParser";
import { Number_valueContext } from "./KuneiformParser";
import { Index_defContext } from "./KuneiformParser";
import { Foreign_key_actionContext } from "./KuneiformParser";
import { Foreign_key_defContext } from "./KuneiformParser";
import { Action_visibilityContext } from "./KuneiformParser";
import { Action_mutabilityContext } from "./KuneiformParser";
import { Action_auxiliaryContext } from "./KuneiformParser";
import { Action_attr_listContext } from "./KuneiformParser";
import { Action_declContext } from "./KuneiformParser";
import { Param_listContext } from "./KuneiformParser";
import { ParameterContext } from "./KuneiformParser";
import { Database_nameContext } from "./KuneiformParser";
import { Extension_nameContext } from "./KuneiformParser";
import { Ext_config_nameContext } from "./KuneiformParser";
import { Table_nameContext } from "./KuneiformParser";
import { Action_nameContext } from "./KuneiformParser";
import { Column_nameContext } from "./KuneiformParser";
import { Column_name_listContext } from "./KuneiformParser";
import { Index_nameContext } from "./KuneiformParser";
import { Annotation_target_nameContext } from "./KuneiformParser";
import { Annotation_attr_nameContext } from "./KuneiformParser";
import { Annotation_attr_valueContext } from "./KuneiformParser";
import { Ext_config_valueContext } from "./KuneiformParser";
import { Init_declContext } from "./KuneiformParser";
import { Action_stmt_listContext } from "./KuneiformParser";
import { Action_stmtContext } from "./KuneiformParser";
import { Sql_stmtContext } from "./KuneiformParser";
import { Call_stmtContext } from "./KuneiformParser";
import { Call_receiversContext } from "./KuneiformParser";
import { Call_bodyContext } from "./KuneiformParser";
import { VariableContext } from "./KuneiformParser";
import { Block_varContext } from "./KuneiformParser";
import { Extension_call_nameContext } from "./KuneiformParser";
import { Fn_nameContext } from "./KuneiformParser";
import { Sfn_nameContext } from "./KuneiformParser";
import { Fn_arg_listContext } from "./KuneiformParser";
import { Fn_arg_exprContext } from "./KuneiformParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `KuneiformParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class KuneiformParserVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `KuneiformParser.source_unit`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSource_unit?: (ctx: Source_unitContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.database_directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDatabase_directive?: (ctx: Database_directiveContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.extension_directive`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtension_directive?: (ctx: Extension_directiveContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.ext_config_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExt_config_list?: (ctx: Ext_config_listContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.ext_config`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExt_config?: (ctx: Ext_configContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.annotation_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_decl?: (ctx: Annotation_declContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.annotation_attr_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_attr_list?: (ctx: Annotation_attr_listContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.annotation_attr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_attr?: (ctx: Annotation_attrContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.table_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_decl?: (ctx: Table_declContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.column_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_def?: (ctx: Column_defContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.column_def_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_def_list?: (ctx: Column_def_listContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.column_type`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_type?: (ctx: Column_typeContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.column_constraint`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_constraint?: (ctx: Column_constraintContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.literal_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLiteral_value?: (ctx: Literal_valueContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.number_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber_value?: (ctx: Number_valueContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.index_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndex_def?: (ctx: Index_defContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.foreign_key_action`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForeign_key_action?: (ctx: Foreign_key_actionContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.foreign_key_def`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitForeign_key_def?: (ctx: Foreign_key_defContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.action_visibility`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction_visibility?: (ctx: Action_visibilityContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.action_mutability`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction_mutability?: (ctx: Action_mutabilityContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.action_auxiliary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction_auxiliary?: (ctx: Action_auxiliaryContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.action_attr_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction_attr_list?: (ctx: Action_attr_listContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.action_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction_decl?: (ctx: Action_declContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.param_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParam_list?: (ctx: Param_listContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.parameter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParameter?: (ctx: ParameterContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.database_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDatabase_name?: (ctx: Database_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.extension_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtension_name?: (ctx: Extension_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.ext_config_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExt_config_name?: (ctx: Ext_config_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.table_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTable_name?: (ctx: Table_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.action_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction_name?: (ctx: Action_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.column_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_name?: (ctx: Column_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.column_name_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitColumn_name_list?: (ctx: Column_name_listContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.index_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndex_name?: (ctx: Index_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.annotation_target_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_target_name?: (ctx: Annotation_target_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.annotation_attr_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_attr_name?: (ctx: Annotation_attr_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.annotation_attr_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAnnotation_attr_value?: (ctx: Annotation_attr_valueContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.ext_config_value`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExt_config_value?: (ctx: Ext_config_valueContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.init_decl`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInit_decl?: (ctx: Init_declContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.action_stmt_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction_stmt_list?: (ctx: Action_stmt_listContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.action_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction_stmt?: (ctx: Action_stmtContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.sql_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSql_stmt?: (ctx: Sql_stmtContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.call_stmt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCall_stmt?: (ctx: Call_stmtContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.call_receivers`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCall_receivers?: (ctx: Call_receiversContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.call_body`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCall_body?: (ctx: Call_bodyContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.variable`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVariable?: (ctx: VariableContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.block_var`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock_var?: (ctx: Block_varContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.extension_call_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExtension_call_name?: (ctx: Extension_call_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.fn_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFn_name?: (ctx: Fn_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.sfn_name`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSfn_name?: (ctx: Sfn_nameContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.fn_arg_list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFn_arg_list?: (ctx: Fn_arg_listContext) => Result;
	/**
	 * Visit a parse tree produced by `KuneiformParser.fn_arg_expr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFn_arg_expr?: (ctx: Fn_arg_exprContext) => Result;
}

