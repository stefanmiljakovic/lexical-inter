import {Tokens} from "../token";
import BaseImplementation from "./analyzer/implementation/base-implementation";
import Block from "./interface/code-structure/block";

export interface SimpleToken {
    image: string;
    type: string;
}

export default class CompilerBase {

    protected static implementations: BaseImplementation<Block>[] = [];

    public static tokenize = (tokens: any): SimpleToken[] => {
        return tokens.tokens.map((value: any) => {
            if(value.tokenType) {
                let tokenType = value.tokenType.name || 'undefined';
                let val = value.tokenType.LABEL;
                return {
                    type: tokenType,
                    image: val
                }
            }
        });
    };

    public static execute = (tokens: any) => {
        const simpleTokens: SimpleToken[] = CompilerBase.tokenize(tokens);
    }
}