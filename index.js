const bkgImg = new Image()
bkgImg.src = "../images/Battleground1066x600.png"

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
        }


}


function runGame(){
    battleGround.backgroundImg.move()
    battleGround.clear()
    battleGround.backgroundImg.draw()

    knight.update()
  

}
/*
function updateBackground(){
    battleGround.backgroundImg.move()
    battleGround.clear()
    battleGround.backgroundImg.draw()

    requestAnimationFrame(runGame)
}
*/

class Character{
    constructor(hp, attack, speed, width, height, x, y){
        this.hp = hp
        this.attack = attack
        this.speed = speed
        this.width = width
        this.height = height
        this.x = x
        this.y = y
    }

    attack(){
        return this.attack
    }

    defence(dmg){
        this.hp -= dmg
    }
}

class Knight extends Character{
    constructor(hp, attack, speed, width, height, x, y){
        super(hp, attack, speed, width, height, x, y)
        this.img = new Image()
        this.img.src = "../images/idle1.png"
    }

    update(){
        const ctx = battleGround.context
        ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
    }
}



//************ Executions *************/
const knight = new Knight(50,50,2,150,150,80,320)

battleGround.start()
//updateBackground()



