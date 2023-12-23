import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { useAuth } from 'brains/auth';
import { useTheme } from 'brains/theme';
// import { path2title } from 'utils/state';

import { mediaQuery, card, colors } from 'styles/theme';

import { ReactComponent as HomeRegular } from 'res/icons/regular-home.svg';
import { ReactComponent as HomeSolid } from 'res/icons/solid-home.svg';
import { ReactComponent as GearRegular } from 'res/icons/regular-gear.svg';
import { ReactComponent as GearSolid } from 'res/icons/solid-gear.svg';
import { ReactComponent as UserRegular } from 'res/icons/regular-user.svg';
import { ReactComponent as UserSolid } from 'res/icons/solid-user.svg';
import { ReactComponent as MonitoringRegular } from 'res/icons/regular-monitoring.svg';
import { ReactComponent as MonitoringSolid } from 'res/icons/solid-monitoring.svg';

const footerLinks = [
  { path: '/', Icon: HomeRegular, IconSelected: HomeSolid },
  { path: '/monitoring', Icon: MonitoringRegular, IconSelected: MonitoringSolid },
  { path: '/user', Icon: UserRegular, IconSelected: UserSolid },
  { path: '/settings', Icon: GearRegular, IconSelected: GearSolid },
];

const StyledLink = styled(Link)`
  /* height: 24px; */

  & svg {
    height: 24px;
    width: auto;
  }
`;

const StyledFooter = styled.footer`
  grid-area: footer;
  ${mediaQuery('tablet')} {
    display: none;
  };

  position: sticky;
  bottom: 0;

  ${theme('theme', card)}
  color: #000;
  z-index: 10;
  /* height: 108px; */
  flex-shrink: 0;
  /* border-radius: 20px 20px 0 0; */
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;

  & h1 {
    margin: auto auto auto 0;
    font-weight: normal;
  }
`;


const Footer = () => {
  const { pathname } = useLocation();
  const { username, picture } = useAuth().auth.user;
  const { activeTheme, toggleTheme } = useTheme();
  return (
    <StyledFooter>
      {footerLinks.map(({ path, Icon, IconSelected }) => (
        <StyledLink key={path} to={path}>
          {path === pathname ?
            <IconSelected style={{ color: colors.secondary }} /> :
            <Icon style={{ color: colors.grey }} />}
        </StyledLink>
      ))}
    </StyledFooter>
  );
};

export default Footer;
