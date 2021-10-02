import Header from 'components/Header';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: auto;
  padding-bottom: 30px;
  background: hsl(0deg 12% 58% / 10%);

  /* scrollbar */
  scrollbar-width: thin;

  ::-webkit-scrollbar {
    width: 8px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: hsl(0, 87%, 60%);
    border-radius: 25px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export default function AppLayout({ children }) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}
