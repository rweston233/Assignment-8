-- artist insert 
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_artistInsert`(IN name varchar(45))
BEGIN
 INSERT INTO artist
              (name)
       VALUES
              (name);
END$$
DELIMITER ;

-- album insert 
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_albumInsert`(IN title varchar(225), IN releaseDate date, IN artistID INT)
BEGIN
 INSERT INTO album
              (title, releaseDate, artistID)
       VALUES
              (title, releaseDate, artistID);
END$$
DELIMITER ;

-- song insert 
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_songInsert`(IN title varchar(225), IN genre TINYTEXT, IN albumID INT, IN artistID INT)
BEGIN
 INSERT INTO album
              (title, genre, albumID, artistID)
       VALUES
              (title, genre, albumID, artistID);
END$$
DELIMITER ;
