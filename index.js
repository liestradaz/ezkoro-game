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
        //this.img.src = "../images/idle1.png"
        //this.img.src = "../images/knight.idle.png"
        this.frameIdx = 0
        
        this.state = {
            current: "walkAndAttack",
            idle: 
            {     
                img: "../images/knight.idle.png",
                startIdx: 0,
                endIdx: 12  
            },
            walk:
            {
                img: "../images/knight-walk.png",
                startIdx: 0,
                endIdx: 5
            },
            walkAndAttack:
            {
                img: "../images/knight-walk.png",
                startIdx: 6,
                endIdx: 11
            },
            run:
            {
                img: "../images/knight-run.png",
                startIdx: 0,
                endIdx: 7
            },
            runAndAttack:
            {
                img: "../images/knight-run.png",
                startIdx: 8,
                endIdx: 14
            },
            jump:
            {
                img: "../images/knight-jump.png",
                startIdx: 0,
                endIdx: 7
            },
            death:
            {
                img: "../images/knight-death.png",
                startIdx: 0,
                endIdx: 9
            }   
        }
    }

    update(){
        //const ctx = battleGround.context
        //ctx.drawImage(this.img,this.x,this.y,this.width,this.height)
        if (this.state.current === "death"){
            this.frameWidth = 256
            this.frameHeight = 256
        } else{
            this.frameWidth = 128
            this.frameHeight = 128
        }
        //this.idle()
        const ctx = battleGround.context
        this.img.src=this.state[this.state.current].img
        ctx.drawImage(this.img, this.frameIdx * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height)

        
        if(battleGround.frames % 7 === 0) { this.frameIdx++ }
        if(this.frameIdx >= this.state[this.state.current].endIdx) { this.frameIdx = this.state[this.state.current].startIdx } 
    }
}
 


//************ Executions *************/
const knight = new Knight(50,50,2,150,150,80,320)

battleGround.start()
//updateBackground()




window.onload = function(){


    document.addEventListener("keydown",(event) => {
        switch(event.key){
            case "ArrowLeft":
                knight.x -= 5
                knight.state.current = "idle"
                break;
            case "ArrowRight":
                knight.x += 5
                knight.state.current = "run"
                break;
            case "ArrowUp":
                knight.y -= 5
                knight.state.current = "jump"
                break;
            case "ArrowDown":
                knight.y += 5
                knight.state.current = "idle"
                break;
            case "m":
                knight.y += 5
                knight.state.current = "death"
                break;
            
        }
    })

}
