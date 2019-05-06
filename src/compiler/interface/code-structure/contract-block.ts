import Block from "./block";

export interface Argument {
    type: string;
    name: string;
}

export default class ContractBlock extends Block {
    protected _arguments: Argument[] = [];

    public pushArgument(argument: Argument) {
        this._arguments.push(argument);
    }
}