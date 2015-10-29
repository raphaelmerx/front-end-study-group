class Rectangle {
    constructor(length, height) {
        this._length = length;
        this._height = height;
        Rectangle.count = !Rectangle.count ? 1 : (Rectangle.count + 1);
    }

    getArea() {
        return this._length * this._height;
    }

    get length() {
        return this._length;
    }
    set length(value) {
        if (value < 0) {
            throw Error('A rectangle can\'t have a negative length!');
        }
        this._length = value;
    }
}

class Square extends Rectangle {
    constructor(length) {
        super(length, length);
    }
}
