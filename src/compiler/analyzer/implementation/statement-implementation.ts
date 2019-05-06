import BaseImplementation, {tokenFunction} from "./base-implementation";
import CodeStatement from "../../interface/code-structure/code-statement";
import {Tokens} from "../../../token";

export default class StatementImplementation extends BaseImplementation<CodeStatement> {

    protected _branch: any[] = [];

    protected _execute: tokenFunction = (tokens, index) => {
        // Expect statement to start with variable name, assignment usually or property call
        this._variable();

        // Expects an assignment
        this._assign();
    };

    protected _variable = () => {
        // Consume variable name
        const variable: string[] = [];
        const top = this.consume(Tokens.VariableName);
        variable.push(top);

        while(this.look(Tokens.Dot)){
            this.consume(Tokens.Dot);
            const accessor = this.consume(Tokens.VariableName);
            variable.push(accessor);
        }

        this._branch.push(variable);
    };

    protected _assign = () => {
        let assign: string;
        try {
            assign = this.consume(Tokens.AssignOperatorLow);
        } catch (e) {
            assign = this.consume(Tokens.AssignOperatorHigh);
        }

        this._branch.push(assign);
    };

    protected _assignValue = () => {

    }
}