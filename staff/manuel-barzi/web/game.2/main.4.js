function Shape(color, width, height) {
    const container = document.createElement('div')
    const { style } = container

    style.position = 'absolute'
    style.width = `${width}px`
    style.height = `${height}px`
    style.backgroundColor = color

    this.x = 0
    this.y = 0

    style.top = `${this.y}px`
    style.left = `${this.x}px`

    this.container = container
}

Shape.prototype.moveLeft = function (step) {
    this.x = this.x - step

    this.container.style.left = `${this.x}px`
}

Shape.prototype.moveRight = function (step) {
    this.x = this.x + step

    this.container.style.left = `${this.x}px`
}

Shape.prototype.moveUp = function (step) {
    this.y = this.y - step

    this.container.style.top = `${this.y}px`
}

Shape.prototype.moveDown = function (step) {
    this.y = this.y + step

    this.container.style.top = `${this.y}px`
}

Shape.prototype.add = function (shape) {
    this.container.append(shape.container)
}

function Roboloko(color) {
    Shape.call(this, color, 100, 100)

    const pupil = new Shape('black', 10, 10)

    let xDir
    let yDir

    setInterval(() => {
        if (pupil.x <= 0)
            xDir = 'right'
        else if (pupil.x >= 10)
            xDir = 'left'

        if (xDir === 'right')
            pupil.moveRight(Math.random())
        else if (xDir === 'left')
            pupil.moveLeft(Math.random())

        if (pupil.y <= 0)
            yDir = 'down'
        else if (pupil.y >= 10)
            yDir = 'up'

        if (yDir === 'down')
            pupil.moveDown(Math.random())
        else if (yDir === 'up')
            pupil.moveUp(Math.random())
    }, 100)

    const eye = new Shape('yellow', 20, 20)
    eye.moveDown(20)
    eye.moveRight(40)

    eye.add(pupil)

    const mouth = new Shape('black', 50, 20)
    mouth.moveDown(60)
    mouth.moveRight(30)

    const tooth = new Shape('white', 10, 15)
    tooth.moveRight(30)

    mouth.add(tooth)

    this.add(eye)
    this.add(mouth)
}

Roboloko.prototype = Object.create(Shape.prototype)
Roboloko.prototype.constructor = Roboloko


const roboloko = new Roboloko('tomato')

roboloko.moveDown(100)
roboloko.moveRight(100)

const roboloko2 = new Roboloko('dodgerblue')

roboloko2.moveDown(100)
roboloko2.moveRight(300)

document.body.append(roboloko.container)
document.body.append(roboloko2.container)

document.addEventListener('keydown', event => {
    const { key } = event

    if (key === 'ArrowUp')
        roboloko.moveUp(10)
    else if (key === 'ArrowDown')
        roboloko.moveDown(10)
    else if (key === 'ArrowLeft')
        roboloko.moveLeft(10)
    else if (key === 'ArrowRight')
        roboloko.moveRight(10)


    if (key === 'w')
        roboloko2.moveUp(10)
    else if (key === 's')
        roboloko2.moveDown(10)
    else if (key === 'a')
        roboloko2.moveLeft(10)
    else if (key === 'd')
        roboloko2.moveRight(10)
})