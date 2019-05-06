import Block from "./block";
import {contextFunction} from "./code-base";
import CodeStatement from "./code-statement";

export default class ConditionBlock extends Block {
    protected _fingertip: string = 'Condition Statement';
    protected _condition: CodeStatement;

    constructor(condition: CodeStatement){
        super();
        this._condition = condition;
    }

    protected _execute: contextFunction = context => {
        if(this._condition.execute(context).data._temp)
            return super.execute(context);
        return context;
    }
}