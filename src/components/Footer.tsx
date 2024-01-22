import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { mediaQuery, card, colors } from 'styles/theme';

import { ReactComponent as HomeRegular } from 'res/icons/regular-home.svg';
import { ReactComponent as HomeSolid } from 'res/icons/solid-home.svg';
import { ReactComponent as GearRegular } from 'res/icons/regular-gear.svg';
import { ReactComponent as GearSolid } from 'res/icons/solid-gear.svg';
import { ReactComponent as UserRegular } from 'res/icons/regular-user.svg';
import { ReactComponent as UserSolid } from 'res/icons/solid-user.svg';
import { ReactComponent as MonitoringRegular } from 'res/icons/regular-monitoring.svg';
import { ReactComponent as MonitoringSolid } from 'res/icons/solid-monitoring.svg';
import { elevation2 } from 'styles/elevation';

const footerLinks = [
  { path: '/', Icon: HomeRegular, IconSelected: HomeSolid },
  { path: '/monitoring', Icon: MonitoringRegular, IconSelected: MonitoringSolid },
  { path: '/user', Icon: UserRegular, IconSelected: UserSolid },
  { path: '/settings', Icon: GearRegular, IconSelected: GearSolid },
];

const StyledLink = styled(Link)`
  width: 64px;
  height: 32px;
  border-radius: 16px;
  text-align: center;
  padding: 4px;
  color: var(--md-sys-color-on-surface);

  & svg {
    height: 24px;
    width: auto;
  }

  &.active {
    background: var(--md-sys-color-secondary-container);
  }
`;

const StyledFooter = styled.footer`
  grid-area: footer;
  ${mediaQuery('tablet')} {
    display: none;
  };

  position: sticky;
  bottom: 0;

  ${elevation2};
  background: var(--md-sys-color-surface-container-low);
  color: var(--md-sys-color-on-surface);

  /* ${theme('theme', card)} */
  color: #000;
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;
`;


const Footer = () => {
  const { pathname } = useLocation();
  return (
    <StyledFooter>
      {footerLinks.map(({ path, Icon, IconSelected }) => (
        <StyledLink key={path} to={path} className={path === pathname ? 'active' : ''}>
          {path === pathname ?
              <IconSelected /> :
              <Icon />
          }
        </StyledLink>
      ))}
    </StyledFooter>
  );
};

export default Footer;
