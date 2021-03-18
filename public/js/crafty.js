/* eslint-disable no-empty-function */
// eslint-disable-next-line no-unused-vars
const character = this.currentCharacter;

window.onload = function() {
  //start crafty
  console.log(this.currentCharacter);
  Crafty.init(50, 400, 320);
  Crafty.canvas();
};

Crafty.scene("charselect", () => {});

Crafty.scene("startscreen", () => {});

Crafty.scene("main", () => {});

Crafty.scene("endgame", () => {});
