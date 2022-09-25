import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { useAuth } from 'brains/auth';
// import { useTheme } from 'brains/theme';
// import { path2title } from 'utils/state';

import Burger from 'components/bits/Burger';

import { mediaQuery, card } from 'styles/theme';

import logo from 'res/icons/logo-transparent.svg';
// import iconDay from 'res/icons/day.svg';
// import iconNight from 'res/icons/night.svg';

const StyledHeader = styled.header`
  ${theme('theme', card)}
  /* background: linear-gradient(160deg, #ffa751, #ffa751); */
  color: #000;
  z-index: 10;
  /* height: 180px; */
  flex-shrink: 0;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-wrap: wrap;
  /* height: 96px; */
  align-items: center;
  justify-content: space-between;
  padding: 16px;


  ${mediaQuery('tablet')} {
    display: none;
  };

  & h1 {
    margin: auto auto auto 0;
    font-weight: normal;
  }
`;

// const BackLink = styled(Link)`
//   display: inline-flex;
//   margin-right: 16px;
//   & img {
//     /* ${theme('theme', icon)} */
//     width: 2.5em;
//   }
// `;

// const NightModeButton = styled.button`
//   width: 2.5em;
//   padding: 0;
//   filter: drop-shadow(1px 1px 2px #aaa);
// `;

const Logo = styled.img`
  height: 48px;
  border-radius: 10px;
  filter: drop-shadow(0px 1px 2px #aaa);
`;

const ProfilePic = styled.img`
  height: 48px;
  border-radius: 10px;
  filter: drop-shadow(0px 1px 2px #aaa);
`;

const HelloMsg = styled.div`
  padding-left: 16px;
  flex-basis: 100%;

  & h1 {

  };
`;

// const themeIcons = { light: iconDay, dark: iconNight };

const Header = () => {
  // const { pathname } = useLocation();
  const { username, picture } = useAuth().user;
  console.log(picture);
  /* const { activeTheme, toggleTheme } = useTheme(); */
  return (
    <StyledHeader>
      {/* {pathname !== '/' ? (
        <BackLink to="/">
          <img src={iconLeft} alt="" />
        </BackLink>
      ) : (
        <BackLink to="/">
          <img src={iconLeft} alt="" />
        </BackLink>
      )} */}
      <Burger />
      <Logo src={logo} alt="App Logo" />
      <ProfilePic src={picture} alt={`${username}s picture`} />
      <HelloMsg>
        <h1>{`Hello, ${username}!`}</h1>
        <p>Welcome home.</p>
      </HelloMsg>
    </StyledHeader>
  );
};

/* <NightModeButton onClick={toggleTheme}>
  <img src={themeIcons[activeTheme]} alt="Change theme" />
</NightModeButton> */
/* <HelloMsg>{path2title(pathname) || `Hello, ${username}!`}</HelloMsg> */

export default Header;
