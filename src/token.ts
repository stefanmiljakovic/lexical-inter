import {createToken, Lexer} from "chevrotain";


namespace Tokens {
    export const VariableName = createToken({
        name: 'VariableName',
        label: 'variable',
        pattern: /[A-z]+[0-9]?/
    });

    export const AssignOperatorHigh = createToken({
        name: 'AssignOperatorHigh',
        label: 'assign-operator-h',
        pattern: /[+\-]=/
    });

    export const AssignOperatorLow = createToken({
        name: 'AssignOperatorLow',
        label: 'assign-operator-l',
        pattern: /=/
    });

    export const DuoOperator = createToken({
        name: 'DuoOperator',
        label: 'duo-operator',
        pattern: /(\+|-|\*|\/|==|!=|>=|<=|<|>)/
    });

    export const PostOperator = createToken({
        name: 'PostOperator',
        label: 'post-token',
        pattern: /(\+\+|--)/
    });

    export const BooleanType = createToken({
        name: 'BooleanType',
        label: 'boolean',
        pattern: /(true|false)/
    });

    export const NumberType = createToken({
        name: 'NumberType',
        label: 'number',
        pattern: /-?[0-9]+([,.][0-9]+)?/
    });

    export const StringType = createToken({
        name: 'StringType',
        label: 'string',
        pattern: /'[^']*'/
    });

    export const Dot = createToken({
        name: 'Dot',
        label: '.',
        pattern: /\./
    });

    export const Comma = createToken({
        name: 'Comma',
        label: ',',
        pattern: /,/
    });

    export const pOpen = createToken({
        name: 'pOpen',
        label: '(',
        pattern: /\(/
    });

    export const pClose = createToken({
        name: 'pClose',
        label: ')',
        pattern: /\)/
    });

    export const Call = createToken({
        name: 'Call',
        label: 'call',
        pattern: /(call)/
    });

    export const Struct = createToken({
        name: 'Struct',
        label: 'Struct',
        pattern: /(Struct)/
    });

    export const sOpen = createToken({
        name: 'sOpen',
        label: '{',
        pattern: /{/
    });

    export const sClose = createToken({
        name: 'sClose',
        label: '}',
        pattern: /}/
    });

    export const Contract = createToken({
        name: 'Contract',
        label: 'Contract',
        pattern: /(Contract)/
    });

    export const SemiColon = createToken({
        name: 'SemiColon',
        label: ';',
        pattern: /;/
    });

    export const If = createToken({
        name: 'If',
        label: 'if',
        pattern: /(if)/
    });

    export const Else = createToken({
        name: 'Else',
        label: 'else',
        pattern: /(else)/
    });

    export const WhiteSpace = createToken({
        name: 'WhiteSpace',
        label: 'white-space',
        pattern: /[\t\r\n\f\s]+/,
        group: Lexer.SKIPPED
    });
}

let allTokens = [
    Tokens.AssignOperatorHigh,
    Tokens.DuoOperator,
    Tokens.PostOperator,
    Tokens.AssignOperatorLow,

    Tokens.Dot,
    Tokens.Comma,
    Tokens.pOpen,
    Tokens.pClose,
    Tokens.sOpen,
    Tokens.sClose,
    Tokens.SemiColon,


    Tokens.If,
    Tokens.Else,
    Tokens.Contract,
    Tokens.Struct,
    Tokens.Call,

    Tokens.BooleanType,
    Tokens.NumberType,
    Tokens.StringType,
    Tokens.VariableName,
    Tokens.WhiteSpace,
];

const BNFLexer = new Lexer(allTokens);

export {BNFLexer, allTokens, Tokens}