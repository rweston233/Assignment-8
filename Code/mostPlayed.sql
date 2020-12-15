DELIMITER //
CREATE PROCEDURE `sp_mostPlayedGenreByUser` (IN userID INT)
BEGIN
 SELECT 
sg.genre, COUNT(sg.genre) AS "Number of Streams"
FROM
	user ur
inner join streams st on ur.userID = st.userID
inner join songs sg on st.songID = sg.songID
-- where ur.userId = 
GROUP BY sg.genre
HAVING userID = userID;
END // 
DELIMITER ;