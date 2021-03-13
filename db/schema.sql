

CREATE DATABASE IF NOT EXISTS rpg_gameDB;

USE rpg_gameDB;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    email VARCHAR(255),
    pass_word VARCHAR(255),
    primary key (id)
);

CREATE TABLE characters (
  id INT NOT NULL AUTO_INCREMENT,
  class VARCHAR(150) NULL,
  hp VARCHAR(100) NULL,
  attack VARCHAR(100) NULL,
  xp INT(10),
  user_id INT,
  FOREIGN KEY (users_id) REFERENCES users(id),
  PRIMARY KEY (id)
);

INSERT INTO characters (class, hp, attack, xp)
VALUES ("Warrior", 100, 75, 0);

INSERT INTO characters (class, hp, attack, xp)
VALUES ("Huntress", 100, 85, 0);

INSERT INTO characters (class, hp, attack, xp)
VALUES ("Archer", 100, 45, 3);

INSERT INTO characters (class, hp, attack, xp)
VALUES ("Mage", 100, 65, 2);




