import Card from 'components/Card';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllMovies,
  loadingMovies,
} from 'store/reducers/movies/movies.action';
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
  const dispatch = useDispatch();
  const isMoviesLoading = useSelector((state) => state.movies.isLoading);
  const moviesData = useSelector((state) => state.movies.data);

  // Fetching Data functions
  useEffect(() => {
    dispatch(loadingMovies());
    dispatch(getAllMovies());
  }, []);

  // Filters management
  const handleDelete = (id) => {};

  return !isMoviesLoading ? (
    <>
      <Container>
        <Title>Nos films ! 🎬🍿</Title>
        <Header></Header>
        <MoviesGrid>
          {moviesData.map((movie, index) => (
            <Card key={index} movie={movie} handleDelete={handleDelete} />
          ))}
        </MoviesGrid>
      </Container>
    </>
  ) : (
    <> Loading </>
  );
}
