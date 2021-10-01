import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import indestructibles2 from 'assets/images/jpg/Les indestructibles 2.jpg';
import { Like as RegularLike } from '@styled-icons/boxicons-regular/Like';
import { Dislike as RegularDislike } from '@styled-icons/boxicons-regular/Dislike';
import { Like as SolidLike } from '@styled-icons/boxicons-solid/Like';
import { Dislike as SolidDislike } from '@styled-icons/boxicons-solid/Dislike';

const Container = styled.div`
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

const LikeWrapper = styled.div`
  cursor: pointer;
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
const DislikeWrapper = styled.div`
  cursor: pointer;
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

export default function Card({ title, category, likes, dislikes }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isInitialState, setIsInitialState] = useState(!isLiked && !isDisliked);

  const handleInitialState = () => {
    if (isInitialState) {
      setIsInitialState(false);
      setIsLiked(true);
    }
  };

  const handleLikeClicked = () => {
    if (isDisliked) {
      setIsLiked(true);
      setIsDisliked(false);
    } else {
      setIsLiked(!isLiked);
    }
  };

  const handleDislikeClicked = () => {
    if (isLiked) {
      setIsDisliked(true);
      setIsLiked(false);
    } else {
      setIsDisliked(!isDisliked);
    }
  };

  return (
    <Container>
      <img src={indestructibles2} alt="" />
      <h2>{title}</h2>
      <p>{category}</p>
      {isInitialState ? (
        <LikesContainer>
          <LikeWrapper onClick={handleInitialState}>
            <RegularLike />
            <p>{likes}</p>
          </LikeWrapper>
          <DislikeWrapper onClick={handleInitialState}>
            <RegularDislike />
            <p>{dislikes}</p>
          </DislikeWrapper>
        </LikesContainer>
      ) : (
        <LikesContainer>
          <LikeWrapper isLiked={isLiked} onClick={handleLikeClicked}>
            {isLiked ? <SolidLike /> : <RegularLike />}
            <p>{likes}</p>
          </LikeWrapper>

          <DislikeWrapper
            isDisliked={isDisliked}
            onClick={handleDislikeClicked}
          >
            {isDisliked ? <SolidDislike /> : <RegularDislike />}
            <p>{dislikes}</p>
          </DislikeWrapper>
        </LikesContainer>
      )}
    </Container>
  );
}
