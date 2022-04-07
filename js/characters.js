//***Knight Global Variables */
const knightHp = 98
const knightStrength = 25
const knightSpeed = 1
const knightWidth = 150
const knightHeight = 150
const knightX = 80
const knightY = 320

//***Rogue Global Variables */
const rogueHp = 75
const rogueStrength = 20
const rogueSpeed = 5
const rogueWidth = 150
const rogueHeight = 150
const rogueX = 80
const rogueY = 320

//***Mage Global Variables */
const mageHp = 70
const mageStrength = 35
const mageSpeed = 2
const mageWidth = 150
const mageHeight = 150
const mageX = 80
const mageY = 320

//***Demon Global Variables */
const demonHp = 50
const demonStrength = 7
const demonSpeed = 3
const demonWidth = 300
const demonHeight = 300
const demonY = 230
const demonLoot = 10
const demonExp = 10

//***Dragon Global Variables */
const dragonHp = 50
const dragonStrength = 11
const dragonSpeed = 1
const dragonWidth = 300
const dragonHeight = 300
const dragonY = 230
const dragonLoot = 10
const dragonExp = 10

//If localStorage variable doesnt exist then char selected = 0
localStorage.getItem("heroMondra") ? charSelection = localStorage.getItem("heroMondra") : charSelection = 0

class Character{
    constructor(hp, strength, speed, width, height, x, y){
        this.fullHP = hp
        this.hp = hp
        this.strength = strength
        this.speed = speed
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.score = 0
    }

    attack(){
        return this.strength
    }

    defence(dmg){
        this.hp -= dmg
    }

    left() {
        return this.x + this.offset[0]
    }

    right(){
        return this.x + this.width - this.offset[2]
    }

    top(){
        return this.y //+ this.offset[1]
    }

    bottom(){
        return this.y + this.height //- this.offset[3]
    }

    closeTo(obstacle){
        return !(
            this.bottom() < obstacle.top() || 
            this.top() > obstacle.bottom() || 
            this.right() < obstacle.left() || 
            this.left() > obstacle.right()
        )
    }

    healthBar() {
        const ctx = battleGround.context
        let lifePer = this.hp / this.fullHP
        ctx.beginPath()
        ctx.rect(this.x + this.offset[0], this.y + this.offset[1], (this.offset[2] - this.offset[0]) * lifePer, 10)
        if (lifePer>=.70){
            ctx.fillStyle="green"
        } else if (lifePer>=.25 && lifePer<.70){
            ctx.fillStyle="yellow"
        } else if (lifePer<.25){
            ctx.fillStyle="red"
        } 
        ctx.closePath()
        ctx.fill()
    }
}
class Knight extends Character{
    constructor(hp, strength, speed, width, height, x, y){
        super(hp, strength, speed, width, height, x, y)
        this.img = new Image()
        this.frameIdx = 0
        this.type = "knight"
        this.jumpCounter = 0
        this.offset = [20,50,80,86]
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

        if (this.hp <= 0){
            this.hp = 0
            this.state.current = "death"
        }
        if (this.x < 0) {this.x = 0}
        if (this.x > battleGround.canvas.width-100) {this.x = battleGround.canvas.width-100}  

        //if(jumpFlag){this.jump()} else {this.y = 320}
        //condicion ? true : false
        jumpFlag ? this.jump() : this.y = 320

        this.healthBar()

        this.state.current === "idle" ? this.x -=1 : false
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
                    this.x += 20
                    break;
                case 2:
                    //this.y = 240
                    this.y -= 30
                    this.x += 20
                    this.jumpCounter++
                    break;
                case 3:
                    //this.y = 265
                    this.y += 20
                    this.x += 20
                    this.jumpCounter++
                    break;
                case 4:
                    //this.y = 290
                    this.y += 70
                    this.x += 20
                    this.jumpCounter++
                    break;
                case 5:
                    //this.y = 320
                    this.y += 30
                    this.x += 20
                    this.jumpCounter = 0
                    jumpFlag = 0
                    this.state.current = "walk"
                    break;
            } 

        }
    }
}
class Rogue extends Character{
    constructor(hp, strength, speed, width, height, x, y){
        super(hp, strength, speed, width, height, x, y)
        this.img = new Image()
        this.frameIdx = 0
        this.type = "rogue"
        this.jumpCounter = 0
        this.offset = [20,60,70,110]
        this.state = {
            current: "walk",
            idle: 
            {     
                img: "../images/rogue-idle.png",
                startIdx: 1,
                endIdx: 16  
            },
            walk:
            {
                img: "../images/rogue-walk.png",
                startIdx: 1,
                endIdx: 6
            },
            walkAndAttack:
            {
                img: "../images/rogue-walk.png",
                startIdx: 7,
                endIdx: 12
            },
            run:
            {
                img: "../images/rogue-run.png",
                startIdx: 1,
                endIdx: 8
            },
            runAndAttack:
            {
                img: "../images/rogue-run.png",
                startIdx: 9,
                endIdx: 16
            },
            jump:
            {
                img: "../images/rogue-jump.png",
                startIdx: 1,
                endIdx: 12
            },
            death:
            {
                img: "../images/rogue-death.png",
                startIdx: 1,
                endIdx: 8
            },
            walkLeft:
            {
                img: "../images/rogue-walkleft.png",
                startIdx: 1,
                endIdx: 6
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

        if (this.hp <= 0){
            this.hp = 0
            this.state.current = "death"
        }
        if (this.x < 0) {this.x = 0}
        if (this.x > battleGround.canvas.width-100) {this.x = battleGround.canvas.width-100}  

        //if(jumpFlag){this.jump()} else {this.y = 320}
        //condicion ? true : false
        jumpFlag ? this.jump() : this.y = 320

        this.healthBar()
        this.state.current === "idle" ? this.x -=1 : false
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
                    this.x += 20
                    break;
                case 2:
                    //this.y = 240
                    this.y -= 30
                    this.x += 20
                    this.jumpCounter++
                    break;
                case 3:
                    //this.y = 265
                    this.y += 20
                    this.x += 20
                    this.jumpCounter++
                    break;
                case 4:
                    //this.y = 290
                    this.y += 70
                    this.x += 20
                    this.jumpCounter++
                    break;
                case 5:
                    //this.y = 320
                    this.y += 30
                    this.x += 20
                    this.jumpCounter = 0
                    jumpFlag = 0
                    this.state.current = "walk"
                    break;
            } 

        }
    }
}
class Mage extends Character{
    constructor(hp, strength, speed, width, height, x, y){
        super(hp, strength, speed, width, height, x, y)
        this.img = new Image()
        this.frameIdx = 0
        this.type = "mage"
        this.jumpCounter = 0
        this.fireBalls = []
        this.offset = [20,50,75,110]
        this.state = {
            current: "walk",
            idle: 
            {     
                img: "../images/mage-idle.png",
                startIdx: 1,
                endIdx: 14  
            },
            walk:
            {
                img: "../images/mage-walk.png",
                startIdx: 1,
                endIdx: 6
            },
            walkAndAttack:
            {
                img: "../images/mage-walk.png",
                startIdx: 7,
                endIdx: 12
            },
            run:
            {
                img: "../images/mage-run.png",
                startIdx: 1,
                endIdx: 8
            },
            runAndAttack:
            {
                img: "../images/mage-run.png",
                startIdx: 9,
                endIdx: 16
            },
            jump:
            {
                img: "../images/mage-jump.png",
                startIdx: 1,
                endIdx: 12
            },
            death:
            {
                img: "../images/mage-death.png",
                startIdx: 1,
                endIdx: 8
            },
            walkLeft:
            {
                img: "../images/mage-walkleft.png",
                startIdx: 1,
                endIdx: 6
            },
            fireAttack:
            {
                img: "../images/mage-fireattack.png",
                startIdx: 0,
                endIdx: 6
            },
            fireBall:
            {
                img: "../images/mage-fireattack.png",
                startIdx: 7,
                endIdx: 14
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
            } else if (this.state.current === "fireAttack" && this.frameIdx >= this.state.fireAttack.endIdx-1){
                this.frameIdx = 5
                //this.state.current = "walk"
                this.x -= 5
            }
            else {
                this.frameIdx++ 
            }
        }

        if(this.frameIdx >= this.state[this.state.current].endIdx && this.state.current !== "death" && this.state.current !== "fireAttack") {
            this.frameIdx = this.state[this.state.current].startIdx 
        } 

        if (this.hp <= 0){
            this.hp = 0
            this.state.current = "death"
        }

        if (this.x < 0) {this.x = 0}
        if (this.x > battleGround.canvas.width-100) {this.x = battleGround.canvas.width-100}  

        //if(jumpFlag){this.jump()} else {this.y = 320}
        //condicion ? true : false
        jumpFlag ? this.jump() : this.y = 320

        this.healthBar()

        this.state.current === "idle" ? this.x -=1 : false

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
                    this.x += 20
                    break;
                case 2:
                    //this.y = 240
                    this.y -= 30
                    this.x += 20
                    this.jumpCounter++
                    break;
                case 3:
                    //this.y = 265
                    this.y += 20
                    this.x += 20
                    this.jumpCounter++
                    break;
                case 4:
                    //this.y = 290
                    this.y += 70
                    this.x += 20
                    this.jumpCounter++
                    break;
                case 5:
                    //this.y = 320
                    this.y += 30
                    this.x += 20
                    this.jumpCounter = 0
                    jumpFlag = 0
                    this.state.current = "walk"
                    break;
            } 

        }
    }
}

class FireBall extends Character {
  constructor(strength, who, width, height, x, y) {
    super(strength, width, height, x, y);
    this.strength = strength;
    this.who = who;
    this.type = "fireball"
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.frameIdx = 7;
    this.offset = [20, 50, 75, 110];
    this.state = {
      current: "fireBall",
      fireBall: {
        img: "../images/mage-fireattack.png",
        startIdx: 7,
        endIdx: 14,
      },
      dragonFireBall: {
        img: "../images/dragon-fire.png",
        startIdx: 0,
        endIdx: 5,
      }
    };
  }

  update() {
        this.frameWidth = 128
        this.frameHeight = 128


    const ctx = battleGround.context;
    this.img.src = this.state[this.state.current].img;
    ctx.drawImage(
      this.img,
      this.frameIdx * this.frameWidth,
      0,
      this.frameWidth,
      this.frameHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (battleGround.frames % 7 === 0) {
      this.frameIdx++;

    }

    if (this.frameIdx >= this.state[this.state.current].endIdx) {
      this.frameIdx = this.state[this.state.current].startIdx;
    }
  }
}

class Demon extends Character{
    constructor(hp, strength, speed, width, height, x, y) {
        super(hp, strength, speed, width, height, x, y)
        this.img = new Image()
        this.frameIdx = 0
        this.type = "demon"
        this.offset = [130,90,200,185]
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
                endIdx: 5,
                loot: demonLoot,
                exp: demonExp  
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
        if (this.hp <= 0){
            this.hp = 0
            this.state.current = "death"
        }

        this.healthBar()
    }
} 

class Dragon extends Character{
    constructor(hp, strength, speed, width, height, x, y) {
        super(hp, strength, speed, width, height, x, y)
        this.img = new Image()
        this.frameIdx = 0
        this.type = "dragon"
        this.fireBalls = []
        this.offset = [90,75,170,190]
        this.state = {
            current: "walk",
            walk: 
            {
                img: "../images/dragon-walk.png",
                startIdx: 1,
                endIdx: 5  
            },
            attack: 
            {
                img: "../images/dragon-attack.png",
                startIdx: 1,
                endIdx: 4  
            },
            death: 
            {
                img: "../images/dragon-death.png",
                startIdx: 1,
                endIdx: 5,
                loot: dragonLoot,
                exp: dragonExp  
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
        if (this.hp <= 0){
            this.hp = 0
            this.state.current = "death"
        }

        this.healthBar()
    }
}