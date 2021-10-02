import Card from 'components/Card';
import { movies$ } from 'movies';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, 75%);
  grid-auto-rows: min-content;
  justify-content: center;
  gap: 35px 0;
  margin-top: 20px;
`;

const Title = styled.h1`
  color: hsl(201deg 100% 11%);
  margin-bottom: 0;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  justify-content: end;
  align-items: center;
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 3rem;
`;

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [movies, setMovies] = useState([]);

  // Fetching Data functions
  const getMovies = () => {
    setIsLoading(true);
    movies$
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMovies();
  }, []);

  // Filters management
  const handleDelete = (id) => {};

  return !isLoading ? (
    <>
      <Container>
        <Title>Nos films ! 🎬🍿</Title>
        <Header></Header>
        <MoviesGrid>
          {movies.map((movie, index) => (
            <Card key={index} movie={movie} handleDelete={handleDelete} />
          ))}
        </MoviesGrid>
      </Container>
    </>
  ) : (
    <> Loading </>
  );
}
