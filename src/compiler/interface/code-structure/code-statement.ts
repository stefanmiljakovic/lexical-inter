import CodeBase, {contextFunction} from "./code-base";

export default class CodeStatement extends CodeBase {
    protected _fingertip: string = 'Basic Statement';
    protected _callback: contextFunction;

    constructor(callback: contextFunction) {
        super();
        this._callback = callback;
    }

    protected _execute: contextFunction = context => {
        return this._callback(context);
    };
}