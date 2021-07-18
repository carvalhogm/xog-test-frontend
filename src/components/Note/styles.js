import styled from "styled-components";

export const NoteStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 500px;
  min-height: 200px;
  height: auto;
  background-color: #ffe3bd;
  padding: 10px;
  box-shadow: 0 5px 12px 0px #1d1d1d7a;

  .note-container {
    padding: 20px;
    margin: 10px;
    border: 1px solid #c3c3c3;

    > * {
      overflow-wrap: anywhere;
    }

    textarea {
      background: transparent;
      border: none;
      overflow: hidden;
      resize: none;
      outline: none;
    }
  }

  .note-options {
    display: flex;
    justify-content: space-between;

    button {
      margin: 0;
      margin: 0 5px 0 5px;
      padding: 0;
      cursor: pointer;
      background-color: transparent;
      border: none;

      svg {
        transform: scale(0.9);
        path {
          fill: #d80000;
          transition: fill 250ms linear;
        }
      }

      :hover {
        svg {
          path {
            fill: red;
          }
        }
      }

      :active {
        transform: scale(0.9);
      }
    }
    .note-date {
      user-select: none;
      margin: 0;
      margin: 0 5px 5px 0;
    }
  }

  .spinner {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background-color: #80808091;
    &.active {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
