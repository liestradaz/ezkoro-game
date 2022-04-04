//***Knight Global Variables */
const knightHp = 100
const knightStrength = 10
const knightSpeed = 2
const knightWidth = 150
const knightHeight = 150
const knightX = 80
const knightY = 320


//***Demon Global Variables */
const demonHp = 50
const demonStrength = 1
const demonSpeed = 3
const demonWidth = 300
const demonHeight = 300
const demonY = 230


class Character{
    constructor(hp, strength, speed, width, height, x, y){
        this.hp = hp
        this.strength = strength
        this.speed = speed
        this.width = width
        this.height = height
        this.x = x
        this.y = y
    }

    attack(){
        return this.strength
    }

    defence(dmg){
        this.hp -= dmg
    }

    left() {
        return this.x
    }

    right(){
        return this.x + this.width
    }

    top(){
        return this.y
    }

    bottom(){
        return this.y + this.height
    }

    closeTo(obstacle){
        return !(
            this.bottom() < obstacle.top() || 
            this.top() > obstacle.bottom() || 
            this.right() < obstacle.left() || 
            this.left() > obstacle.right()
        )
    }
}

class Knight extends Character{
    constructor(hp, strength, speed, width, height, x, y){
        super(hp, strength, speed, width, height, x, y)
        this.img = new Image()
        this.frameIdx = 0
        this.jumpCounter = 0
        this.state = {
            current: "walk",
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
                endIdx: 6
            },
            death:
            {
                img: "../images/knight-death.png",
                startIdx: 0,
                endIdx: 9
            },
            walkLeft:
            {
                img: "../images/knight-walkleft.png",
                startIdx: 0,
                endIdx: 5
            }
        }
    }

    update(){
        if (this.state.current === "death"){
            this.frameWidth = 256
            this.frameHeight = 256
        } else{
            this.frameWidth = 128
            this.frameHeight = 128
        }

        const ctx = battleGround.context
        this.img.src=this.state[this.state.current].img
        ctx.drawImage(this.img, this.frameIdx * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height)

        if(battleGround.frames % 7 === 0) { 
            if(this.state.current === "death" && this.frameIdx === this.state.death.endIdx){
                this.frameIdx = this.state.death.endIdx 
            } else {
                this.frameIdx++ 
            }
        }
        if(this.frameIdx >= this.state[this.state.current].endIdx && this.state.current !== "death") { this.frameIdx = this.state[this.state.current].startIdx } 

        if (this.hp <= 0){this.state.current = "death"}
        if (knight.x < 0) {knight.x = 0}
        if (knight.x > battleGround.width) {knight.x = 0}
        

        if(jumpFlag){this.jump()} else {this.y = 320}

    }

    jump(){
        if (this.state.current === "jump" && battleGround.frames % 7 === 0){
            switch (this.jumpCounter){
                case 0:
                    //this.y = 320
                    this.jumpCounter++
                    break;
                case 1:
                    //this.y = 270
                    this.y -= 50
                    this.jumpCounter++
                    break;
                case 2:
                    //this.y = 240
                    this.y -= 30
                    this.jumpCounter++
                    break;
                case 3:
                    //this.y = 265
                    this.y += 20
                    this.jumpCounter++
                    break;
                case 4:
                    //this.y = 290
                    this.y += 70
                    this.jumpCounter++
                    break;
                case 5:
                    //this.y = 320
                    this.y += 30
                    this.jumpCounter = 0
                    jumpFlag = 0
                    this.state.current = "walk"
                    break;
            } 

        }
    }
}



class Demon extends Character{
    constructor(hp, strength, speed, width, height, x, y) {
        super(hp, strength, speed, width, height, x, y)
        this.img = new Image()
        this.frameIdx = 0
        this.state = {
            current: "walk",
            walk: 
            {
                img: "../images/demon-walk.png",
                startIdx: 0,
                endIdx: 5  
            },
            attack: 
            {
                img: "../images/demon-attack.png",
                startIdx: 0,
                endIdx: 3  
            },
            death: 
            {
                img: "../images/demon-death.png",
                startIdx: 0,
                endIdx: 5  
            }
        }
    } 

    update(){
        this.frameWidth = 256
        this.frameHeight = 256

        const ctx = battleGround.context
        this.img.src=this.state[this.state.current].img
        ctx.drawImage(this.img, this.frameIdx * this.frameWidth, 0, this.frameWidth, this.frameHeight, this.x, this.y, this.width, this.height)

        if(battleGround.frames % 7 === 0 ) { 
            //this.frameIdx++ 
            if(this.state.current === "death" && this.frameIdx >= this.state.death.endIdx-1){
                this.frameIdx = this.state.death.endIdx -1
            } else {
                this.frameIdx++ 
            }
        }
        if(this.frameIdx >= this.state[this.state.current].endIdx && this.state.current !== "death") { this.frameIdx = this.state[this.state.current].startIdx } 
        if (this.hp <= 0){this.state.current = "death"}
    }
} 