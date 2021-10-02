import Card from 'components/Card';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMovie,
  getAllMovies,
  loadingMovies,
} from 'store/reducers/movies/movies.action';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import _ from 'lodash';

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

const FiltersContainer = styled.div`
  display: grid;
  align-items: center;

  p {
    margin: 0;
  }
`;

const SelectContainer = styled.div`
  div {
    height: 35px;
    margin: 0;
    div {
      margin: 0;
      padding: 0.55em 0.8em;
      border-radius: 10px;
    }
  }
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
  const likedMovies = useSelector((state) => state.movies.likedMovies);
  const dislikedMovies = useSelector((state) => state.movies.dislikedMovies);

  // Fetching data
  useEffect(() => {
    dispatch(loadingMovies());
    dispatch(getAllMovies());
  }, [dispatch]);

  // Filtering data
  const [category, setCategory] = useState('');
  const [filtredMoviesLength, setFiltredMoviesLength] = useState(0);

  useEffect(() => {
    if (filtredMoviesLength === 0) {
      setCategory('');
    }
  }, [filtredMoviesLength]);

  const handleFilter = (choosenCategory) => {
    setCategory(choosenCategory);
    setFiltredMoviesLength(
      moviesData.filter((movie) => movie.category === choosenCategory).length
    );
  };

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
    if (category) {
      setFiltredMoviesLength(filtredMoviesLength - 1);
    }
  };

  return !isMoviesLoading ? (
    <>
      <Container>
        <Title>Nos films ! 🎬🍿</Title>
        <Header>
          <FiltersContainer>
            <SelectContainer>
              <FormControl sx={{ width: 165, height: 'auto' }}>
                <Select
                  value={category}
                  onChange={(e) => {
                    handleFilter(e.target.value);
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value=""> - </MenuItem>
                  {Object.keys(_.groupBy(moviesData, 'category')).map(
                    (category, index) => (
                      <MenuItem
                        key={index}
                        value={category}
                        sx={{ width: 160 }}
                      >
                        {category}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </SelectContainer>
          </FiltersContainer>
        </Header>
        <MoviesGrid>
          {!category ? (
            <>
              {moviesData.map((movie, index) => (
                <Card
                  key={index}
                  movie={movie}
                  isLiked={likedMovies.includes(movie.id)}
                  isDisliked={dislikedMovies.includes(movie.id)}
                  handleDelete={handleDelete}
                  dispatch={dispatch}
                />
              ))}
            </>
          ) : (
            <>
              {moviesData
                .filter((movie) => movie.category === category)
                .map((movie, index) => (
                  <Card
                    key={index}
                    movie={movie}
                    isLiked={likedMovies.includes(movie.id)}
                    isDisliked={dislikedMovies.includes(movie.id)}
                    handleDelete={handleDelete}
                    dispatch={dispatch}
                  />
                ))}
            </>
          )}
        </MoviesGrid>
      </Container>
    </>
  ) : (
    <> Loading </>
  );
}
