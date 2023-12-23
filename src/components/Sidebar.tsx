import React from 'react';
import styled from 'styled-components/macro';

import { mediaQuery } from 'styles/theme';

const StyledSidebar = styled.div`
  grid-area: sidebar;
  height: 100%;
  display: none; // override to flex for tablets and above
  min-width: 200px;

  ${mediaQuery('tablet')} {
    display: flex;
  };
`;

const SidebarHeader = () => {
  return (
    <p>header</p>
  );
};

const Sidebar = () => {
  console.log('Entry point');

  return (
    <StyledSidebar>
      <SidebarHeader />
    </StyledSidebar>
  );
};

export default Sidebar;
