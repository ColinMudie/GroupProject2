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

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};
var game = new Phaser.Game(config);
function preload ()
{
  this.load.image('boss', 'assets/boss.png');
  this.load.image('mainmap', 'assets/mainmap.png');
  this.load.spritesheet('sprites', 
      'assets/newSprites.png',
      { frameWidth: 32, frameHeight: 48 }
  );
}
function create ()
{
  this.add.image(400, 300, "boss");
  this.add.image(400, 300, "sprites");

}
function update ()
{
}

