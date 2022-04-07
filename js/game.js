const bkgImg = new Image()
bkgImg.src = "../images/Battleground1066x600.png"
let jumpFlag = false

const audio = new Audio()
audio.src = "../audio/beyond-new-horizons-viking-medieval.mp3"
audio.muted = true
audio.loop = true


const battleGround =  {
    canvas: document.querySelector("#canvas"),
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
    drawScore: function(){
        this.context.font = "40px Grape Nuts"
        this.context.fillStyle = "white"
        this.context.fillText(`Experience: ${char.score}    Health Points: ${char.hp}`, 75, 580)
        //this.context.fillText(`Health Points: ${char.hp}`, 300, 580)
    },
    audio: function(){
        const audio = new Audio()
        audio.src = "../audio/beyond-new-horizons-viking-medieval.mp3"
        audio.muted = true
        audio.loop = true
        audio.play()
    },
    stop: function(){
        clearInterval(this.interval)
    }
}


function runGame(){
    battleGround.backgroundImg.move()
    battleGround.clear()
    battleGround.backgroundImg.draw()

    char.update()
    updateEnemies()
    battle()
    battleGround.drawScore()
    
    battleGround.frames++
    checkGameOver()
   
}

const updateEnemies = () => {
  const enemyRandom = Math.floor(Math.random() * 2);
  let enemy;

  for (let i = 0; i < battleGround.enemies.length; i++) {
    battleGround.enemies[i].x -= 1;
    battleGround.enemies[i].update();
  }

  if (battleGround.frames % 500 === 0) {
    let x = battleGround.canvas.width;

    //Create a random Demon or Dragon
    if (enemyRandom === 0) {
      enemy = new Demon(
        demonHp,
        demonStrength,
        demonSpeed,
        demonWidth,
        demonHeight,
        x,
        demonY
      );
    } else {
      enemy = new Dragon(
        dragonHp,
        dragonStrength,
        dragonSpeed,
        dragonWidth,
        dragonHeight,
        x,
        dragonY
      );
    }

    battleGround.enemies.push(enemy);
  }
};

function battle(){
    const fight = battleGround.enemies.some((element,eIdx) => {
        if (element.closeTo(char) && element.state.current !== "death"){

            if (char.type === "mage" && char.state.current === "fireAttack"){
                char.state.current = "runAndAttack"
            }
            char.x -= 1

            if(battleGround.frames % 10 === 0 && element.state.current != "death"){
                element.state.current = "attack"
                char.defence(element.attack())
                if (char.state.current === "walkAndAttack" || char.state.current === "runAndAttack"){
                    element.defence(char.attack())
                }
            } 
        } else if(!element.closeTo(char) && element.state.current !== "death") {
            element.state.current = "walk"

            if (char.type === "mage" && char.state.current === "fireAttack"){
                const throwFireBall = char.fireBalls[0]

                throwFireBall.update()
                throwFireBall.x += 5

                if (element.closeTo(throwFireBall) && element.state.current !== "death"){
                    element.defence(throwFireBall.attack())
                    char.fireBalls.shift()
                    char.state.current = "walk"
                }

                if(throwFireBall.x > battleGround.canvas.width){
                    char.fireBalls.shift()
                    char.state.current = "walk"
                }
                
            }
        }

        if (element.state.current === "death" && element.state.death.exp > 0){
            char.score += element.state.death.exp
            element.state.death.exp = 0
            char.hp += element.state.death.loot
            element.state.death.loot = 0
            char.hp > char.fullHP ? char.hp = char.fullHP : char.hp
        }

        if (element.x < -200) {
        //battleGround.enemies.shift();
        battleGround.enemies.splice(eIdx,1)
    }

        return element.closeTo(char)
    })    
}

function createChar(idx){
    switch (idx){
        case 0:
            const rogue = new Rogue(rogueHp, rogueStrength, rogueSpeed, rogueWidth, rogueHeight, rogueX, rogueY)
            return rogue
            
        case 1:
            const knight = new Knight(knightHp, knightStrength, knightSpeed, knightWidth, knightHeight, knightX, knightY)
            return knight
        case 2:
            const mage = new Mage(mageHp, mageStrength, mageSpeed, mageWidth, mageHeight, mageX, mageY)
            return mage
    } 

}

function mageFireBall(mage){
    if (mage.type === "mage"){
        const mageFire = new FireBall(50,2, mageWidth, mageHeight, mage.x+mage.offset[0], mage.y)

        mage.fireBalls.push(mageFire)
    }

   //return mageFire
}

function checkGameOver(){

    if (char.state.current === "death"){
        const gameOver = new Image()
        gameOver.src = "../images/restart.png"
        Image.onload = battleGround.context.drawImage(gameOver, 0, 0, battleGround.canvas.width, battleGround.canvas.height)
    } else{
        return false
    }
    
}

//************ Executions *************/
const char = createChar(Number(charSelection))

battleGround.start()



window.onload = function(){

    document.addEventListener("keydown",(event) => {
        switch (event.key.toUpperCase()) {
          case "A":
            char.x -= 5;
            char.state.current = "walkLeft";
            break;
          case "D":
            char.x += 5;
            char.state.current = "run";
            break;
          case "W":
            char.y -= 1;
            char.state.current = "jump";
            jumpFlag = true;
            break;
          case "S":
            char.y += 5;
            char.state.current = "idle";
            break;
          case " ":
            //  audio.muted = false
            //audio.play()
            battleGround.audio()
            char.state.current = "runAndAttack";
            if (char.type === "mage"){
                char.state.current = "fireAttack"
                mageFireBall(char)
            }
            break;
            case "Y":
                if (char.state.current === "death"){
                    window.location.href = "./charselection.html";
                }

                break;
            case "N":
                if (char.state.current === "death"){
                    const theEnd = new Image()
                    theEnd.src = "../images/gameover.png"
                    Image.onload = battleGround.context.drawImage(theEnd, 0, 0, 800, 500)
                    battleGround.stop()
                    window.location.href = "../index.html";
                    //battleGround.canvas.style.display = "none";
                }
                break;
        }
    })

}
