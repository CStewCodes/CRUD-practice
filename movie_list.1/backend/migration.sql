DROP TABLE IF EXISTS movies CASCADE;

CREATE TABLE movies (
    id serial primary key,
    movie_name varchar not null,
    released_date date not null,
    run_time int not null,
    rating DECIMAL (2,1) CHECK (rating >=1 AND rating <=5)
);