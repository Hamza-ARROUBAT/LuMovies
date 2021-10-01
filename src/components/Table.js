import React from 'react';
import { SemipolarLoading } from 'react-loadingg';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
`;
const Table = styled.table`
  display: grid;
  border-collapse: collapse;
  grid-template-columns:
    min-content
    minmax(150px, 1.5fr)
    minmax(150px, 1.5fr)
    minmax(150px, 1fr)
    minmax(150px, 1fr);
  grid-template-rows: max-content auto;
  height: ${({ movies }) => (movies.length < 7 ? 'auto' : '345px')};

  /* scrollbar */
  overflow: auto;
  padding-right: 5px;
  scrollbar-width: thin;

  scroll-padding: 100px;

  ::-webkit-scrollbar {
    width: 7px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: hsl(196deg 100% 44%);
    border-radius: 25px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  tr {
    display: contents;
  }

  th,
  td {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    padding: 0 1.5em 0.5em 1.5em;
    position: sticky;
    top: 0;
    font-size: 1.1rem;
    background: #fff;
    color: hsl(201deg 100% 11%);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    text-transform: capitalize;
  }

  td {
    height: 45px;
    padding: 0.8em 1.6em 0.8em 1.6em;
  }

  th {
    text-align: left;
  }

  th:first-child {
    text-align: center;
  }

  td:first-child {
    text-align: center;
  }

  tbody {
    align-items: flex-start;
    tr {
      cursor: pointer;
      :hover {
        td {
          transition: background 0.2s;
          background: rgba(0, 0, 0, 0.0625);
        }
      }
    }
  }
`;

const GameRow = styled.tr`
  color: ${({ rowColor }) => rowColor};
  font-weight: ${({ isTop }) => isTop && 'bold'};
`;

const TableHead = styled.thead`
  display: contents;
`;

const TableBody = styled.tbody`
  display: contents;
`;

const LoaderContainer = styled.div`
  grid-column: 1/6;
  position: relative;
  display: grid;
  height: 30vh;

  div {
    margin: 0 auto;
  }
`;

export default function TableComponent({ type, header, isLoading, movies }) {
  const getColor = (position) => {
    switch (position) {
      case 1:
        return 'hsl(51, 100%, 41%)';
      case 2:
        return 'hsl(0, 0%, 65%)';
      case 3:
        return 'hsl(30, 36%, 45%)';

      default:
        return 'black';
    }
  };

  const getMedal = (position) => {
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';

      default:
        return position;
    }
  };

  return (
    <Container>
      <Table movies={movies}>
        <TableHead>
          <tr>
            <th>#</th>
            {header.map((head) => (
              <th>{head}</th>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          {!isLoading ? (
            movies.map((movie, index) => (
              <GameRow
                isTop={movie.id <= 3}
                rowColor={getColor(movie.id)}
                key={index}
              >
                <td>{getMedal(movie.id)}</td>
                <td>{movie.title}</td>
                <td>{movie.category}</td>
                <td>{movie.likes}</td>
                <td>{movie.dislikes}</td>
              </GameRow>
            ))
          ) : (
            <LoaderContainer>
              <SemipolarLoading />
            </LoaderContainer>
          )}
        </TableBody>
      </Table>
    </Container>
  );
}
