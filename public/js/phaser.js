$(document).ready(() => {
  // When the signup button is clicked, we validate the character stats are not blank
  $(".saveButton").on("click", event => {
    event.preventDefault();
    const characterData = {
      hp: hpInput.val().trim(),
      attack: attackInput.val().trim(),
      xp: xpInput.val().trim(),
      lvl: lvlInput.val().trim()
    };

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
  this.load.image("mainmap", "assets/mainmap.png");
  this.load.spritesheet("sprites", "assets/newSprites.png", {
    frameWidth: 28,
    frameHeight: 35
  });
}
function create() {
  this.add.image(400, 300, "mainmap");
  // this.add.image(400, 300, "sprites");
  // this.add.image(400, 300, "dude");
  player = this.physics.add.sprite(100, 450, "sprites");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("sprites", { start: 11, end: 13 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("sprites", { start: 22, end: 24 }),
    frameRate: 10
  });

  this.anims.create({
    key: "down",
    frames: this.anims.generateFrameNumbers("sprites", { frame: 4 }),
    frameRate: 10
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "sprites", frame: 1 }],
    frameRate: 20
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("sprites", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });
  cursors = this.input.keyboard.createCursorKeys();
}
function update() {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  } else if (cursors.up.isDown) {
    player.setVelocityY(-160);
    player.anims.play("up", true);
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
    player.anims.play("down", true);
  } else {
    player.setVelocityX(0);
    player.setVelocityY(0);
    player.anims.play("turn");
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
