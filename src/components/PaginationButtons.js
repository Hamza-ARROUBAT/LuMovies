import React, { useState } from 'react';
import styled from 'styled-components';

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DoubleArrowButton = styled.button`
  margin: 0 1px;
  padding: 0.3em;
  border-radius: 50%;
  transition: background 0.3s;
  img {
    width: 20px;
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  :disabled {
    filter: invert(75%) sepia(54%) saturate(11%) hue-rotate(40deg)
      brightness(160%) contrast(90%);
  }
`;
const ArrowButton = styled.button`
  padding: 0;
  border-radius: 50%;
  padding: 0.3em;
  transition: background 0.3s;

  img {
    width: 20px;
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  :disabled {
    filter: invert(75%) sepia(54%) saturate(11%) hue-rotate(40deg)
      brightness(160%) contrast(90%);
  }
`;

const NumberButton = styled.button`
  padding: 0;
  margin: 0 5px;
  background-color: ${(props) => (props.isActive ? '#da7e2e' : '#dbdbdb')};
  color: ${(props) => (props.isActive ? '#fff' : '#3b3b3b')};
  border-radius: 50%;
  height: 30px;
  width: 30px;
  transition: all 0.18s;

  :hover {
    background-color: #da7e2e;
    color: #fff;
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

  const maxIncrementPage = () => {
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
          <img src="/assets/medias/images/double-left-arrow.svg" />
        </DoubleArrowButton>
        <ArrowButton
          onClick={decrementPage}
          disabled={currentPage === firstPage}
        >
          <img src="/assets/medias/images/left-arrow.svg" />
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
          <img src="/assets/medias/images/right-arrow.svg" />
        </ArrowButton>
        <DoubleArrowButton
          disabled={currentPage === lastPage}
          onClick={() => {
            setCurrentPage(lastPage);
          }}
        >
          <img src="/assets/medias/images/double-right-arrow.svg" />
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
            <img src="/assets/medias/images/double-left-arrow.svg" />
          </DoubleArrowButton>
          <ArrowButton
            onClick={decrementPage}
            disabled={currentPage === firstPage}
          >
            <img src="/assets/medias/images/left-arrow.svg" />
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
            <img src="/assets/medias/images/right-arrow.svg" />
          </ArrowButton>
          <DoubleArrowButton
            disabled={currentPage === lastPage}
            onClick={() => {
              setCurrentPage(lastPage);
            }}
          >
            <img src="/assets/medias/images/double-right-arrow.svg" />
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
            <img src="/assets/medias/images/double-left-arrow.svg" />
          </DoubleArrowButton>
          <ArrowButton
            onClick={decrementPage}
            disabled={currentPage === firstPage}
          >
            <img src="/assets/medias/images/left-arrow.svg" />
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

          <ArrowButton onClick={incrementPage}>
            <img src="/assets/medias/images/right-arrow.svg" />
          </ArrowButton>
          <DoubleArrowButton
            onClick={() => {
              setCurrentPage(lastPage);
            }}
          >
            <img src="/assets/medias/images/double-right-arrow.svg" />
          </DoubleArrowButton>
        </ButtonsContainer>
      );
    }
  }
}

export default PaginationButtons;
