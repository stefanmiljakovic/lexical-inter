export default class Skin {
    private _price: number = 0;
    private _color: string = '';

    constructor(fromInput: string) {
        // TODO - loading of model from external source
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }
}