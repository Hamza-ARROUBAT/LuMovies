import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { AngleLeft } from '@styled-icons/fa-solid/AngleLeft';
import { AngleRight } from '@styled-icons/fa-solid/AngleRight';
import { AngleDoubleLeft } from '@styled-icons/fa-solid/AngleDoubleLeft';
import { AngleDoubleRight } from '@styled-icons/fa-solid/AngleDoubleRight';

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DoubleArrowButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: hsl(0, 87%, 44%);
  background: hsla(0, 0%, 0%, 1%);
  margin: 0 0.1em;
  padding: 0.5em;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;
  svg {
    width: 20px;
  }

  :hover {
    background: hsla(0, 0%, 0%, 10%);
  }

  :disabled {
    cursor: default;
    color: hsla(0, 0%, 0%, 20%);
    :hover {
      background: hsla(0, 0%, 0%, 2.5%);
    }
  }
`;
const ArrowButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: hsl(0, 87%, 44%);
  background: hsla(0, 0%, 0%, 1%);
  margin: 0 0.1em;
  padding: 0.6em 1em;
  border-radius: 50%;
  transition: background 0.2s, color 0.2s;

  svg {
    width: 10px;
  }

  :hover {
    background: hsla(0, 0%, 0%, 10%);
  }

  :disabled {
    cursor: default;
    color: hsla(0, 0%, 0%, 20%);
    :hover {
      background: hsla(0, 0%, 0%, 2.5%);
    }
  }
`;

const NumberButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0 5px;
  background-color: ${(props) =>
    props.isActive ? 'hsl(0, 87%, 44%);' : '#dbdbdb'};
  color: ${(props) => (props.isActive ? '#fff' : '#3b3b3b')};
  border-radius: 50%;
  height: 30px;
  width: 30px;
  transition: background 0.2s, color 0.2s;
  font-weight: 600;

  :hover {
    ${(props) =>
      !props.isActive &&
      css`
        background: hsla(0, 0%, 0%, 20%);
        color: #fff;
      `};
  }
`;

const EtcContainer = styled.div`
  margin: 0 10px;

  img {
    width: 5px;
    transform: rotate(90deg);
  }
`;

function PaginationButtons({ pages, currentPage, setCurrentPage }) {
  const firstPage = pages[0] + 1;
  const lastPage = pages[pages.length - 1] + 1;

  const [firstButton, setFirstButton] = useState(pages[1]);
  const [secondButton, setSecondButton] = useState(pages[2]);

  const incrementPage = () => {
    if (currentPage !== lastPage) {
      if (currentPage === firstPage) {
        setCurrentPage(currentPage + 1);
      } else if (currentPage < lastPage - 3 && currentPage !== firstButton) {
        setFirstButton(firstButton + 1);
        setSecondButton(secondButton + 1);
        setCurrentPage(currentPage + 1);
      } else if (currentPage === lastPage - 3) {
        setCurrentPage(currentPage + 1);
        setFirstButton(firstPage);
      } else {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const decrementPage = () => {
    if (currentPage !== firstPage) {
      if (currentPage === lastPage) {
        setCurrentPage(currentPage - 1);
      } else if (firstButton > firstPage && currentPage < lastPage - 3) {
        setFirstButton(firstButton - 1);
        setSecondButton(secondButton - 1);
        setCurrentPage(currentPage - 1);
      } else if (currentPage === lastPage - 2) {
        setCurrentPage(currentPage - 1);
        setFirstButton(lastPage - 4);
        setSecondButton(lastPage - 3);
      } else {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const maxDecrementPage = () => {
    if (currentPage !== firstPage) {
      setFirstButton(firstPage);
      setSecondButton(firstPage + 1);
      setCurrentPage(firstPage);
    }
  };

  if (pages.length <= 5) {
    return (
      <ButtonsContainer>
        <DoubleArrowButton
          onClick={maxDecrementPage}
          disabled={currentPage === firstPage}
        >
          <AngleDoubleLeft />
        </DoubleArrowButton>

        <ArrowButton
          onClick={decrementPage}
          disabled={currentPage === firstPage}
        >
          <AngleLeft />
        </ArrowButton>
        {pages.map((page) => (
          <NumberButton
            onClick={() => {
              setCurrentPage(page + 1);
            }}
            isActive={currentPage === page + 1}
          >
            {page + 1}
          </NumberButton>
        ))}
        <ArrowButton
          onClick={incrementPage}
          disabled={currentPage === lastPage}
        >
          <AngleRight />
        </ArrowButton>
        <DoubleArrowButton
          disabled={currentPage === lastPage}
          onClick={() => {
            setCurrentPage(lastPage);
          }}
        >
          <AngleDoubleRight />
        </DoubleArrowButton>
      </ButtonsContainer>
    );
  } else {
    if (currentPage >= lastPage - 2) {
      return (
        <ButtonsContainer>
          <DoubleArrowButton
            onClick={maxDecrementPage}
            disabled={currentPage === firstPage}
          >
            <AngleDoubleLeft />
          </DoubleArrowButton>
          <ArrowButton
            onClick={decrementPage}
            disabled={currentPage === firstPage}
          >
            <AngleLeft />
          </ArrowButton>

          <NumberButton
            onClick={() => {
              setCurrentPage(firstButton);
            }}
            isActive={currentPage === firstButton}
          >
            {firstButton}
          </NumberButton>
          <EtcContainer>
            <img src="/assets/medias/images/button.svg" />
          </EtcContainer>
          <NumberButton
            onClick={() => {
              setCurrentPage(lastPage - 2);
            }}
            isActive={currentPage === lastPage - 2}
          >
            {lastPage - 2}
          </NumberButton>
          <NumberButton
            onClick={() => {
              setCurrentPage(lastPage - 1);
            }}
            isActive={currentPage === lastPage - 1}
          >
            {lastPage - 1}
          </NumberButton>
          <NumberButton
            onClick={() => {
              setCurrentPage(lastPage);
            }}
            isActive={lastPage === currentPage}
          >
            {lastPage}
          </NumberButton>

          <ArrowButton
            onClick={incrementPage}
            disabled={currentPage === lastPage}
          >
            <AngleRight />
          </ArrowButton>
          <DoubleArrowButton
            disabled={currentPage === lastPage}
            onClick={() => {
              setCurrentPage(lastPage);
            }}
          >
            <AngleDoubleRight />
          </DoubleArrowButton>
        </ButtonsContainer>
      );
    } else {
      return (
        <ButtonsContainer>
          <DoubleArrowButton
            disabled={currentPage === firstPage}
            onClick={maxDecrementPage}
          >
            <AngleDoubleLeft />
          </DoubleArrowButton>
          <ArrowButton
            onClick={decrementPage}
            disabled={currentPage === firstPage}
          >
            <AngleLeft />
          </ArrowButton>

          <NumberButton
            onClick={() => {
              setCurrentPage(firstButton);
            }}
            isActive={currentPage === firstButton}
          >
            {firstButton}
          </NumberButton>
          <NumberButton
            onClick={() => {
              setCurrentPage(firstButton + 1);
            }}
            isActive={currentPage === firstButton + 1}
          >
            {firstButton + 1}
          </NumberButton>

          <EtcContainer>
            <img src="/assets/medias/images/button.svg" />
          </EtcContainer>

          <NumberButton
            onClick={() => {
              setCurrentPage(lastPage - 1);
            }}
            isActive={currentPage === lastPage - 1}
          >
            {lastPage - 1}
          </NumberButton>
          <NumberButton
            onClick={() => {
              setCurrentPage(lastPage);
            }}
            isActive={lastPage === currentPage}
          >
            {lastPage}
          </NumberButton>

          <ArrowButton>
            <AngleRight onClick={incrementPage} />
          </ArrowButton>
          <DoubleArrowButton
            onClick={() => {
              setCurrentPage(lastPage);
            }}
          >
            <AngleDoubleRight />
          </DoubleArrowButton>
        </ButtonsContainer>
      );
    }
  }
}

export default PaginationButtons;
