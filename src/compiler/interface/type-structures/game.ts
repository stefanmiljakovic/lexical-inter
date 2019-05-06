
export enum GameState {
    INITIAL = 'initial',
    OVER = 'over'
}

export default class Game {
    private _state: GameState = GameState.INITIAL;

    constructor(fromInput: string) {
        // TODO - loading of model from external source
    }

    set state(state: GameState) {
        this._state = state;
    }

    get state() {
        return this._state;
    }
}