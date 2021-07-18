import styled from "styled-components"

export const NoteCanvasStyle = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  box-sizing: border-box;
  padding: 50px;
`;

export const NoteAddButtonStyle = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0 50px 50px 0;
  background: none;
  border: none;
  outline: none;

  svg {
    cursor: pointer;
    transform: scale(2);

    path {
      fill: green;
      transition: fill 250ms linear
    }

    :hover {
      path {
        fill: #00c300;
      }
    }

    :active {
      transform: scale(1.90);
    }
  }
`;