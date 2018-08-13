--  Drop table

--  DROP TABLE proyecto0.Users

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Users_Name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE proyecto0.Events (
	id INT NOT NULL AUTO_INCREMENT,
	name varchar(500) NOT NULL,
	category varchar(25) NOT NULL,
	place varchar(500) NOT NULL,
	address varchar(200) NOT NULL,
	init DATETIME NOT NULL,
	end DATETIME NOT NULL,
	stage varchar(20) NOT NULL,
	CONSTRAINT Events_PK PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;