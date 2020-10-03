// Canvas element
const state = {
    drawing: false,
    firstMove: true,
    currentPoint: 0,
    lastMoveTo: { x: 0, y: 0 },
    setLastMoveTo(x, y) {
        this.lastMoveTo = { x, y }
        console.log(`X: ${x}, Y: ${y}`)
    },
    points: []
}

const board = document.getElementById('board')

const ctx = board.getContext('2d')

const mouseDownEvent = board.addEventListener('mousedown', e => {

    state.drawing = true
    if (state.drawing) console.log('Pressionado')

})

const mouseUpEvent = board.addEventListener('mouseup', e => {

    state.drawing = false
    state.firstMove = true
    state.setLastMoveTo(0, 0)

    if (!state.drawing) console.log('Solto')

})

const drawEvent = board.addEventListener('mousemove', e => {
    // With LineTo

    // if (state.drawing) {
    //     const x = e.layerX
    //     const y = e.layerY

    //     if (state.firstMove) {

    //         state.firstMove = false
    //         state.setLastMoveTo(x, y)
    //         ctx.beginPath()

    //     } else {
    //         const { startX, startY } = state.lastMoveTo

    //         ctx.moveTo(startX, startY)
    //         ctx.lineTo(x, y)
    //         ctx.lineWidth = 5   
    //         ctx.stroke()

    //         state.setLastMoveTo(x, y)
    //     }

    // } else {
    //     state.firstMove = true
    // }

    // With quadraticCurveTo
    if (state.drawing) {

        const x = e.layerX
        const y = e.layerY

        state.points.push({ x, y })

        if (state.currentPoint < 2) {

            state.currentPoint++

        } else {

            const points = state.points
            const pointsLenght = state.points.length

            console.log(pointsLenght)

            ctx.beginPath()
            ctx.moveTo( points[pointsLenght - 3].x, points[pointsLenght - 3].y )
            ctx.quadraticCurveTo( 
                points[pointsLenght - 2].x,
                points[pointsLenght - 2].y,
                    points[pointsLenght - 1].x,
                    points[pointsLenght - 1].y,
            )
            ctx.lineWidth = 2
            ctx.stroke()

            state.currentPoint = 1

        }
        
    } else {

        if (state.points.length > 0) state.points = []
        state.currentPoint = 0

    }

})