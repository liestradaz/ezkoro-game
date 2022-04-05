const bkgImg = new Image()
bkgImg.src = "./images/Battleground1066x600.png"
let jumpFlag = false

const battleGround =  {
    canvas: document.querySelector("canvas"),
    frames: 0,
    start: function(){
        this.canvas.width = this.canvas.width
        this.canvas.height = this.canvas.height
        this.context = this.canvas.getContext("2d")
        this.interval = setInterval (runGame,20)
    },
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    setBkgImg: function(){
     /*   const bkgImg2 = new Image()
        bkgImg2.src = "../images/Battleground1066x600.png"
        //bkgImg.onload = this.context.drawImage(bkgImg, 0, 0, this.canvas.width, this.canvas.height)
        console.log(typeof bkgImg2)
        return bkgImg2
        */
    },
    backgroundImg: 
        {
            img: bkgImg,
            x: 0,
            speed: -1,
            move: function(){
                this.x += this.speed,
                this.x %= battleGround.canvas.width
            },
            draw: function(){
                battleGround.context.drawImage(this.img, this.x, 0)
                if(this.speed < 0){
                    battleGround.context.drawImage(this.img, this.x + battleGround.canvas.width, 0)
                } else{
                    battleGround.context.drawImage(this.img, this.x - this.img.width, 0)
                }
            }
        },
    enemies: [],
    stop: function(){
        clearInterval(this.interval)
    }
}


function runGame(){
    battleGround.backgroundImg.move()
    battleGround.clear()
    battleGround.backgroundImg.draw()

    knight.update()
    updateEnemies()
    battle()
    
    battleGround.frames++

}
/*
function updateBackground(){
    battleGround.backgroundImg.move()
    battleGround.clear()
    battleGround.backgroundImg.draw()

    requestAnimationFrame(runGame)
}
*/

const updateEnemies = () => {
    for (let i = 0; i< battleGround.enemies.length; i++){
        battleGround.enemies[i].x -= 1
        battleGround.enemies[i].update()
    }

    if (battleGround.frames % 500 === 0){
        let x = battleGround.canvas.width
        battleGround.enemies.push(new Demon(demonHp, demonStrength, demonSpeed, demonWidth, demonHeight, x, demonY))
    }
}

function battle(){
    const fight = battleGround.enemies.some((element,eIdx) => {
        if (element.closeTo(knight) && element.state.current !== "death"){

            knight.x -= 1

            if(battleGround.frames % 10 === 0 && element.state.current != "death" && knight.state.current != "death"){
                element.state.current = "attack"
                knight.defence(element.attack())
                if (knight.state.current === "walkAndAttack" || knight.state.current === "runAndAttack"){
                    element.defence(knight.attack())
                }
            } 
        } else if(!element.closeTo(knight) && element.state.current !== "death") {element.state.current = "walk"}

    if (element.x < -200) {
        //battleGround.enemies.shift();
        battleGround.enemies.splice(eIdx,1)
    }

        return element.closeTo(knight)
    })    
}


//************ Executions *************/
const knight = new Knight(knightHp, knightStrength, knightSpeed, knightWidth, knightHeight, knightX, knightY)

battleGround.start()
//updateBackground()


window.onload = function(){


    document.addEventListener("keydown",(event) => {
        switch(event.key){
            case "ArrowLeft":
                knight.x -= 5
                knight.state.current = "walkLeft"
                break;
            case "ArrowRight":
                knight.x += 5
                knight.state.current = "run"
                break;
            case "ArrowUp":
                knight.y -= 1
                knight.state.current = "jump"
                jumpFlag = true
                //knight.jump()
                //jump()
                break;
            case "ArrowDown":
                knight.y += 5
                knight.state.current = "idle"
                break;
            case "m":
                knight.y += 5
                knight.state.current = "death"
                break;
            case "s":
                battleGround.stop()
                break;
            case " ":
                knight.state.current = "runAndAttack"
                break;
            
        }
    })

}
