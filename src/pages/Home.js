import Card from 'components/Card';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMovie, getMovies } from 'store/reducers/movies/movies.action';
import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import _ from 'lodash';
import PaginationButtons from 'components/PaginationButtons';

const Container = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  gap: 35px 0;
  margin-top: 20px;
  padding: 0 6em;
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
      padding: 0.55em 0.8em 0.55em 0.7em;
      border-radius: 10px;
    }
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 3rem;
`;

const PaginationContainer = styled.div`
  display: grid;
  place-content: center;
`;

export default function Home() {
  // store selectors
  const dispatch = useDispatch();
  const isMoviesLoading = useSelector((state) => state.movies.isLoading);
  const moviesData = useSelector((state) => state.movies.data);
  const likedMovies = useSelector((state) => state.movies.likedMovies);
  const dislikedMovies = useSelector((state) => state.movies.dislikedMovies);

  const [limits, setLimits] = useState([4, 8, 12]);
  const [limit, setLimit] = useState(limits[0]);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetching data
  useEffect(() => {
    dispatch(getMovies(currentPage, limit));
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
                  value={limit}
                  onChange={(e) => {
                    setLimit(e.target.value);
                    setCurrentPage(1);
                  }}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  {limits.map((limit, index) => (
                    <MenuItem key={index} value={limit} sx={{ width: 160 }}>
                      {limit}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </SelectContainer>
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
        {!category ? (
          <>
            <MoviesGrid>
              {moviesData
                .slice(limit * (currentPage - 1), limit * currentPage)
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
            </MoviesGrid>
            {Array(Math.ceil(moviesData.length / limit))
              .fill(0)
              .map((element, index) => index).length > 1 && (
              <PaginationContainer>
                <PaginationButtons
                  pages={Array(Math.ceil(moviesData.length / limit))
                    .fill(0)
                    .map((element, index) => index)}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </PaginationContainer>
            )}
          </>
        ) : (
          <>
            <MoviesGrid>
              {moviesData
                .filter((movie) => movie.category === category)
                .slice(limit * (currentPage - 1), limit * currentPage)
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
            </MoviesGrid>
            {Array(
              Math.ceil(
                moviesData.filter((movie) => movie.category === category)
                  .length / limit
              )
            )
              .fill(0)
              .map((element, index) => index).length > 1 && (
              <PaginationContainer>
                <PaginationButtons
                  pages={Array(
                    Math.ceil(
                      moviesData.filter((movie) => movie.category === category)
                        .length / limit
                    )
                  )
                    .fill(0)
                    .map((element, index) => index)}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </PaginationContainer>
            )}
          </>
        )}
      </Container>
    </>
  ) : (
    <> Loading </>
  );
}
