import {SimpleToken} from "../../compiler-base";
import {TokenType} from "chevrotain";
import CodeBase from "../../interface/code-structure/code-base";

export type tokenFunction = (tokens: SimpleToken[], index: number) => any;

export default abstract class BaseImplementation<T extends CodeBase> {
    protected index: number = 0;
    protected tokens: SimpleToken[] = [];
    protected _block: T = null;

    get block(): T {
        return this._block;
    }

    protected consume = (type: TokenType): string => {
        const {tokens, index} = this;
        if(tokens[index].type == type.LABEL) {
            this.index++;
            return tokens[index].image;
        } else {
            throw new AbortSignal();
        }
    };

    protected look = (type: TokenType): boolean => {
        const {tokens, index} = this;

        return tokens[index].type == type.LABEL;
    };

    public feedTokens = (tokens: SimpleToken[]) => {
        this.tokens = tokens;
    };

    protected abstract _execute: tokenFunction;

    public execute: tokenFunction = (tokens, index) => {
        this.index = index;
        try {
            this._execute(tokens, index);
            return this.index;
        } catch (e) {
            console.log(e);
            return index;
        }
    }
}