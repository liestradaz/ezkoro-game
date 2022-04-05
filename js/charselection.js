let idx = 0

function abilities() {
  rHp = document.getElementById("roguehp");
  rHp.value = rogueHp;
  document.getElementById("spanroguehp").innerHTML = rogueHp;
  rStrength = document.getElementById("roguestrength");
  rStrength.value = rogueStrength;
  document.getElementById("spanroguestrength").innerHTML = rogueStrength;
  rSpeed = document.getElementById("roguespeed");
  rSpeed.value = rogueSpeed;
  document.getElementById("spanroguespeed").innerHTML = rogueSpeed;

  kHp = document.getElementById("knighthp");
  kHp.value = knightHp;
  document.getElementById("spanknighthp").innerHTML = knightHp;
  kStrength = document.getElementById("knightstrength");
  kStrength = knightStrength;
  document.getElementById("spanknightstrength").innerHTML = knightStrength;
  kSpeed = document.getElementById("knightspeed");
  kSpeed = knightSpeed;
  document.getElementById("spanknightspeed").innerHTML = knightSpeed;

  mHp = document.getElementById("magehp");
  mHp.value = mageHp;
  document.getElementById("spanmagehp").innerHTML = mageHp;
  mtrength = document.getElementById("magestrength");
  mtrength.value = mageStrength;
  document.getElementById("spanmagestrength").innerHTML = mageStrength;
  mSpeed = document.getElementById("magespeed");
  mSpeed.value = mageSpeed;
  document.getElementById("spanmagespeed").innerHTML = mageSpeed;
}

function selectedChar(idx) {
  const options = ["rogue", "knight", "mage"];

  switch (idx) {
    case 0:
      document.getElementById("rogue").classList.add("selected");
      document.getElementById("knight").classList.remove("selected");
      document.getElementById("mage").classList.remove("selected");
      break;
    case 1:
      document.getElementById("knight").classList.add("selected");
      document.getElementById("rogue").classList.remove("selected");
      document.getElementById("mage").classList.remove("selected");
      break;
    case 2:
      document.getElementById("mage").classList.add("selected");
      document.getElementById("rogue").classList.remove("selected");
      document.getElementById("knight").classList.remove("selected");
      break;
  }
}

abilities();


document.addEventListener("keydown", (event) => {

  switch (event.key) {
    case "ArrowLeft":
      idx -= 1
      break;
    case "ArrowRight":
      idx += 1
      break;
  }

  if (idx > 2){idx = 0}
  if (idx < 0){idx = 2}
  selectedChar(idx);
});

document.addEventListener("click", (event) => {

    if(event.path[0].classList[0] == "rogue"){
        idx = 0
    } else if (event.path[0].classList[0] == "knight"){
        idx = 1
    }
    else if (event.path[0].classList[0] == "mage"){
        idx = 2
    }

    selectedChar(idx);
})