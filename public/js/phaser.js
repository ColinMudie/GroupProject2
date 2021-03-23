/* eslint-disable indent */
let currentCharacter = localStorage.getItem("currentCharacter");
currentCharacter = JSON.parse(currentCharacter);
let xup;
let xdown;
let xleft;
let xright;
let xturn;
let xfacing;
let spawnSprite;
const stepLimit = 100;
const randX = () => Math.random() * 800;
const randY = () => Math.random() * 600;
const characterData = {
  hp: currentCharacter.hp,
  attack: currentCharacter.attack,
  xp: currentCharacter.xp,
  lvl: currentCharacter.lvl,
  class: currentCharacter.class,
  id: currentCharacter.id
};
$(document).ready(() => {
  // When the signup button is clicked, we validate the character stats are not blank
  $(".saveButton").on("click", event => {
    event.preventDefault();
    

    if (
      !characterData.hp ||
      !characterData.attack ||
      !characterData.xp ||
      !characterData.lvl
    ) {
      return;
    }
    // If we have valid stats, run the saveCharacter function
    saveCharacter(
      characterData.hp,
      characterData.attack,
      characterData.xp,
      characterData.lvl
    );
    hpInput.val("");
    attackInput.val("");
    xpInput.val("");
    lvlInput.val("");
  });

  // Does a post to the game route. If successful, send a success message
  // Otherwise we log any errors
  function saveCharacter(hp, attack, xp, lvl) {
    $.put("/api/game", {
      hp: hp,
      attack: attack,
      xp: xp,
      lvl: lvl
    })
      .then(() => {
        $("#alert .msg").text("Save Successful!");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});

$(".characterButton").on("click", event => {
  event.preventDefault();
  window.location.replace("/members");
});

// $(".logoutButton").on("click", event => {
//   event.preventDefault();
//   $.get("/logout", (req, res) => {
//     req.logout();
//     res.render("login");
//   });
// });

console.log(currentCharacter);
// --------------------------------------------------------------
/* eslint-disable no-empty-function */
// eslint-disable-next-line no-unused-vars
const character = this.currentCharacter;

let player;
// window.onload = function() {
//   //start crafty
//   console.log(this.currentCharacter);
//   Crafty.init(50, 400, 320);
//   Crafty.canvas();
// };

// Crafty.scene("charselect", () => {});

// Crafty.scene("startscreen", () => {});

// Crafty.scene("main", () => {});

// Crafty.scene("endgame", () => {});
//determining which sprite
switch (currentCharacter.class) {
  case "Warrior":
    xup = { start: 36, end: 38 };
    xdown = { start: 0, end: 2 };
    xleft = { start: 12, end: 14 };
    xright = { start: 24, end: 26 };
    xturn = [37, 1, 13, 25];
    spawnSprite = [1];
    break;
  case "Huntress":
    xup = { start: 45, end: 47 };
    xdown = { start: 9, end: 11 };
    xleft = { start: 21, end: 23 };
    xright = { start: 33, end: 35 };
    xturn = [46, 10, 22, 34];
    spawnSprite = [10];
    break;
  case "Archer":
    xup = { start: 42, end: 44 };
    xdown = { start: 6, end: 8 };
    xleft = { start: 18, end: 20 };
    xright = { start: 30, end: 32 };
    xturn = [43, 7, 19, 31];
    spawnSprite = [7];
    break;
  case "Mage":
    xup = { start: 90, end: 92 };
    xdown = { start: 54, end: 56 };
    xleft = { start: 66, end: 68 };
    xright = { start: 78, end: 80 };
    xturn = [91, 55, 67, 79];
    spawnSprite = [55];
    break;
}
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};
const game = new Phaser.Game(config);
function preload() {
  this.load.image("boss", "assets/boss.png");
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48
  });
  this.load.image("mainmap", "assets/map2.png");
  //this.load.image("tiles", "assets/gentle forest, moonlight palette.png")
  //this.load.image("tiles", "assets/magicspell_spritesheet.png")
  //this.load.image("tiles", "assets/7_firespin_spritesheet.png")
  //this.load.image("tiles","assets/11_fire_spritesheet.png")
  //this.load.tilemapTiledJSON("mainarea", "assets/map2.json");
  this.load.spritesheet("sprites", "assets/newSprites.png", {
    frameWidth: 26,
    frameHeight: 36
  });
}

function create() {
  // const mainAreaTilemap = this.make.tilemap({ key: "mainarea" });
  // mainAreaTilemap.addTilesetImage("Main Area", "tiles");
  // for (let i = 0; i < mainAreaTilemap.layers.length; i++) {
  //   const layer = mainAreaTilemap
  //     .createLayer(i, "Main Area", 0, 0)
  //   layer.setDepth(i);
  //   layer.scale = 3;}
  this.add.image(400, 300, "mainmap");
  // this.add.image(400, 300, "sprites");
  // this.add.image(400, 300, "dude");
  player = this.physics.add.sprite(100, 450, "sprites", spawnSprite);
  enemy = this.physics.add
    .sprite(randX(), randY(), "sprites", [52])
    .setImmovable();
  this.physics.add.collider(player, enemy, (player, enemy) => {
    if (player.body.touching) {
      console.log("yes");
      console.log(randX());
      console.log(characterData);
      enemy.setPosition(randX(), randY());
      characterData.lvl++;
      console.log(characterData);

      // enemy.destroy();
      // enemy = this.physics.add.sprite(randX, randY, "sprites", [52]);
    }
  });
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  // enemy.body.setVelocityX = Phaser.Math.Between(125, 175);
  // enemy.stepCount = Phaser.Math.Between(0, stepLimit);
  enemy.setCollideWorldBounds(true);
  //move animation
  // this.physics.add.collider(player, enemy, enemy.setPosition(randX, randY));
  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("sprites", xup),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("sprites", xdown),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("sprites", xleft),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("sprites", xright),
    frameRate: 10,
    repeat: -1
  });
  //stop animation
  this.anims.create({
    key: "stopUp",
    frames: [{ key: "sprites", frame: xturn[0] }],
    frameRate: 20
  });
  this.anims.create({
    key: "stopDown",
    frames: [{ key: "sprites", frame: xturn[1] }],
    frameRate: 20
  });
  this.anims.create({
    key: "stopLeft",
    frames: [{ key: "sprites", frame: xturn[2] }],
    frameRate: 20
  });
  this.anims.create({
    key: "stopRight",
    frames: [{ key: "sprites", frame: xturn[3] }],
    frameRate: 20
  });
  //Enemy Animations
  this.anims.create({
    key: "aiUp",
    frames: this.anims.generateFrameNumbers("sprites", { start: 87, end: 89 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "aiDown",
    frames: this.anims.generateFrameNumbers("sprites", { start: 51, end: 53 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "aiLeft",
    frames: this.anims.generateFrameNumbers("sprites", { start: 63, end: 65 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "aiRight",
    frames: this.anims.generateFrameNumbers("sprites", { start: 75, end: 77 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "aiStopUp",
    frames: [{ key: "sprites", frame: 88 }],
    frameRate: 20
  });
  this.anims.create({
    key: "aiStopDown",
    frames: [{ key: "sprites", frame: 52 }],
    frameRate: 20
  });
  this.anims.create({
    key: "aiStopLeft",
    frames: [{ key: "sprites", frame: 64 }],
    frameRate: 20
  });
  this.anims.create({
    key: "aiStopRight",
    frames: [{ key: "sprites", frame: 76 }],
    frameRate: 20
  });
  cursors = this.input.keyboard.createCursorKeys();
}
function update() {
  // if (collider) {
  //   enemy.setPosition(randX, randY);
  //   console.log("no");
  // }
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
    xfacing = "left";
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
    xfacing = "right";
  } else if (cursors.up.isDown) {
    player.setVelocityY(-160);
    player.anims.play("up", true);
    xfacing = "up";
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
    player.anims.play("down", true);
    xfacing = "down";
  } else {
    player.setVelocityX(0);
    player.setVelocityY(0);
    switch (xfacing) {
      case "left":
        player.anims.play("stopLeft");
        break;
      case "right":
        player.anims.play("stopRight");
        break;
      case "up":
        player.anims.play("stopUp");
        break;
      case "down":
        player.anims.play("stopDown");
        break;
    }
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
  // Phaser.Physics.arcade.collider(
  //   player,
  //   enemy,
  //   enemy.setPosition(randX, randY),
  //   null,
  //   this
  // );
}
