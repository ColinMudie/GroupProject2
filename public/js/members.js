$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.email);
    getCharacters(data);
  });
});

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
      }
    });
};
