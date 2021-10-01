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
  gap: 25px 20px;

  @media (max-width: 768px) {
    grid-template-columns: auto min-content;
  }
`;

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  align-items: center;
  gap: 0 20px;

  p {
    margin: 0;
  }
`;
const Filter = styled.div`
  display: grid;
  gap: 10px 0;

  p {
    font-weight: bold;
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

const FilterButton = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  align-items: center;
  gap: 0 10px;
  cursor: pointer;
  background: hsl(0, 0%, 95%);
  border: 1px solid hsl(0, 0%, 85%);
  border-radius: 10px;
  padding: 0.6em 1.5em;
  height: min-content;

  svg {
    width: 15px;
    transition: color 0.25s;
  }

  p {
    margin: 0;
    transition: color 0.25s;
  }

  transition: background 0.25s, border 0.25s;
  ${({ isClicked }) =>
    isClicked &&
    `background: hsl(196deg 100% 44%);
     color: white;
     border: 1px solid hsl(0, 0%, 100%);

     svg {
       color: white;
     }
  `}
`;

const SearchBar = styled.div`
  display: grid;
  grid-template-columns: min-content auto;
  align-items: center;
  gap: 0 10px;

  border: 2px solid hsl(0, 0%, 80%);
  border-radius: 20px;
  padding: 0.5em 1em;

  svg {
    width: 15px;
    transition: color 0.5s;
  }

  input {
    outline: none;
    border: none;
    background: transparent;
    font-size: 1rem;
  }

  transition: border 0.2s;
  :focus-within {
    border: 2px solid hsl(196deg 100% 44%);

    svg {
      color: hsl(196deg 100% 44%);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 3rem;
`;

export default function Home() {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [category, setCategory] = useState('');
  const [prevCategory, setPrevCategory] = useState('');

  // Fetching Data functions
  const getMovies = () => {
    movies$
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  };

  // Loading Screen
  const [animate, setAnimate] = useState(false);
  const [disappear, setDisappear] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  // Filters management
  const [isFilterClicked, setIsFilterClicked] = useState(false);

  const handleCategoryChange = (event) => {
    setSearched('');
    setPrevCategory(category);
    setCategory(event.target.value);
    setIsLoading(true);
    getMovies();
  };
  

  const allCategories = [
    'PC',
    'Xbox 360',
    'PS3',
    'Xbox One',
    'PS4',
    'PS5',
    'Nintendo Switch',
    'Android',
  ];

  // Search management
  const [searched, setSearched] = useState('');
  // prettier-ignore
  const [searchedCategory, setSearchedCategory] = useState([]);
  // prettier-ignore

  // const handleSearchChange = (e) => {
  //   setSearched(e.target.value);
  //   setIsLoading(true);

  //   if (tab === 0) {
  //     const filtred = movies.filter((element) =>
  //       element.movie.toLowerCase().includes(e.target.value.toLowerCase())
  //     );
  //     setSearchedCategory(filtred);
  //     setIsLoading(false);
  //   } else {
  //     const filtred = topGamesByPlayers.filter((element) =>
  //       element.movie.toLowerCase().includes(e.target.value.toLowerCase())
  //     );
  //     setSearchedTopGamesByPlayers(filtred);
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <Container>
        <Title>Les Films 🎬🍿</Title>
        <Header>
          <FiltersContainer>
            <SelectContainer>
              <FormControl sx={{ width: 165 }}>
                <Select
                  value={category}
                  onChange={handleCategoryChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem value=""> - </MenuItem>
                  {allCategories.map((category) => (
                    <MenuItem value={category} sx={{ width: 160 }}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </SelectContainer>
          </FiltersContainer>
          <SearchBar>
            <Search />
            <input
              type="text"
              placeholder="Search by movie"
              value={searched}
            // onChange={handleSearchChange}
            />
          </SearchBar>

        </Header>
        <MoviesGrid>
          {movies.map(movie =>
            <Card title={movie.title} category={movie.category} likes={movie.likes} dislikes={movie.dislikes} />
          )}
        </MoviesGrid>
      </Container>
    </>
  );
}
