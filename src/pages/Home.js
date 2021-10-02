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
import { SemipolarLoading } from 'react-loadingg';
import logo from 'assets/images/svg/icons/logo.svg';
import popcorn from 'assets/images/svg/icons/popcorn.svg';

const LoadingScreen = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1000;
  background: white;
  display: grid;
  grid-template-rows: min-content min-content;
  place-content: center;

  transition: opacity 0.5s;
  opacity: ${({ animate }) => animate && '0'};
  display: ${({ disappear }) => disappear && 'none'};
`;
const LogoContainer = styled.div`
  display: grid;
  grid-template-columns: min-content max-content;
  align-items: center;
  gap: 0 15px;

  img {
    width: 75px;
  }

  p {
    margin: 0;
    font-weight: bold;
    font-size: 2rem;
    color: hsl(0, 87%, 44%);
  }
`;

const LoaderContainer = styled.div`
  position: relative;
  display: grid;
  background: red;
  top: 50px;

  div {
    margin: 0 auto;
  }
`;

const Container = styled.div`
  display: grid;
  grid-auto-rows: min-content;
  gap: 25px 0;
  margin-top: 20px;
  padding: 0 6em 0 5em;
`;

const TitleContainer = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: end;
  gap: 0 10px;

  h1 {
    color: hsl(201deg 100% 11%);
    margin-bottom: 0;
    text-transform: uppercase;
    font-size: 1.6rem;
    line-height: 1;
  }

  img {
    width: 50px;
  }
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  align-items: center;
  gap: 10px;
`;

const SelectContainer = styled.div`
  p {
    margin: 0.5em 0.1em;
    font-weight: bold;
    font-size: 1rem;
    color: hsl(0, 87%, 44%);
  }

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
  margin-bottom: 1em;
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

  const limits = [4, 8, 12];
  const [limit, setLimit] = useState(limits[0]);
  const [currentPage, setCurrentPage] = useState(1);

  // Loading Screen
  const [animate, setAnimate] = useState(false);
  const [disappear, setDisappear] = useState(false);

  // Fetching data
  useEffect(() => {
    dispatch(getMovies(currentPage, limit));
    setTimeout(() => {
      setAnimate(true);
      setTimeout(() => {
        setDisappear(true);
      }, 1000);
    }, 3000);
  }, [dispatch, currentPage, limit]);

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
  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen animate={animate} disappear={disappear}>
        <LogoContainer>
          <img src={logo} alt="Logo" />
          <p>Lumovies</p>
        </LogoContainer>
        <LoaderContainer>
          <SemipolarLoading />
        </LoaderContainer>
      </LoadingScreen>

      {!isMoviesLoading ? (
        <Container>
          <TitleContainer>
            <h1>Nos films</h1>
            <img src={popcorn} alt="popcorn" />
          </TitleContainer>
          <Header>
            <SelectContainer>
              <p>Nombre d'élements</p>
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
              <p>Catégorie</p>
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
          </Header>
          <>
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
                          moviesData.filter(
                            (movie) => movie.category === category
                          ).length / limit
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
          </>
        </Container>
      ) : (
        <> Loading </>
      )}
    </>
  );
}
