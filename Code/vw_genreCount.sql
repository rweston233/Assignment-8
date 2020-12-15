CREATE VIEW `vw_genreCount` 
AS
SELECT  
genre,
count(genre) as "Number of songs in Genre",
(count(genre)*100 / (select count(*) from songs)) as "Genre Percentage"
FROM
 songs
 Group by genre;