// eslint-disable-next-line no-var
var currentCharacter = {
  id: "",
  class: "",
  hp: "",
  lvl: "",
  attack: "",
  xp: "",
  UserId: ""
};

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    getCharacters(data);
  });
});

let allCharacters = [];
const getCharacters = data => {
  console.log("getCharacters was called");
  fetch(`/api/character_stats/${data.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        $(`.${data[i].class.toLowerCase()}-lvl`).text("Level: " + data[i].lvl);
        $(`.${data[i].class.toLowerCase()}-xp`).text("xp: " + data[i].xp);
        $(`.${data[i].class.toLowerCase()}-hp`).text("hp: " + data[i].hp);
        $(`.${data[i].class.toLowerCase()}-attack`).text(
          "attack: " + data[i].attack
        );
        allCharacters = data;
      }
    });
};
$(".character").on("click", function() {
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    getCharacters(data);
    const dataId = parseInt($(this).attr("data-id"));
    // console.log(test);
    console.log(dataId);
    console.log(allCharacters[dataId].hp);
    currentCharacter = {
      id: allCharacters[dataId].id,
      class: allCharacters[dataId].class,
      hp: allCharacters[dataId].hp,
      lvl: allCharacters[dataId].lvl,
      attack: allCharacters[dataId].attack,
      xp: allCharacters[dataId].xp,
      UserId: allCharacters[dataId].UserId
    };
    console.log(currentCharacter);
    // return currentCharacter;
  });
});
