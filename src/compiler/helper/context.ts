import _ from 'lodash';

export interface ContextHistory {
    data: any
    fingertip: string
}

export default class Context {
    protected _history: ContextHistory[] = [];
    protected _activeContext: any = {};

    get data() {
        return this._activeContext;
    }

    set data(data: any) {
        this.clone('Data set call');
        this._activeContext = data;
    }

    public clone = (fingertip: string = 'unset') => {
        const history: ContextHistory = {
            data: this._activeContext,
            fingertip: fingertip
        };
        this._history.push(history);
        this._activeContext = _.cloneDeep(this._activeContext);
    }
}