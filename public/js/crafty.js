$(document).ready(() => {

  // When the signup button is clicked, we validate the character stats are not blank
  save.on("click", event => {
    event.preventDefault();
    const characterData = {
      hp: hpInput.val().trim(),
      attack: attackInput.val().trim(),
      xp: xpInput.val().trim(),
      lvl: lvlInput.val().trim()
    };

    if (!characterData.hp || !characterData.attack || !characterData.xp || !characterData.lvl) {
      return;
    }
    // If we have valid stats, run the saveCharacter function
    saveCharacter(characterData.hp, characterData.attack, characterData.xp, characterData.lvl);
    hpInput.val("");
    attackInput.val("");
    xpInput.val("");
    lvlInput.val("");
  });

  // Does a post to the game route. If successful, send a success message
  // Otherwise we log any errors
  function saveCharacter(hp,attack,xp,lvl) {
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
window.onload = function() {
    //start crafty
    Crafty.init(50, 400, 320);
    Crafty.canvas();
  };

  Crafty.scene("charselect",function(){

  })

  Crafty.scene("startscreen",function(){

})


Crafty.scene("main",function(){

})

Crafty.scene("endgame",function(){

})


