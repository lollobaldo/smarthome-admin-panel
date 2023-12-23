import React from 'react';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { useAuth } from 'brains/auth';
import { useTheme } from 'brains/theme';
import { mediaQuery, card } from 'styles/theme';

const StyledHeader = styled.header`
  grid-area: header;
  ${theme('theme', card)}
  /* background: linear-gradient(160deg, #ffa751, #ffa751); */
  /* color: #000; */
  z-index: 10;
  /* height: 108px; */
  /* flex-shrink: 0; */
  /* border-radius: 0 0 20px 20px; */
  display: flex;
  /* flex-wrap: wrap; */
  /* height: 96px; */
  align-items: center;
  justify-content: space-between;
  padding: 24px;


  ${mediaQuery('tablet')} {
    display: none;
  };

  & h1 {
    margin: auto auto auto 0;
    font-weight: 500;
  }
`;

const NightModeButton = styled.button`
  padding: 0;
`;

// const Logo = styled.img`
//   height: 48px;
//   border-radius: 10px;
//   filter: drop-shadow(0px 1px 2px #aaa);
// `;

const ProfilePic = styled.img`
  height: 60px;
  border-radius: 10px;
  filter: drop-shadow(0px 1px 2px #aaa);
`;

// const themeIcons = { light: iconDay, dark: iconNight };

const StyledHelloMsg = styled.div`
  flex-basis: 100%;

  & h1, & p {
    margin: 0;
  };
`;

const HelloMsg = ({ username }: { username?: string }) => (
  <StyledHelloMsg>
    <h1>{`Hi, ${username || 'user'}!`}</h1>
    <p>Welcome home.</p>
  </StyledHelloMsg>
);

const Header = () => {
  // const { pathname } = useLocation();
  const { username, picture } = useAuth().auth.user;
  console.log(username, picture);
  const { toggleTheme } = useTheme();
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
      <HelloMsg username={username} />
      {/* <Logo src={logo} alt="App Logo" /> */}
      <NightModeButton onClick={toggleTheme}>
        <ProfilePic src={picture} alt={`${username}s picture`} />
      </NightModeButton>
      </StyledHeader>
  );
};

/* <NightModeButton onClick={toggleTheme}>
  <img src={themeIcons[activeTheme]} alt="Change theme" />
</NightModeButton> */
/* <HelloMsg>{path2title(pathname) || `Hello, ${username}!`}</HelloMsg> */

export default Header;
