import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Filter as FilterSvg } from '@styled-icons/bootstrap/Filter';
import { Search } from '@styled-icons/boxicons-regular/Search';
import logo from 'assets/images/png/logo.png';
import axios from 'axios';
import Card from 'components/Card';
import Table from 'components/Table';
import { movies$ } from 'movies';
import React, { useEffect, useState } from 'react';
import { SemipolarLoading } from 'react-loadingg';
import styled from 'styled-components';
import _ from 'lodash';
import PaginationButtons from 'components/PaginationButtons';

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
    color: hsl(196deg 100% 30%);
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

const PaginationContainer = styled.div`
  display: grid;
  place-content: center;
`;

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [filtredMovies, setFiltredMovies] = useState([]);

  const [pages, setPages] = useState([]);
  const [currPage, setPage] = useState(1);
  const [limits, setLimits] = useState([4, 8, 12]);
  const [limit, setLimit] = useState(limits[0]);

  const sliceData = (dataArray, page, arrayLimit, choosenCategory) => {
    if (choosenCategory) {
      const filtred = dataArray.filter(
        (movie) => movie.category === choosenCategory
      );
      setFiltredMovies(
        filtred.slice(arrayLimit * (page - 1), arrayLimit * page)
      );
      setPages(
        Array(Math.ceil(filtred.length / arrayLimit))
          .fill(0)
          .map((element, index) => index)
      );
      setIsLoading(false);
    } else {
      setMovies(dataArray.slice(arrayLimit * (page - 1), arrayLimit * page));
      setPages(
        Array(Math.ceil(dataArray.length / arrayLimit))
          .fill(0)
          .map((element, index) => index)
      );
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  // Fetching Data functions
  const getMovies = (page, limit, choosenCategory) => {
    setIsLoading(true);
    movies$
      .then((data) => {
        const keys = Object.keys(_.groupBy(data, 'category'));
        setCategories(keys);
        sliceData(data, page, limit, choosenCategory);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
    // sliceData(movies, page, limit, choosenCategory);
    // setIsLoading(false);
  };

  // Loading Screen
  const [animate, setAnimate] = useState(false);
  const [disappear, setDisappear] = useState(false);

  useEffect(() => {
    getMovies(currPage, limit, '');
  }, []);

  useEffect(() => {
    if (category) {
      getMovies(currPage, limit, category);
    } else {
      getMovies(currPage, limit, '');
    }
  }, [currPage]);

  // Filters management
  const handleFilter = (choosenCategory) => {
    setCategory(choosenCategory);
    getMovies(currPage, limit, choosenCategory);
  };

  // const handleLimitChange = (event) => {
  //   if (category) {
  //     setIsLoading(true);
  //     setCategory(event.target.value);
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(true);
  //     setLimit(event.target.value);
  //     const slicedMovies = movies.filter(
  //       (movie) => movie.category === event.target.value
  //     );
  //     setFiltredMovies(filtred);
  //     setIsLoading(false);
  //   }

  //   if (category) {
  //     setIsLoading(true);
  //     newFiltredMoviesArray = filtredMovies.filter((movie) => movie.id !== id);
  //     setFiltredMovies(newFiltredMoviesArray);

  //     if (newFiltredMoviesArray.length === 0) {
  //       setCategories(categories.filter((categ) => categ !== category));
  //       setCategory('');
  //     }

  //     newMoviesArray = movies.filter((movie) => movie.id !== id);
  //     setMovies(newMoviesArray);
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(true);
  //     newMoviesArray = movies.filter((movie) => movie.id !== id);
  //     setMovies(newMoviesArray);
  //     setIsLoading(false);
  //   }
  // };

  const handleDelete = (id) => {
    let newMoviesArray;
    let newFiltredMoviesArray;

    if (category) {
      setIsLoading(true);
      newFiltredMoviesArray = filtredMovies.filter((movie) => movie.id !== id);
      setFiltredMovies(newFiltredMoviesArray);

      if (newFiltredMoviesArray.length === 0) {
        setCategories(categories.filter((categ) => categ !== category));
        setCategory('');
      }

      newMoviesArray = movies.filter((movie) => movie.id !== id);
      setMovies(newMoviesArray);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      newMoviesArray = movies.filter((movie) => movie.id !== id);
      setMovies(newMoviesArray);
      setIsLoading(false);
    }
  };

  console.log(pages);

  return !isLoading ? (
    <>
      <Container>
        <Title>Nos films ! 🎬🍿</Title>
        <Header>
          <SelectContainer>
            <FormControl sx={{ width: 165, height: 'auto' }}>
              <Select
                value={limit}
                onChange={(e) => {
                  handleFilter(movies, e.target.value);
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
                  {categories.map((category, index) => (
                    <MenuItem key={index} value={category} sx={{ width: 160 }}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </SelectContainer>
          </FiltersContainer>
        </Header>

        {category && (
          <>
            <MoviesGrid>
              {filtredMovies.map((movie, index) => (
                <Card key={index} movie={movie} handleDelete={handleDelete} />
              ))}
            </MoviesGrid>

            {pages.length > 1 && (
              <PaginationContainer>
                <PaginationButtons
                  pages={pages}
                  currentPage={currPage}
                  setCurrentPage={setPage}
                />
              </PaginationContainer>
            )}
          </>
        )}
        {!category && (
          <>
            <MoviesGrid>
              {movies.map((movie, index) => (
                <Card key={index} movie={movie} handleDelete={handleDelete} />
              ))}
            </MoviesGrid>
            {pages.length > 1 && (
              <PaginationContainer>
                <PaginationButtons
                  pages={pages}
                  currentPage={currPage}
                  setCurrentPage={setPage}
                />
              </PaginationContainer>
            )}
          </>
        )}
      </Container>
    </>
  ) : (
    <> kek </>
  );
}
