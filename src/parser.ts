import {Parser} from "chevrotain";
import {allTokens, Tokens} from "./token";

class BNFParser extends Parser {
    constructor() {
        super(allTokens);

        const $ = this;
        const $$ = this as any;

        $.RULE('main', () => {
            $.MANY(() => {
                $.OPTION(() => {
                    $.SUBRULE($$.main_loop);
                })
            })
        });

        $.RULE('main_loop', () => {
            $.OR([
                {
                    GATE: $.BACKTRACK($$.contract_call),
                    ALT: () => $.SUBRULE($$.contract_call)
                },
                {
                    GATE: $.BACKTRACK($$.struct),
                    ALT: () => $.SUBRULE($$.struct)
                },
                {
                    GATE: $.BACKTRACK($$.contract),
                    ALT: () => $.SUBRULE($$.contract)
                },
            ])
        });

        $.RULE('operator_assign', () => {
            $.OR([
                {ALT: () => $.CONSUME(Tokens.AssignOperatorHigh)},
                {ALT: () => $.CONSUME(Tokens.AssignOperatorLow)}
            ])
        });

        $.RULE('variable', () => {
            $.OR([
                {ALT: () => $.CONSUME(Tokens.VariableName)},
                {
                    ALT: () => {
                        $.CONSUME(Tokens.VariableName);
                        $.CONSUME(Tokens.VariableName);
                    }
                }
            ])
        });

        $.RULE('variable_operable', () => {
            $.OR([
                {ALT: () => $.CONSUME(Tokens.VariableName)},
                {ALT: () => $.SUBRULE($$.variable_property)}
            ])
        });

        $.RULE('variable_single_operation', () => {
            $.SUBRULE($$.variable_operable);
            $.CONSUME(Tokens.PostOperator);
        });

        $.RULE('variable_duo_operation', () => {
            $.SUBRULE($$.variable_operable);
            $.SUBRULE($$.operator_assign);
            $.SUBRULE($$.value_complex);
        });

        $.RULE('variable_operation', () => {
            $.OR([
                {ALT: () => $.SUBRULE($$.variable_duo_operation)},
                {ALT: () => $.SUBRULE($$.variable_single_operation)}
            ])
        });

        $.RULE('variable_property_accessor', () => {
            $.CONSUME(Tokens.Dot);
            $.SUBRULE($$.variable_name);
            $.MANY(() => {
                $.CONSUME(Tokens.Dot);
                $.SUBRULE($$.variable_name);
                $.SUBRULE($$.variable_property_accessor);
            })
        });

        $.RULE('variable_property', () => {
            $.CONSUME(Tokens.VariableName);
            $.SUBRULE($$.variable_property_accessor);
        });

        $.RULE('value_simple', () => {
            $.OR([
                {ALT: () => $.CONSUME(Tokens.VariableName)},
                {ALT: () => $.SUBRULE($$.variable_value)},
                {ALT: () => $.SUBRULE($$.variable_property)},
                {ALT: () => $.SUBRULE($$.any_call)}
            ])
        });

        $.RULE('value_complex', () => {
            $.SUBRULE($$.value_simple);
            $.MANY(() => {
                $.SUBRULE($$.value_simple);
                $.CONSUME(Tokens.DuoOperator);
                $.SUBRULE($$.value_complex);
            });
        });

        $.RULE('call', () => {
            $.CONSUME(Tokens.pOpen);
            $.SUBRULE($$.call_arguments);
            $.CONSUME(Tokens.pClose);
        });

        $.RULE('call_arguments', () => {
            $.SUBRULE($$.value_complex);
            $.MANY(() => {
                $.SUBRULE($$.value_complex);
                $.CONSUME(Tokens.Comma);
                $.SUBRULE($$.call_arguments);
            })
        });

        $.RULE('property_call', () => {
            $.SUBRULE($$.variable_property);
            $.SUBRULE($$.call);
        });

        $.RULE('contract_call', () => {
            $.CONSUME(Tokens.Call);
            $.CONSUME(Tokens.VariableName);
            $.SUBRULE($$.call);
        });

        $.RULE('function_call', () => {
            $.CONSUME(Tokens.VariableName);
            $.SUBRULE($$.call);
        });

        $.RULE('any_call', () => {
            $.OR([
                {ALT: () => $.SUBRULE($$.property_call)},
                {ALT: () => $.SUBRULE($$.contract_call)},
                {ALT: () => $.SUBRULE($$.function_call)}
            ])
        });

        $.RULE('struct', () => {
            $.CONSUME(Tokens.Struct);
            $.CONSUME(Tokens.VariableName);
            $.SUBRULE($$.struct_block);
        });

        $.RULE('struct_block', () => {
            $.CONSUME(Tokens.sOpen);
            $.SUBRULE($$.struct_block_inner);
            $.CONSUME(Tokens.sClose);
        });

        $.RULE('struct_block_inner', () => {
            $.CONSUME(Tokens.VariableName);
            $.MANY(() => {
                $.CONSUME(Tokens.VariableName);
            });
        });

        $.RULE('contract', () => {
            $.CONSUME(Tokens.Contract);
            $.CONSUME(Tokens.VariableName);
            $.SUBRULE($$.contract_arguments);
            $.SUBRULE($$.contract_block);
        });

        $.RULE('contract_arguments', () => {
            $.CONSUME(Tokens.pOpen);
            $.SUBRULE($$.contract_arguments_loop);
            $.CONSUME(Tokens.pClose);
        });

        $.RULE('contract_arguments_loop', () => {
            $.SUBRULE($$.variable);
            $.MANY(() => {
                $.SUBRULE($$.variable);
                $.CONSUME(Tokens.Comma);
                $.SUBRULE($$.contract_arguments_loop);
            });
        });

        $.RULE('contract_block', () => {
            $.CONSUME(Tokens.sOpen);
            $.SUBRULE($$.contract_block_inner);
            $.CONSUME(Tokens.sClose);
        });

        $.RULE('contract_block_inner', () => {
            $.SUBRULE($$.logic_block);
        });

        $.RULE('logic_block', () => {
            $.SUBRULE($$.logic_operation);
            $.CONSUME(Tokens.SemiColon);
            $.MANY(() => {
                $.SUBRULE($$.logic_operation);
                $.CONSUME(Tokens.SemiColon);
                $.SUBRULE($$.logic_block);
            });
        });

        $.RULE('logic_operation', () => {
            $.OR([
                {ALT: () => $.SUBRULE($$.any_call)},
                {ALT: () => $.SUBRULE($$.variable_operation)},
                {
                    ALT: () => {
                        $.SUBRULE($$.if_block);
                        $.OPTION(() => {
                            $.MANY(() => {
                                $.SUBRULE($$.else_if_block);
                            })
                        });
                        $.OPTION(() => {
                            $.SUBRULE($$.else_block);
                        })
                    }
                }
            ])
        });

        $.RULE('if_block', () => {
            $.CONSUME(Tokens.If);
            $.CONSUME(Tokens.pOpen);
            $.SUBRULE($$.value_complex);
            $.CONSUME(Tokens.pClose);
            $.CONSUME(Tokens.sOpen);
            $.SUBRULE($$.logic_block);
            $.CONSUME(Tokens.sClose);
        });

        $.RULE('else_if_block', () => {
            $.CONSUME(Tokens.Else);
            $.SUBRULE($$.if_block);
        });

        $.RULE('else_block', () => {
            $.CONSUME(Tokens.Else);
            $.CONSUME(Tokens.sOpen);
            $.SUBRULE($$.logic_block);
            $.CONSUME(Tokens.sClose);
        });

    }
}

export {BNFParser};