import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { useAuth } from 'brains/auth';
import { useTheme } from 'brains/theme';
import { path2title } from 'utils/state';

import { mediaQuery, icon, card } from 'styles/theme';

import iconLeft from 'res/icons/back.svg';
import iconDay from 'res/icons/day.svg';
import iconNight from 'res/icons/night.svg';

const StyledHeader = styled.header`
  ${theme('theme', card)}
  background: linear-gradient(160deg, #ffa751, #ffa751);
  color: #fff;
  z-index: 10;
  height: 180px;
  border-radius: 0 0 20px 20px;
  display: flex;
  align-content: center;
  padding: 0 16px;


  ${mediaQuery('tablet')} {
    display: none;
  };

  & h1 {
    margin: auto auto auto 0;
    font-weight: normal;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  margin-right: 16px;
  & img {
    ${theme('theme', icon)}
    width: 2.5em;
  }
`;

const NightModeButton = styled.button`
  width: 2.5em;
  padding: 0;
  filter: drop-shadow(1px 2px 3px #777);
`;

const themeIcons = { light: iconDay, dark: iconNight };

const Header = () => {
  const { pathname } = useLocation();
  const { username } = useAuth().user;
  const { activeTheme, toggleTheme } = useTheme();
  return (
    <StyledHeader>
      {pathname !== '/'
        && (
        // <NightModeButton onClick={() => history.push('/')}>
        //   <img
        //     src={iconLeft}
        //     alt="" />
        // </NightModeButton>
        <BackLink to="/">
          <img src={iconLeft} alt="" />
        </BackLink>
        )}
      <h1>{path2title(pathname) || `Hi ${username}!`}</h1>
      <NightModeButton onClick={toggleTheme}>
        <img src={themeIcons[activeTheme]} alt="Change theme" />
      </NightModeButton>
    </StyledHeader>
  );
};

export default Header;
