

CREATE Table Genres (
		GenreID serial PRIMARY KEY,
		Name varchar(50) NOT NULL,
		Description varchar(1000)
);

-- Create table for Directors
-----------------------------

CREATE Table Directors (
		DirectorID serial PRIMARY KEY,
		Name varchar(50) NOT NULL,
		Bio varchar(1000),
		Birthyear date,
		ImageURL varchar (300),
		Featured boolean
);

-- Create table for Movies
--------------------------

CREATE Table Movies (
		MovieID serial PRIMARY KEY,
		Title varchar(50) NOT NULL,
		Description varchar(1000),
		DirectorID integer NOT NULL,
		GenreID integer NOT NULL, 
		ImageURL varchar(300),
		Featured boolean,
			CONSTRAINT GenreKey FOREIGN KEY (GenreID)
				REFERENCES Directors (DirectorID),
			CONSTRAINT DirectorKey FOREIGN KEY (DirectorID)
				REFERENCES Directors (DirectorID)
);

-- Create table for Users 
-------------------------

CREATE Table Users (
		UserID serial PRIMARY KEY,
		Username varchar(50) NOT NULL,
		Password varchar(50) NOT NULL,
		Email varchar(50) NOT NULL,
		Birth_date date
);

-- Create User Favorites

CREATE Table User_Movies (
		UserMovieI serial PRIMARY KEY, 
		UserID integer,
		MovieID integer,
			CONSTRAINT UserKey FOREIGN KEY (UserID)
				REFERENCES Users(UserID),
			CONSTRAINT MovieKey FOREIGN KEY (MovieID)
				REFERENCES Movies(MovieID)
);

-- Insert Genre into "Genre" table 
----------------------------------

INSERT INTO Genres(Name, Description) VALUES('Horror', 'Horror films may incorporate incidents of physical violence and psychological terror; they may be studies of deformed, disturbed, 
				  psychotic, or evil characters; stories of terrifying monsters or malevolent animals; or mystery thrillers that use atmosphere to build suspense.');
				  
INSERT INTO Genres(Name, Description) VALUES('Thriller', 'Thrillers are dark, engrossing, and suspenseful plot-driven stories. They very seldom include comedic elements.');

INSERT INTO Genres(Name, Description) VALUES('Drama', 'Features stories with high stakes and a lot of conflicts.');

INSERT INTO Genres(Name, Description) VALUES('Comedy', 'Comedies are light-hearted dramas, crafted to amuse, entertain, and provoke enjoyment.');

-- Insert Directors into "Directors" table
------------------------------------------

INSERT INTO Directors(Name, Bio, Birthyear, ImageURL, Featured) VALUES('Oren Peli', 'Oren Peli is an Israeli film director, producer and screenwriter, known for directing the 2007 film Paranormal Activity',
					  'January 21, 1970', 'https://images.mubicdn.net/images/cast_member/65434/cache-97856-1410538148/image-w856.jpg?size=800x', true);
					  
INSERT INTO Directors(Name, Bio, Birthyear, ImageURL, Featured) VALUES('Michael Bay', 'A graduate of Wesleyan University, Michael Bay spent his 20s working on advertisements and music videos. His first projects after film 
					  school were in the music video business. He created music videos for Tina Turner, Meat Loaf, Lionel Richie, Wilson Phillips, Donny Osmond and Divinyls. 
					  His work won him recognition and a number of MTV award nominations.', 'February 17, 1965', 'https://m.media-amazon.com/images/M/MV5BMTc2NzcyMDU5NV5BMl5BanBnXkFtZTcwODc1OTM0NA@@
					  ._V1_UY317_CR7,0,214,317_AL_.jpg', false);
					  
INSERT INTO Directors(Name, Bio, Birthyear, ImageURL, Featured) VALUES('Adam McKay', 'Adam McKay is an American screenwriter, director, comedian, and actor. McKay has a comedy partnership with Will Ferrell, with whom he co-wrote the films Anchorman, 
					  Talladega Nights, and The Other Guys. ',
					  'April 17, 1968', 'https://m.media-amazon.com/images/M/MV5BZmQ2ZDNkMGYtOWUzNi00N2Q3LTk1MDItODFlNDJkMTZkMjFmXkEyXkFqcGdeQXVyMjMxNzg4Mjk@._V1_UY317_CR11,0,214,317_AL_.jpg', false);
					  
INSERT INTO Directors(Name, Bio, Birthyear, ImageURL, Featured) VALUES('James Wan', 'James Wan is an Australian film producer, screenwriter and film director of Malaysian Chinese descent. He is widely known for directing the horror 
					  film Saw (2004) and creating Billy the puppet.', 'February 26, 1977', 'https://m.media-amazon.com/images/M/MV5BMTY5NzExMTQ5N15BMl5BanBnXkFtZTcwNjY1NDQzOQ@@._V1_UY317_CR58,0,214,317_AL_.jpg',
					  'false');
					  


-- Insert Movies into "Movies" table
------------------------------------

INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES('Paranormal Activity', 'After moving into a suburban home, a couple becomes increasingly disturbed by a nightly demonic presence.', 1, 1, 
																					   'https://www.imdb.com/title/tt1179904/mediaviewer/rm2607253760/?ref_=tt_ov_i', true);
				   
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES('Area 51', 'Three young conspiracy theorists attempt to uncover the mysteries of Area 51, the governments secret hidden location rumored
																					   to  have hosted encounters with alien beings. What they find at this facility exposes unimaginable secrets', 1, 1, 
																					   'https://www.imdb.com/title/tt1519461/mediaviewer/rm3443389952/?ref_=tt_ov_i', false);
																					   
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES('Ambulance', 'Two robbers steal an ambulance after their heist goes awry.', 2, 2, 'https://www.imdb.com/title/tt4998632/mediaviewer/rm2710955009/?ref_=tt_ov_i',
																					  false);
																					  
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES('6 Underground', 'Six individuals from all around the globe, each the very best at what they do, have been chosen not only for their skill, but for a unique desire 
																					   to delete their pasts to change the future.', 2, 2, 'https://www.imdb.com/title/tt8106534/mediaviewer/rm818777089/?ref_=tt_ov_i', false);
																					   
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES('Transformers', 'An ancient struggle between two Cybertronian races, the heroic Autobots and the evil Decepticons, comes to Earth, with a clue to the ultimate power 
																					   held by a teenager.', 2, 2, 'https://www.imdb.com/title/tt0418279/mediaviewer/rm1443106304/?ref_=tt_ov_i', false);
																					   
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES('Step Brothers', 'Two aimless middle-aged losers still living at home are forced against their will to become roommates when their parents marry.'
																					  , 3, 4, 'https://www.imdb.com/title/tt0838283/mediaviewer/rm3433645824/?ref_=tt_ov_i', true);
																					  
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES('The Other Guys', 'Two mismatched New York City detectives seize an opportunity to step up like the citys top cops, whom they idolize, only things dont quite go as planned.'
																					  , 3, 4, 'https://www.imdb.com/title/tt1386588/mediaviewer/rm2586368513/?ref_=tt_ov_i', false);
																					  
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES('Furious 7', 'Deckard Shaw seeks revenge against Dominic Toretto and his family for his comatose brother.', 4, 3, 
																					   'https://www.imdb.com/title/tt2820852/mediaviewer/rm3501718272/?ref_=tt_ov_i', false);
																					   
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES('The Conjuring', 'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.',
																					  1, 4, 'https://www.imdb.com/title/tt1457767/mediaviewer/rm1035247872/?ref_=tt_ov_i', true);
																					  
INSERT INTO Movies(Title, Description, GenreID, DirectorID, ImageURL, Featured) VALUES('Insidious: The Last Key', 'Parapsychologist Dr. Elise Rainier faces her most fearsome and personal haunting yet, as she is drawn back to 
																					   her ghostly childhood home, where the terror began.', 1, 4, 'https://www.imdb.com/title/tt5726086/mediaviewer/rm2946572544/?ref_=tt_ov_i', false);
																					   
																					   
-- Insert Users into "Users" table
----------------------------------

INSERT INTO Users(UserID, Username, Password, Email, Birth_date) VALUES(1, 'claporte', 'pass1234', 'geekdouttechnology@gmail.com', NULL);

INSERT INTO Users(UserID, Username, Password, Email, Birth_date) VALUES(2, 'mlaporte', 'pass5678', 'geekdouttechnology@gmail.com', NULL);

INSERT INTO Users(UserID, Username, Password, Email, Birth_date) VALUES(3, 'mavlaporte', 'pass9101112', 'geekdouttechnology@gmail.com', NULL);


-- Insert Users Pairs into "User Movies" table
----------------------------------------------

INSERT INTO User_Movies(UserID, MovieID) VALUES(1, 6);

INSERT INTO User_Movies(UserID, MovieID) VALUES(2, 10);

INSERT INTO User_Movies(UserID, MovieID) VALUES(3, 8);

																					   





