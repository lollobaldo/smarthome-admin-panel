import styled from 'styled-components/macro';

import warningIcon from 'res/icons/warning.svg';

export interface ErrorMessage {
  msg: string
}

const StyledError = styled.p`
  display: flex;

  & img {
    height: 1.2em;
    margin: 0 8px 0 16px;
  }
`;

export const NoData = ({ msg }: ErrorMessage) => (
  <StyledError><img src={warningIcon} alt="" />{msg}</StyledError>
);
