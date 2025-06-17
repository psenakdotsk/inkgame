class GameObject {
    constructor(x, y, width, height, char) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.char = char
    }

    isObjectColliding(x,y,width,height) {
        return x >= this.x && y >= this.y && x + width <= this.x + this.width && y + height <= this.y + this.height
    }
}

export default GameObject