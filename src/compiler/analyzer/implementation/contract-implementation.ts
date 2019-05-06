import BaseImplementation, {tokenFunction} from "./base-implementation";
import {Tokens} from "../../../token";
import Block from "../../interface/code-structure/block";
import ContractBlock, {Argument} from "../../interface/code-structure/contract-block";
import Context from "../../helper/context";

export default class ContractImplementation extends BaseImplementation<Block> {

    // TODO arguments should be fed on demand ? Available from local stack ?
    protected _execute: tokenFunction = (tokens, index) => {
        // Expect start as Contract
        this.consume(Tokens.Contract);

        // Consume first parentheses
        this.consume(Tokens.pOpen);

        // Export arguments
        const args: Argument[] = [];

        // Read arguments
        while(!this.look(Tokens.pClose)){
            // Expects type
            const type = this.consume(Tokens.VariableName);
            const name = this.consume(Tokens.VariableName);

            args.push({name: name, type: type});

            // Expect , or Close
            if(this.look(Tokens.Comma))
                this.consume(Tokens.Comma)
        }

        // Expect open
        this.consume(Tokens.sOpen);
        // Parse body
        while(!this.look(Tokens.sClose)){

        }
        // Expect close
        this.consume(Tokens.sClose);

        const block = new ContractBlock();
        args.forEach(arg => block.pushArgument(arg));
    };
}