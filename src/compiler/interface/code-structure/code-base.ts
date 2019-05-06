import Context from "../../helper/context";

export type contextFunction = (context: Context) => Context;

export default abstract class CodeBase {
    protected _errorLog: string[] = [];
    protected abstract _fingertip: string;

    public execute: contextFunction = (context?) => {
        if(!context)
            context = new Context();
        else
            context.clone(this._fingertip);

        return this._execute(context);
    };

    protected error = (message: string) => {
        this._errorLog.push(message);
    };

    protected abstract _execute: contextFunction;
}