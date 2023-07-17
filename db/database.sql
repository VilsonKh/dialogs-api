CREATE DATABASE IF NOT EXISTS dialogs;

CREATE TABLE Texts
(
  id INT(11) NOT NULL auto_increment,
  text VARCHAR(1000) NOT NULL , 
  group_id INT(11) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO Texts (text, group_id) VALUES
  ('Жизнь — это как велосипед. Чтобы сохранить равновесие, ты должен двигаться.', 1),
  ('Будь самим собой; все остальные роли уже заняты.', 2),
  ('Успех — это способность идти от поражения к поражению без потери энтузиазма.', 3),
  ('Возьми свою жизнь в свои руки и сделай из нее шедевр.', 1),
  ('Не следует ждать идеальных условий; они не придут. Начни работать с того, что есть.', 2),
  ('Восход солнца – это новый шанс изменить свою жизнь.', 3),
  ('Секрет успеха – это знать что-то, чего никто другой не знает.', 1),
  ('Только те, кто осмеливаются, могут добиться успеха.', 2),
  ('Будь лучше того, кем был вчера.', 3);

