import styled, { css } from 'styled-components';

export default styled.button`
  height: 52px;
  color: #fff;
  background: ${({ theme }) => theme.colors.primary.main};
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  outline: none;
  font-size: 16px;
  font-weight: bold;
  transition: background 0.2s ease-in;

  &:hover {
    background: ${({ theme }) => theme.colors.primary.light};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primary.dark};
  }

  &[disabled] {
    background: #ccc;
    cursor: default;
  }

  ${({ theme, danger }) => danger
    && css`
      background: ${theme.colors.danger.main};

      &:hover {
        background: ${theme.colors.danger.light};
      }

      &:active {
        background: ${theme.colors.danger.dark};
      }
    `}
`;
