function idleChars (){
    canvasCover = document.getElementById("covercanvas")
    ctx = canvasCover.getContext("2d")
    framesCover = 0
    clearCover = () => {
        ctx.clearRect(0,0,canvasCover.width,canvasCover.height)
    }
    
    const knight = new Knight(knightHp, knightStrength, knightSpeed, knightWidth, knightHeight, knightX, knightY)
    clearCover()
    knight.update()
    

}



setInterval(idleChars(),20)  