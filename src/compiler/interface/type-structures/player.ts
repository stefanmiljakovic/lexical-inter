import Skin from "./skin";

export default class Player {
    private _name: string = '';
    private _score: number = 0;
    private _points: number = 0;
    private _skins: Skin[] = [];
    private _trust: number = 0;

    constructor(fromInput: string) {
        // TODO - loading of model from external source
    }

    addSkin = (value: Skin) => {
        this._skins.push(value);
    };

    get name() {
        return this._name;
    }

    get score() {
        return this._score;
    }

    set score(score: number) {
        this._score = score;
    }

    get points(): number {
        return this._points;
    }

    set points(value: number) {
        this._points = value;
    }

    get skins(): Skin[] {
        return this._skins;
    }

    get trust(): number {
        return this._trust;
    }

    set trust(value: number) {
        this._trust = value;
    }

}