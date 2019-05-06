import CodeBase, {contextFunction} from "./code-base";

export default class Block extends CodeBase{
    protected _children: CodeBase[] = [];
    protected _fingertip = 'Basic Block';

    protected _execute: contextFunction = context => {
        return this._executeChildren(context);
    };

    private _executeChildren: contextFunction = context => {
        this._children.forEach(code => {
            context = code.execute(context);
        });
        return context;
    };

    public addChild = (child: CodeBase) => {
        this._children.push(child);
    };
}