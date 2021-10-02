import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import indestructibles2 from 'assets/images/jpg/Les indestructibles 2.jpg';
import { TrashAlt } from '@styled-icons/boxicons-solid/TrashAlt';
import { Like as RegularLike } from '@styled-icons/boxicons-regular/Like';
import { Dislike as RegularDislike } from '@styled-icons/boxicons-regular/Dislike';
import { Like as SolidLike } from '@styled-icons/boxicons-solid/Like';
import { Dislike as SolidDislike } from '@styled-icons/boxicons-solid/Dislike';
import { numberFormat } from 'utils/numberFormat';
import { dislikeMovie, likeMovie } from 'store/reducers/movies/movies.action';

const Container = styled.div`
  position: relative;
  display: grid;
  box-shadow: 0 -1px 1px hsl(0deg 0% 0% / 0.075),
    0 -2px 2px hsl(0deg 0% 0% / 0.075), 0 -4px 4px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);
  border-radius: 15px;

  img {
    width: 100%;
    border-radius: 15px 15px 0 0;
  }

  h2 {
    font-size: 1.3rem;
    text-align: center;
    overflow-wrap: break-word;
    margin: 1em 0 0.2em 0;
  }

  p {
    margin: 0;
    font-size: 1rem;
    text-align: center;
    overflow-wrap: break-word;
    color: hsl(0, 86%, 57%);
  }
`;

const TrashWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 0;
  padding: 1em;
  border-radius: 0 15px 0 15px;

  svg {
    color: hsla(0deg, 0%, 100%, 90%);
    width: 20px;
  }

  background: hsla(0deg, 0%, 0%, 40%);
  transition: background 0.2s;
  :hover {
    background: hsla(0deg, 0%, 0%, 65%);
  }
`;

const LikesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${({ isLiked }) =>
    isLiked
      ? css`
          color: blue;
        `
      : css`
          color: white;
        `};
  ${({ isDisliked }) =>
    isDisliked
      ? css`
          color: red;
        `
      : css`
          color: black;
        `};
`;

const LikeWrapper = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  display: grid;
  grid-template-columns: min-content min-content;
  justify-content: center;
  gap: 0 10px;
  padding: 1em 0;

  svg {
    width: 20px;
    color: ${({ isLiked }) => (isLiked ? 'hsl(199, 99%, 55%)' : 'black')};
  }
  p {
    color: ${({ isLiked }) => (isLiked ? 'hsl(199, 99%, 55%)' : 'black')};
  }
`;
const DislikeWrapper = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  display: grid;
  grid-template-columns: min-content min-content;
  justify-content: center;
  align-items: center;
  gap: 0 10px;
  padding: 1em 0;

  svg {
    width: 20px;
    color: ${({ isDisliked }) => (isDisliked ? 'hsl(0, 86%, 57%)' : 'black')};
  }

  p {
    color: ${({ isDisliked }) => (isDisliked ? 'hsl(0, 86%, 57%)' : 'black')};
    margin: 0;
  }
`;

export default function Card({
  movie,
  isLiked,
  isDisliked,
  handleDelete,
  dispatch,
}) {
  const handleLikeClicked = () => {
    if (isDisliked) {
      dispatch(likeMovie(movie.id));
      dispatch(dislikeMovie(movie.id));
    } else {
      dispatch(likeMovie(movie.id));
    }
  };

  const handleDislikeClicked = () => {
    if (isLiked) {
      dispatch(likeMovie(movie.id));
      dispatch(dislikeMovie(movie.id));
    } else {
      dispatch(dislikeMovie(movie.id));
    }
  };

  return (
    <Container>
      <TrashWrapper
        onClick={() => {
          handleDelete(movie.id);
        }}
      >
        <TrashAlt />
      </TrashWrapper>
      <img src={indestructibles2} alt="indestructibles 2" />
      <h2>{movie.title}</h2>
      <p>{movie.category}</p>
      <LikesContainer>
        <LikeWrapper isLiked={isLiked} onClick={handleLikeClicked}>
          {isLiked ? <SolidLike /> : <RegularLike />}
          <p>{movie.likes}</p>
        </LikeWrapper>

        <DislikeWrapper isDisliked={isDisliked} onClick={handleDislikeClicked}>
          {isDisliked ? <SolidDislike /> : <RegularDislike />}
          <p>{movie.dislikes}</p>
        </DislikeWrapper>
      </LikesContainer>
    </Container>
  );
}
